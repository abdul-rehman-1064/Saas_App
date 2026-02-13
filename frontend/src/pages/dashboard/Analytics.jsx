import React from 'react';
import { BarChart2 } from 'lucide-react';
import DashboardLayout from '../../components/DashboardLayout';

const Analytics = () => {
  return (
    <DashboardLayout>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Performance Overview</h2>
        <p className="text-gray-500 text-sm">Track your chatbot's interactions.</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 flex flex-col items-center justify-center text-center animate-fadeIn min-h-[400px]">
        <div className="bg-gray-50 rounded-full h-24 w-24 flex items-center justify-center mb-6">
          <BarChart2 size={40} className="text-gray-400"/>
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">Analytics Module Coming Soon</h3>
        <p className="text-gray-500 max-w-md mx-auto">
          We are currently building advanced reporting tools to help you understand your customers better. Stay tuned for updates!
        </p>
        <button className="mt-8 px-6 py-2 border border-gray-300 rounded-full text-gray-600 hover:bg-gray-50 transition font-medium text-sm">
           Notify Me When Ready
        </button>
      </div>
    </DashboardLayout>
  );
};

export default Analytics;