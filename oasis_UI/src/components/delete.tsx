import "../css/OtpVerify.css"
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";

function OtpVerify() {
  const [email, setEmail] = useState("");
   useEffect(() => {
    setEmail("Jhon@gmail.com");
  }, []);
  const [otp, setOtp] = useState("");
    const navigate = useNavigate();
   const [otpn, setOtpn] = useState("1234");
       const handleVerify = () => {
      
   
    if(otp==otpn)
    {
         navigate("/create-password");
    }
    
    else{
            alert(`Re-Enter OTP`);
    }
  };
  return (
    <div className="otp-outer-container">
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap');
');`}
      </style>

    <div className="otp-main-container">
             <div className="otp-container">
              <div className="otp-inner">
              <div className="otp-title">
                   <h1 className="otp-heading">OTP Verification</h1>
                   </div>
                   <div className="otp-split">
                   <div className="otp-content">
                    <p className="otp-msg">We will send you a one time password</p>
                        <p className="otp-msg">on</p>
                             <p className="otp-msg">this Mail ID</p>
                                 <p className="otp-msg">{email}</p>
                   <div className="otp-input-box">
                            <input type="number" className="otp-input" placeholder="0000" value={otp}
                           onChange={e => setOtp(e.target.value)} required/>
                            <br></br>
                             <button className="otp-button" onClick={handleVerify}>Verify</button>
                     </div>
                     </div>
              
               <div className="otp-other-content">
        
                          <img className="otp-image" src="./images/otp.png"></img>
               </div>
                </div>
               </div>
               </div>
        </div>
      </div>
  );
}

export default OtpVerify;
// 8/6/2025
