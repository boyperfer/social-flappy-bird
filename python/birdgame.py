import cv2
import mediapipe as mp
import pygame as pg
import numpy as np
import sys
import random
import sqlite3
import firebase_admin
import webbrowser
from firebase_admin import credentials, firestore
from button import Button
from hashlib import sha256

def pad_and_hash(input_string):
    # Ensure the string is at least 32 characters by padding with spaces
    padded_string = input_string[:32]  # Trim the string if it is longer than 32 characters
    padded_string = padded_string.ljust(32)  # Pad the string to 32 characters with spaces if it's shorter

    # Compute the SHA256 hash of the padded string
    hash_digest = sha256(padded_string.encode('utf-8')).hexdigest()
    return hash_digest


cred = credentials.Certificate('./key.json')
firebase_admin.initialize_app(cred)
db = firestore.client()
doc_ref = db.collection('users').document('user_id')
users_ref = db.collection('users')
docs = users_ref.stream()
users_by_email = {}
for doc in docs:
    user_data = doc.to_dict()  # Convert document to dictionary
    email = user_data.get('email')  # Get the email address
    if email:  # If email is present, use it as a key
        user_data['id'] = doc.id
        users_by_email[email] = user_data

# Initialize MediaPipe Pose
mp_pose = mp.solutions.pose
pose = mp_pose.Pose(min_detection_confidence=0.5, min_tracking_confidence=0.5)



# Initialize PyGame
pg.init()
screen_width, screen_height = 1280, 720
SCREEN = pg.display.set_mode((screen_width, screen_height))
pg.display.set_caption("Flappy Bird with Webcam Background")
BG = pg.image.load("assets/Background.png")


def get_font(size): # Returns Press-Start-2P in the desired size
    return pg.font.Font("assets/font.ttf", size)


# Load bird and pipe images
bird_image = pg.image.load('./assets/birdup.png').convert_alpha()
bird_image = pg.transform.scale(bird_image, (100, 100))
bird_rect = bird_image.get_rect(center=(100, 240))

pipe_image = pg.image.load('./assets/pipeup.png').convert_alpha()
pipe_image = pg.transform.scale(pipe_image, (100, screen_height))
pipe_list = []

# Game variables
gravity = 0
bird_movement = 0
game_active = False
pipe_height = [200, 300, 400, 500, 600, 700]
pipe_freq = 2000
pipe_scroll_speed = 15
score = 0
player_name = None
part = 2

# Initialize webcam
cap = cv2.VideoCapture(0)

# Function to create pipes
def create_pipe():
    random_pipe_pos = random.choice(pipe_height)
    bottom_pipe = pipe_image.get_rect(midtop=(1700, random_pipe_pos))
    top_pipe = pipe_image.get_rect(midbottom=(1700, random_pipe_pos - 300))  # 300 is the gap size
    return bottom_pipe, top_pipe

# Function to move pipes
def move_pipes(pipes):
    for pipe in pipes:
        pipe.centerx -= pipe_scroll_speed
    visible_pipes = [pipe for pipe in pipes if pipe.right > -50]
    return visible_pipes

# Function to draw pipes
def draw_pipes(pipes):
    for pipe in pipes:
        if pipe.bottom >= screen_height:  # Bottom pipe
            SCREEN.blit(pipe_image, pipe)
        else:  # Top pipe, needs to be flipped
            flip_pipe = pg.transform.flip(pipe_image, False, True)
            SCREEN.blit(flip_pipe, pipe)

# Function to check collision
def check_collision(pipes):
    global game_active
    for pipe in pipes:
        if bird_rect.colliderect(pipe):
            game_active = False
    if bird_rect.top <= -100 or bird_rect.bottom >= screen_height:
        game_active = False

# Function to reset the game
def reset_game():
    bird_rect.center = (100, 240)
    return []

def save_score1(username, new_score):
    user = users_by_email.get(username)
    db = firestore.client()
    user_ref = db.collection('users').document(user.get("id"))
    current_scores = user_ref.get().to_dict().get('score', [])
    updated_scores = current_scores + [new_score]
    user_ref.update({'score': updated_scores})



