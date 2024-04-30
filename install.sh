#!/bin/bash

# login
# echo "Install conda environment"
# conda create -n social-flappy-bird python=3.11.2
# conda activate social-flappy-bird

echo "Install python packages"
cd soical-flappy-bird
npm install  

echo "Start social-flappy-bird"
npm start 
