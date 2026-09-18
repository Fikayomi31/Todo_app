import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import DashboardLayout from "./components/layout/DashboardLayout";
import Login from "./pages/Login";
//import Register from "./pages/Register";
import Tasks from "./pages/Tasks";
import Pending from "./pages/Pending";
import Completed from "./pages/Completed";
import Settings from "./pages/Settings";
import ProtectedRoute from "./routes/ProtectedRoute";
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/tasks" element={<ProtectedRoute><Tasks /></ProtectedRoute>} />
      <Route path="/pending" element={<ProtectedRoute><Pending /></ProtectedRoute>} />
      <Route path="/completed" element={<ProtectedRoute><Completed /></ProtectedRoute>} />
      <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;