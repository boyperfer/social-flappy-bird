#!/bin/bash

# play game
echo "install virtual environment"
python -m venv social-flappy-bird
source social-flappy-bird/bin/activate

echo "Install python packages"
pip install -r requirements.txt

echo "Start game"
cd python
python birdgame.py
