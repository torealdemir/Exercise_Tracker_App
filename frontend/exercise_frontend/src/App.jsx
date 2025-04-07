import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import CalendarComponent from './components/CalendarComponent';
import Register from './components/Register';
import axios from 'axios';
import './components/axiosConfig';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute'; // 👈 import it

axios.defaults.baseURL = 'http://127.0.0.1:8000';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/calendar"
          element={
            <ProtectedRoute>
              <CalendarComponent />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
