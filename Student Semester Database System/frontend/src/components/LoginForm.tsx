import { useState } from 'react';
import axios from '../api/axios';
import './LoginForm.css';

const LoginForm = ({ onLogin }: { onLogin: () => void }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  interface LoginResponse {
    token: string;
  }

  const handleLogin = async () => {
    let hasError = false;

    if (!username.trim()) {
      setUsernameError('Username is required');
      hasError = true;
    } else {
      setUsernameError('');
    }

    if (!password.trim()) {
      setPasswordError('Password is required');
      hasError = true;
    } else {
      setPasswordError('');
    }

    if (hasError) return;

    try {
      const res = await axios.post<LoginResponse>('/loginUser', { username, password });
      console.log("Login success, token:", res.data.token); 

      localStorage.setItem('token', res.data.token);
      setError(false);
      onLogin();
    } catch (err) {
      setError(true);
    }
  };

  return (
    <div className="login-gradient-bg">
      <div className="login-form-card">
        <h1 className="login-heading">Login</h1>

        <div className="login-input-wrapper">
          <input
            className="login-input"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {usernameError && <span className="error-text">{usernameError}</span>}
                  {error && <span className="error-text auth-error">Invalid username or password</span>}

        </div>

        <div className="login-input-wrapper">
          <input
            className="login-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {passwordError && <span className="error-text">{passwordError}</span>}
        </div>


        <button className="login-button" onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
};

export default LoginForm;
