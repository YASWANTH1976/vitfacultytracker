import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import StudentDashboard from './pages/StudentDashboard';
import FacultyDashboard from './pages/FacultyDashboard';
import FacultyLogin from './pages/FacultyLogin';
import { FacultyProvider } from './context/FacultyContext';

function App() {
  return (
    <FacultyProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/student" element={<StudentDashboard />} />
              <Route path="/faculty/login" element={<FacultyLogin />} />
              <Route path="/faculty/dashboard" element={<FacultyDashboard />} />
            </Routes>
          </main>
        </div>
      </Router>
    </FacultyProvider>
  );
}

export default App;