import React from 'react';
import ReactDOM from 'react-dom';
import Petflix from './Petflix';
import { BrowserRouter } from 'react-router-dom'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Petflix />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);