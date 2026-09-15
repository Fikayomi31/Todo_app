import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function Login() {
  return <h1>Login</h1>
}

function Register() {
  return <h1>Register</h1>
}

function Dashboard() {
  return <h1>Dashboard</h1>
}

function Tasks() {
  return <h1>Tasks</h1>
}

function Profile() {
  return <h1>Profile</h1>
}

function Settings() {
  return <h1>Settings</h1>
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />


        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;