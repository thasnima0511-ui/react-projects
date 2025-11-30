import React from 'react'
import '../css/Events_upcoming.css'


function Events_upcoming() {
  return (
    <div className='Events_upcoming_main_container'>

      {/* Banner */}
      <div className='Events_upcoming_banner_container'>
        <img src="/images/banner1.png" alt="Event_image" />
        <h1>Events Upcoming</h1>     
      </div>

      {/* Filter + Events */}
      <div className='Events_upcoming_content'>

        {/* Filter Buttons */}
        <div className='Events_upcoming_filter_container'>
          {/* Visible only on large screens (above 600px) */}
          <div className="filter-desktop">
            <h4>Filter</h4>
            <button className="active">Upcoming</button>
            <button>Completed</button>
          </div>

          {/* Visible only on small screens (300px–600px) */}
          <div className="filter-mobile">
            <select>
                  <option  selected>Filter</option>
                  <option value="completed" >Completed</option>
                  <option value="upcoming">Upcoming</option>
                </select>
          </div>
        </div>


        {/* Event Cards */}
        <div className='Events_upcoming_body_container_cards'>

          <div className='Events_upcoming_first_four_cards'>

              <div className='event-card'>
                <img src="/images/Event_upcome_1.jpg" alt="Event_upcome_image" />
                <div className='event-info'>
                  <h4>KFF Singapore open in 2023</h4>
                  <p>📍 court 1, Seng kang, singapore</p>
                  <p>Start Date <span>31-Jan-2024, 02:00 PM</span></p>
                  <p className="nowrap">End Date &nbsp;&nbsp;<span>31-Jan-2024, 02:00 PM</span></p>
                </div>
              </div>

              <div className='event-card'>
                <img src="/images/Event_upcome_2.png" alt="Event_upcome_image" />
                <div className='event-info'>
                  <h4>KFF Singapore open in 2023</h4>
                  <p>📍 court 1, Seng kang, singapore</p>
                  <p>Start Date <span>31-Jan-2024, 02:00 PM</span></p>
                  <p className="nowrap">End Date&nbsp;&nbsp; <span>31-Jan-2024, 02:00 PM</span></p>
                </div>
              </div>

              <div className='event-card'>
                <img src="/images/Event_upcome_3.jpg" alt="Event_upcome_image" />
                <div className='event-info'>
                  <h4>KFF Singapore open in 2023</h4>
                  <p>📍 court 1, Seng kang, singapore</p>
                  <p>Start Date <span>31-Jan-2024, 02:00 PM</span></p>
                  <p>End Date&nbsp;&nbsp; <span>31-Jan-2024, 02:00 PM</span></p>
                </div>
              </div>

              <div className='event-card'>
                <img src="/images/Event_upcome_4.png" alt="Event_upcome_image" />
                <div className='event-info'>
                  <h4>KFF Singapore open in 2023</h4>
                  <p>📍 court 1, Seng kang, singapore</p>
                  <p>Start Date <span>31-Jan-2024, 02:00 PM</span></p>
                  <p>End Date&nbsp;&nbsp; <span>31-Jan-2024, 02:00 PM</span></p>
                </div>
            </div>
          </div>
          
        
      

          {/* Booked Section */}
          <div className='Booked_container'>
            <h3>Booked</h3>
            <div className="booked-grid">
              <div className="event-card">
                <img src="/images/Event_upcome_1.jpg" alt="Event_upcome_image" /> 
                <div className='event-info'>
                  <h4>KFF Singapore open in 2023</h4>
                  <p>📍 court 1, Seng kang, singapore</p>
                  <p>Start Date <span>31-Jan-2024, 02:00 PM</span></p>
                  <p>End Date&nbsp;&nbsp; <span>31-Jan-2024, 02:00 PM</span></p>
                </div>
              </div>

              <div className='event-card'>
                <img src="/images/Event_upcome_1.jpg" alt="Event_upcome_image" />
                <div className='event-info'>
                  <h4>KFF Singapore open in 2023</h4>
                  <p>📍 court 1, Seng kang, singapore</p>
                  <p>Start Date <span>31-Jan-2024, 02:00 PM</span></p>
                  <p>End Date&nbsp;&nbsp; <span>31-Jan-2024, 02:00 PM</span></p>
                </div>
              </div>

              <div className='event-card'>
                <img src="/images/Event_upcome_1.jpg" alt="Event_upcome_image" />
                <div className='event-info'>
                  <h4>KFF Singapore open in 2023</h4>
                  <p>📍 court 1, Seng kang, singapore</p>
                  <p>Start Date <span>31-Jan-2024, 02:00 PM</span></p>
                  <p>End Date&nbsp;&nbsp; <span>31-Jan-2024, 02:00 PM</span></p>
                </div>
              </div>

              <div className='event-card'>
                <img src="/images/Event_upcome_1.jpg" alt="Event_upcome_image" />
                <div className='event-info'>
                  <h4>KFF Singapore open in 2023</h4>
                  <p>📍 court 1, Seng kang, singapore</p>
                  <p>Start Date <span>31-Jan-2024, 02:00 PM</span></p>
                  <p>End Date&nbsp;&nbsp; <span>31-Jan-2024, 02:00 PM</span></p>
                </div>
              </div>
            </div> 
            </div>
          </div>
        </div>
      </div>
  )
}

export default Events_upcoming 
