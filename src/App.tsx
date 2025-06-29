import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import StudentDashboard from './pages/StudentDashboard';
import FacultyDashboard from './pages/FacultyDashboard';
import FacultyLogin from './pages/FacultyLogin';
import PWAInstallPrompt from './components/PWAInstallPrompt';
import { FacultyProvider } from './context/FacultyContext';

function App() {
  useEffect(() => {
    // Register service worker for PWA
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
          .then((registration) => {
            console.log('SW registered: ', registration);
          })
          .catch((registrationError) => {
            console.log('SW registration failed: ', registrationError);
          });
      });
    }
  }, []);

  return (
    <FacultyProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/student" element={<StudentDashboard />} />
              <Route path="/faculty/login" element={<FacultyLogin />} />
              <Route path="/faculty/dashboard" element={<FacultyDashboard />} />
            </Routes>
          </main>
          <PWAInstallPrompt />
        </div>
      </Router>
    </FacultyProvider>
  );
}

export default App;