# Function to check user credentials
def check_credentials(username, password):
    user = users_by_email.get(username)
    
    # If the user doesn't exist, return False
    if not user:
        return False
    
    # Concatenate the password with the displayName
    combined_string = password + user['displayName']
    
    # Hash the combined string
    hashed_password = pad_and_hash(combined_string)
    
    # Compare the hashed password with the stored hashed password
    if hashed_password == user['hashedValue']:
        return True  # The passwords match
    else:
        return False  # The passwords do not match
        
# Function to handle login
def handle_login():
    global game_active, player_name
    username = ""
    password = ""
    typing = "User Email"
    font = pg.font.Font(None, 36)

    while True:
        for event in pg.event.get():
            if event.type == pg.QUIT:
                pg.quit()
                sys.exit()
            if event.type == pg.KEYDOWN:
                if event.key == pg.K_RETURN:
                    if typing == "User Email":
                        typing = "Password"
                    else:
                        if check_credentials(username, password):
                            player_name = username
                            game_active = True
                            return
                        else:
                            print("Invalid credentials. Please try again.")
                            username = ""
                            password = ""
                            typing = "User Email"
                elif event.key == pg.K_BACKSPACE:
                    if typing == "User Email":
                        username = username[:-1]
                    else:
                        password = password[:-1]
                elif event.key == pg.K_TAB:
                    if typing == "User Email":
                        typing = "Password"
                    else:
                        typing = "User Email"
                else:
                    if typing == "User Email":
                        username += event.unicode
                    else:
                        password += event.unicode

        SCREEN.fill((0, 0, 0))
        text_surface = font.render(f"Enter your {typing}: {username if typing == 'User Email' else '*' * len(password)}", True, (255, 255, 255))
        SCREEN.blit(text_surface, (100, 100))
        pg.display.flip()
    

# Function to create pipes
def create_pipe():
    random_pipe_pos = random.choice(pipe_height)
    bottom_pipe = pipe_image.get_rect(midtop=(1700, random_pipe_pos))
    top_pipe = pipe_image.get_rect(midbottom=(1700, random_pipe_pos - 300))  # 300 is the gap size
    return bottom_pipe, top_pipe

# Function to move pipes
def move_pipes(pipes):
    for pipe in pipes:
        pipe.centerx -= pipe_scroll_speed
    visible_pipes = [pipe for pipe in pipes if pipe.right > -50]
    return visible_pipes

# Function to draw pipes
def draw_pipes(pipes):
    for pipe in pipes:
        if pipe.bottom >= screen_height:  # Bottom pipe
            SCREEN.blit(pipe_image, pipe)
        else:  # Top pipe, needs to be flipped
            flip_pipe = pg.transform.flip(pipe_image, False, True)
            SCREEN.blit(flip_pipe, pipe)

# Function to check collision
def check_collision(pipes):
    global game_active
    for pipe in pipes:
        if bird_rect.colliderect(pipe):
            game_active = False
    # if bird_rect.top <= -100 or bird_rect.bottom >= screen_height:
    #     game_active = False

# Function to reset the game
def reset_game():
    global score, bird_movement, pipe_list, game_active
    bird_rect.center = (100, 240)
    score = 0
    bird_movement = 0
    pipe_list = []
    game_active = True


