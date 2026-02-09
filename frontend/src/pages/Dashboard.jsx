import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Copy } from 'lucide-react';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const [config, setConfig] = useState({ businessName: '', supportEmail: '', knowledgeBase: '' });
  const [userId, setUserId] = useState('');

  useEffect(() => {
    // Fetch initial data
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
    setUserId(user.id);

    axios.get('http://localhost:5000/api/chatbot/settings', {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setConfig(res.data));
  }, []);

  const handleSave = async () => {
    const token = localStorage.getItem('token');
    try {
      await axios.put('http://localhost:5000/api/chatbot/settings', config, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Settings Saved!');
    } catch (err) {
      toast.error('Failed to save settings');
    }
  };

  const embedCode = `<script src="http://localhost:5000/widget/embed.js" data-id="${userId}"></script>`;

  const copyCode = () => {
    navigator.clipboard.writeText(embedCode);
    toast.success('Copied to clipboard!');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6">Chatbot Settings</h1>
        
        {/* Business Details Section */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Business Details</h2>
          <div className="space-y-4">
            <input 
              type="text" 
              placeholder="Business Name" 
              className="w-full p-3 border rounded-md"
              value={config.businessName}
              onChange={e => setConfig({...config, businessName: e.target.value})}
            />
            <input 
              type="text" 
              placeholder="Support Email" 
              className="w-full p-3 border rounded-md"
              value={config.supportEmail}
              onChange={e => setConfig({...config, supportEmail: e.target.value})}
            />
          </div>
        </div>

        {/* Knowledge Base Section */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Knowledge Base (AI Context)</h2>
          <textarea 
            placeholder="Enter your refund policy, shipping times, etc. The AI will use this to answer." 
            className="w-full p-3 border rounded-md h-40"
            value={config.knowledgeBase}
            onChange={e => setConfig({...config, knowledgeBase: e.target.value})}
          />
          <button onClick={handleSave} className="mt-4 bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800">
            Save Changes
          </button>
        </div>

        {/* Embed Code Section */}
        <div className="border-t pt-8">
          <h2 className="text-lg font-semibold mb-4">Embed Chatbot</h2>
          <p className="text-gray-500 mb-2">Copy and paste this code before the closing &lt;/body&gt; tag.</p>
          <div className="bg-gray-900 text-white p-4 rounded-md flex justify-between items-center font-mono text-sm">
            <code>{embedCode}</code>
            <button onClick={copyCode} className="ml-4 bg-white text-black px-3 py-1 rounded text-xs font-bold">
              Copy
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;