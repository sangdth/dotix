import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './index.css';
import App from './App';

// Disable default context menu globally
document.addEventListener('contextmenu', (event) => {
  event.preventDefault();
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
