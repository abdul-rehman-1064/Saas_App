import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div className="min-h-screen bg-white">
      <nav className="flex justify-between items-center p-6 max-w-6xl mx-auto">
        <div className="text-2xl font-bold">SupportAI</div>
        <Link to="/login" className="bg-black text-white px-5 py-2 rounded-full">Login</Link>
      </nav>

      <div className="text-center mt-20 px-4">
        <h1 className="text-5xl font-bold mb-6">AI Customer Support <br/> Built for Modern Websites</h1>
        <p className="text-gray-600 text-xl mb-8">Train your AI in minutes. Embed with one line of code.</p>
        <Link to="/login" className="bg-black text-white px-8 py-4 rounded-lg text-lg">Get Started Free</Link>
        
        {/* Preview Image Placeholder */}
        <div className="mt-12 mx-auto max-w-4xl shadow-2xl rounded-lg overflow-hidden border">
           <div className="bg-gray-100 p-10 h-64 flex items-center justify-center text-gray-400">
             Dashboard Preview (Login to see live)
           </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;