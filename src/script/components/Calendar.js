import React, { Component } from 'react';

const Calendar = ({days}) => {
	const weekday = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"][Math.floor(days%5)];
	const week = Math.ceil(days/5);
	const time = (days%1)<0.5 ? "Morning" : "Afternoon";
	return <div className="calendar">
    <div className="calendar-daytime">
      <div className="calendar-number">Week {week}</div>
      <div className="calendar-day">{weekday} {time}</div>
    </div>
  </div>;
}

export default Calendar;
