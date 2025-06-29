import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Users, BookOpen, Smartphone, CheckCircle, ArrowRight } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Never Wait Outside Faculty Cabins Again
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 leading-relaxed">
              Real-time faculty availability tracking system designed specifically for VIT Vellore students and faculty
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/student"
                className="bg-white text-blue-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-colors flex items-center justify-center space-x-2"
              >
                <Users className="h-5 w-5" />
                <span>Student Portal</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                to="/faculty/login"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-900 transition-colors flex items-center justify-center space-x-2"
              >
                <BookOpen className="h-5 w-5" />
                <span>Faculty Login</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Solving a Real Problem at VIT Vellore
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Students often waste time waiting outside faculty cabins when professors are unavailable due to meetings, emergencies, or other commitments.
            </p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">The Challenge</h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start space-x-3">
                    <Clock className="h-5 w-5 text-red-500 mt-1 flex-shrink-0" />
                    <span>Students waste valuable time waiting outside empty cabins</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <Clock className="h-5 w-5 text-red-500 mt-1 flex-shrink-0" />
                    <span>Faculty schedules change due to meetings and emergencies</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <Clock className="h-5 w-5 text-red-500 mt-1 flex-shrink-0" />
                    <span>No real-time communication between faculty and students</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Solution</h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                    <span>Real-time faculty availability status updates</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                    <span>Instant notifications about schedule changes</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                    <span>Appointment booking system for planned meetings</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Powerful Features for Everyone
            </h2>
            <p className="text-xl text-gray-600">
              Designed with both students and faculty in mind
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="bg-blue-100 rounded-lg p-3 w-fit mb-4">
                <Clock className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Real-time Status</h3>
              <p className="text-gray-600">
                Check faculty availability instantly before heading to their cabins
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="bg-green-100 rounded-lg p-3 w-fit mb-4">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Department Directory</h3>
              <p className="text-gray-600">
                Browse faculty by department with complete contact information
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="bg-purple-100 rounded-lg p-3 w-fit mb-4">
                <BookOpen className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Appointment Booking</h3>
              <p className="text-gray-600">
                Schedule meetings with faculty members in advance
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="bg-orange-100 rounded-lg p-3 w-fit mb-4">
                <Smartphone className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Mobile Optimized</h3>
              <p className="text-gray-600">
                Perfect for checking on-the-go from anywhere on campus
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="bg-red-100 rounded-lg p-3 w-fit mb-4">
                <CheckCircle className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Status Messages</h3>
              <p className="text-gray-600">
                Get detailed information about when faculty will be available
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="bg-indigo-100 rounded-lg p-3 w-fit mb-4">
                <Clock className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Office Hours</h3>
              <p className="text-gray-600">
                View regular office hours and updated availability windows
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Save Time and Improve Academic Efficiency?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join the revolution in academic communication at VIT Vellore
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/student"
              className="bg-white text-blue-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-colors inline-flex items-center justify-center space-x-2"
            >
              <span>Get Started as Student</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              to="/faculty/login"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-900 transition-colors inline-flex items-center justify-center space-x-2"
            >
              <span>Faculty Registration</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}