import os

html_ai_chat = """<!-- AI Chatbot Widget -->
<button class="ai-bot-btn" onclick="toggleChat()">
  <span style="font-size:24px">🤖</span>
</button>

<div class="ai-chat-window" id="aiChat" style="display:none;">
  <div class="chat-header">
    <div style="display:flex;align-items:center;gap:12px">
      <div class="chat-avatar">🤖</div>
      <div>
        <div style="font-weight:700;font-size:15px;letter-spacing:0.5px">AMPEdge AI</div>
        <div style="font-size:12px;opacity:0.85;margin-top:2px">Online - Instant Help</div>
      </div>
    </div>
    <button onclick="toggleChat()" style="background:none;border:none;color:#fff;cursor:pointer;font-size:20px;padding:0 8px">✕</button>
  </div>
  <div class="chat-body" id="chatBody">
    <div class="chat-msg bot-msg">Hello! I'm the AMPEdge AI Assistant. How can I help you with your electrical needs today?</div>
  </div>
  <div class="chat-input-area">
    <input type="text" id="chatInput" placeholder="Type your query..." onkeypress="if(event.key==='Enter') sendMsg()"/>
    <button onclick="sendMsg()">➤</button>
  </div>
</div>
"""

google_form_html = """<!-- Google Form Section -->
<section class="query-section" style="padding: 60px 0; background: var(--bg); border-top: 1px solid var(--border);">
  <div class="container">
    <div style="max-width: 700px; margin: 0 auto; text-align: center;">
      <h2 style="font-size: 28px; margin-bottom: 12px;">Have any Queries?</h2>
      <p style="color: var(--text); margin-bottom: 32px;">Submit your question directly through our Google Form below and our team will get back to you instantly.</p>
      
      <div style="background: #fff; padding: 20px; border-radius: 16px; box-shadow: var(--s2); border: 1px solid var(--border);">
        <div style="padding: 40px; background: #f8fafc; border-radius: 12px; border: 2px dashed #cbd5e1; text-align: center;">
          <h3 style="color:#64748b;margin-bottom:8px">Your Google Form Goes Here</h3>
          <p style="color:#94a3b8;font-size:14px;margin-bottom:16px">You just need to paste your Google Form "iframe Embed HTML" right here replacing this placeholder!</p>
          <a href="https://forms.google.com" target="_blank" class="btn btn-primary" style="display:inline-flex">Create your Form →</a>
        </div>
      </div>
      
    </div>
  </div>
</section>

<footer class="footer">"""

css_ai_chat = """

/* AI Chatbot */
.ai-bot-btn {
  position: fixed;
  bottom: 24px;
  right: 94px;
  width: 55px;
  height: 55px;
  background: linear-gradient(135deg, #4169E1, #8A2BE2);
  color: #fff;
  border: none;
  border-radius: 50%;
  box-shadow: 0 4px 14px rgba(65,105,225,0.4);
  z-index: 1000;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.ai-bot-btn:hover {
  transform: translateY(-4px);
  box-shadow: 0 6px 18px rgba(65,105,225,0.6);
}
.ai-chat-window {
  position: fixed;
  bottom: 94px;
  right: 24px;
  width: 350px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 16px;
  box-shadow: 0 10px 40px rgba(0,0,0,0.2);
  z-index: 1001;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.chat-header {
  background: linear-gradient(135deg, #4169E1, #8A2BE2);
  padding: 16px 20px;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.chat-avatar {
  width: 36px; height: 36px; background: rgba(255,255,255,0.2); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 18px;
}
.chat-body {
  padding: 20px 16px;
  height: 320px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
  background: #f8fafc;
}
.chat-msg {
  max-width: 85%;
  padding: 12px 16px;
  border-radius: 12px;
  font-size: 13.5px;
  line-height: 1.5;
}
.bot-msg { background: #fff; border: 1px solid #e2e8f0; color: #1e293b; align-self: flex-start; border-bottom-left-radius: 4px; box-shadow: 0 2px 4px rgba(0,0,0,0.02)}
.user-msg { background: #4169E1; color: #fff; align-self: flex-end; border-bottom-right-radius: 4px; border: none; box-shadow: 0 2px 4px rgba(65,105,225,0.2)}
.chat-input-area {
  padding: 14px;
  background: #fff;
  border-top: 1px solid var(--border);
  display: flex;
  gap: 10px;
}
.chat-input-area input {
  flex: 1;
  padding: 12px 16px;
  border: 1px solid #cbd5e1;
  border-radius: 24px;
  outline: none;
  font-size: 14px;
}
.chat-input-area input:focus { border-color: #4169E1; }
.chat-input-area button {
  background: #4169E1;
  color: #fff;
  border: none;
  width: 44px; height: 44px;
  border-radius: 50%;
  cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  font-size: 18px;
}
"""

js_ai_chat = """

// ── AI Chatbot ─────────────────────────────────
window.toggleChat = function() {
  const c = document.getElementById('aiChat');
  if(c) c.style.display = c.style.display === 'none' ? 'flex' : 'none';
};
window.sendMsg = function() {
  const inp = document.getElementById('chatInput');
  const txt = inp.value.trim();
  if(!txt) return;
  const b = document.getElementById('chatBody');
  b.innerHTML += `<div class="chat-msg user-msg">${txt}</div>`;
  inp.value = '';
  b.scrollTop = b.scrollHeight;
  setTimeout(() => {
    b.innerHTML += `<div class="chat-msg bot-msg">Thanks for reaching out! I'm an AI assistant in demo mode right now. Please use the Google Form below to contact our team directly for detailed electrical queries!</div>`;
    b.scrollTop = b.scrollHeight;
  }, 1000);
};
"""

import sys

for f in ['index.html', 'booking.html', 'partner.html', 'marketplace.html']:
    with open(f, 'r', encoding='utf-8') as file:
        data = file.read()
    
    # inject google form right before footer
    if '<footer class="footer">' in data and 'class="query-section"' not in data:
      data = data.replace('<footer class="footer">', google_form_html)
      
    # inject ai widget HTML right before script
    if '<script src="js/main.js"></script>' in data and 'id="aiChat"' not in data:
      data = data.replace('<script src="js/main.js"></script>', html_ai_chat + '\n<script src="js/main.js"></script>')

    with open(f, 'w', encoding='utf-8') as file:
        file.write(data)

with open('css/style.css', 'r', encoding='utf-8') as file:
    css_data = file.read()

if '.ai-bot-btn' not in css_data:
    with open('css/style.css', 'a', encoding='utf-8') as file:
        file.write(css_ai_chat)

with open('js/main.js', 'r', encoding='utf-8') as file:
    js_data = file.read()

if 'toggleChat' not in js_data:
    with open('js/main.js', 'a', encoding='utf-8') as file:
        file.write(js_ai_chat)

print("Update completed successfully!")
