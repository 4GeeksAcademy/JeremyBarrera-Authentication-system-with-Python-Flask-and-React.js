"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token
from flask_jwt_extended import jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash
from werkzeug.security import check_password_hash


api = Blueprint('api', __name__)


@api.route('/login', methods=['POST'])
def handle_login():
    email = request.json.get('email')
    password = request.json.get('password')

    if not email or not password:
        return jsonify({"error": "Email and password are required"}), 400

    user = User.query.filter_by(email=email).first()
    if not user or not check_password_hash(user.password, password):
        return jsonify({"error": "Invalid email or password"}), 401

    access_token = create_access_token(
        identity=user.id)  # use ID or email as identity

    return jsonify({
        "message": "Login successful",
        "token": access_token,
    }), 200


@api.route('/signup', methods=['POST'])
def handle_signup():
    print("SIGNUP HIT")
    email = request.json.get('email')
    password = request.json.get('password')

    if not email or not password:
        return jsonify({"error": "Email and password are required"}), 400

    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        return jsonify({"error": "User already exists"}), 409

    hashed_password = generate_password_hash(password)

    new_user = User(email=email, password=hashed_password, is_active=True)
    db.session.add(new_user)
    db.session.commit()

    response_body = {
        "message": "User created successfully",
        "user": new_user.serialize()
    }

    return jsonify(response_body), 201

# Logout endpoint


@api.route('/logout', methods=['POST'])
@jwt_required()
def handle_logout():
    # Invalidate the token by not returning it or using a blacklist
    return jsonify({"message": "Logout successful"}), 200

# protected route Message


@api.route('/protected', methods=['GET'])
@jwt_required()
def protected_route():
    user_id = get_jwt_identity()
    current_user = User.query.get(user_id)
    if not current_user:
        return jsonify({"error": "User not found"}), 404

    return jsonify({
        "message": "This is a protected MESSAGE!!!",
        "user": current_user.serialize()
    }), 200


@api.route('/getProtectedMessage', methods=['GET'])
@jwt_required()
def get_protected_message():
    user_id = get_jwt_identity()
    current_user = User.query.get(user_id)
    if not current_user:
        return jsonify({"error": "User not found"}), 404

    return jsonify({
        "message": "This is a protected MESSAGE!!!",
        "user": current_user.serialize()
    }), 200
