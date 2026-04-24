import requests
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/next_image', methods=['POST'])
def next_image():
  body = request.get_json()
  url = body.get("url")
  response = requests.get(url)
  with open("wallpaper.jpg", "wb") as f:
    f.write(response.content)
  
  return jsonify({"message": "Wallpaper alterado com sucesso"}), 200

app.run(port=5000, host="localhost", debug=True)