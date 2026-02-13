import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
    
    try {
      const res = await axios.post(`http://localhost:5000${endpoint}`, formData);
      if (isLogin) {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data.user));
        toast.success('Welcome back!');
        navigate('/dashboard');
      } else {
        toast.success('Account created! Please login.');
        setIsLogin(true);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Authentication failed');
    }
  };

  return (
    // 1. Outer Background (Soft Gray Gradient)
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center p-4">
      
      {/* 2. Main Card Container */}
      <motion.div 
        layout
        className={`bg-white rounded-2xl shadow-2xl overflow-hidden w-full max-w-5xl flex flex-col md:flex-row ${
          isLogin ? '' : 'md:flex-row-reverse' // 3. Swapping Logic (Right <-> Left)
        }`}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >

        {/* --- FORM SECTION --- */}
        <div className="w-full md:w-1/2 flex flex-col justify-center px-8 md:px-12 py-12">
          <div className="mb-8">
            <h1 className="text-3xl font-black text-indigo-600 tracking-tighter">DEV.</h1>
          </div>

          <AnimatePresence mode='wait'>
            <motion.div 
              key={isLogin ? "login" : "signup"}
              initial={{ opacity: 0, x: isLogin ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: isLogin ? 20 : -20 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {isLogin ? 'Welcome Back' : 'Create Account'}
              </h2>
              <p className="text-gray-500 mb-6 text-sm">
                {isLogin ? 'Enter your details to access your dashboard.' : 'Start building your AI chatbot today.'}
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                {!isLogin && (
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Full Name</label>
                    <input 
                      name="name" type="text" placeholder="John Doe" required
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                      onChange={handleChange}
                    />
                  </div>
                )}
                
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Email Address</label>
                  <input 
                    name="email" type="email" placeholder="you@example.com" required
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Password</label>
                  <input 
                    name="password" type="password" placeholder="••••••••" required
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                    onChange={handleChange}
                  />
                </div>

                <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-lg shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-1">
                  {isLogin ? 'Sign In' : 'Sign Up'}
                </button>
              </form>

              <div className="mt-6 text-center text-sm text-gray-600">
                {isLogin ? "New to DEV.? " : "Already a member? "}
                <button 
                  onClick={() => setIsLogin(!isLogin)} 
                  className="text-indigo-600 font-bold hover:underline"
                >
                  {isLogin ? 'Create Account' : 'Login'}
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* --- VISUAL SECTION (Gradient Side) --- */}
        <div className="hidden md:flex w-1/2 bg-gradient-to-br from-indigo-600 to-purple-700 justify-center items-center text-white relative overflow-hidden">
          {/* Shapes */}
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
             <motion.div 
               animate={{ y: [0, -20, 0], x: [0, 10, 0] }} 
               transition={{ repeat: Infinity, duration: 5 }}
               className="absolute top-10 left-10 w-40 h-40 bg-white rounded-full mix-blend-overlay blur-3xl"
             />
             <motion.div 
               animate={{ y: [0, 20, 0], x: [0, -10, 0] }} 
               transition={{ repeat: Infinity, duration: 7 }}
               className="absolute bottom-10 right-10 w-60 h-60 bg-pink-500 rounded-full mix-blend-overlay blur-3xl"
             />
          </div>
          
          <div className="z-10 text-center px-10">
            <motion.div
               key={isLogin ? "login-img" : "signup-img"}
               initial={{ opacity: 0, scale: 0.8 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold mb-4">
                {isLogin ? 'Automate Your Support' : 'Join the Revolution'}
              </h2>
              <p className="text-indigo-100 text-base max-w-sm mx-auto mb-8">
                {isLogin 
                  ? 'Transform your customer service with our intelligent AI chatbots.' 
                  : 'Create your account and start training your custom AI agent in seconds.'}
              </p>
              
              {/* Code Preview Box */}
              <div className="mx-auto bg-white/10 backdrop-blur-lg p-5 rounded-xl border border-white/20 shadow-2xl max-w-xs text-left">
                <div className="flex items-center space-x-2 mb-3">
                   <div className="w-2.5 h-2.5 bg-red-400 rounded-full"></div>
                   <div className="w-2.5 h-2.5 bg-yellow-400 rounded-full"></div>
                   <div className="w-2.5 h-2.5 bg-green-400 rounded-full"></div>
                </div>
                <div className="font-mono text-xs text-indigo-200 space-y-1">
                  <p>{`> const user = "${isLogin ? 'Admin' : 'NewUser'}";`}</p>
                  <p>{`> AI.connect();`}</p>
                  <p className="text-green-300 font-bold">{`> Status: Ready 🚀`}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

      </motion.div>
    </div>
  );
};

export default Login;