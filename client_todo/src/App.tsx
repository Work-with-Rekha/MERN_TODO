import { Route, Routes } from "react-router-dom";
import Todo from "./pages/Todo";
import "./App.css";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { ProtectedRoute } from "./components/ProtectedRoute";

const App = () => {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Todo />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default App;
