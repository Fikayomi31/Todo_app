# TaskFlow — Backend

TaskFlow Backend is a Flask REST API that provides authentication, user management, task management, and account settings for the TaskFlow task management application.

The API uses JWT authentication to protect user-specific resources and SQLAlchemy for database access.

## Features

* User registration
* User login
* JWT authentication
* Protected API endpoints
* Current-user endpoint
* Create todos
* Retrieve todos
* Retrieve individual todos
* Update todos
* Delete todos
* User-owned task isolation
* Account settings
* Update username and email
* Notification preference management
* Password hashing
* Input validation
* CORS support
* Automated API tests

## Tech Stack

* **Python**
* **Flask**
* **Flask-SQLAlchemy**
* **Flask-JWT-Extended**
* **Flask-CORS**
* **Flask-Login**
* **Werkzeug**
* **SQLite** — development database
* **Pytest** — testing

## Project Structure

```text
backend/
├── app/
│   ├── __init__.py
│   ├── extensions.py
│   │
│   ├── models/
│   │   ├── user.py
│   │   └── todo.py
│   │
│   ├── routes/
│   │   ├── auth.py
│   │   └── todos.py
│   │
│   └── utils/
│       └── auth.py
│
├── instance/
│   └── todo.db
│
├── tests/
│   ├── test_auth.py
│   └── test_todos.py
│
├── .env
├── .gitignore
├── requirements.txt
└── README.md
```

## Getting Started

### Prerequisites

Make sure you have:

* Python 3.10+
* pip
* Git

Check your Python installation:

```bash
python --version
```

Check pip:

```bash
pip --version
```

## Installation

Clone the repository:

```bash
git clone <your-repository-url>
```

Navigate to the backend directory:

```bash
cd backend
```

### Create a Virtual Environment

Windows PowerShell:

```powershell
python -m venv venv
```

Activate the virtual environment:

```powershell
.\venv\Scripts\Activate.ps1
```

If activation is successful, your terminal should show:

```text
(venv)
```

### Install Dependencies

```powershell
pip install -r requirements.txt
```

## Environment Variables

Create a `.env` file in the backend root directory.

Example:

```env
SECRET_KEY=your-secret-key
JWT_SECRET_KEY=your-jwt-secret-key
```

Never commit your `.env` file to Git.

A production application should use strong, randomly generated secret keys.

## Database

The development version uses SQLite.

The database is located at:

```text
instance/todo.db
```

The database contains user and todo information.

Each todo belongs to a specific user through the `user_id` relationship.

## Running the API

From the backend directory:

```powershell
flask run
```

The API will normally be available at:

```text
http://localhost:5000
```

The API endpoints are exposed under:

```text
http://localhost:5000/api/
```

## Authentication

TaskFlow uses JSON Web Tokens (JWT) for authentication.

### Register

```http
POST /api/register
```

Example request:

```json
{
  "username": "testuser",
  "email": "test@example.com",
  "password": "password123"
}
```

### Login

```http
POST /api/login
```

Example request:

```json
{
  "email": "test@example.com",
  "password": "password123"
}
```

A successful login returns an access token.

Example:

```json
{
  "message": "Login successful",
  "access_token": "<jwt-token>",
  "user": {
    "id": 1,
    "username": "testuser",
    "email": "test@example.com"
  }
}
```

Protected endpoints require:

```http
Authorization: Bearer <access_token>
```

## API Endpoints

### Authentication

| Method | Endpoint        | Description      | Auth |
| ------ | --------------- | ---------------- | ---- |
| POST   | `/api/register` | Register a user  | No   |
| POST   | `/api/login`    | Login            | No   |
| GET    | `/api/me`       | Get current user | JWT  |

### Todos

| Method | Endpoint          | Description      | Auth |
| ------ | ----------------- | ---------------- | ---- |
| POST   | `/api/todos/`     | Create a todo    | JWT  |
| GET    | `/api/todos/`     | Get user's todos | JWT  |
| GET    | `/api/todos/<id>` | Get one todo     | JWT  |
| PUT    | `/api/todos/<id>` | Update a todo    | JWT  |
| DELETE | `/api/todos/<id>` | Delete a todo    | JWT  |

### Settings

| Method | Endpoint        | Description             | Auth |
| ------ | --------------- | ----------------------- | ---- |
| GET    | `/api/settings` | Get account settings    | JWT  |
| PUT    | `/api/settings` | Update account settings | JWT  |

## Data Ownership

Todos are associated with the authenticated user.

A user can only access and modify their own todos.

This prevents one authenticated user from accessing another user's task data.

## Models

### User

The `User` model contains:

* `id`
* `username`
* `email`
* `password_hash`
* `created_at`
* `is_active`
* `notifications_enabled`

Passwords are never stored as plain text. They are hashed using Werkzeug's password hashing utilities.

### Todo

The `Todo` model contains:

* `id`
* `title`
* `description`
* `completed`
* `created_at`
* `updated_at`
* `user_id`

The `user_id` field associates each todo with its owner.

## Testing

TaskFlow uses Pytest for automated testing.

Run the complete test suite:

```powershell
pytest
```

Run authentication tests:

```powershell
pytest tests/test_auth.py
```

Run todo tests:

```powershell
pytest tests/test_todos.py
```

The test suite covers authentication, validation, todo CRUD operations, and user isolation.

## CORS

The development API allows requests from the React development server:

```text
http://localhost:5173
```

This allows the React frontend and Flask backend to communicate during development.

For production, the allowed origin should be restricted to the actual deployed frontend domain.

## Development Architecture

The TaskFlow application follows a separated frontend/backend architecture:

```text
┌──────────────────────┐
│   React + Vite       │
│   localhost:5173     │
└──────────┬───────────┘
           │
           │ HTTP / JSON
           │ JWT
           ▼
┌──────────────────────┐
│   Flask REST API     │
│   localhost:5000     │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│      SQLite          │
│     todo.db          │
└──────────────────────┘
```

## Security Considerations

* Passwords are hashed before storage.
* Protected resources require JWT authentication.
* User-owned todos are isolated by authenticated user ID.
* Secret keys should be stored in environment variables.
* `.env` should not be committed to Git.
* Production deployments should disable Flask debug mode.
* Production CORS should allow only the deployed frontend domain.
* A production deployment should use a production-grade database such as PostgreSQL.

## Future Improvements

Potential improvements include:

* Password change endpoint
* Password reset functionality
* Refresh tokens
* JWT expiration handling
* PostgreSQL support
* Database migrations
* API documentation with Swagger/OpenAPI
* Rate limiting
* Pagination
* Todo filtering and searching
* Task priorities
* Due dates and reminders
* Production deployment

## License

This project is currently intended as a personal/portfolio project.

