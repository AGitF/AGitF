import React from 'react';
import { useAppContext } from '../context/AppContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Mock data for charts
const revenueData = [
  { name: 'Jan', revenue: 4000, expenses: 2400 },
  { name: 'Feb', revenue: 3000, expenses: 1398 },
  { name: 'Mar', revenue: 2000, expenses: 9800 },
  { name: 'Apr', revenue: 2780, expenses: 3908 },
  { name: 'May', revenue: 1890, expenses: 4800 },
  { name: 'Jun', revenue: 2390, expenses: 3800 },
  { name: 'Jul', revenue: 3490, expenses: 4300 },
];

const projectData = [
  { name: 'Website Redesign', progress: 70, deadline: '2025-05-20' },
  { name: 'Marketing Campaign', progress: 30, deadline: '2025-06-15' },
  { name: 'Product Launch', progress: 50, deadline: '2025-05-31' },
  { name: 'Client Onboarding', progress: 90, deadline: '2025-05-10' },
];

const Dashboard = () => {
  const { state } = useAppContext();
  
  // Get today's date
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-GB', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="space-y-6">
      {/* Dashboard Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-gray-600">{formattedDate}</p>
        </div>
        <div className="flex space-x-2">
          <button className="btn-secondary">Export</button>
          <button className="btn-primary">New Project</button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h3 className="text-sm font-medium text-gray-500">Total Revenue</h3>
          <p className="text-2xl font-bold text-gray-800">£24,500</p>
          <div className="flex items-center mt-2">
            <span className="text-green-500 text-xs font-medium">+2.5%</span>
            <span className="text-xs text-gray-500 ml-1">from last month</span>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h3 className="text-sm font-medium text-gray-500">Outstanding Invoices</h3>
          <p className="text-2xl font-bold text-gray-800">£8,320</p>
          <div className="flex items-center mt-2">
            <span className="text-red-500 text-xs font-medium">+12.3%</span>
            <span className="text-xs text-gray-500 ml-1">from last month</span>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h3 className="text-sm font-medium text-gray-500">Active Projects</h3>
          <p className="text-2xl font-bold text-gray-800">7</p>
          <div className="flex items-center mt-2">
            <span className="text-green-500 text-xs font-medium">+1</span>
            <span className="text-xs text-gray-500 ml-1">from last month</span>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h3 className="text-sm font-medium text-gray-500">Upcoming Deadlines</h3>
          <p className="text-2xl font-bold text-gray-800">4</p>
          <div className="flex items-center mt-2">
            <span className="text-gray-500 text-xs font-medium">Next: May 10</span>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Revenue vs Expenses</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={revenueData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="revenue" fill="#0ea5e9" />
                <Bar dataKey="expenses" fill="#f87171" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Project Progress */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Project Progress</h2>
            <a href="/crm/projects" className="text-sm text-primary-600 hover:text-primary-700">View All</a>
          </div>
          <div className="space-y-4">
            {projectData.map((project, index) => (
              <div key={index} className="flex flex-col">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-gray-700">{project.name}</span>
                  <span className="text-sm text-gray-500">Due: {new Date(project.deadline).toLocaleDateString()}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-primary-600 h-2.5 rounded-full" 
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>
                <div className="flex justify-end mt-1">
                  <span className="text-xs text-gray-500">{project.progress}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activities and Calendar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activities */}
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Activities</h2>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-800">Invoice #INV-2023-001 has been paid</p>
                <p className="text-xs text-gray-500">Today at 10:30 AM</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-800">New project created: Website Redesign</p>
                <p className="text-xs text-gray-500">Yesterday at 2:15 PM</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-800">Meeting scheduled with Client XYZ</p>
                <p className="text-xs text-gray-500">May 5 at 1:00 PM</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-red-100 flex items-center justify-center text-red-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-800">Invoice #INV-2023-002 is overdue</p>
                <p className="text-xs text-gray-500">May 3 at 9:30 AM</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Upcoming Events */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Upcoming Events</h2>
            <a href="/calendar" className="text-sm text-primary-600 hover:text-primary-700">View Calendar</a>
          </div>
          <div className="space-y-4">
            <div className="p-3 border-l-4 border-primary-500 bg-primary-50 rounded-r-md">
              <p className="text-sm font-medium text-gray-800">Team Meeting</p>
              <p className="text-xs text-gray-500">Today, 15:00 - 16:00</p>
            </div>
            
            <div className="p-3 border-l-4 border-green-500 bg-green-50 rounded-r-md">
              <p className="text-sm font-medium text-gray-800">Client Presentation</p>
              <p className="text-xs text-gray-500">Tomorrow, 10:30 - 12:00</p>
            </div>
            
            <div className="p-3 border-l-4 border-yellow-500 bg-yellow-50 rounded-r-md">
              <p className="text-sm font-medium text-gray-800">Project Deadline</p>
              <p className="text-xs text-gray-500">May 10, All day</p>
            </div>
            
            <div className="p-3 border-l-4 border-purple-500 bg-purple-50 rounded-r-md">
              <p className="text-sm font-medium text-gray-800">John's Holiday</p>
              <p className="text-xs text-gray-500">May 15 - May 20</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;