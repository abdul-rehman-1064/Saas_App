import React, { useState, useEffect } from 'react';
import { Copy } from 'lucide-react';
import toast from 'react-hot-toast';
import DashboardLayout from '../../components/DashboardLayout';

const Integration = () => {
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if(user) setUserId(user.id);
  }, []);

  const embedCode = `<script src="http://localhost:5000/widget/embed.js" data-id="${userId}"></script>`;

  const copyCode = () => {
    navigator.clipboard.writeText(embedCode);
    toast.success('Copied to clipboard!');
  };

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Integration Guide</h2>
        <p className="text-gray-500 text-sm">Add the chatbot to your website in seconds.</p>
      </div>

      <div className="max-w-3xl animate-fadeIn">
        <div className="bg-indigo-50 border border-indigo-100 p-6 rounded-lg mb-6">
          <h3 className="text-lg font-semibold text-indigo-900 mb-2">How to Install</h3>
          <ol className="list-decimal list-inside text-indigo-800 space-y-2 text-sm md:text-base">
            <li>Copy the script tag shown below.</li>
            <li>Open your website's <code className="bg-white px-1 py-0.5 rounded border border-indigo-200 text-xs">index.html</code> file.</li>
            <li>Paste the code just before the closing <code className="bg-white px-1 py-0.5 rounded border border-indigo-200 text-xs">{'</body>'}</code> tag.</li>
            <li>Save and reload your website.</li>
          </ol>
        </div>

        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
          <div className="relative bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto">
            <pre className="font-mono text-xs md:text-sm whitespace-pre-wrap break-all">
              {embedCode}
            </pre>
            <button 
              onClick={copyCode}
              className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white p-2 rounded transition backdrop-blur-sm"
            >
              <Copy size={18}/>
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Integration;