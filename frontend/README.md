# TaskFlow — Frontend

TaskFlow is a modern task management application built with React and Vite. The frontend provides an intuitive interface for managing personal tasks, tracking completed and pending work, and managing account settings.

The frontend communicates with the TaskFlow Flask REST API for authentication, task management, and user settings.

## Features

* User registration and login
* JWT-based authentication
* Protected application routes
* Dashboard
* Create tasks
* Edit tasks
* Delete tasks
* View all tasks
* View pending tasks
* View completed tasks
* User profile
* Account settings
* Update username and email
* Notification preference management
* Responsive sidebar navigation
* Mobile-friendly layout
* Loading, error, and success states
* Persistent authentication using local storage

## Tech Stack

* **React**
* **Vite**
* **React Router**
* **Zustand** — application state management
* **Axios** — API communication
* **Tailwind CSS** — styling
* **Lucide React** — icons
* **JavaScript (ES6+)**

## Project Structure

```text
frontend/
├── public/
├── src/
│   ├── assets/
│   │   ├── hero.png
│   │   ├── react.svg
│   │   └── vite.svg
│   │
│   ├── components/
│   │   ├── common/
│   │   │   └── PasswordInput.jsx
│   │   ├── dashboard/
│   │   ├── layout/
│   │   │   ├── DashboardLayout.jsx
│   │   │   ├── MobileHeader.jsx
│   │   │   └── Sidebar.jsx
│   │   └── todos/
│   │       ├── DeleteModal.jsx
│   │       ├── TodoCard.jsx
│   │       └── TodoModal.jsx
│   │
│   ├── hooks/
│   │   └── useTodos.js
│   │
│   ├── pages/
│   │   ├── Completed.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Login.jsx
│   │   ├── Pending.jsx
│   │   ├── Profile.jsx
│   │   ├── Register.jsx
│   │   ├── Settings.jsx
│   │   └── Tasks.jsx
│   │
│   ├── routes/
│   │   └── ProtectedRoute.jsx
│   │
│   ├── services/
│   │   ├── api.js
│   │   ├── settingsService.js
│   │   └── todoService.js
│   │
│   ├── store/
│   │   └── authStore.js
│   │
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
│
├── package.json
├── package-lock.json
└── README.md
```

## Getting Started

### Prerequisites

Make sure you have the following installed:

* Node.js
* npm
* Git

You can verify your installation with:

```bash
node --version
npm --version
```

### Installation

Clone the repository:

```bash
git clone <your-repository-url>
```

Navigate to the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

### Environment Configuration

The frontend communicates with the Flask backend.

The current development API configuration uses:

```text
http://localhost:5000/api/
```

This is configured in:

```text
src/services/api.js
```

For production, the API URL should be moved to an environment variable rather than keeping the development URL directly in the source code.

### Running the Development Server

Start the Vite development server:

```bash
npm run dev
```

The application will normally be available at:

```text
http://localhost:5173
```

## Authentication

TaskFlow uses JWT authentication.

After successful login, the frontend stores the access token and user information in `localStorage`.

The Axios API client automatically attaches the token to authenticated requests:

```text
Authorization: Bearer <access_token>
```

Protected routes are handled through:

```text
src/routes/ProtectedRoute.jsx
```

Authentication state is managed through Zustand:

```text
src/store/authStore.js
```

## API Services

API communication is separated into service modules.

### Authentication

Authentication requests are handled through the authentication store.

### Todos

Todo API requests are handled by:

```text
src/services/todoService.js
```

The frontend communicates with endpoints for:

* Creating todos
* Getting todos
* Updating todos
* Deleting todos

### Settings

Account settings requests are handled through:

```text
src/services/settingsService.js
```

The frontend communicates with:

```text
GET /api/settings
PUT /api/settings
```

## Application Routes

| Route        | Description       | Authentication |
| ------------ | ----------------- | -------------- |
| `/login`     | User login        | Public         |
| `/register`  | User registration | Public         |
| `/dashboard` | Main dashboard    | Protected      |
| `/tasks`     | User tasks        | Protected      |
| `/pending`   | Pending tasks     | Protected      |
| `/completed` | Completed tasks   | Protected      |
| `/profile`   | User profile      | Protected      |
| `/settings`  | Account settings  | Protected      |

## Production Build

Create a production build with:

```bash
npm run build
```

The production files will be generated in:

```text
dist/
```

To preview the production build locally:

```bash
npm run preview
```

## Development Notes

During development, the frontend expects the Flask backend to be running separately.

Typical development setup:

```text
React/Vite
localhost:5173
       │
       │ HTTP / REST API
       ▼
Flask API
localhost:5000
```

## Future Improvements

Potential future improvements include:

* Environment-based API configuration
* Password change functionality
* Password reset functionality
* Improved notification preferences
* Task search and filtering
* Task categories and priorities
* Due dates and reminders
* Pagination
* Dark mode
* Production deployment

## License

This project is currently intended as a personal/portfolio project.
