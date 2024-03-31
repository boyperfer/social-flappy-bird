import cv2 
import mediapipe as mp
import pygame as pg
import numpy as np
import sys
import random

# Initialize MediaPipe Pose
def run_game():
    mp_pose = mp.solutions.pose
    pose = mp_pose.Pose(min_detection_confidence=0.5, min_tracking_confidence=0.5)

    # Initialize PyGame
    screen_width, screen_height = 1920, 1080
    pg.init()
    screen = pg.display.set_mode((screen_width, screen_height))
    pg.display.set_caption("Flappy Bird with Webcam Background")

    # Load bird and pipe images
    bird_image = pg.image.load('./assets/birdup.png').convert_alpha()
    bird_image = pg.transform.scale(bird_image, (100, 100))
    bird_rect = bird_image.get_rect(center=(100, 240))

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
    pipe_image = pg.image.load('./assets/pipeup.png').convert_alpha()
    pipe_image = pg.transform.scale(pipe_image, (100, screen_height))
    pipe_list = []


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
                screen.blit(pipe_image, pipe)
            else:  # Top pipe, needs to be flipped
                flip_pipe = pg.transform.flip(pipe_image, False, True)
                screen.blit(flip_pipe, pipe)

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

        # Webcam loop
    screen = pg.display.set_mode((screen_width, screen_height))
    cap = cv2.VideoCapture(0)
    while cap.isOpened():
        # Inside the webcam loop
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

        # Convert webcam feed to PyGame surface
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
            if event.type == pg.USEREVENT and game_active:  # Only increase score if game is active
                score += 1

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
            font = pg.font.Font(None, 100)
            text_surface = font.render(f"Score: {score}", True, (255, 255, 255))
            screen.blit(text_surface, (screen_width // 2 - text_surface.get_width() // 2, screen_height // 2 - text_surface.get_height() // 2))
        
            # Play Again button
            play_again_button = pg.Rect(screen_width // 2 - 100, screen_height // 2 + 100, 200, 50)
            pg.draw.rect(screen, (0, 255, 0), play_again_button)
            font = pg.font.Font(None, 36)
            play_again_text = font.render("Play Again", True, (255, 255, 255))
            screen.blit(play_again_text, (screen_width // 2 - play_again_text.get_width() // 2, screen_height // 2 + 120))

            mouse_pos = pg.mouse.get_pos()
            if event.type == pg.MOUSEBUTTONDOWN:
                if play_again_button.collidepoint(mouse_pos):
                # Reset game
                    game_active = True
                    score = 0
                    pipe_list = reset_game()

        
        # Get camera resolution
        cam_width, cam_height = cap.get(cv2.CAP_PROP_FRAME_WIDTH), cap.get(cv2.CAP_PROP_FRAME_HEIGHT)

        # Calculate aspect ratio
        cam_aspect_ratio = cam_width / cam_height
        screen_aspect_ratio = screen_width / screen_height

        # Resize camera frame to fit the screen
        if cam_aspect_ratio > screen_aspect_ratio:
            # Camera width is larger than screen width
            new_cam_width = int(screen_height * cam_aspect_ratio)
            new_cam_height = screen_height
        else:
            # Camera height is larger than screen height
            new_cam_width = screen_width
            new_cam_height = int(screen_width / cam_aspect_ratio)

        # Resize the camera frame
        frame = cv2.resize(frame, (new_cam_width, new_cam_height))
        
        font = pg.font.Font(None, 36)  # Font for rendering the score
        score_surface = font.render(f"Score: {score}", True, (255, 255, 255))  # 3. Render the score
        screen.blit(score_surface, (10, 10))  # Blit the score surface to the screen

        pg.display.update()
        pg.time.Clock().tick(30)

if __name__ == "__main__":
    run_game()
