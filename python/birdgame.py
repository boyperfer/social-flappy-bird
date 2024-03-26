
import cv2
import mediapipe as mp
import pygame as pg
import numpy as np
import sys
import random

mp_drawing = mp.solutions.drawing_utils


# Initialize MediaPipe Pose
mp_pose = mp.solutions.pose
pose = mp_pose.Pose(min_detection_confidence=0.5, min_tracking_confidence=0.5)

# Initialize PyGame
pg.init()
screen_width, screen_height = 1920, 1080
screen = pg.display.set_mode((screen_width, screen_height))
pg.display.set_caption("Flappy Bird with Webcam Background")

# Load bird and pipe images
bird_image = pg.image.load('./assets/birdup.png').convert_alpha()
bird_image = pg.transform.scale(bird_image, (100, 100))
bird_rect = bird_image.get_rect(center=(100, 240))

pipe_image = pg.image.load('./assets/pipeup.png').convert_alpha()
# pipe_image = pg.transform.scale(pipe_image, (pipe_image.get_width(), screen_height))
pipe_image = pg.transform.scale(pipe_image, (100, screen_height))
pipe_list = []

# Game variables
gravity = 0.25
bird_movement = 0
game_active = True
pipe_height = [200, 300, 400, 500, 600, 700, 800]
SPAWNPIPE = pg.USEREVENT
pg.time.set_timer(SPAWNPIPE, 2000)
pipe_scroll_speed = 15
score = 0

# Initialize webcam
cap = cv2.VideoCapture(0)

def create_pipe():
    random_pipe_pos = random.choice(pipe_height)
    bottom_pipe = pipe_image.get_rect(midtop=(1700, random_pipe_pos))
    top_pipe = pipe_image.get_rect(midbottom=(1700, random_pipe_pos - 300))  # 300 is the gap size
    return bottom_pipe, top_pipe

def move_pipes(pipes):
    for pipe in pipes:
        pipe.centerx -= pipe_scroll_speed
    visible_pipes = [pipe for pipe in pipes if pipe.right > -50]
    return visible_pipes

def draw_pipes(pipes):
    for pipe in pipes:
        if pipe.bottom >= screen_height:  # Bottom pipe
            screen.blit(pipe_image, pipe)
        else:  # Top pipe, needs to be flipped
            flip_pipe = pg.transform.flip(pipe_image, False, True)
            screen.blit(flip_pipe, pipe)

def check_collision(pipes):
    global game_active
    for pipe in pipes:
        if bird_rect.colliderect(pipe):
            game_active = False
    if bird_rect.top <= -100 or bird_rect.bottom >= screen_height:
        game_active = False
        
def reset_game():
    bird_rect.center = (100, 240)
    return []


while cap.isOpened():
    ret, frame = cap.read()
    if not ret:
        break

    # Process webcam feed
    frame = cv2.cvtColor(cv2.flip(frame, 1), cv2.COLOR_BGR2RGB)
    results = pose.process(frame)
    

    # Convert webcam feed to PyGame surface
    #frame = cv2.cvtColor(frame, cv2.COLOR_RGB2BGR)
    frame = np.rot90(frame)
    frame = np.flipud(frame)
    frame_surface = pg.surfarray.make_surface(frame)

    for event in pg.event.get():
        if event.type == pg.QUIT:
            cap.release()
            cv2.destroyAllWindows()
            pg.quit()
            sys.exit()
        if event.type == SPAWNPIPE:
            pipe_list.extend(create_pipe())
        if event.type == pg.USEREVENT:  # 2. If time event occurs
            score += 1  # Increase the score by 1



    screen.blit(frame_surface, (0, 0))

    if game_active:
        # Bird
        bird_movement += gravity
        bird_rect.centery += bird_movement
        screen.blit(bird_image, bird_rect)

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
        pipe_list = reset_game()
        game_active = True
        bird_movement = 0

    font = pg.font.Font(None, 36)  # Font for rendering the score
    score_surface = font.render(f"Score: {score}", True, (255, 255, 255))  # 3. Render the score
    screen.blit(score_surface, (10, 10))  # Blit the score surface to the screen
    pg.display.update()
    pg.time.Clock().tick(30)
