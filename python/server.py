import datetime
from flask import Flask, request, jsonify
from flask_cors import CORS
import birdgame 
import threading
x =  datetime.datetime.now()
# instance of flask application
app = Flask(__name__)
CORS(app)
 
# home route that returns below text when root url is accessed

def start_game():
    birdgame.run_game()

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>" 

@app.route("/run", methods=['POST'])
def game_run():
    thread = threading.Thread(target=start_game)
    thread.start()
    return jsonify({'message': 'Game started successfully!'})

@app.route('/data')
def get_time():
 
    # Returning an api for showing in  reactjs
    return {
        'Name':"geek", 
        "Age":"22",
        "Date":x, 
        "programming":"python"
        }
 
if __name__ == '__main__':  
   app.run()
