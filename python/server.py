from flask import Flask, request, jsonify
from flask_cors import CORS
import birdgame 
import threading
# instance of flask application
app = Flask(__name__)
# CORS(app, resources={r"/*": {"origins": ["https://gamedemo123.netlify.app", "http://localhost:3000"]}})
CORS(app)
 
# home route that returns below text when root url is accessed

def start_game():
    birdgame.run_game()

@app.route("/run/", methods=['POST', 'GET'])
def helloworld():
    if request.method == 'POST' or request.method == 'GET':
        data = request.get_json()  # Parse the JSON body
        user_info = data.get('user', {})
        print("Received user info:", user_info)
        # Process the user_info as needed

        return jsonify({'message': 'helloworld', 'receivedUserInfo': True})
    else:
        return jsonify({'message': 'Method not allowed'}), 405

# @app.route("/run/", methods=['POST', 'GET'])
# def game_run():
#     thread = threading.Thread(target=start_game)
#     thread.start()
#     return jsonify({'message': 'Game started successfully!'})
 
if __name__ == '__main__':  
   app.run()
