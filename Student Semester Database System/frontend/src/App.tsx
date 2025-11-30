// src/App.tsx
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import LoginForm from './components/LoginForm';
import Dashboard from './pages/Dashboard';
import AddStudent from './pages/AddStudent';
import Assessment from './pages/assessment';
import EditStudent from './pages/EditStudent'; 

import './App.css';

function App() {
  const [loggedIn, setLoggedIn] = useState(() => !!localStorage.getItem('token'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    setLoggedIn(false);
  };

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route
            path="/"
            element={
              loggedIn ? (
                <Dashboard onLogout={handleLogout} />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/add"
            element={
              loggedIn ? <AddStudent /> : <Navigate to="/login" replace />
            }
          />
          <Route
            path="/assessment"
            element={
              loggedIn ? <Assessment /> : <Navigate to="/login" replace />
            }
          />
          <Route
            path="/edit/:rollno"
            element={
              loggedIn ? <EditStudent /> : <Navigate to="/login" replace />
            }
          />
          <Route
            path="/login"
            element={
              loggedIn ? (
                <Navigate to="/" replace />
              ) : (
                <LoginForm onLogin={() => setLoggedIn(true)} />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
