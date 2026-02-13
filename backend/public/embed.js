(function() {
  // 1. Configuration & Helper Variables
  const scriptTag = document.currentScript;
  const chatbotId = scriptTag.getAttribute('data-id');
  const API_BASE = "http://localhost:5000/api";
  
  // Default color (will be overwritten by API)
  let primaryColor = '#4f46e5';

  // Helper: Adjust brightness
  const adjustBrightness = (hex, percent) => {
    const num = parseInt(hex.replace('#', ''), 16);
    const amt = Math.round(2.55 * percent);
    const R = Math.max(0, Math.min(255, (num >> 16) + amt));
    const G = Math.max(0, Math.min(255, ((num >> 8) & 0x00FF) + amt));
    const B = Math.max(0, Math.min(255, (num & 0x0000FF) + amt));
    return `#${(0x1000000 + R * 0x10000 + G * 0x100 + B).toString(16).slice(1)}`;
  };

  // Helper: Hex to RGBA
  const hexToRgba = (hex, alpha) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  // Apply colors dynamically
  const applyColors = (color) => {
    const darkerColor = adjustBrightness(color, -20);
    const shadowColor = hexToRgba(color, 0.4);
    
    // Update CSS variables
    const launcher = document.getElementById('dev-launcher');
    const header = document.querySelector('.dev-ai-header');
    const sendBtn = document.getElementById('dev-send');
    const inputEl = document.getElementById('dev-input');
    
    if (launcher) {
      launcher.style.background = color;
      launcher.style.boxShadow = `0 4px 14px ${shadowColor}`;
    }
    if (header) {
      header.style.background = `linear-gradient(135deg, ${color} 0%, ${darkerColor} 100%)`;
    }
    if (sendBtn) {
      sendBtn.style.background = color;
    }
    
    // Update user message colors via style tag
    let dynamicStyle = document.getElementById('dev-ai-dynamic-style');
    if (!dynamicStyle) {
      dynamicStyle = document.createElement('style');
      dynamicStyle.id = 'dev-ai-dynamic-style';
      document.head.appendChild(dynamicStyle);
    }
    dynamicStyle.textContent = `
      .dev-ai-msg.user { background: ${color} !important; box-shadow: 0 4px 6px ${hexToRgba(color, 0.2)} !important; }
      .dev-ai-input:focus { border-color: ${color} !important; box-shadow: 0 0 0 3px ${hexToRgba(color, 0.1)} !important; }
      .dev-ai-send:hover { background: ${darkerColor} !important; }
      .dev-ai-launcher:hover { box-shadow: 0 6px 20px ${hexToRgba(color, 0.6)} !important; }
    `;
  };

  // Fetch user's widget config (color settings)
  const loadConfig = async () => {
    try {
      const res = await fetch(`${API_BASE}/widget/config/${chatbotId}`);
      const data = await res.json();
      if (data.primaryColor) {
        primaryColor = data.primaryColor;
        applyColors(primaryColor);
      }
    } catch (err) {
      console.log('Widget: Using default colors');
    }
  };

  // 2. Inject Professional CSS Styles
  const style = document.createElement('style');
  style.innerHTML = `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');

    /* Reset & Fonts */
    .dev-ai-widget, .dev-ai-widget * {
      box-sizing: border-box;
      font-family: 'Inter', sans-serif;
    }

    /* Launcher Button (Floating Icon) */
    .dev-ai-launcher {
      position: fixed;
      bottom: 20px;
      right: 20px;
      width: 60px;
      height: 60px;
      background: #4f46e5;
      border-radius: 50%;
      cursor: pointer;
      box-shadow: 0 4px 14px rgba(79, 70, 229, 0.4);
      display: flex;
      align-items: center;
      justify-content: center;
      transition: transform 0.2s ease, box-shadow 0.2s ease;
      z-index: 999999;
    }
    .dev-ai-launcher:hover {
      transform: scale(1.05);
    }
    .dev-ai-launcher svg {
      width: 30px;
      height: 30px;
      stroke: white;
    }

    /* Chat Window Container */
    .dev-ai-window {
      position: fixed;
      bottom: 100px;
      right: 20px;
      width: 380px;
      height: 600px;
      max-height: 80vh;
      background: white;
      border-radius: 16px;
      box-shadow: 0 12px 40px rgba(0,0,0,0.15);
      display: flex;
      flex-direction: column;
      overflow: hidden;
      z-index: 999999;
      opacity: 0;
      pointer-events: none;
      transform: translateY(20px);
      transition: opacity 0.3s ease, transform 0.3s ease;
    }
    .dev-ai-window.open {
      opacity: 1;
      pointer-events: all;
      transform: translateY(0);
    }

    /* Window Header */
    .dev-ai-header {
      background: linear-gradient(135deg, #4f46e5 0%, #3730a3 100%);
      padding: 16px 20px;
      color: white;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }
    .dev-ai-header-info { display: flex; flex-direction: column; }
    .dev-ai-title {
      margin: 0;
      font-size: 16px;
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .dev-ai-subtitle { font-size: 12px; opacity: 0.8; margin-top: 2px; }
    .dev-ai-status-dot {
      width: 8px;
      height: 8px;
      background: #22c55e;
      border-radius: 50%;
      box-shadow: 0 0 0 2px rgba(255,255,255,0.2);
    }
    .dev-ai-close {
      cursor: pointer;
      opacity: 0.8;
      padding: 4px;
      border-radius: 4px;
      transition: background 0.2s;
    }
    .dev-ai-close:hover { background: rgba(255,255,255,0.1); opacity: 1; }

    /* Messages Area */
    .dev-ai-messages {
      flex: 1;
      padding: 20px;
      overflow-y: auto;
      background: #f9fafb;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .dev-ai-messages::-webkit-scrollbar { width: 6px; }
    .dev-ai-messages::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 10px; }

    /* Message Bubbles */
    .dev-ai-msg {
      max-width: 80%;
      padding: 12px 16px;
      border-radius: 12px;
      font-size: 14px;
      line-height: 1.5;
      word-wrap: break-word;
      animation: fadeIn 0.3s ease;
    }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }

    .dev-ai-msg.bot {
      align-self: flex-start;
      background: white;
      color: #1f2937;
      border: 1px solid #e5e7eb;
      border-bottom-left-radius: 2px;
      box-shadow: 0 1px 2px rgba(0,0,0,0.05);
    }
    
    .dev-ai-msg.user {
      align-self: flex-end;
      background: #4f46e5;
      color: white;
      border-bottom-right-radius: 2px;
    }

    /* Input Area */
    .dev-ai-input-area {
      padding: 16px;
      background: white;
      border-top: 1px solid #f3f4f6;
      display: flex;
      gap: 10px;
      align-items: center;
    }
    .dev-ai-input {
      flex: 1;
      padding: 12px 16px;
      border: 1px solid #e5e7eb;
      border-radius: 24px;
      outline: none;
      font-size: 14px;
      transition: border-color 0.2s, box-shadow 0.2s;
    }
    .dev-ai-send {
      background: #4f46e5;
      color: white;
      border: none;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background 0.2s, transform 0.1s;
    }
    .dev-ai-send:active { transform: scale(0.95); }
    .dev-ai-send svg { width: 18px; height: 18px; margin-left: 2px; }

    /* Typing Indicator */
    .typing-indicator {
      display: flex;
      align-items: center;
      gap: 4px;
      padding: 12px 16px;
      background: white;
      border: 1px solid #e5e7eb;
      border-radius: 12px;
      border-bottom-left-radius: 2px;
      width: fit-content;
    }
    .typing-dot {
      width: 6px;
      height: 6px;
      background: #9ca3af;
      border-radius: 50%;
      animation: bounce 1.4s infinite ease-in-out both;
    }
    .typing-dot:nth-child(1) { animation-delay: -0.32s; }
    .typing-dot:nth-child(2) { animation-delay: -0.16s; }
    
    @keyframes bounce {
      0%, 80%, 100% { transform: scale(0); }
      40% { transform: scale(1); }
    }

    /* Footer */
    .dev-ai-footer {
      text-align: center;
      padding: 8px;
      font-size: 11px;
      color: #9ca3af;
      font-weight: bold;
      background: #f9fafb;
      border-top: 1px solid #f3f4f6;
    }

    /* Mobile Responsive */
    @media (max-width: 480px) {
      .dev-ai-window {
        width: 100% !important;
        height: 100% !important;
        max-height: 100% !important;
        bottom: 0 !important;
        right: 0 !important;
        border-radius: 0 !important;
      }
    }
  `;
  document.head.appendChild(style);

  // 3. Create Widget HTML Structure
  const wrapper = document.createElement('div');
  wrapper.className = 'dev-ai-widget';
  
  wrapper.innerHTML = `
    <div class="dev-ai-launcher" id="dev-launcher">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
      </svg>
    </div>

    <div class="dev-ai-window" id="dev-window">
      <div class="dev-ai-header">
        <div class="dev-ai-header-info">
          <h3 class="dev-ai-title">
            <span class="dev-ai-status-dot"></span> 
            Support Assistant
          </h3>
          <span class="dev-ai-subtitle">Ask us anything</span>
        </div>
        <div class="dev-ai-close" id="dev-close">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </div>
      </div>

      <div class="dev-ai-messages" id="dev-messages">
        <div class="dev-ai-msg bot">Hello! 👋<br>How can I help you today?</div>
      </div>

      <div class="dev-ai-input-area">
        <input type="text" class="dev-ai-input" id="dev-input" placeholder="Type your message..." />
        <button class="dev-ai-send" id="dev-send">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </button>
      </div>
      
      <div class="dev-ai-footer">
  Powered by 
  <a href="https://abdulrehman06.vercel.app" target="_blank" style="text-decoration: none;">
    <span style="color: #4f46e5; font-weight: bold; font-size: 12px; cursor: pointer; text-decoration: underline;">DEV.</span>
  </a>
</div>
    </div>
  `;

  document.body.appendChild(wrapper);

  // 4. Load config and apply custom colors
  loadConfig();

  // 5. Widget Logic & Event Listeners
  const launcher = document.getElementById('dev-launcher');
  const windowEl = document.getElementById('dev-window');
  const closeBtn = document.getElementById('dev-close');
  const sendBtn = document.getElementById('dev-send');
  const inputEl = document.getElementById('dev-input');
  const messagesEl = document.getElementById('dev-messages');

  // Toggle Chat Window
  const toggleChat = () => {
    const isOpen = windowEl.classList.contains('open');
    if (isOpen) {
      windowEl.classList.remove('open');
    } else {
      windowEl.classList.add('open');
      setTimeout(() => inputEl.focus(), 100);
    }
  };
  
  launcher.onclick = toggleChat;
  closeBtn.onclick = toggleChat;

  // Function to Append Messages
  const appendMessage = (text, sender) => {
    const div = document.createElement('div');
    div.className = `dev-ai-msg ${sender}`;
    div.innerHTML = text.replace(/\n/g, '<br>');
    messagesEl.appendChild(div);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  };

  // Function to Show Typing Animation
  const showTyping = () => {
    const div = document.createElement('div');
    div.className = 'typing-indicator';
    div.id = 'dev-typing';
    div.innerHTML = `<div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div>`;
    messagesEl.appendChild(div);
    messagesEl.scrollTop = messagesEl.scrollHeight;
    return div;
  };

  // Send Message Function
  const sendMessage = async () => {
    const message = inputEl.value.trim();
    if (!message) return;

    appendMessage(message, 'user');
    inputEl.value = '';

    const typingEl = showTyping();

    try {
      const res = await fetch(`${API_BASE}/widget/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, chatbotId })
      });
      const data = await res.json();
      
      typingEl.remove();
      if (data.reply) {
        appendMessage(data.reply, 'bot');
      } else {
        appendMessage("Sorry, I didn't get that.", 'bot');
      }

    } catch (err) {
      typingEl.remove();
      appendMessage("Unable to connect to the server. Please try again later.", 'bot');
      console.error('Chat Widget Error:', err);
    }
  };

  // Event Listeners for Sending
  sendBtn.onclick = sendMessage;
  inputEl.onkeypress = (e) => {
    if (e.key === 'Enter') sendMessage();
  };

})();