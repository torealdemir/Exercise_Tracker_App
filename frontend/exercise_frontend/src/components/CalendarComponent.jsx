import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./CalendarComponent.css";

const CalendarComponent = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [exercises, setExercises] = useState({});
  const [newExercise, setNewExercise] = useState("");

  const handleAddExercise = () => {
    const dateKey = selectedDate.toISOString().split("T")[0];
    setExercises((prev) => ({
      ...prev,
      [dateKey]: [...(prev[dateKey] || []), newExercise],
    }));
    setNewExercise("");
  };

  const handleDateClick = (date) => setSelectedDate(date);
  const selectedDateExercises = exercises[selectedDate.toISOString().split("T")[0]] || [];

  const tileClassName = ({ date }) => {
    const dateKey = date.toISOString().split("T")[0];
    return exercises[dateKey] && exercises[dateKey].length > 0 ? "exercise-day-tile" : "no-exercise-day-tile";
  };

  return (
    <div className="calendar-container" style={{ 
      backgroundImage: 'url(https://upload.wikimedia.org/wikipedia/commons/7/74/Arnold_Schwarzenegger_edit%28js%29.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '100vh',
      padding: '20px'
    }}>
      <h1>Gym Bros Exercise Tracker</h1>
      <Calendar onChange={handleDateClick} value={selectedDate} tileClassName={tileClassName} />
      <h2>Exercises for {selectedDate.toDateString()}</h2>
      <div className="exercise-details">
        <ul>{selectedDateExercises.map((exercise, index) => (<li key={index}>{exercise}</li>))}</ul>
        <input type="text" placeholder="Add a new exercise" value={newExercise} onChange={(e) => setNewExercise(e.target.value)} />
        <button onClick={handleAddExercise}>Add Exercise</button>
      </div>
    </div>
  );
};

export default CalendarComponent;
