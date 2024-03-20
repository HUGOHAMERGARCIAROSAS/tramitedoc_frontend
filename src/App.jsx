import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./components/auth/Login";

import AuthState from "./context/autenticacion/authState";
import AlertaState from "./context/alertas/alertaState";
import Dashboard from "./components/Dashboard";
import ProtectedRoute from "./util/ProtectedRoute";

function App() {
  return (
    <AlertaState>
      <AuthState>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route  element={<ProtectedRoute />} >
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
          </Routes>
        </Router>
      </AuthState>
    </AlertaState>
  );
}

export default App;
