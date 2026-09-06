import re

from flask import Blueprint, jsonify, request
from flask_login import login_required, login_user
from app.extensions import db
from app.models.user import User

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
@login_required
def login():
    data = request.get_json()

    if not data or not all(k in data for k in ("email", "password")):
        return jsonify({"error": "Email and password are required"}), 400

    user = User.query.filter_by(email=data["email"]).first()

    if not user or not user.check_password(data["password"]):
        return jsonify({"error": "Invalid email or password"}), 401

    login_user(user)

    return jsonify({
        "id": user.id,
        "username": user.username,
        "email": user.email
    }), 200
