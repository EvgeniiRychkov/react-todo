import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const MyCalendar = ({taskHistory, maxHours}) => {
  const [dayNumbers, setDayNumbers] = useState(taskHistory);

  const dateColor = (hours) => {
    if (hours === 0) return 'gray';
    if (maxHours === 0) return 'white';
    if (hours >= 0.8 * maxHours) return 'green';
    if (hours >= 0.4 * maxHours) return 'lightgreen';
    if (hours >= 0.2 * maxHours) return 'lightcoral';
    return 'red';
  };

  const tileContent = ({ date, view }) => {
    const dateKey = date.toDateString();
    const hours = dayNumbers[dateKey]
    if (view === 'month' && dayNumbers[dateKey]) {
      return <div style={{ backgroundColor: dateColor(hours) }}>{hours}</div>;
    }
    return null;
  };

  return (
    <div>
      <Calendar
        tileContent={tileContent}
      />
    </div>
  );
};

export default MyCalendar;
