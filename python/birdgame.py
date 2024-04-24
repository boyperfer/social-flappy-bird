import cv2
import mediapipe as mp
import pygame as pg
import numpy as np
import sys
import random
import sqlite3
from button import Button

# Connect to the SQLite database
conn = sqlite3.connect('game_scores.db')
cursor = conn.cursor()

# Create a table to store game scores if not exists
cursor.execute('''CREATE TABLE IF NOT EXISTS scores (
                id INTEGER PRIMARY KEY,
                player_name TEXT,
                score INTEGER
                )''')

# Create a table to store user credentials if not exists
cursor.execute('''CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY,
                username TEXT UNIQUE,
                password TEXT
                )''')

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
gravity = 0.25
bird_movement = 0
game_active = False
pipe_height = [200, 300, 400, 500, 600, 700, 800]
SPAWNPIPE = pg.USEREVENT
pg.time.set_timer(SPAWNPIPE, 2000)
pipe_scroll_speed = 15
score = 0
player_name = None

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

# Function to save score to the database
def save_score(player_name, score):
    cursor.execute('''INSERT INTO scores (player_name, score)
                    VALUES (?, ?)''', (player_name, score))
    conn.commit()

# Function to check user credentials
def check_credentials(username, password):
    cursor.execute('''SELECT * FROM users WHERE username=? AND password=?''', (username, password))
    return cursor.fetchone() is not None

# Function to handle login
def handle_login():
    global game_active, player_name
    username = ""
    password = ""
    typing = "username"
    font = pg.font.Font(None, 36)

    while True:
        for event in pg.event.get():
            if event.type == pg.QUIT:
                pg.quit()
                sys.exit()
            if event.type == pg.KEYDOWN:
                if event.key == pg.K_RETURN:
                    if typing == "username":
                        typing = "password"
                    else:
                        if check_credentials(username, password):
                            player_name = username
                            game_active = True
                            return
                        else:
                            print("Invalid credentials. Please try again.")
                            username = ""
                            password = ""
                            typing = "username"
                elif event.key == pg.K_BACKSPACE:
                    if typing == "username":
                        username = username[:-1]
                    else:
                        password = password[:-1]
                elif event.key == pg.K_TAB:
                    if typing == "username":
                        typing = "password"
                    else:
                        typing = "username"
                else:
                    if typing == "username":
                        username += event.unicode
                    else:
                        password += event.unicode

        SCREEN.fill((0, 0, 0))
        text_surface = font.render(f"Enter your {typing}: {username if typing == 'username' else '*' * len(password)}", True, (255, 255, 255))
        SCREEN.blit(text_surface, (100, 100))
        pg.display.flip()


# Function to handle signup
def handle_signup():
    global game_active, player_name
    username = ""
    password = ""
    typing = "username"
    font = pg.font.Font(None, 36)

    while True:
        for event in pg.event.get():
            if event.type == pg.QUIT:
                pg.quit()
                sys.exit()
            if event.type == pg.KEYDOWN:
                if event.key == pg.K_RETURN:
                    if typing == "username":
                        typing = "password"
                    else:
                        cursor.execute('''SELECT * FROM users WHERE username=?''', (username,))
                        if cursor.fetchone() is not None:
                            print("Username already exists. Please choose another username.")
                            username = ""
                            password = ""
                            typing = "username"
                        else:
                            cursor.execute('''INSERT INTO users (username, password) VALUES (?, ?)''', (username, password))
                            conn.commit()
                            player_name = username
                            game_active = True
                            return
                elif event.key == pg.K_BACKSPACE:
                    if typing == "username":
                        username = username[:-1]
                    else:
                        password = password[:-1]
                elif event.key == pg.K_TAB:
                    if typing == "username":
                        typing = "password"
                    else:
                        typing = "username"
                else:
                    if typing == "username":
                        username += event.unicode
                    else:
                        password += event.unicode

        SCREEN.fill((0, 0, 0))
        text_surface = font.render(f"Enter your {typing}: {username if typing == 'username' else '*' * len(password)}", True, (255, 255, 255))
        SCREEN.blit(text_surface, (100, 100))
        pg.display.flip()


