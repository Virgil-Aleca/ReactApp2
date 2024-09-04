import React, { useState, useEffect } from 'react';
import './TimerPage.css'; 

function TimerPage() {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [alarmTriggered, setAlarmTriggered] = useState(false);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000);

      return () => clearInterval(timer);
    } else if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
      setAlarmTriggered(true);
      alert("Timpul s-a scurs!");

    }
  }, [isRunning, timeLeft]);

  const startTimer = () => {
    const totalSeconds = hours * 3600 + minutes * 60 + seconds;
    if (totalSeconds > 0) {
      setTimeLeft(totalSeconds);
      setIsRunning(true);
      setAlarmTriggered(false);
    }
  };

  const stopTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setHours(0);
    setMinutes(0);
    setSeconds(0);
    setTimeLeft(0);
    setAlarmTriggered(false);
  };

  const handleHoursChange = (event) => {
    setHours(Number(event.target.value));
  };

  const handleMinutesChange = (event) => {
    setMinutes(Number(event.target.value));
  };

  const handleSecondsChange = (event) => {
    setSeconds(Number(event.target.value));
  };

  return (
    <div 
  style={{ 
    display: 'flex',
    justifyContent: 'center', 
    alignItems: 'center',      
    height: '100vh'           
  }}
  >
  <div 
    style={{ 
      padding: '80px',
      width: 'fit-content' 
    }} 
    className="timer-container"
  >



    
      <h2 className="timer-title">Seteaza Timer-ul</h2>
      <div className="time-inputs">
        <input
          type="number"
          placeholder="Ore"
          value={hours}
          onChange={handleHoursChange}
          disabled={isRunning}
          className="time-input"
        />
        <input
          type="number"
          placeholder="Minute"
          value={minutes}
          onChange={handleMinutesChange}
          disabled={isRunning}
          className="time-input"
        />
        <input
          type="number"
          placeholder="Secunde"
          value={seconds}
          onChange={handleSecondsChange}
          disabled={isRunning}
          className="time-input"
        />
      </div>
      <div className="button-group">
        <button onClick={startTimer} disabled={isRunning || (hours === 0 && minutes === 0 && seconds === 0)} className="button start-button">
          Start
        </button>
        <button onClick={stopTimer} disabled={!isRunning} className="button stop-button">
          Stop
        </button>
        <button onClick={resetTimer} className="button reset-button">
          Reset
        </button>
      </div>
      <p className="time-remaining">Timp ramas: {Math.floor(timeLeft / 3600)} ore, {Math.floor((timeLeft % 3600) / 60)} minute si {timeLeft % 60} secunde</p>
      {alarmTriggered && <p className="alarm-message">Timer-ul a expirat!</p>}
       </div>
    </div>
  
  );
}

export default TimerPage;
