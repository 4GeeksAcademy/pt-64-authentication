"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager
from datetime import datetime, timedelta
import hashlib

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/signup', methods=['POST'])
def signup():
    body = request.get_json()
    user_email = body['email']
    user_password = hashlib.sha256(body['password'].encode("utf-8")).hexdigest()
    new_user = User(email = user_email, password = user_password, is_active = True)
    db.session.add(new_user)
    db.session.commit()
    return jsonify("signup sucessful")
    
@api.route('/login' , methods=['POST'])
def login():
    body = request.get_json()
    email = body['email']
    user_password =  hashlib.sha256(body['password'].encode("utf-8")).hexdigest()
    user = User.query.filter(email == email).first()
    if user and user.password == user_password:
        access_token = create_access_token(identity = user.id)
        return jsonify(access_token)
    
@api.route('get-user' , methods=['GET'])
@jwt_required()
def get_user():
    id = get_jwt_identity()
    user = User.query.filter(id == id).first()
    return jsonify(user.serialize())
    
    
    
    
