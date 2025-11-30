

import React from 'react'
import '../css/Events_complete.css'

function Events_complete() {
  return (
    <div className='Events_complete_main_container'>

      {/* Banner */}
      <div className='Events_complete_banner_container'>
        <h1>Events Completed</h1>
      </div>

      {/* Filter + Events */}

      <div className='Events_complete_content'>

            {/* For Mobile Dropdown Filter */}
            <div className='Events_complete_filter_container'>
                <h4>Filter</h4>
                <button>Upcoming</button>
                <button className="active">Completed</button>
            </div>

              {/* Mobile dropdown filter (visible only 300px–600px) */}
              <div className="mobile-filter-dropdown">
                <select>
                  <option  selected>Filter</option>
                  <option value="completed" >Completed</option>
                  <option value="upcoming">Upcoming</option>
                </select>
              </div>



            {/* Event Cards */}
            <div className='Events_complete_body_container'>

              <div className='event-complete-card'>
                <img src="/images/Event_upcome_1.jpg" alt="Event_complete_image" />

                <div className='event-complete-info'>
                  <h4>KFF Singapore open in 2023</h4>
                  <p className="event-place">📍 court 1, Seng kang, singapore</p>
                  <div >
                    <p className="event-date">Start Date <span>31-Jan-2024, 02:00 PM</span></p>
                    <p className="event-date">End Date&nbsp;  <span> 31-Jan-2024, 02:00 PM</span></p>
                  </div>
                  <button>Completed</button>
                </div>
              </div>

              <div className='event-complete-card'>
                <img src="/images/Event_upcome_1.jpg" alt="Event_upcome_image" />
                <div className='event-complete-info'>
                  <h4>KFF Singapore open in 2023</h4>
                  <p className="event-place">📍 court 1, Seng kang, singapore</p>
                  <div>
                    <p className="event-date">Start Date <span>31-Jan-2024, 02:00 PM</span></p>
                    <p className="event-date">End Date&nbsp;  <span> 31-Jan-2024, 02:00 PM</span></p>
                  </div>
                  <button>Completed</button>
                </div>
              </div>

              <div className='event-complete-card'>
                <img src="/images/Event_upcome_1.jpg" alt="Event_upcome_image" />
                <div className='event-complete-info'>
                  <h4>KFF Singapore open in 2023</h4>
                  <p className="event-place">📍 court 1, Seng kang, singapore</p>
                  <div>
                    <p className="event-date">Start Date <span>31-Jan-2024, 02:00 PM</span></p>
                    <p className="event-date">End Date&nbsp;  <span> 31-Jan-2024, 02:00 PM</span></p>
                  </div>
                  <button>Completed</button>
                </div>
              </div>

              <div className='event-complete-card'>
                <img src="/images/Event_upcome_1.jpg" alt="Event_upcome_image" />
                <div className='event-complete-info'>
                  <h4>KFF Singapore open in 2023</h4>
                  <p className="event-place">📍 court 1, Seng kang, singapore</p>
                  <div>
                    <p className="event-date">Start Date <span>31-Jan-2024, 02:00 PM</span></p>
                    <p className="event-date">End Date&nbsp;  <span> 31-Jan-2024, 02:00 PM</span></p>
                  </div>
                  <button >Completed</button>
                </div>
              </div>
          
        </div>
      </div>

          
          
    </div>
      
  )
}

export default Events_complete




