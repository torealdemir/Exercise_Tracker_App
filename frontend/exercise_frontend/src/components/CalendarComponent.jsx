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

  // ✅ Calculate Days Worked in the Current Month
  const calculateDaysWorkedThisMonth = () => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    // Get unique dates from exercise logs in the current month
    const workedDays = Object.keys(exercises).filter((dateKey) => {
      const date = new Date(dateKey);
      return date.getMonth() === currentMonth && date.getFullYear() === currentYear && exercises[dateKey].length > 0;
    });

    return workedDays.length;
  };

  return (
    <div className="calendar-container" style={{ 
      backgroundImage: 'url(https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0019%2F2813%2F4726%2Farticles%2FZeller431-028.jpg%3Fv%3D1588114334&f=1&nofb=1&ipt=12e720a1e76f6ba99051eeb35554f557fca6eeae94bcba4d8a96d09f15ccd58a&ipo=images)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '100vh',
      padding: '20px',
      opacity: '0.95'
    }}>
      <h1>Gym Bros Exercise Tracker</h1>
      <Calendar onChange={handleDateClick} value={selectedDate} tileClassName={tileClassName} />
      
      <h2>Exercises for {selectedDate.toDateString()}</h2>
      <div className="exercise-details">
        <ul>{selectedDateExercises.map((exercise, index) => (<li key={index}>{exercise}</li>))}</ul>
        <input type="text" placeholder="Add a new exercise" value={newExercise} onChange={(e) => setNewExercise(e.target.value)} />
        <button onClick={handleAddExercise}>Add Exercise</button>
      </div>

      {/* ✅ Days Worked This Month Section */}
      <div className="statistics">
        <p><strong>Days Worked This Month:</strong> {calculateDaysWorkedThisMonth()}</p>
      </div>
    </div>
  );
};

export default CalendarComponent;
