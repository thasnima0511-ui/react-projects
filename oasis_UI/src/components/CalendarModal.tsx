import React, { useState } from "react";
import "../css/CalendarModal.css";
// import '../css/Home.css';

interface CalendarModalProps {
  onClose: () => void;
}

const CalendarModal: React.FC<CalendarModalProps> = ({ onClose }) => {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 7)); // August 2025

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const getDaysInMonth = (year: number, month: number) =>
    new Date(year, month + 1, 0).getDate();

  const getStartDay = (year: number, month: number) =>
    new Date(year, month, 1).getDay(); // 0 (Sun) to 6 (Sat)

 const generateCalendarDates = () => {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getStartDay(year, month); // 0 = Sunday

  // Adjust to Monday as first column
  const adjustedFirstDay = (firstDay + 6) % 7;

  const calendar: { day: number; dim: boolean; selected: boolean }[] = [];

  // Previous month's last days
  const prevMonth = month === 0 ? 11 : month - 1;
  const prevYear = month === 0 ? year - 1 : year;
  const prevMonthDays = getDaysInMonth(prevYear, prevMonth);

  for (let i = adjustedFirstDay - 1; i >= 0; i--) {
    calendar.push({
      day: prevMonthDays - i,
      dim: true,
      selected: false,
    });
  }

  // Current month
  for (let i = 1; i <= daysInMonth; i++) {
    const isSelected = i === 17 && month === 7; // 17 Aug only
    calendar.push({
      day: i,
      dim: false,
      selected: isSelected,
    });
  }

  // Next month's leading days
  let nextDay = 1;
  while (calendar.length % 7 !== 0) {
    calendar.push({
      day: nextDay++,
      dim: true,
      selected: false,
    });
  }

  return calendar;
};



  const handlePrevMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() - 1);
    setCurrentDate(newDate);
  };

  const handleNextMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + 1);
    setCurrentDate(newDate);
  };

  const calendarDates = generateCalendarDates();

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Please Choose Start and End Date</h3>
        <div className="calendar-container">
          <div className="calendar-header">
            <button className="arrow-button" onClick={handlePrevMonth}>◀</button>
            <span>{monthNames[currentDate.getMonth()]}</span>
            <button className="arrow-button" onClick={handleNextMonth}>▶</button>
          </div>
          <div className="calendar-grid">
            {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((d) => (
              <div key={d} className="day">{d}</div>
            ))}
            {calendarDates.map((dateObj, index) => (
              <div
                key={index}
                className={`date  ${dateObj.dim ? "dim" : ""} ${dateObj.selected ? " date-small selected " : ""}`}
              >
                {String(dateObj.day).padStart(2, "0")}
              </div>
            ))}
          </div>
        </div>

        <div className="modal-buttons">
          <button className="cancel-btn" onClick={onClose}>Cancel</button>
          <button className="submit-btn">Submit</button>
        </div>
      </div>
    </div>
  );
};

export default CalendarModal;
