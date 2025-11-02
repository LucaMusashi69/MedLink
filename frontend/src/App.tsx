import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// Componentes
import Login from './components/Login';
import Home from './components/Home';
import DoctorDetail from './components/DoctorDetail';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <main className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/doctors/:id" element={<DoctorDetail />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;