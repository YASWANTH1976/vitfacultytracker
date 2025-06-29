import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Faculty {
  id: string;
  name: string;
  department: string;
  designation: string;
  email: string;
  phone: string;
  cabinNumber: string;
  status: 'available' | 'busy' | 'away' | 'in-meeting';
  statusMessage: string;
  officeHours: {
    start: string;
    end: string;
    days: string[];
  };
  lastUpdated: string;
}

export interface Appointment {
  id: string;
  facultyId: string;
  studentName: string;
  studentEmail: string;
  date: string;
  time: string;
  purpose: string;
  status: 'pending' | 'confirmed' | 'cancelled';
}

interface FacultyContextType {
  faculties: Faculty[];
  appointments: Appointment[];
  currentFaculty: Faculty | null;
  updateFacultyStatus: (id: string, status: Faculty['status'], message: string) => void;
  loginFaculty: (email: string, password: string) => boolean;
  logoutFaculty: () => void;
  bookAppointment: (appointment: Omit<Appointment, 'id' | 'status'>) => void;
  updateAppointmentStatus: (id: string, status: Appointment['status']) => void;
}

const FacultyContext = createContext<FacultyContextType | undefined>(undefined);

const initialFaculties: Faculty[] = [
  {
    id: '1',
    name: 'Dr. Rajesh Kumar',
    department: 'Computer Science & Engineering',
    designation: 'Professor',
    email: 'rajesh.kumar@vit.ac.in',
    phone: '+91 9876543210',
    cabinNumber: 'TT-101',
    status: 'available',
    statusMessage: 'Available for academic queries',
    officeHours: {
      start: '09:00',
      end: '17:00',
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
    },
    lastUpdated: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Dr. Priya Sharma',
    department: 'Electronics & Communication',
    designation: 'Associate Professor',
    email: 'priya.sharma@vit.ac.in',
    phone: '+91 9876543211',
    cabinNumber: 'TT-205',
    status: 'in-meeting',
    statusMessage: 'In departmental meeting - Back by 3:00 PM',
    officeHours: {
      start: '10:00',
      end: '16:00',
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
    },
    lastUpdated: new Date().toISOString()
  },
  {
    id: '3',
    name: 'Dr. Arjun Patel',
    department: 'Mechanical Engineering',
    designation: 'Assistant Professor',
    email: 'arjun.patel@vit.ac.in',
    phone: '+91 9876543212',
    cabinNumber: 'TT-308',
    status: 'busy',
    statusMessage: 'Reviewing research papers',
    officeHours: {
      start: '11:00',
      end: '18:00',
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
    },
    lastUpdated: new Date().toISOString()
  },
  {
    id: '4',
    name: 'Dr. Kavitha Reddy',
    department: 'Information Technology',
    designation: 'Professor',
    email: 'kavitha.reddy@vit.ac.in',
    phone: '+91 9876543213',
    cabinNumber: 'TT-412',
    status: 'away',
    statusMessage: 'At conference - Back tomorrow',
    officeHours: {
      start: '09:30',
      end: '17:30',
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
    },
    lastUpdated: new Date().toISOString()
  },
  {
    id: '5',
    name: 'Dr. Sanjay Gupta',
    department: 'Electrical Engineering',
    designation: 'Associate Professor',
    email: 'sanjay.gupta@vit.ac.in',
    phone: '+91 9876543214',
    cabinNumber: 'TT-515',
    status: 'available',
    statusMessage: 'Available for project guidance',
    officeHours: {
      start: '08:00',
      end: '16:00',
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
    },
    lastUpdated: new Date().toISOString()
  }
];

export function FacultyProvider({ children }: { children: ReactNode }) {
  const [faculties, setFaculties] = useState<Faculty[]>(() => {
    const saved = localStorage.getItem('faculties');
    return saved ? JSON.parse(saved) : initialFaculties;
  });
  
  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    const saved = localStorage.getItem('appointments');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [currentFaculty, setCurrentFaculty] = useState<Faculty | null>(() => {
    const saved = localStorage.getItem('currentFaculty');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    localStorage.setItem('faculties', JSON.stringify(faculties));
  }, [faculties]);

  useEffect(() => {
    localStorage.setItem('appointments', JSON.stringify(appointments));
  }, [appointments]);

  useEffect(() => {
    localStorage.setItem('currentFaculty', JSON.stringify(currentFaculty));
  }, [currentFaculty]);

  const updateFacultyStatus = (id: string, status: Faculty['status'], message: string) => {
    setFaculties(prev => prev.map(faculty => 
      faculty.id === id 
        ? { ...faculty, status, statusMessage: message, lastUpdated: new Date().toISOString() }
        : faculty
    ));
    
    if (currentFaculty?.id === id) {
      setCurrentFaculty(prev => prev ? { ...prev, status, statusMessage: message, lastUpdated: new Date().toISOString() } : null);
    }
  };

  const loginFaculty = (email: string, password: string) => {
    // Simple demo authentication - in production, this would be handled by backend
    const faculty = faculties.find(f => f.email === email);
    if (faculty && password === 'password') {
      setCurrentFaculty(faculty);
      return true;
    }
    return false;
  };

  const logoutFaculty = () => {
    setCurrentFaculty(null);
    localStorage.removeItem('currentFaculty');
  };

  const bookAppointment = (appointment: Omit<Appointment, 'id' | 'status'>) => {
    const newAppointment: Appointment = {
      ...appointment,
      id: Date.now().toString(),
      status: 'pending'
    };
    setAppointments(prev => [...prev, newAppointment]);
  };

  const updateAppointmentStatus = (id: string, status: Appointment['status']) => {
    setAppointments(prev => prev.map(apt => 
      apt.id === id ? { ...apt, status } : apt
    ));
  };

  return (
    <FacultyContext.Provider value={{
      faculties,
      appointments,
      currentFaculty,
      updateFacultyStatus,
      loginFaculty,
      logoutFaculty,
      bookAppointment,
      updateAppointmentStatus
    }}>
      {children}
    </FacultyContext.Provider>
  );
}

export function useFaculty() {
  const context = useContext(FacultyContext);
  if (context === undefined) {
    throw new Error('useFaculty must be used within a FacultyProvider');
  }
  return context;
}