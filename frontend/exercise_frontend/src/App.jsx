import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import CalendarComponent from './components/CalendarComponent';
import Register from './components/Register';
import axios from 'axios';
import './components/axiosConfig';


axios.defaults.baseURL = 'http://127.0.0.1:8000';


const App = () => (
  <Router>
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/calendar" element={<CalendarComponent />} />
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  </Router>
);

export default App;