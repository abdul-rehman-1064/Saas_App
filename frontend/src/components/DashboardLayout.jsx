import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Settings, Code, BarChart2, LogOut, Menu, X } from 'lucide-react';

const DashboardLayout = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const menuItems = [
    { icon: <Settings size={20} />, label: 'Bot Settings', path: '/dashboard' },
    { icon: <Code size={20} />, label: 'Integration', path: '/dashboard/integration' },
    { icon: <BarChart2 size={20} />, label: 'Analytics', path: '/dashboard/analytics' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      
      {/* --- MOBILE HEADER --- */}
      <div className="md:hidden bg-indigo-900 text-white p-4 flex justify-between items-center">
        <h1 className="text-xl font-black tracking-tighter">DEV.</h1>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* --- SIDEBAR (Desktop & Mobile) --- */}
      <aside className={`
        fixed md:static inset-y-0 left-0 z-50 w-64 bg-indigo-900 text-white transform transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 flex flex-col
      `}>
        <div className="p-6 hidden md:block">
           <h1 className="text-2xl font-black tracking-tighter">DEV.</h1>
        </div>
        
        {/* Mobile Close Button (Inside Sidebar) */}
        <div className="md:hidden p-4 flex justify-end">
           <button onClick={() => setIsMobileMenuOpen(false)}><X size={24}/></button>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4">
          {menuItems.map((item) => (
            <Link 
              key={item.path}
              to={item.path}
              onClick={() => setIsMobileMenuOpen(false)} // Close menu on click (mobile)
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition ${
                location.pathname === item.path 
                ? 'bg-indigo-800 text-white shadow-lg' 
                : 'text-indigo-300 hover:bg-indigo-800/50 hover:text-white'
              }`}
            >
              {item.icon}
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-indigo-800">
          <button onClick={handleLogout} className="w-full flex items-center space-x-2 text-indigo-300 hover:text-white transition px-4 py-2">
            <LogOut size={18} /> <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* --- MAIN CONTENT AREA --- */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto h-[calc(100vh-64px)] md:h-screen">
        {/* Header Profile Icon (Desktop Only) */}
        <header className="hidden md:flex justify-end mb-6">
          <div className="h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 font-bold border border-indigo-200 shadow-sm">
             AD
          </div>
        </header>

        {/* Page Content Rendered Here */}
        <div className="max-w-4xl mx-auto">
           {children}
        </div>
      </main>

      {/* Overlay for Mobile */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default DashboardLayout;