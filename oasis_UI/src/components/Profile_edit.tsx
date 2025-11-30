import React from 'react'
import '../css/Profile_edit.css'   

function Profile_edit() {
  return (
    <div className='Profile-edit_main_container'>
        <div className='Profile-edit_top_container'>
            <div className='Profile-edit_banner_container'>
                <button className='Profile-edit_save_button'>save</button>
                <button className='Profile-edit_cancel_button'>cancel</button>
                <img src="/images/profile.png" alt="Profile" className="Profile-edit-Image" />
                    <button className='Profile-edit_upload_button'>Upload Image</button>
                    <button className='Profile-edit_remove_button'>Remove</button>
            </div>
            <div className='Profile-edit_banner_info'>
            </div>
        </div>

        <div className='Profile-edit_bottom_container'> 
            <div className='Profile-edit_bottom_title'>
                <h2 className='Profile-edit_bottom_title_text'>Contact Information </h2>
                <div className='Profile-edit_items_container'>
                    <div className='Profile-edit_items'>
                        <input type="text"  placeholder="Your Name" className='Profile-edit_input' />
                    </div>
                    <div className='Profile-edit_items'>
                        <input type="text"  placeholder="Street" className='Profile-edit_input' />
                    </div>
                    <div className='Profile-edit_items'>
                        <input type="text"  placeholder="State" className='Profile-edit_input' />
                    </div>
                    <div className='Profile-edit_items'>
                        <input type="text"  placeholder="City" className='Profile-edit_input' />
                    </div>
                    <div className='Profile-edit_items'>
                        <input type="text"  placeholder="Zip Code" className='Profile-edit_input' />
                    </div>

                </div>
            </div> 
        </div>
    </div>
  )
}

export default Profile_edit