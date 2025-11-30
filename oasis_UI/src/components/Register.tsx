import React, {useState} from 'react';
import "../css/Register.css";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [users, setUsers] = useState<{ email: string; password: string }[]>([]);
  
  const navigate = useNavigate();
  const handleRegister= ()=>{
    if (!email || !password || !confirmPassword ) {
      alert("Please fill all the fields")
      return
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match")
      return 
    }

    const userExists = users.find((user:any)=>user.email === email)
    if (userExists){
      alert("Email already registered")
      return
    }

    const newUser = { email, password };
    setUsers((prevUsers) => [...prevUsers, newUser]);  

    alert("Registration Successful")
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    
    navigate("/login");

  }

  
  return (
    <div className='Register-Parent'>
      <div className="Register-page-container">
          <div className="Register-form-section">
            <h1>Register</h1>
            <div className='Register-input'>
              <input 
                type="email" 
                name='email' 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='    email' 
                required
              />
              <input 
                type="password" 
                name='password' 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='    Password' 
                required
              />
              <input 
                type="password" 
                name='con_password' 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder='    Confirm Password' 
                required
              />
              <button onClick={handleRegister}>Register</button>
            </div>
            
            

            <p>Already a member?<Link to="/login">Login</Link></p>
          </div>

          <div className="Register-image-section">
            <img src="/images/register.png"  alt="register image" />
          </div>
      
      </div>
    </div>

   
  )
}

export default Register