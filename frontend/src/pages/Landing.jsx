import React from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, Zap, Shield, CheckCircle } from 'lucide-react';

const Landing = () => {
  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Navbar */}
      <nav className="fixed w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          <div className="text-3xl font-black text-indigo-600 tracking-tighter">DEV.</div>
          <div className="hidden md:flex space-x-8 text-gray-600 font-medium">
            <a href="#features" className="hover:text-indigo-600 transition">Features</a>
            <a href="#pricing" className="hover:text-indigo-600 transition">Pricing</a>
          </div>
          <Link to="/login" className="bg-black text-white px-6 py-2.5 rounded-full font-medium hover:bg-gray-800 transition">
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-block bg-indigo-50 text-indigo-600 px-4 py-1 rounded-full text-sm font-bold mb-6">
            ✨ Now with Gemini AI Support
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-8 tracking-tight">
            Customer Support, <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">On Autopilot.</span>
          </h1>
          <p className="text-xl text-gray-500 mb-10 max-w-2xl mx-auto">
            Train a custom AI chatbot on your business data in seconds. Embed it on your website and let it handle 80% of your support queries.
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <Link to="/login" className="bg-indigo-600 text-white px-8 py-4 rounded-xl text-lg font-bold hover:bg-indigo-700 transition shadow-lg hover:shadow-indigo-500/30">
              Start Building Free
            </Link>
            <button className="px-8 py-4 rounded-xl text-lg font-bold border border-gray-200 hover:bg-gray-50 transition text-gray-700">
              View Demo
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-16">Why Choose DEV. Chatbot?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <FeatureCard 
              icon={<Zap className="text-yellow-500"/>}
              title="Instant Setup"
              desc="Just paste your business details and policies. No coding required to train the AI."
            />
            <FeatureCard 
              icon={<Shield className="text-green-500"/>}
              title="Secure & Private"
              desc="Your data is encrypted. We strictly follow privacy policies to keep your knowledge base safe."
            />
            <FeatureCard 
              icon={<MessageSquare className="text-blue-500"/>}
              title="24/7 Availability"
              desc="Your AI agent never sleeps. Handle customer queries at 3 AM just as well as 3 PM."
            />
          </div>
        </div>
      </section>

      {/* Pricing Section (New Addition) */}
      <section id="pricing" className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16">Simple Pricing</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Free Plan */}
            <div className="border border-gray-200 p-8 rounded-2xl hover:border-indigo-200 transition">
              <h3 className="text-xl font-bold mb-2">Starter</h3>
              <p className="text-gray-500 mb-6">Perfect for side projects.</p>
              <div className="text-4xl font-bold mb-6">$0 <span className="text-sm font-normal text-gray-400">/mo</span></div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center space-x-3"><CheckCircle size={18} className="text-green-500"/> <span>1 Chatbot</span></li>
                <li className="flex items-center space-x-3"><CheckCircle size={18} className="text-green-500"/> <span>100 Chats/month</span></li>
                <li className="flex items-center space-x-3"><CheckCircle size={18} className="text-green-500"/> <span>Basic Analytics</span></li>
              </ul>
              <Link to="/login" className="block text-center bg-gray-900 text-white py-3 rounded-lg font-bold">Get Started</Link>
            </div>
            
            {/* Pro Plan */}
            <div className="border-2 border-indigo-600 p-8 rounded-2xl relative bg-indigo-50/50">
              <div className="absolute top-0 right-0 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">POPULAR</div>
              <h3 className="text-xl font-bold mb-2">Pro Business</h3>
              <p className="text-gray-500 mb-6">For growing companies.</p>
              <div className="text-4xl font-bold mb-6">$29 <span className="text-sm font-normal text-gray-400">/mo</span></div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center space-x-3"><CheckCircle size={18} className="text-indigo-600"/> <span>Unlimited Chatbots</span></li>
                <li className="flex items-center space-x-3"><CheckCircle size={18} className="text-indigo-600"/> <span>Unlimited Chats</span></li>
                <li className="flex items-center space-x-3"><CheckCircle size={18} className="text-indigo-600"/> <span>Remove Branding</span></li>
              </ul>
              <Link to="/login" className="block text-center bg-indigo-600 text-white py-3 rounded-lg font-bold shadow-lg hover:bg-indigo-700 transition">Upgrade Now</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 py-12 text-center text-gray-500">
        <p>&copy; 2026 DEV. Inc. Built by Abdul Rehman.</p>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, desc }) => (
  <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition">
    <div className="bg-gray-50 w-12 h-12 rounded-lg flex items-center justify-center mb-6 text-2xl">
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-3">{title}</h3>
    <p className="text-gray-500 leading-relaxed">{desc}</p>
  </div>
);

export default Landing;