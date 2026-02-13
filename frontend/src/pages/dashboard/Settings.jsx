import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Save, Building, Mail, Bot, Loader2, Info, Palette } from 'lucide-react';
import toast from 'react-hot-toast';
import DashboardLayout from '../../components/DashboardLayout';

// Preset colors for quick selection
const colorPresets = [
  { name: 'Indigo', value: '#4f46e5' },
  { name: 'Blue', value: '#2563eb' },
  { name: 'Purple', value: '#7c3aed' },
  { name: 'Pink', value: '#db2777' },
  { name: 'Red', value: '#dc2626' },
  { name: 'Orange', value: '#ea580c' },
  { name: 'Green', value: '#16a34a' },
  { name: 'Teal', value: '#0d9488' },
  { name: 'Gray', value: '#4b5563' },
  { name: 'Black', value: '#1f2937' },
];

const Settings = () => {
  const [config, setConfig] = useState({ businessName: '', supportEmail: '', knowledgeBase: '', primaryColor: '#4f46e5' });
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await axios.get('http://localhost:5000/api/chatbot/settings', {
          headers: { Authorization: `Bearer ${token}` }
        });
        // Merge with defaults to ensure all fields have values
        setConfig({
          businessName: res.data?.businessName || '',
          supportEmail: res.data?.supportEmail || '',
          knowledgeBase: res.data?.knowledgeBase || '',
          primaryColor: res.data?.primaryColor || '#4f46e5'
        });
      } catch (error) {
        toast.error('Could not load settings');
      } finally {
        setFetching(false);
      }
    };
    fetchSettings();
  }, []);

  const handleSave = async () => {
    setLoading(true);
    const token = localStorage.getItem('token');
    try {
      await axios.put('http://localhost:5000/api/chatbot/settings', config, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Configuration updated successfully!');
    } catch (err) {
      toast.error('Failed to save settings');
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Bot Configuration</h1>
          <p className="text-gray-500 mt-2">Manage your chatbot's identity and knowledge base.</p>
        </div>

        {fetching ? (
          /* Skeleton Loader (Jab data load ho raha ho) */
          <div className="space-y-4 animate-pulse">
            <div className="h-12 bg-gray-200 rounded-lg w-full"></div>
            <div className="h-64 bg-gray-200 rounded-lg w-full"></div>
          </div>
        ) : (
          <div className="space-y-6">
            
            {/* Card 1: Identity Information */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-100">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <Bot size={20} className="text-indigo-600"/> 
                  Bot Identity
                </h3>
              </div>
              
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Business Name</label>
                  <div className="relative">
                    <Building className="absolute left-3 top-3 text-gray-400" size={18} />
                    <input 
                      className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-sm"
                      value={config.businessName}
                      onChange={e => setConfig({...config, businessName: e.target.value})}
                      placeholder="e.g. Tech Solutions Inc."
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Support Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
                    <input 
                      className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-sm"
                      value={config.supportEmail}
                      onChange={e => setConfig({...config, supportEmail: e.target.value})}
                      placeholder="support@company.com"
                    />
                  </div>
                </div>

                {/* Color Picker - Full Width */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                    <Palette size={16} className="text-gray-500" />
                    Chatbot Color
                  </label>
                  
                  {/* Color Presets */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {colorPresets.map((color) => (
                      <button
                        key={color.value}
                        type="button"
                        onClick={() => setConfig({...config, primaryColor: color.value})}
                        className={`w-8 h-8 rounded-full border-2 transition-all hover:scale-110 ${
                          config.primaryColor === color.value 
                            ? 'border-gray-900 ring-2 ring-offset-2 ring-gray-400' 
                            : 'border-white shadow-md'
                        }`}
                        style={{ backgroundColor: color.value }}
                        title={color.name}
                      />
                    ))}
                  </div>

                  {/* Custom Color Input */}
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={config.primaryColor || '#4f46e5'}
                      onChange={e => setConfig({...config, primaryColor: e.target.value})}
                      className="w-12 h-10 rounded-lg cursor-pointer border border-gray-300"
                    />
                    <input
                      type="text"
                      value={config.primaryColor || '#4f46e5'}
                      onChange={e => setConfig({...config, primaryColor: e.target.value})}
                      className="w-28 px-3 py-2 border border-gray-300 rounded-lg text-sm font-mono uppercase"
                      placeholder="#4f46e5"
                    />
                    <div 
                      className="flex-1 h-10 rounded-lg flex items-center justify-center text-white text-sm font-medium shadow-md"
                      style={{ backgroundColor: config.primaryColor || '#4f46e5' }}
                    >
                      Preview
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2: Knowledge Base (AI Brain) */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-800">Knowledge Base</h3>
                <span className="text-xs font-medium px-2 py-1 bg-indigo-100 text-indigo-700 rounded-full">
                  Gemini AI Powered
                </span>
              </div>

              <div className="p-6">
                {/* Pro Tips Alert Box */}
                <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-4 flex gap-3">
                  <Info className="text-blue-600 flex-shrink-0" size={20} />
                  <div className="text-sm text-blue-800">
                    <strong>Tip:</strong> Provide clear details about your services, pricing, and return policies. 
                    The AI uses this exact text to answer customer questions.
                  </div>
                </div>

                <textarea 
                  className="w-full p-4 bg-slate-50 border border-gray-300 rounded-lg h-80 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none resize-none font-mono text-sm leading-relaxed text-gray-700 shadow-inner"
                  value={config.knowledgeBase}
                  onChange={e => setConfig({...config, knowledgeBase: e.target.value})}
                  placeholder={`Example:\n\n1. Return Policy: Returns accepted within 7 days.\n2. Shipping: We ship via FedEx in 3-5 days.\n3. Contact: Email us at help@example.com.`}
                />
              </div>
            </div>

            {/* Action Bar */}
            <div className="flex justify-end pt-4 pb-12">
              <button 
                onClick={handleSave} 
                disabled={loading}
                className={`
                  flex items-center gap-2 px-8 py-3 rounded-lg text-white font-medium shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5
                  ${loading ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'}
                `}
              >
                {loading ? <Loader2 size={20} className="animate-spin" /> : <Save size={20} />}
                <span>{loading ? 'Saving Changes...' : 'Save Configuration'}</span>
              </button>
            </div>

          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Settings;