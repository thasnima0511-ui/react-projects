import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout'; // 
// import { Home } from './components/Home';
import { Home } from './components/Home';
import { Login } from './components/Login';
// import { Register } from './components/Register';
import { Topbar } from './components/Topbar';
import OtpVerify  from './components/OtpVerify';

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<Register />} /> */}
   <Route path="/" element={<Login />} />
        <Route element={<Layout />}>
                <Route path="/ihuy" element={<Login />} />

          <Route path="/home" element={<><Topbar /><Home /></>} />
          {/* <Route path="/" element={<OtpVerify />} /> */}
        {/* <Route path="/create-password" element={<CreatePassword />} /> */}
                {/* <Route path="/" element={<CreatePassword />} /> */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
