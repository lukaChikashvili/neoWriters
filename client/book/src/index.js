import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter as Router} from 'react-router-dom';
import BookProvider, {BookContext} from './context/bookContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BookProvider>
  <Router>
    <App />
    </Router>
    </BookProvider>
);
