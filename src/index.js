import React from 'react';
import ReactDOM from 'react-dom/client'; 
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import './styles.css';

const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
  <React.StrictMode>
    <Router>
      <div Style="Display: Flex align-items: center"> 
      
      <App />
      </div>
    </Router>
  </React.StrictMode>
);
