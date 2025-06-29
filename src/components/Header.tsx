import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { GraduationCap, Users, LogOut, Home } from 'lucide-react';
import { useFaculty } from '../context/FacultyContext';
import NotificationSystem from './NotificationSystem';

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentFaculty, logoutFaculty } = useFaculty();

  const handleLogout = () => {
    logoutFaculty();
    navigate('/');
  };

  return (
    <header className="bg-blue-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <GraduationCap className="h-8 w-8" />
            <div>
              <h1 className="text-xl font-bold">VIT Faculty Tracker</h1>
              <p className="text-blue-200 text-sm">Real-time Availability System</p>
            </div>
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            <Link
              to="/"
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                location.pathname === '/' ? 'bg-blue-800' : 'hover:bg-blue-800'
              }`}
            >
              <Home className="h-4 w-4" />
              <span>Home</span>
            </Link>
            
            <Link
              to="/student"
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                location.pathname === '/student' ? 'bg-blue-800' : 'hover:bg-blue-800'
              }`}
            >
              <Users className="h-4 w-4" />
              <span>Student Portal</span>
            </Link>

            {currentFaculty ? (
              <div className="flex items-center space-x-4">
                <Link
                  to="/faculty/dashboard"
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                    location.pathname === '/faculty/dashboard' ? 'bg-blue-800' : 'hover:bg-blue-800'
                  }`}
                >
                  <span>Faculty Dashboard</span>
                </Link>
                <NotificationSystem />
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-red-600 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <>
                <NotificationSystem />
                <Link
                  to="/faculty/login"
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                    location.pathname === '/faculty/login' ? 'bg-blue-800' : 'hover:bg-blue-800'
                  }`}
                >
                  <span>Faculty Login</span>
                </Link>
              </>
            )}
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <NotificationSystem />
            <button className="text-white hover:text-blue-200">
              <Users className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}