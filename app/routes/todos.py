from flask import Blueprint, request, jsonify

from app.extensions import db
from app.models.todo import Todo
from app.utils.auth import jwt_required_user

todos_bp = Blueprint("todos", __name__, url_prefix="/api/todos")


@todos_bp.route("/", methods=["POST"])
@jwt_required_user()
def create_todo(user):
    data = request.get_json()

    if not data:
        return jsonify({"error": "No input data provided"}), 400

    title = data.get("title")
    description = data.get("description")

    if not title:
        return jsonify({"error": "Title is required"}), 400
    
    title = title.strip()

    if not title:
        return jsonify({"error": "Title cannot be empty"}), 400


    todo = Todo(title=title, description=description, user=user)

    db.session.add(todo)
    db.session.commit()

    return jsonify({
        "message": "Todo created successfully",
        "todo": {
            "id": todo.id,
            "title": todo.title,
            "description": todo.description,
            "completed": todo.completed,
            "user_id": todo.user_id,
            "created_at": todo.created_at.isoformat(),
            "updated_at": todo.updated_at.isoformat()
        }
    }), 201

    