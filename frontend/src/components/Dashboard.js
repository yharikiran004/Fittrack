// src/components/Dashboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css'; // Import the CSS file for styling
import Navbar from './Navbar';

const Dashboard = () => {
  const [burntCalories, setBurntCalories] = useState(0);
  const [intakeCalories, setIntakeCalories] = useState(0);
  const [totalCalories, setTotalCalories] = useState(0);
  const [todayFoods, setTodayFoods] = useState([]);
  const [todayExercises, setTodayExercises] = useState([]);
  const [foodList, setFoodList] = useState([]);
  const [exerciseList, setExerciseList] = useState([]);
  const [showFoodForm, setShowFoodForm] = useState(false);
  const [showExerciseForm, setShowExerciseForm] = useState(false);
  const [selectedFood, setSelectedFood] = useState('');
  const [selectedExercise, setSelectedExercise] = useState('');

  useEffect(() => {
    fetchUserData();
    fetchFoodData();
    fetchExerciseData();
    fetchAllFoods();
    fetchAllExercises();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/users/me/', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access')}`
        }
      });
      setBurntCalories(response.data.burnt_calories);
      setIntakeCalories(response.data.intake_calories);
      setTotalCalories(response.data.total_calories);
    } catch (error) {
      console.error('Error fetching user data', error);
    }
  };

  const fetchFoodData = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/userfoods/', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access')}`
        }
      });
      console.log('Food Data:', response.data);
      setTodayFoods(response.data);
    } catch (error) {
      console.error('Error fetching food data', error);
    }
  };

  const fetchExerciseData = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/userexercises/', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access')}`
        }
      });
      setTodayExercises(response.data);
    } catch (error) {
      console.error('Error fetching exercise data', error);
    }
  };

  const fetchAllFoods = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/foods/', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access')}`
        }
      });
      setFoodList(response.data);
    } catch (error) {
      console.error('Error fetching all foods', error);
    }
  };

  const fetchAllExercises = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/exercises/', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access')}`
        }
      });
      setExerciseList(response.data);
    } catch (error) {
      console.error('Error fetching all exercises', error);
    }
  };

  const handleAddFood = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://127.0.0.1:8000/api/userfoods/', {
        food_id: selectedFood,  // Send food_id instead of food
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access')}`
        }
      });
      setShowFoodForm(false);
      fetchFoodData();
      fetchUserData(); // Update user data after adding food
    } catch (error) {
      console.error('Error adding food', error);
    }
  };
  

  const handleAddExercise = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://127.0.0.1:8000/api/userexercises/', {
        exercise_id: selectedExercise,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access')}`
        }
      });
      setShowExerciseForm(false);
      fetchExerciseData();
      fetchUserData(); // Update user data after adding exercise
    } catch (error) {
      console.error('Error adding exercise', error);
    }
  };

  const remainingCalories = totalCalories - intakeCalories + burntCalories;

  return (
    <div className="dashboard-container">
      <Navbar/>
      <div className="dashboard-content">
        <h2>Dashboard</h2>
        <div className="stats-container">
          <div className="stat-card">
            <h3>Calories Burned</h3>
            <p>{burntCalories} kcal</p>
          </div>
          <div className="stat-card">
            <h3>Intake Calories</h3>
            <p>{intakeCalories} kcal</p>
          </div>
          <div className="stat-card">
            <h3>Calories Remaining</h3>
            <p>{remainingCalories} kcal</p>
          </div>
        </div>
        <h2>Today's Calorie Intake</h2>
        <button className="add-button" onClick={() => setShowFoodForm(true)}>Add Food</button>
        {showFoodForm && (
          <form className="form-container" onSubmit={handleAddFood}>
            <select value={selectedFood} onChange={(e) => setSelectedFood(e.target.value)}>
              <option value="">Select Food</option>
              {foodList.map((food) => (
                <option key={food.id} value={food.id}>
                  {food.name}
                </option>
              ))}
            </select>
            <button type="submit">Add Food</button>
            <button type="button" onClick={() => setShowFoodForm(false)}>Cancel</button>
          </form>
        )}
        <div className="stats-container">
          {todayFoods.length === 0 ? (
            <p>No food added today</p>
          ) : (
            todayFoods.map((userFood) => (
              <div className="stat-card" key={userFood.id}>
                <h3>{userFood.food.name}</h3>
                <p>Quantity: {userFood.food.quantity}</p>
                <p>Calories: {userFood.calories} kcal</p>
              </div>
            ))
          )}
        </div>
        <h2>Today's Exercises</h2>
        <button className="add-button" onClick={() => setShowExerciseForm(true)}>Add Exercise</button>
        {showExerciseForm && (
          <form className="form-container" onSubmit={handleAddExercise}>
            <select value={selectedExercise} onChange={(e) => setSelectedExercise(e.target.value)}>
              <option value="">Select Exercise</option>
              {exerciseList.map((exercise) => (
                <option key={exercise.id} value={exercise.id}>
                  {exercise.name}
                </option>
              ))}
            </select>
            <button type="submit">Add Exercise</button>
            <button type="button" onClick={() => setShowExerciseForm(false)}>Cancel</button>
          </form>
        )}
        <div className="stats-container">
          {todayExercises.length === 0 ? (
            <p>No exercises added today</p>
          ) : (
            todayExercises.map((userExercise) => (
              <div className="stat-card" key={userExercise.id}>
                <h3>{userExercise.exercise.name}</h3>
                <p>Category: {userExercise.exercise.category}</p>
                <p>Calories: {userExercise.calories} kcal</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
