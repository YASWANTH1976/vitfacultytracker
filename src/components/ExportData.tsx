import React, { useState } from 'react';
import { Download, FileText, Calendar, Users, BarChart3 } from 'lucide-react';
import { useFaculty } from '../context/FacultyContext';

export default function ExportData() {
  const { faculties, appointments } = useFaculty();
  const [isExporting, setIsExporting] = useState(false);

  const exportToCSV = (data: any[], filename: string) => {
    if (data.length === 0) return;

    const headers = Object.keys(data[0]);
    const csvContent = [
      headers.join(','),
      ...data.map(row => headers.map(header => `"${row[header] || ''}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportFacultyData = () => {
    setIsExporting(true);
    const facultyData = faculties.map(faculty => ({
      Name: faculty.name,
      Department: faculty.department,
      Designation: faculty.designation,
      Email: faculty.email,
      Phone: faculty.phone,
      CabinNumber: faculty.cabinNumber,
      Status: faculty.status,
      StatusMessage: faculty.statusMessage,
      OfficeHoursStart: faculty.officeHours.start,
      OfficeHoursEnd: faculty.officeHours.end,
      OfficeDays: faculty.officeHours.days.join('; '),
      LastUpdated: new Date(faculty.lastUpdated).toLocaleString()
    }));

    exportToCSV(facultyData, `faculty-data-${new Date().toISOString().split('T')[0]}.csv`);
    setTimeout(() => setIsExporting(false), 1000);
  };

  const exportAppointmentData = () => {
    setIsExporting(true);
    const appointmentData = appointments.map(appointment => {
      const faculty = faculties.find(f => f.id === appointment.facultyId);
      return {
        FacultyName: faculty?.name || 'Unknown',
        StudentName: appointment.studentName,
        StudentEmail: appointment.studentEmail,
        Date: appointment.date,
        Time: appointment.time,
        Purpose: appointment.purpose,
        Status: appointment.status,
        Department: faculty?.department || 'Unknown'
      };
    });

    exportToCSV(appointmentData, `appointments-data-${new Date().toISOString().split('T')[0]}.csv`);
    setTimeout(() => setIsExporting(false), 1000);
  };

  const exportAnalyticsReport = () => {
    setIsExporting(true);
    
    // Generate analytics data
    const totalFaculty = faculties.length;
    const availableFaculty = faculties.filter(f => f.status === 'available').length;
    const totalAppointments = appointments.length;
    const confirmedAppointments = appointments.filter(a => a.status === 'confirmed').length;
    
    const departmentStats = faculties.reduce((acc, faculty) => {
      const dept = faculty.department;
      if (!acc[dept]) {
        acc[dept] = { total: 0, available: 0, appointments: 0 };
      }
      acc[dept].total++;
      if (faculty.status === 'available') acc[dept].available++;
      acc[dept].appointments = appointments.filter(a => 
        faculties.find(f => f.id === a.facultyId)?.department === dept
      ).length;
      return acc;
    }, {} as Record<string, { total: number; available: number; appointments: number }>);

    const analyticsData = [
      { Metric: 'Total Faculty', Value: totalFaculty },
      { Metric: 'Available Faculty', Value: availableFaculty },
      { Metric: 'Availability Rate', Value: `${Math.round((availableFaculty / totalFaculty) * 100)}%` },
      { Metric: 'Total Appointments', Value: totalAppointments },
      { Metric: 'Confirmed Appointments', Value: confirmedAppointments },
      { Metric: 'Appointment Success Rate', Value: `${totalAppointments > 0 ? Math.round((confirmedAppointments / totalAppointments) * 100) : 0}%` },
      ...Object.entries(departmentStats).map(([dept, stats]) => ({
        Metric: `${dept} - Availability`,
        Value: `${stats.available}/${stats.total} (${Math.round((stats.available / stats.total) * 100)}%)`
      }))
    ];

    exportToCSV(analyticsData, `analytics-report-${new Date().toISOString().split('T')[0]}.csv`);
    setTimeout(() => setIsExporting(false), 1000);
  };

  const generatePDFReport = () => {
    // This would integrate with a PDF library like jsPDF
    alert('PDF export feature coming soon! For now, you can export CSV data.');
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Export Data</h3>
          <p className="text-sm text-gray-600">Download system data for analysis or backup</p>
        </div>
        <Download className="w-5 h-5 text-blue-600" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button
          onClick={exportFacultyData}
          disabled={isExporting}
          className="flex items-center space-x-3 p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
        >
          <Users className="w-5 h-5 text-blue-600" />
          <div className="text-left">
            <h4 className="font-medium text-gray-900">Faculty Data</h4>
            <p className="text-sm text-gray-600">Export all faculty information</p>
          </div>
        </button>

        <button
          onClick={exportAppointmentData}
          disabled={isExporting}
          className="flex items-center space-x-3 p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
        >
          <Calendar className="w-5 h-5 text-green-600" />
          <div className="text-left">
            <h4 className="font-medium text-gray-900">Appointments</h4>
            <p className="text-sm text-gray-600">Export appointment records</p>
          </div>
        </button>

        <button
          onClick={exportAnalyticsReport}
          disabled={isExporting}
          className="flex items-center space-x-3 p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
        >
          <BarChart3 className="w-5 h-5 text-purple-600" />
          <div className="text-left">
            <h4 className="font-medium text-gray-900">Analytics Report</h4>
            <p className="text-sm text-gray-600">Export usage statistics</p>
          </div>
        </button>

        <button
          onClick={generatePDFReport}
          disabled={isExporting}
          className="flex items-center space-x-3 p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
        >
          <FileText className="w-5 h-5 text-red-600" />
          <div className="text-left">
            <h4 className="font-medium text-gray-900">PDF Report</h4>
            <p className="text-sm text-gray-600">Generate comprehensive report</p>
          </div>
        </button>
      </div>

      {isExporting && (
        <div className="mt-4 text-center">
          <div className="inline-flex items-center space-x-2 text-blue-600">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
            <span className="text-sm">Exporting data...</span>
          </div>
        </div>
      )}
    </div>
  );
}