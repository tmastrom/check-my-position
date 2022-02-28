from flask import Flask
from flask_restful import Api
from flask_cors import CORS
from api.ChessApiHandler import ChessApiHandler #comment this on deployment
from api.HelloApiHandler import HelloApiHandler

app = Flask(__name__)
CORS(app) #comment this on deployment
api = Api(app)

@app.route("/")
def serve():
    return "server api"

api.add_resource(HelloApiHandler, '/flask/hello')
api.add_resource(ChessApiHandler, '/analyze')
