import re

from flask import Blueprint, jsonify, request
from flask_login import login_required, login_user
from app.extensions import db
from app.models.user import User
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

auth_bp = Blueprint('auth', __name__)


@auth_bp.route('/api/register', methods=["POST"])
def register():
    data = request.get_json()

    if not data:
        return jsonify({
            "error": "No input data provided"
        }), 400

    # Make sure the JSON is an object/dict
    if not isinstance(data, dict):
        return jsonify({
            "error": "Invalid input data format"
        }), 400
    
    # Registration fields
    username = data.get("username")
    email = data.get("email")
    password = data.get("password")

    username = username.strip() if username else username
    email = email.strip().lower() if email else email
    #password = password.strip() if password else password
    if not username or not email or not password:
        return jsonify(
            {"error": "Username, email, and password are required"}
    ), 400

    #  Validate email format
    email_pattern = r"^[\w\.-]+@[\w\.-]+\.\w+$"
    if not re.fullmatch(email_pattern, email):
        return jsonify({
            "error": "Invalid email format"
        }), 400

    # Validate password length
    if len(password) < 8:
        return jsonify({
            "error": "Password must be at least 8 characters long"
        }), 400

    # Check for existing username
    if User.query.filter_by(username=username).first():
        return jsonify({"error": "Username already exists"}), 400

    # Check for existing email
    if User.query.filter_by(email=email).first():
        return jsonify({"error": "Email already exists"}), 400

    # Create a new user
    user = User(
        username=username,
        email=email
    )
    user.set_password(password)

    db.session.add(user)
    db.session.commit()

    return jsonify({
        "message": "User registered successfully",
        "user": {
            "id": user.id,
            "username": user.username,
            "email": user.email
        }
    }), 201

@auth_bp.route('/api/login', methods=["POST"])
def login():
    data = request.get_json()
    print("Received payload:", data)  # Debug line 1

    if not data:
        return jsonify({
            "error": "No input data provided"
        }), 400
    if not isinstance(data, dict):
        return jsonify({
            "error": "Invalid input data format"
        }), 400

    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({
            "error": "Email and password are required"
        }), 400

    email = email.strip().lower()
    user = User.query.filter_by(email=email).first()
    print("Found user in DB:", user)

    if not user:
        return jsonify({
            "error": "Invalid email or password"
        }), 401
    if not user.check_password(password):
        return jsonify({
            "error": "Invalid email or password"
        }), 401

    access_token = create_access_token(identity=str(user.id))

    return jsonify({
        "message": "Login successful",
        "access_token": access_token,
        "user": {
            "id": user.id,
            "username": user.username,
            "email": user.email
        }
    }), 200




@auth_bp.route('/api/me', methods=["GET"])
@jwt_required()
def me():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)

    if not user:
        return jsonify({"error": "User not found"}), 404

    return jsonify({
        "id": user.id,
        "username": user.username,
        "email": user.email
    }), 200

@auth_bp.route('/api/settings', methods=["GET"])
@jwt_required()
def get_settings():
    current_user_id = get_jwt_identity()
    user = db.session.get(User, int(current_user_id))

    if not user:
        return jsonify({"error": "User not found"}), 404

    return jsonify({
        "username": user.username,
        "email": user.email,
        "notification_enabled": user.notification_enabled
    }), 200

@auth_bp.route('/api/settings', methods=["PUT"])
@jwt_required()
def update_settings():
    current_user_id = get_jwt_identity()
    user = db.session.get(User, int(current_user_id))

    if not user:
        return jsonify({"error": "User not found"}), 404

    data = request.get_json()

    if not isinstance(data, dict):
        return jsonify({"error": "Invalid input data format"}), 400

    username = data.get("username")
    email = data.get("email")
    notification_enabled = data.get("notification_enabled")

    if not username or not email:
        return jsonify({"error": "Username and email are required"}), 400

    user.username = username.strip()
    user.email = email.strip().lower()

    if not username:
        return jsonify({"error": "Username cannot be empty"}), 400

    email_pattern = r"^[\w\.-]+@[\w\.-]+\.\w+$"
    if not re.fullmatch(email_pattern, user.email):
        return jsonify({"error": "Invalid email format"}), 400

    if not isinstance(notification_enabled, bool):
        return jsonify({"error": "notification_enabled must be a boolean"}), 400

    existing_user = User.query.filter(
        User.email == user.email, 
        User.id != user.id
    ).first()

    if existing_user:
        return jsonify({"error": "Username already exists"}), 400

    existing_email = User.query.filter(
        User.email == user.email, 
        User.id != user.id
    ).first()

    if existing_email:
        return jsonify({"error": "Email already exists"}), 400

    user.username = username
    user.email = email
    user.notification_enabled = notification_enabled

    db.session.commit()

    return jsonify({
        "message": "Settings updated successfully",
        "user": {
            "username": user.username,
            "email": user.email,
            "notification_enabled": user.notification_enabled
        }
    }), 200