# Function to handle game over
def handle_game_over():
    global game_active
    font = pg.font.Font(None, 100)
    text_surface = font.render(f"Score: {score}", True, (255, 255, 255))
    SCREEN.blit(text_surface, (screen_width // 2 - text_surface.get_width() // 2, screen_height // 2 - text_surface.get_height() // 2))

    # Play Again button
    play_again_button = pg.Rect(screen_width // 2 - 100, screen_height // 2 + 100, 200, 50)
    pg.draw.rect(SCREEN, (0, 255, 0), play_again_button)
    font = pg.font.Font(None, 36)
    play_again_text = font.render("Play Again", True, (255, 255, 255))
    SCREEN.blit(play_again_text, (screen_width // 2 - play_again_text.get_width() // 2, screen_height // 2 + 120))

    # Check if user clicks the Play Again button
    mouse_pos = pg.mouse.get_pos()
    if event.type == pg.MOUSEBUTTONDOWN:
        if play_again_button.collidepoint(mouse_pos):
            # Reset game
            game_active = True
            reset_game()

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
    global score, bird_movement, pipe_list
    bird_rect.center = (100, 240)
    score = 0
    bird_movement = 0
    pipe_list = []


def play():
    # Game variables
    gravity = 0.25
    bird_movement = 0
    global game_active
    global score
    global player_name
    global pipe_list

    # Main game loop
    while cap.isOpened():
        ret, frame = cap.read()  # Read a frame from the camera
        if not ret:
            break

        # Resize the frame to fit the screen
        frame = cv2.resize(frame, (screen_width, screen_height))

        # Process webcam feed
        frame = cv2.cvtColor(cv2.flip(frame, 1), cv2.COLOR_BGR2RGB)
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

            # Update bird's position based on shoulder detection
            if results.pose_landmarks:
                landmark = results.pose_landmarks.landmark[mp_pose.PoseLandmark.RIGHT_SHOULDER]
                bird_rect.centery = int(landmark.y * screen_height)
                bird_rect.centerx = int(landmark.x * screen_width)
        else:
            # Save score to the database
            save_score(player_name, score)

            # Show score
            text_surface = get_font(75).render(f"Score: {score}", True, (255, 255, 255))
            SCREEN.blit(text_surface, (screen_width // 2 - text_surface.get_width() // 2, screen_height // 2 - text_surface.get_height() // 2))
    

            mouse_pos = pg.mouse.get_pos()
            

            #button for play again
            OPTIONS_AGAIN = Button(image=None, pos=(screen_width//2, screen_height//2 + 120), 
                            text_input="PLAY AGAIN", font=get_font(35), base_color="Black", hovering_color="Green")

            OPTIONS_AGAIN.changeColor(mouse_pos)
            OPTIONS_AGAIN.update(SCREEN)

            for event in pg.event.get():
                if event.type == pg.QUIT:
                    pg.quit()
                    sys.exit()
                if event.type == pg.MOUSEBUTTONDOWN:
                    if OPTIONS_AGAIN.checkForInput(mouse_pos):
                        # Reset game
                        game_active = True
                        score = 0
                        reset_game()

            #button for back to mainmanu
            OPTIONS_BACK = Button(image=None, pos=(screen_width//2, screen_height//2 + 200), 
                            text_input="BACK", font=get_font(35), base_color="Black", hovering_color="Green")

            OPTIONS_BACK.changeColor(mouse_pos)
            OPTIONS_BACK.update(SCREEN)

            for event in pg.event.get():
                if event.type == pg.QUIT:
                    pg.quit()
                    sys.exit()
                if event.type == pg.MOUSEBUTTONDOWN:
                    if OPTIONS_BACK.checkForInput(mouse_pos):
                        main_menu()

        pg.display.update()
        pg.time.Clock().tick(30)

def options():
    while True:
        OPTIONS_MOUSE_POS = pg.mouse.get_pos()

        SCREEN.fill("white")

        OPTIONS_TEXT = get_font(45).render("This is the OPTIONS screen.", True, "Black")
        OPTIONS_RECT = OPTIONS_TEXT.get_rect(center=(640, 260))
        SCREEN.blit(OPTIONS_TEXT, OPTIONS_RECT)

        OPTIONS_BACK = Button(image=None, pos=(640, 460), 
                            text_input="BACK", font=get_font(75), base_color="Black", hovering_color="Green")

        OPTIONS_BACK.changeColor(OPTIONS_MOUSE_POS)
        OPTIONS_BACK.update(SCREEN)

        for event in pg.event.get():
            if event.type == pg.QUIT:
                pg.quit()
                sys.exit()
            if event.type == pg.MOUSEBUTTONDOWN:
                if OPTIONS_BACK.checkForInput(OPTIONS_MOUSE_POS):
                    main_menu()

        pg.display.update()

def main_menu():
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
                            text_input="LOGIN", font=get_font(45), base_color="#d7fcd4", hovering_color="White")
        SIGNIN_BUTTON = Button(image=None, pos=(840, 625), 
                            text_input="SIGNIN", font=get_font(45), base_color="#d7fcd4", hovering_color="White")

        SCREEN.blit(MENU_TEXT, MENU_RECT)

        for button in [PLAY_BUTTON, OPTIONS_BUTTON, QUIT_BUTTON, LOGIN_BUTTON, SIGNIN_BUTTON]:
            button.changeColor(MENU_MOUSE_POS)
            button.update(SCREEN)
        
        for event in pg.event.get():
            if event.type == pg.QUIT:
                pg.quit()
                sys.exit()
            if event.type == pg.MOUSEBUTTONDOWN:
                if PLAY_BUTTON.checkForInput(MENU_MOUSE_POS):
                    play()
                if OPTIONS_BUTTON.checkForInput(MENU_MOUSE_POS):
                    options()
                if LOGIN_BUTTON.checkForInput(MENU_MOUSE_POS):
                    handle_login()
                if SIGNIN_BUTTON.checkForInput(MENU_MOUSE_POS):
                    handle_signup()
                if QUIT_BUTTON.checkForInput(MENU_MOUSE_POS):
                    pg.quit()
                    sys.exit()

        pg.display.update()

main_menu()
# Close the database connection
conn.close()
