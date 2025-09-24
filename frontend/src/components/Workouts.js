import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Workouts.css'; // Import the CSS file for styling
import Navbar from './Navbar'; // Import the Navbar component

const categories = {
  'Arms': 'arms',
  'Chest': 'chest',
  'Shoulders': 'shoulder',
  'Back': 'back',
  'Abs': 'abs',
  'Legs': 'legs',
  'Hips': 'hips',
  'Glutes': 'glutes',
  'Lower Back': 'lower back'
};

const Workouts = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    if (selectedCategory) {
      const fetchExercises = async () => {
        try {
          const response = await axios.get('http://127.0.0.1:8000/api/exercises/', {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('access')}`
            }
          });
          const filteredExercises = response.data.filter(exercise => exercise.category === categories[selectedCategory]);
          setExercises(filteredExercises);
        } catch (error) {
          console.error('Error fetching exercises', error);
        }
      };
      fetchExercises();
    }
  }, [selectedCategory]);

  const handleCardClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="workouts-container">
      <Navbar />
      {selectedCategory ? (
        <div className="exercises-list">
          <div className="exercises-header">
            <h2>{selectedCategory} Exercises</h2>
            <button onClick={() => setSelectedCategory(null)}>Back to Workouts</button>
          </div>
          <div className="stats-container">
            {exercises.map((exercise) => (
              <div className="stat-card" key={exercise.id}>
                <h3>{exercise.name}</h3>
                <p>Category: {exercise.category}</p>
                <p>Calories: {exercise.calories} kcal</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="workouts-content">
          <div className="workouts-column left-column">
            <h2>Upper Body</h2>
            <div className="stats-container">
              <div className="stat-card" onClick={() => handleCardClick('Arms')}>
                <h3>Arms</h3>
              </div>
              <div className="stat-card" onClick={() => handleCardClick('Chest')}>
                <h3>Chest</h3>
              </div>
              <div className="stat-card" onClick={() => handleCardClick('Shoulders')}>
                <h3>Shoulders</h3>
              </div>
              <div className="stat-card" onClick={() => handleCardClick('Back')}>
                <h3>Back</h3>
              </div>
              <div className="stat-card" onClick={() => handleCardClick('Abs')}>
                <h3>Abs</h3>
              </div>
            </div>
          </div>
          <div className="workouts-column right-column">
            <h2>Lower Body</h2>
            <div className="stats-container">
              <div className="stat-card" onClick={() => handleCardClick('Legs')}>
                <h3>Legs</h3>
              </div>
              <div className="stat-card" onClick={() => handleCardClick('Hips')}>
                <h3>Hips</h3>
              </div>
              <div className="stat-card" onClick={() => handleCardClick('Glutes')}>
                <h3>Glutes</h3>
              </div>
              <div className="stat-card" onClick={() => handleCardClick('Lower Back')}>
                <h3>Lower Back</h3>
              </div>
              
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Workouts;
