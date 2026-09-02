import pytest

from app import create_app
from app.extensions import db
from app.models import User
from app.models import Todo

@pytest.fixture
def app():
    app = create_app()

    app.config.update(TESTING=True, SQLALCHEMY_DATABASE_URI="sqlite:///:memory:",)
    with app.app_context():
        db.drop_all()
        db.create_all()
        yield app

        db.session.remove()
        db.drop_all()

    @pytest.fixture
    def client(app):
        return app.test_client()

    def test_create_user(app):
        with app.app_context():
            user = User(
                username="testuser",
                email="email@gmail.com"
            )
            user.set_password("password1234")

            db.session.add(user)
            db.session.commit()

            saved_user = User.query.filter_by(username="testuser").first()

            assert saved_user is not None
            assert saved_user.username == "testuser"
            assert saved_user.email == "email@gmail.com"

        def test_password_hashing(app):
            with app.app_context():
                user = User(
                    username="testuser",
                    email="email@gmail.com"
                )

                user.set_password("password1234")
                assert user.password_hash != "password1234"
                assert user.check_password("password1234") is True
                assert user.check_password("wrongpassword") is False


def test_create_todo_for_user(app):
    with app.app_context():
        user = User(
            username="testuser",
            email="email@gmail.com"
        )
        user.set_password("password1234")

         
        db.session.add(user)
        db.session.commit()

        todo = Todo(
            title="Test Todo",
            description="This is a test todo item.",
            user_id=user.id
        )
        db.session.add(todo)
        db.session.commit()

        saved_todo = Todo.query.filter_by(title="Test Todo").first()
        assert saved_todo is not None
        assert saved_todo.title == "Test Todo"
        assert saved_todo.description == "This is a test todo item."
        assert saved_todo.user_id == user.id

    def test_user_has_many_todos(app):
        with app.app_context():
            user = User(
                username="testuser",
                email="email@gmail.com"
            )
            user.set_password("password1234")
             
            db.session.add(user)
            db.session.commit()

            todo1 = Todo(
                title="Test Todo 1",
                description="This is the first test todo item.",
                user_id=user.id
            )
            todo2 = Todo(
                title="Test Todo 2",
                description="This is the second test todo item.",
                user_id=user.id
            )
            db.session.add_all([todo1, todo2])
            db.session.commit()

            assert len(user.todos) == 2
            assert todo1.user == user
            assert todo2.user == user
