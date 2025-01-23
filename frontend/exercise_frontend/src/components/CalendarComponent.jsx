import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // Import Calendar CSS
import "./CalendarComponent.css"; // Add your custom styles

const CalendarComponent = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [exercises, setExercises] = useState({});
  const [newExercise, setNewExercise] = useState("");

  const handleAddExercise = () => {
    const dateKey = selectedDate.toISOString().split("T")[0]; // Format date as YYYY-MM-DD
    setExercises((prev) => ({
      ...prev,
      [dateKey]: [...(prev[dateKey] || []), newExercise], // Add new exercise to the selected date
    }));
    setNewExercise(""); // Clear input
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  const selectedDateExercises = exercises[selectedDate.toISOString().split("T")[0]] || [];

  return (
    <div className="calendar-container">
      <h1>Exercise Tracker</h1>
      <Calendar onChange={handleDateClick} value={selectedDate} />
      <div className="exercise-details">
        <h2>Exercises for {selectedDate.toDateString()}</h2>
        <ul>
          {selectedDateExercises.map((exercise, index) => (
            <li key={index}>{exercise}</li>
          ))}
        </ul>
        <input
          type="text"
          placeholder="Add a new exercise"
          value={newExercise}
          onChange={(e) => setNewExercise(e.target.value)}
        />
        <button onClick={handleAddExercise}>Add Exercise</button>
      </div>
    </div>
  );
};

export default CalendarComponent;
