import React, { useState } from 'react';
import "../css/Profile.css";
import "../css/Profile_edit.css";
// import { Topbar } from './Topbar';
import { useNavigate } from "react-router-dom";

type ProfileProps = {
  isEditing: boolean;
};

function Profile({ isEditing }: ProfileProps) {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    mobile: "9876543210",
    street: "-",
    state: "-",
    city: "-",
    zip: "-"
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    // Add your save logic here
    navigate("/profile");
  };

  const handleCancel = () => {
    navigate("/profile");
  };

  return (
    // <div>
    //   <Topbar />

      <div className={`Profile-Container ${isEditing ? 'Profile-edit-mode' : ''}`}>
        <div className='Profile-Banner'>

          {!isEditing ? (
            <button className='Profile-EditButton' onClick={() => navigate("/profile/edit")}>
              Edit Profile
            </button>
          ) : (
            <div className='Profile-EditControls'>
              <button className="Profile-SaveBtn" onClick={handleSave}>Save</button>
              <button className="Profile-CancelBtn" onClick={handleCancel}>Cancel</button>
            </div>
          )}
        </div>

        <div className="Profile-ImageSection">
          <img src="/images/profile.png" alt="Profile" className="Profile-Image" />
          {isEditing && (
            <div className="Profile-ImageActions">
              <button className="Profile-UploadBtn">Upload Profile</button>
              <button className="Profile-RemoveBtn">Remove</button>
            </div>
          )}
        </div>

        <div className='Profile-DetailsSection'>
          <h2 className="Profile-Heading">Contact Information</h2>

          <div className='Profile-DetailsBox'>
            <div className="Profile-DetailsRow">
              <div className="Profile-DetailItem">
                <label htmlFor="mobile" className="Profile-Label">Mobile Number:</label>
                {isEditing ? (
                  <input
                    type="text"
                    id="mobile"
                    name="mobile"
                    value={user.mobile}
                    onChange={handleInputChange}
                    className="Profile-Input"
                  />
                ) : (
                  <span className="Profile-Value">{user.mobile}</span>
                )}
              </div>

              <div className="Profile-DetailItem">
                <label htmlFor="street" className="Profile-Label">Street:</label>
                {isEditing ? (
                  <input
                    type="text"
                    id="street"
                    name="street"
                    value={user.street}
                    onChange={handleInputChange}
                    className="Profile-Input"
                  />
                ) : (
                  <span className="Profile-Value">{user.street}</span>
                )}
              </div>

              <div className="Profile-DetailItem">
                <label htmlFor="state" className="Profile-Label">State:</label>
                {isEditing ? (
                  <input
                    type="text"
                    id="state"
                    name="state"
                    value={user.state}
                    onChange={handleInputChange}
                    className="Profile-Input"
                  />
                ) : (
                  <span className="Profile-Value">{user.state}</span>
                )}
              </div>

              <div className="Profile-DetailItem">
                <label htmlFor="city" className="Profile-Label">City:</label>
                {isEditing ? (
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={user.city}
                    onChange={handleInputChange}
                    className="Profile-Input"
                  />
                ) : (
                  <span className="Profile-Value">{user.city}</span>
                )}
              </div>
            </div>

            <div className="Profile-DetailsRow">
              <div className="Profile-DetailItem">
                <label htmlFor="zip" className="Profile-Label">Zip Code:</label>
                {isEditing ? (
                  <input
                    type="text"
                    id="zip"
                    name="zip"
                    value={user.zip}
                    onChange={handleInputChange}
                    className="Profile-Input"
                  />
                ) : (
                  <span className="Profile-Value">{user.zip}</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    // </div>
  );
}

export default Profile;
