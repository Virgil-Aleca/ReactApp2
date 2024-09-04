import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import HomePage from './HomePage';
import CalendarPage from './CalendarPage';
import TimerPage from './TimerPage';
import './App.css'; 

function App() {
  return (
    <div className="app-container">
      <header className="header">
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
          
          </ul>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/timer" element={<TimerPage />} />
        </Routes>
      </main>
      <footer className="footer">
      
      </footer>
    </div>
  );
}

export default App;
