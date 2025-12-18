import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import CreateExercisePage from './pages/CreateExercisePage.jsx';
import EditExercisePage from './pages/EditExercisePage.jsx';
import Navigation from './components/Navigation.jsx';

function App() 
{
  const [exerciseToEdit, setExerciseToEdit] = useState(null);

  return (
    <Router>
      <header>
        <h1>Exercise Tracker</h1>
        <p>Track your workouts efficiently</p>
        <Navigation />
      </header>

      <main>
        <Routes>
          <Route path="/" element={<HomePage setExerciseToEdit={setExerciseToEdit} />} />
          <Route path="/create" element={<CreateExercisePage />} />
          <Route path="/edit" element={<EditExercisePage exerciseToEdit={exerciseToEdit} />} />
        </Routes>
      </main>

      <footer>
        <p>© 2025 Gabriel Gaston</p>
      </footer>
    </Router>
  );
}

export default App;