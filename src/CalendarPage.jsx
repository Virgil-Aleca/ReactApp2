import React, { useState, useEffect, useCallback } from 'react';
import './CalendarPage.css'; 

const CalendarPage = () => {
  const startYear = 2024;
  const endYear = 2034;
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const [selectedYear, setSelectedYear] = useState(startYear);
  const [selectedMonth, setSelectedMonth] = useState(0);
  const [notes, setNotes] = useState({});
  const [selectedDay, setSelectedDay] = useState(null);

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem('notes')) || {};
    setNotes(savedNotes);
  }, []);

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const generateDays = (year, month) => {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();
    const days = [];

    
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

  
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }

    return days;
  };

  const handleNoteChange = useCallback((event, year, month, day) => {
    const updatedNotes = {
      ...notes,
      [`${year}-${month}-${day}`]: event.target.value
    };
    setNotes(updatedNotes);
  }, [notes]);

  const handleKeyDown = (event, year, month, day) => {
    if (event.key === 'Enter') {
      event.preventDefault(); 
      handleNoteChange(event, year, month, day);
      setSelectedDay(null); 
    }
  };

  const handleYearChange = (event) => {
    setSelectedYear(Number(event.target.value));
  };

  const handleMonthChange = (event) => {
    setSelectedMonth(Number(event.target.value));
  };

  const handleDayClick = (day) => {
    if (day) {
      setSelectedDay(day === selectedDay ? null : day);
    }
  };

  return (
    <div className="calendar-page">
      <div className="selector-container">
        <select value={selectedYear} onChange={handleYearChange}>
          {Array.from({ length: endYear - startYear + 1 }, (_, i) => startYear + i).map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
        <select value={selectedMonth} onChange={handleMonthChange}>
          {months.map((month, index) => (
            <option key={index} value={index}>{month}</option>
          ))}
        </select>
      </div>
      {selectedYear !== undefined && selectedMonth !== undefined && (
        <div className="month-container">
          <h2>{months[selectedMonth]} {selectedYear}</h2>
          <table>
            <thead>
              <tr>
                <th>Sun</th>
                <th>Mon</th>
                <th>Tue</th>
                <th>Wed</th>
                <th>Thu</th>
                <th>Fri</th>
                <th>Sat</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: Math.ceil(generateDays(selectedYear, selectedMonth).length / 7) }).map((_, rowIndex) => (
                <tr key={rowIndex}>
                  {generateDays(selectedYear, selectedMonth).slice(rowIndex * 7, rowIndex * 7 + 7).map((day, dayIndex) => (
                    <td
                      key={dayIndex}
                      className={day ? 'clickable' : ''}
                      onClick={() => handleDayClick(day)}
                    >
                      {day || ''}
                      {day && (
                        <div className="note-display">
                          {notes[`${selectedYear}-${selectedMonth}-${day}`] || ''}
                        </div>
                      )}
                      {day && selectedDay === day && (
                        <textarea
                          className="visible"
                          placeholder="Add note..."
                          value={notes[`${selectedYear}-${selectedMonth}-${day}`] || ''}
                          onChange={(e) => handleNoteChange(e, selectedYear, selectedMonth, day)}
                          onKeyDown={(e) => handleKeyDown(e, selectedYear, selectedMonth, day)}
                          autoFocus
                        />
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <footer className="footer">
      
      </footer>
    </div>
  );
};

export default CalendarPage;
