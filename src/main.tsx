// @ts-ignore
import React from 'react';
// @ts-ignore
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

// Set document title
document.title = 'Colony';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);