import { ThemeProvider, styled } from "styled-components";
import { lightTheme } from "./utils/Themes";
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/signup';
import Dashboard from './components/Dashboard';
import Workouts from './components/Workouts';
import RecipePage from './components/RecipePage';
import RecipeList from "./components/RecipeList";
import Chatbot from "./components/chatbot";
const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text_primary};
  overflow-x: hidden;
  transition: all 0.2s ease;
`;


function App() {
  return (
    <ThemeProvider theme={lightTheme}>
    <Router>
      <Container>
        <Routes>
          <Route path="" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="/recipe" element={<RecipePage />} />
          <Route path="/recipes/:category" element={<RecipeList/>} />
          <Route path="/chat" element={<Chatbot />} />
          {/* Add other routes here */}
        </Routes>
      </Container>
    </Router>
    </ThemeProvider>
  );
}

export default App;
