(function() {
  const scriptTag = document.currentScript;
  const chatbotId = scriptTag.getAttribute('data-id');
  const API_BASE = "http://localhost:5000/api"; // Change this to your deployed domain

  // Create Chat Icon
  const chatButton = document.createElement('div');
  chatButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>`;
  chatButton.style.cssText = "position:fixed; bottom:20px; right:20px; background:#000; width:60px; height:60px; border-radius:50%; display:flex; align-items:center; justify-content:center; cursor:pointer; box-shadow:0 4px 12px rgba(0,0,0,0.1); z-index:9999;";
  
  // Create Chat Window (Hidden by default)
  const chatWindow = document.createElement('div');
  chatWindow.style.cssText = "position:fixed; bottom:90px; right:20px; width:350px; height:500px; background:white; border-radius:10px; box-shadow:0 5px 20px rgba(0,0,0,0.2); display:none; flex-direction:column; z-index:9999; overflow:hidden;";
  chatWindow.innerHTML = `
    <div style="background:#000; color:white; padding:15px; font-weight:bold; display:flex; justify-content:space-between;">
        <span>Support AI</span>
        <span id="close-chat" style="cursor:pointer;">&times;</span>
    </div>
    <div id="chat-messages" style="flex:1; padding:15px; overflow-y:auto; background:#f9f9f9;">
        <div style="margin-bottom:10px; color:#555; font-size:14px;">Hello! How can I help you today?</div>
    </div>
    <div style="padding:10px; border-top:1px solid #eee; display:flex;">
        <input type="text" id="chat-input" placeholder="Type a message..." style="flex:1; padding:10px; border:1px solid #ddd; border-radius:5px; outline:none;">
        <button id="send-btn" style="margin-left:5px; background:#000; color:white; border:none; padding:10px 15px; border-radius:5px; cursor:pointer;">Send</button>
    </div>
  `;

  document.body.appendChild(chatButton);
  document.body.appendChild(chatWindow);

  // Toggle Chat
  chatButton.onclick = () => {
      chatWindow.style.display = chatWindow.style.display === 'none' ? 'flex' : 'none';
  };
  document.getElementById('close-chat').onclick = () => {
      chatWindow.style.display = 'none';
  };

  // Send Message Logic
  const sendMessage = async () => {
      const input = document.getElementById('chat-input');
      const message = input.value;
      if(!message) return;

      const messagesDiv = document.getElementById('chat-messages');
      
      // User Message
      messagesDiv.innerHTML += `<div style="text-align:right; margin-bottom:10px;"><span style="background:#000; color:white; padding:8px 12px; border-radius:15px 15px 0 15px; display:inline-block;">${message}</span></div>`;
      input.value = '';
      messagesDiv.scrollTop = messagesDiv.scrollHeight;

      // Loading State
      const loadingDiv = document.createElement('div');
      loadingDiv.textContent = "Typing...";
      loadingDiv.style.fontSize = "12px";
      messagesDiv.appendChild(loadingDiv);

      try {
          const res = await fetch(`${API_BASE}/widget/chat`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ message, chatbotId })
          });
          const data = await res.json();
          
          messagesDiv.removeChild(loadingDiv);
          // Bot Response
          messagesDiv.innerHTML += `<div style="text-align:left; margin-bottom:10px;"><span style="background:#e5e7eb; color:black; padding:8px 12px; border-radius:15px 15px 15px 0; display:inline-block;">${data.reply}</span></div>`;
          messagesDiv.scrollTop = messagesDiv.scrollHeight;
      } catch (err) {
          messagesDiv.removeChild(loadingDiv);
          console.error(err);
      }
  };

  document.getElementById('send-btn').onclick = sendMessage;
  document.getElementById('chat-input').onkeypress = (e) => {
      if(e.key === 'Enter') sendMessage();
  };

})();