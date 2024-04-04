from flask import Flask, request, jsonify
from flask_cors import CORS
import birdgame 
import threading
# instance of flask application
app = Flask(__name__)
CORS(app)
 
# home route that returns below text when root url is accessed

def start_game():
    birdgame.run_game()

@app.route("/run/", methods=['POST', 'GET'])
def game_run():
    thread = threading.Thread(target=start_game)
    thread.start()
    return jsonify({'message': 'Game started successfully!'})
 
if __name__ == '__main__':  
   app.run()
