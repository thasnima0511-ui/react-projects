import React from 'react';
import { FaPhoneAlt, FaFacebookF, FaInstagram, FaTwitter, FaYoutube ,FaBars} from 'react-icons/fa';
import { HiOutlineClock } from 'react-icons/hi';
import '../css/Topbar.css'; 
import { useState } from 'react';

export const Topbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='topbar-main-container'>
    <div className="topbar-topbar">
      <div className="topbar-left">
       
        <span className="topbar-time"> <HiOutlineClock className="topbar-icon1" /><span className="topbar-time3">Sun - Sat<span className="topbar-time3-inner"> : 04.00 AM - 12.00 AM</span></span></span>
      </div>
      <div className="topbar-right">
       <div className="topbar-right-innerleft">
        <span className='topbar-span1'><FaPhoneAlt className="topbar-icon topbar-social0" />
        <span className='topbar-number'>+968 99748814</span></span>
        </div>
         <div className="topbar-right-innerright">
        <FaFacebookF className="topbar-icon topbar-social1" />
        <FaInstagram className="topbar-icon topbar-social2" />
        <FaTwitter className="topbar-icon topbar-social3" />
        <FaYoutube className="topbar-icon topbar-social4" />
        </div>
      </div>
    </div>
      <div className="topbar-header">
          <div className="topbar-logo">
            <img src="images/logo.png" alt="Logo" />
          </div>
           <div className="topbar-profile">
          <nav className="topbar-navbar">
            <a href="#" className="topbar-active">HOME</a>
            <a href="#">&nbsp;&nbsp;&nbsp;&nbsp;ABOUT</a>
            <a href="#">&nbsp;&nbsp;&nbsp;&nbsp;TRAINING</a>
            <a href="#">&nbsp;&nbsp;&nbsp;&nbsp;BOOKING</a>
            <a href="#">&nbsp;&nbsp;&nbsp;&nbsp;EVENTS</a>
            <a href="#">&nbsp;&nbsp;&nbsp;&nbsp;CONTACT</a>
            
          </nav>
            
         </div>
        
         <div className="topbar-profile-container">
         <a className="topbar-span3">|</a>
         <div className='topbar-judt-profile'>
          
            <span className="topbar-span2"><a>Rose&nbsp;</a></span>
          
            <img src="images/profile.png" alt="Profile" className='topbar-img1'/>
              <img src="images/iconamoon_arrow-up-2-light.png" alt="Logo" className='topbar-img2'/>
              </div>
             {/* <FaBars size={20} className='topbar-fabars'/> */}
          </div>
           <div className="topbar-profile-container1">
             <div className="topbar-profile-container1-inner1 topbar-dropdown">
            {/* <a>More</a> */}

               <a onClick={toggleDropdown}  href="#" className="topbar-dropdown-toggle">More</a>
      {isOpen && (
        <div className="topbar-dropdown-menu">
          <a href="#" onClick={() => setIsOpen(false)}>HOME</a>
          <a href="#" onClick={() => setIsOpen(false)}>ABOUT</a>
          <a href="#" onClick={() => setIsOpen(false)}>TRAINING</a>
          <a href="#" onClick={() => setIsOpen(false)}>BOOKING</a>
          <a href="#" onClick={() => setIsOpen(false)}>EVENTS</a>
          <a href="#" onClick={() => setIsOpen(false)}>CONTACT</a>
        </div>
      )}

            {/* end */}
             </div>
              <div>
              <a className="topbar-span3">|</a>
              </div>
            <div className="topbar-container-profile">
            <span className="topbar-span2">Rose&nbsp;&nbsp;</span>
            <img src="images/profile.png" alt="Profile" className='topbar-img1'/>
              <img src="images/iconamoon_arrow-up-2-light.png" alt="Logo" className='topbar-img2'/>
              </div>
             
             
          </div>
        </div>
    </div>
  );
};
