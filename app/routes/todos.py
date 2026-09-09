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

@todos_bp.route("/", methods=["GET"])
@jwt_required_user()
def get_todos(user):
    todos = Todo.query.filter_by(user_id=user.id).all()

    return jsonify({
        "count": len(todos),
        "todos": [{
                "id": todo.id,
                "title": todo.title,
                "description": todo.description,
                "completed": todo.completed,
                "user_id": todo.user_id,
                "created_at": todo.created_at.isoformat(),
                "updated_at": todo.updated_at.isoformat()
            }
            for todo in todos
        ]
    }), 200

@todos_bp.route("/<int:todo_id>", methods=["GET"])
@jwt_required_user()
def get_todo(user, todo_id):
    todo = Todo.query.filter_by(id=todo_id, user_id=user.id).first()

    if not todo:
        return jsonify({"error": "Todo not found"}), 404

    return jsonify({
        "todo": {
            "id": todo.id,
            "title": todo.title,
            "description": todo.description,
            "completed": todo.completed,
            "user_id": todo.user_id,
            "created_at": todo.created_at.isoformat(),
            "updated_at": todo.updated_at.isoformat()
        }
    }), 200

@todos_bp.route("/<int:todo_id>", methods=["PUT"])
@jwt_required_user()
def update_todo(user, todo_id):
    todo = Todo.query.filter_by(id=todo_id, user_id=user.id).first()

    if not todo:
        return jsonify({"error": "Todo not found"}), 404

    data = request.get_json()

    if not data:
        return jsonify({"error": "No input data provided"}), 400

    if "title" in data:
        title = data["title"]

        if not isinstance(title, str):
            return jsonify({"error": "Title must be a string"}), 400
        title = title.strip()

        if not title:
            return jsonify({"error": "Title cannot be empty"}), 400

        todo.title = title
    if "description" in data:
        description = data["description"]

        if not isinstance(description, str):
            return jsonify({"error": "Description must be a string"}), 400

        todo.description = description

    db.session.commit()

    return jsonify({
        "message": "Todo updated successfully",
        "todo": {
            "id": todo.id,
            "title": todo.title,
            "description": todo.description,
            "completed": todo.completed,
            "user_id": todo.user_id,
            "created_at": todo.created_at.isoformat(),
            "updated_at": todo.updated_at.isoformat()
        }
    }), 200

@todos_bp.route("/<int:todo_id>", methods=["DELETE"])
@jwt_required_user()
def delete_todo(user, todo_id):
    todo = Todo.query.filter_by(id=todo_id, user_id=user.id).first()

    if not todo:
        return jsonify(
            {"error": "Todo not found"}
        ), 404

    db.session.delete(todo)
    db.session.commit()

    return jsonify({"message": "Todo deleted successfully"}), 200
