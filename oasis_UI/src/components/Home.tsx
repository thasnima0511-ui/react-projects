import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../css/Home.css';
import { FaClock } from 'react-icons/fa';

import { HiOutlineClock } from 'react-icons/hi';
import { useState } from 'react';

type Court = {
  id: number;
  location: string;
  availableFrom: number;
  availableTo: number;
};

const courtData: Court[] = [
  { id: 1, location: 'sengkang', availableFrom: 4, availableTo: 9 },
  { id: 2, location: 'Punggol', availableFrom: 9, availableTo: 14 },
  { id: 3, location: 'sengkang', availableFrom: 4, availableTo: 9 },
  { id: 4, location: 'Punggol', availableFrom: 14, availableTo: 19 },
];

export function Home() {

  const [bookedCourt, setBookedCourt] = useState<Court | null>(null);
const [selectedSlots, setSelectedSlots] = useState<string[]>([]);

  const [showCalendar, setShowCalendar] = useState(false);

 const [startDate, setStartDate] = useState<Date | null>(null); // for popup modal
const [endDate, setEndDate] = useState<Date | null>(null);     // for popup modal
const [filterStartDate, setFilterStartDate] = useState<Date | null>(null); // for filter
const [filterEndDate, setFilterEndDate] = useState<Date | null>(null);     // for filter

  const [locationFilter, setLocationFilter] = useState('');
  const [timeFilter, setTimeFilter] = useState('');
  const [filteredCourts, setFilteredCourts] = useState<Court[]>(courtData);

  const handleSubmit = () => {
    setShowCalendar(false);
    if (bookedCourt) {
    const slots: string[] = [];
    for (let i = bookedCourt.availableFrom; i < bookedCourt.availableTo; i++) {
      slots.push(`${i.toString().padStart(2, '0')}:00 - ${(i + 1).toString().padStart(2, '0')}:00`);
    }
    setSelectedSlots(slots);
  }
};

  const handleCancel = () => {
    setShowCalendar(false);
    setStartDate(null);
    setEndDate(null);
  };

  const handleClear = () => {
    setLocationFilter('');
    setTimeFilter('');
 setFilterStartDate(null);
setFilterEndDate(null);
    setFilteredCourts(courtData);
  };

  const handleApply = () => {
    let filtered = [...courtData];

    if (locationFilter) {
      filtered = filtered.filter(
        (court) => court.location.toLowerCase() === locationFilter.toLowerCase()
      );
    }

    if (timeFilter) {
      const [from, to] = timeFilter.split('-').map(Number);
      filtered = filtered.filter(
        (court) =>
          court.availableFrom >= from && court.availableTo <= (to === 0 ? 24 : to)
      );
    }

    setFilteredCourts(filtered);
  };

  return (
    <div className="home-page-container1">
      <div className="home-banner-content">
        <h1>Slot Booking</h1>
        <br />
        <p>See slots available for booking.</p>
      </div>

      <div className="home-content-wrapper">
        <aside className="home-filter">
          <h3>Filter</h3>

          <select
            className="home-select home-common input-padding-left"
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
          >
            <option value="">All Location</option>
            <option value="sengkang">Seng Kang</option>
            <option value="Punggol">Punggol</option>
          </select>

<div className="calendar-dropdown-wrapper">
  {/* <label className="calendar-label">Select Date Range</label> */}
<DatePicker
  selected={filterStartDate}
  onChange={(dates) => {
    const [start, end] = dates as [Date, Date];
    setFilterStartDate(start);
    setFilterEndDate(end);
  }}
  startDate={filterStartDate}
  endDate={filterEndDate}
  selectsRange
  placeholderText="Calendar"
  className="home-common calendar-dropdown-input input-padding-left"
  calendarClassName="calendar-dropdown-popup"
/>


</div>


          <select
            className="home-common home-time input-padding-left"
            value={timeFilter}
            onChange={(e) => setTimeFilter(e.target.value)}
          >
            <option value="">Time</option>
            <option value="04-09">04AM - 09AM</option>
            <option value="09-14">09AM - 02PM</option>
            <option value="14-19">02PM - 07PM</option>
            <option value="19-00">07PM - 12AM</option>
          </select>

          <div className="home-buttons">
            <button className="home-clear" onClick={handleClear}>Clear Filter</button>
            <button className="home-apply" onClick={handleApply}>Apply</button>
          </div>
        </aside>
{/* <div className="home-main-content"> */}

        <div className="home-cards">
          {filteredCourts.length === 0 ? (
            <p>No Slots Available.</p>
          ) : (
            filteredCourts.map((court) => (
              <div className="home-card" key={court.id}>
                <div className="home-images">
                  <img src={`images/court${court.id}.jpg`} alt={`Court ${court.id}`} />
                </div>
                <div className="home-info">
                  <div className="home-top">
                    <h4>{`Court ${court.id}`}</h4>
                    <span>{court.id === 1 ? '4 Slots' : '5 Slots'}</span>
                  </div>
                  <div className="home-place">
                 
                    <p>{court.location}, Singapore</p>
                  </div>
                  <div className="home-time-icon">
                    <p className="home-time-info">
                      <FaClock  className="icon" /> {court.availableFrom}am to{' '}
                      {court.availableTo === 24 ? '12am' : `${court.availableTo}pm`}
                    </p>
{/* <button onClick={() => setShowCalendar(true)}>Book</button> */}
                      <button onClick={() => {
                        setBookedCourt(court);
                        setShowCalendar(true);
                      }}>Book</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        
      {/* </div> */}

      {/* {bookedCourt && startDate && endDate && selectedSlots.length > 0 && (
  <div className="booking-confirmation-box">
    <h3>Time slots</h3>
    <div className="slots-container">
      {selectedSlots.map((slot, index) => (
        <div
          key={index}
          className={`slot-box ${index === 0 ? 'selected-slot' : ''}`}
        >
          <span className="dot" />
          {slot}
        </div>
      ))}
    </div>

    <div className="price-details">
      <p><strong>S$ 15</strong> <span className="per-hour">Per hour</span></p>
      <p>{selectedSlots.length} Slots available</p>
    </div>

    <button className="book-now-btn">Book now</button>
  </div> */}
{/* )} */}
</div>
      {/* </div> */}

      {showCalendar && (
        <div className="calendar-modal">
          <div className="calendar-popup">
            <h4>Please Choose Start and End Date</h4>
            <DatePicker
              selected={startDate}
              onChange={(dates) => {
                const [start, end] = dates as [Date, Date];
                setStartDate(start);
                setEndDate(end);
              }}
              startDate={startDate}
              endDate={endDate}
              selectsRange
              inline
            />
            <div className="calendar-actions">
              <button className="cancel-btn" onClick={handleCancel}>
                Cancel
              </button>
              <button className="submit-btn" onClick={handleSubmit}>
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
