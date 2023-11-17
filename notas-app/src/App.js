import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/login/Login.js'
import Notas from './components/Notas/Notas.js'

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/Notas" element={<Notas />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
