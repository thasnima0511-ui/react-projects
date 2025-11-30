import '../css/SlotBookingFinal.css'
import { useState,forwardRef } from 'react';
import DatePicker from 'react-datepicker';
import React from 'react';
import 'react-datepicker/dist/react-datepicker.css';

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
const CustomInputButton = forwardRef<HTMLButtonElement, any>(({ value, onClick }, ref) => (
  // <button className="home-common calendar-custom-input " onClick={onClick} ref={ref}>
       <button className='slot-datepicker slot-filter-common' onClick={onClick} ref={ref}>

    {value || 'Calendar'}
  </button>
));
export function SlotBookingFinal() {

     const [timeFilter, setTimeFilter] = useState('');
    const [locationFilter, setLocationFilter] = useState('');
    const [filterStartDate, setFilterStartDate] = useState<Date | null>(null); 
const [filterEndDate, setFilterEndDate] = useState<Date | null>(null);  
const [filteredCourts, setFilteredCourts] = useState<Court[]>(courtData);
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

    return(<>
    <div className="slot-main-container">
        
                  <div className="slot-top">
                               <h1>Slot Booking</h1>
                               <br />
                               <p>See slots available for booking.</p>
                  </div>
                  <div className="slot-bottom">
                              <div className='slot-bottom-inner'>
                                  <div className='slot-filter'>
                                         <h3>Filter</h3>
                                         {/*  */}


          

          <select
            className="slot-alllocation slot-filter-common"
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
          >
            <option value="">All Location</option>
            <option value="sengkang">Seng Kang</option>
            <option value="Punggol">Punggol</option>
          </select>


<div style={{ width: '80%' }}>
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
  customInput={<CustomInputButton value={
    filterStartDate && filterEndDate
      ? `${filterStartDate.toLocaleDateString()} - ${filterEndDate.toLocaleDateString()}`
      : 'Calendar'
  } />}
  withPortal={window.innerWidth > 100}

/>
</div>




          <select
            className="slot-timefilter slot-filter-common"
            value={timeFilter}
            onChange={(e) => setTimeFilter(e.target.value)}
          >
            <option value="">Time</option>
            <option value="04-09">04AM - 09AM</option>
            <option value="09-14">09AM - 02PM</option>
            <option value="14-19">02PM - 07PM</option>
            <option value="19-00">07PM - 12AM</option>
          </select>

          <div className="slot-buttons">
            <button className="slot-clear" onClick={handleClear}>Clear Filter</button>
            <button className="slot-apply" onClick={handleApply}>Apply</button>
          </div>
      


                                         {/*  */}
                                  </div>
                                   <div className='slot-content'>
                                      <div className='slot-section1'>
                                         <div className='slot-item1 slot-common'>
                                            <img src='/images/BookCourt.png' className='slot-img'/>
                                            <h3>Book Court 1</h3>
                                            <div className='slot-location'>
                                                <img src='/images/location.png' className='slot-image'/>
                                                <p>Seng kang, singapore</p></div>
                                           
                                         </div>
                                         <div className='slot-item2 slot-common'>
                                            <img src='/images/BookCourt.png' className='slot-img'/>
                                              <h3>Book Court 2</h3>
                                               <div className='slot-location'>
                                                <img src='/images/location.png' className='slot-image'/>
                                                <p>Seng kang, singapore</p></div>
                                         </div>
                                         <div className='slot-item3 slot-common'>
                                            <img src='/images/BookCourt.png' className='slot-img'/>
                                              <h3>Book Court 3</h3>
                                               <div className='slot-location'>
                                                <img src='/images/location.png' className='slot-image'/>
                                                <p>Seng kang, singapore</p></div>
                                         </div>
                                        <div>
                                        </div>
                                        </div>
                                        <div className='slot-section2'>
                                                <div className='slot-layer1'>
                                                    <p className='slot-layer1-p1'>Time slots</p>
                                                    <p className='slot-layer1-p2'>17-Jan-2023 to 19-Jan-2023</p>
                                                    </div> 
                                                    <div className='slot-layer2'>
                                                          <div className='slot-layer2-common'>
                                                          <img src='/images/schedule1.png' className='slot-img1'/>
                                                          <p>04am-</p>
                                                          <p>05am</p>
                                                          </div>
                                                            <div className='slot-layer2-common'>
                                                          <img src='/images/schedule1.png' className='slot-img1'/>
                                                          <p>04am-</p>
                                                          <p>05am</p>
                                                          </div>
                                                            <div className='slot-layer2-common'>
                                                          <img src='/images/schedule1.png' className='slot-img1'/>
                                                          <p>04am-</p>
                                                          <p>05am</p>
                                                          </div>
                                                            <div className='slot-layer2-common'>
                                                          <img src='/images/schedule1.png' className='slot-img1'/>
                                                          <p>04am-</p>
                                                          <p>05am</p>
                                                          </div>
                                                            <div className='slot-layer2-common'>
                                                          <img src='/images/schedule.png' className='slot-img1'/>
                                                          <p>04am-</p>
                                                          <p>05am</p>
                                                          </div>
                                                            <div className='slot-layer2-common'>
                                                          <img src='/images/schedule.png' className='slot-img1'/>
                                                          <p>04am-</p>
                                                          <p>05am</p>
                                                          </div>
                                                            <div className='slot-layer2-common'>
                                                          <img src='/images/schedule.png' className='slot-img1'/>
                                                          <p>04am-</p>
                                                          <p>05am</p>
                                                          </div>
                                                            <div className='slot-layer2-common'>
                                                          <img src='/images/schedule1.png' className='slot-img1'/>
                                                          <p>04am-</p>
                                                          <p>05am</p>
                                                          </div>
                                                            <div className='slot-layer2-common'>
                                                          <img src='/images/schedule1.png' className='slot-img1'/>
                                                          <p>04am-</p>
                                                          <p>05am</p>
                                                          </div>
                                                            <div className='slot-layer2-common'>
                                                          <img src='/images/schedule1.png' className='slot-img1'/>
                                                          <p>04am-</p>
                                                          <p>05am</p>
                                                          </div>
                                                            <div className='slot-layer2-common'>
                                                          <img src='/images/schedule1.png' className='slot-img1'/>
                                                          <p>04am-</p>
                                                          <p>05am</p>
                                                          </div>
                                                            <div className='slot-layer2-common'>
                                                          <img src='/images/schedule1.png' className='slot-img1'/>
                                                          <p>04am-</p>
                                                          <p>05am</p>
                                                          </div>
                                                            <div className='slot-layer2-common'>
                                                          <img src='/images/schedule1.png' className='slot-img1'/>
                                                          <p>04am-</p>
                                                          <p>05am</p>
                                                          </div>
                                                    </div> 
                                                    <div className='slot-layer3'>

                                                    </div>
                                                     <div className='slot-layer4'>
                                                          <div className='slot-layer4-left'>
                                                                <div className='slot-layer4-inner'>
                                                                  <p className='slot-layer4-inner-p'>S$ 15</p>
                                                                  <div className='slot-layer4-inner-inner'>
                                                                    <img src='/images/schedule.png' className='slot-img1'/>
                                                                    <p>Per hour</p>
                                                                  </div>
                                                                </div>
                                                                <p className='slot-layer4-left-p'>3 Slots available</p>
                                                          </div>
                                                          <div className='slot-layer4-right'>
                                                            <button>Book now</button>
                                                          </div>
                                                    </div>
                                        </div>
                                      </div>
                                  </div>
                              </div>
                  </div>
       
    
    
    </>);
}