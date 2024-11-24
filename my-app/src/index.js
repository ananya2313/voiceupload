


import React from 'react';
import ReactDOM from 'react-dom/client'; // Use the new import from 'react-dom/client'
import './index.css'; // Optional: for custom CSS
import App from './App';

// Create a root with createRoot and render the app
const root = ReactDOM.createRoot(document.getElementById('root')); 
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

