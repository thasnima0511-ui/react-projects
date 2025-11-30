import { useState } from "react";
import "../css/Login.css";
import users from "./credential";
import { useNavigate } from "react-router-dom";


export function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const navigate = useNavigate();


  const handleLogin = () => {
    if (!email.includes("@")) {
      setAlertMessage("Please enter a valid email address.");
      return;
    }

    const userFound = users.find(
      (user) => user.email === email && user.password === password
    );

    if (userFound) {
      setAlertMessage("Login successful!");
      setTimeout(() => navigate("/home"), 1000); 

    } else {
      setAlertMessage("Invalid email or password.");
    }
  };

  const closeAlert = () => {
    setAlertMessage(null);
  };

  return (
    <div className="page-container">
      <style>
        {`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap');
');`}
      </style>
      <div className="page-wrapper">
        <div className="login-wrapper">
          <div className="login-container">
            <h1 className="login-title">Login</h1>
            <div className="login-form">
              <input
                type="email"
                placeholder="Email"
                className="input-field"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="password-container">
                <input
                  type="password"
                  placeholder="Password"
                  className="input-field"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <a href="#" className="forgot-password">
                Forgot Password
              </a>
              <button className="login-button" onClick={handleLogin}>
                Login
              </button>
              <p className="register-link">
                Don't have an account? <a href="#">Register</a>
              </p>
            </div>
          </div>
          <div className="image-container">
            <img src="images/pana.png" alt="turf-image" />
          </div>
        </div>
      </div>

      {alertMessage && (
        <div className="custom-alert-overlay">
          <div className="custom-alert-box">
            <p>{alertMessage}</p>
            <button onClick={closeAlert}>Close</button>
          </div>
        </div>
      )}
     </div>
  );
}