def play():
    # Game variables
    gravity = 0
    bird_movement = 0
    global game_active
    global score
    global player_name
    global pipe_list
    global pipe_scroll_speed
    global pipe_freq
    global part

    SPAWNPIPE = pg.USEREVENT
    pg.time.set_timer(SPAWNPIPE, pipe_freq)

    # Main game loop
    while True:
        ret, frame = cap.read()  # Read a frame from the camera
        if not ret:
            break

        # Resize the frame to fit the screen
        frame = cv2.resize(frame, (screen_width, screen_height))

        # Process webcam feed
        frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        results = pose.process(frame)

        # Convert webcam feed to Pygame surface
        frame_surface = pg.surfarray.make_surface(np.rot90(frame))

        for event in pg.event.get():
            if event.type == pg.QUIT:
                cap.release()
                cv2.destroyAllWindows()
                pg.quit()
                sys.exit()
            if event.type == SPAWNPIPE:
                pipe_list.extend(create_pipe())
            if event.type == pg.USEREVENT and game_active:  # Only increase score if game is active
                score += 1

        SCREEN.blit(frame_surface, (0, 0))


        if game_active:
            # Bird
            bird_movement += gravity
            bird_rect.centery += bird_movement
            SCREEN.blit(bird_image, bird_rect)

            # Pipes
            pipe_list = move_pipes(pipe_list)
            draw_pipes(pipe_list)

            check_collision(pipe_list)

            text_surface = get_font(25).render(f"Score: {pipe_scroll_speed * score}", True, (255, 255, 255))
            SCREEN.blit(text_surface, (20, 20))

            # Update bird's position based on shoulder detection
            if results.pose_landmarks:
                if part == 1:
                    landmark = results.pose_landmarks.landmark[mp_pose.PoseLandmark.LEFT_HEEL]
                if part == 2:
                    landmark = results.pose_landmarks.landmark[mp_pose.PoseLandmark.LEFT_SHOULDER]
                bird_rect.centery = int(landmark.y * screen_height)
                bird_rect.centerx = int(screen_width - landmark.x * screen_width)
        else:
            # Save score to the database

            # Show score
            text_surface = get_font(75).render(f"Score: {pipe_scroll_speed * score}", True, (255, 255, 255))
            SCREEN.blit(text_surface, (screen_width // 2 - text_surface.get_width() // 2, screen_height // 2 - text_surface.get_height() // 2))
    

            mouse_pos = pg.mouse.get_pos()
            

            #button for play again
            PLAY_AGAIN = Button(image=None, pos=(screen_width//2, screen_height//2 + 120), 
                            text_input="PLAY AGAIN", font=get_font(35), base_color="Black", hovering_color="Green")

            PLAY_AGAIN.changeColor(mouse_pos)
            PLAY_AGAIN.update(SCREEN)
                    
            #button for back to mainmanu
            PLAY_BACK = Button(image=None, pos=(screen_width//2, screen_height//2 + 200), 
                            text_input="BACK", font=get_font(35), base_color="Black", hovering_color="Green")

            PLAY_BACK.changeColor(mouse_pos)
            PLAY_BACK.update(SCREEN)

            for event in pg.event.get():
                if event.type == pg.QUIT:
                    save_score1(player_name, (pipe_scroll_speed * score))
                    pg.quit()
                    sys.exit()
                if event.type == pg.MOUSEBUTTONDOWN:
                    if PLAY_BACK.checkForInput(mouse_pos):
                        save_score1(player_name, (pipe_scroll_speed * score))
                        score = 0
                        reset_game()
                        main_menu()
                    if PLAY_AGAIN.checkForInput(mouse_pos):
                        # Reset game
                        save_score1(player_name, (pipe_scroll_speed * score))
                        game_active = True
                        reset_game()


        pg.display.update()
        

def options():
    global pipe_scroll_speed
    global pipe_freq
    global part

    while True:
        OPTIONS_MOUSE_POS = pg.mouse.get_pos()

        SCREEN.fill("white")

        OPTIONS_TEXT = get_font(45).render("EXERCISE TYPE", True, "Black")
        OPTIONS_RECT = OPTIONS_TEXT.get_rect(center=(640, 160))
        SCREEN.blit(OPTIONS_TEXT, OPTIONS_RECT)

        
        OPTIONS_TEXT = get_font(45).render("BIRD SPEED", True, "Black")
        OPTIONS_RECT = OPTIONS_TEXT.get_rect(center=(640, 420))
        SCREEN.blit(OPTIONS_TEXT, OPTIONS_RECT)


        OPTIONS_LEG = Button(image=None, pos=(440, 260), 
                            text_input="LEG RAISE", font=get_font(35), base_color="Black", hovering_color="Green")
        OPTIONS_LEG.changeColor(OPTIONS_MOUSE_POS)
        OPTIONS_LEG.update(SCREEN)


        OPTIONS_SHO = Button(image=None, pos=(840, 260), 
                            text_input="PUSH UP", font=get_font(35), base_color="Black", hovering_color="Green")
        OPTIONS_SHO.changeColor(OPTIONS_MOUSE_POS)
        OPTIONS_SHO.update(SCREEN)


        text_surface = get_font(20).render(f"Speed: {pipe_scroll_speed}", True, "Black")
        SCREEN.blit(text_surface, (20, 20))
        if part == 1:
            text_surface = get_font(20).render(f"Exercise: Leg Raise", True, "Black")
        if part == 2:
            text_surface = get_font(20).render(f"Exercise: Push Up", True, "Black")
        SCREEN.blit(text_surface, (20, 40))


        OPTIONS_DEC = Button(image=None, pos=(440, 520), 
                            text_input="DOWN", font=get_font(35), base_color="Black", hovering_color="Green")
        OPTIONS_DEC.changeColor(OPTIONS_MOUSE_POS)
        OPTIONS_DEC.update(SCREEN)


        OPTIONS_INC = Button(image=None, pos=(840, 520), 
                            text_input="UP", font=get_font(35), base_color="Black", hovering_color="Green")
        OPTIONS_INC.changeColor(OPTIONS_MOUSE_POS)
        OPTIONS_INC.update(SCREEN)


        OPTIONS_BACK = Button(image=None, pos=(640, 660), 
                            text_input="BACK", font=get_font(55), base_color="Black", hovering_color="Green")
        OPTIONS_BACK.changeColor(OPTIONS_MOUSE_POS)
        OPTIONS_BACK.update(SCREEN)

        for event in pg.event.get():
            if event.type == pg.QUIT:
                pg.quit()
                sys.exit()
            if event.type == pg.MOUSEBUTTONDOWN:
                if OPTIONS_LEG.checkForInput(OPTIONS_MOUSE_POS):
                    part = 1
                if OPTIONS_SHO.checkForInput(OPTIONS_MOUSE_POS):
                    part = 2
                if OPTIONS_DEC.checkForInput(OPTIONS_MOUSE_POS):
                    pipe_scroll_speed = pipe_scroll_speed - 1
                    pipe_freq = int(30000/pipe_scroll_speed)
                if OPTIONS_INC.checkForInput(OPTIONS_MOUSE_POS):
                    pipe_scroll_speed = pipe_scroll_speed + 1
                    pipe_freq = int(30000/pipe_scroll_speed)
                if OPTIONS_BACK.checkForInput(OPTIONS_MOUSE_POS):
                    main_menu()

        pg.display.update()

def main_menu():
    global player_name
    while True:
        SCREEN.blit(BG, (0, 0))

        MENU_MOUSE_POS = pg.mouse.get_pos()

        MENU_TEXT = get_font(100).render("MAIN MENU", True, "#b68f40")
        MENU_RECT = MENU_TEXT.get_rect(center=(640, 100))

        PLAY_BUTTON = Button(image=None, pos=(640, 250), 
                            text_input="PLAY", font=get_font(55), base_color="#d7fcd4", hovering_color="White")
        OPTIONS_BUTTON = Button(image=None, pos=(640, 375), 
                            text_input="OPTIONS", font=get_font(55), base_color="#d7fcd4", hovering_color="White")
        QUIT_BUTTON = Button(image=None, pos=(640, 500), 
                            text_input="QUIT", font=get_font(55), base_color="#d7fcd4", hovering_color="White")
        LOGIN_BUTTON = Button(image=None, pos=(440, 625), 
                            text_input="SIGNIN", font=get_font(45), base_color="#d7fcd4", hovering_color="White")
        SIGNIN_BUTTON = Button(image=None, pos=(840, 625), 
                            text_input="SIGNUP", font=get_font(45), base_color="#d7fcd4", hovering_color="White")

        SCREEN.blit(MENU_TEXT, MENU_RECT)

        for button in [PLAY_BUTTON, OPTIONS_BUTTON, QUIT_BUTTON, LOGIN_BUTTON, SIGNIN_BUTTON]:
            button.changeColor(MENU_MOUSE_POS)
            button.update(SCREEN)
        
        for event in pg.event.get():
            if event.type == pg.QUIT:
                pg.quit()
                sys.exit()
            if event.type == pg.MOUSEBUTTONDOWN:
                if PLAY_BUTTON.checkForInput(MENU_MOUSE_POS) and player_name != None:
                    play()
                if PLAY_BUTTON.checkForInput(MENU_MOUSE_POS) and player_name == None:
                    print("login first")
                if OPTIONS_BUTTON.checkForInput(MENU_MOUSE_POS):
                    options()
                if LOGIN_BUTTON.checkForInput(MENU_MOUSE_POS):
                    handle_login()
                if SIGNIN_BUTTON.checkForInput(MENU_MOUSE_POS):
                    webbrowser.open("https://gamedemo123.netlify.app/login")
                if QUIT_BUTTON.checkForInput(MENU_MOUSE_POS):
                    pg.quit()
                    sys.exit()

        pg.display.update()

main_menu()