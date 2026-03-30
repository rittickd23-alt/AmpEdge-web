import os

old_html_ai_chat = """<!-- AI Chatbot Widget -->
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

embedded_ai_html = """<!-- Embedded AI Chatbot Section -->
<section class="ai-embedded-section" style="padding: 60px 0; background: linear-gradient(180deg, var(--bg) 0%, #f1f5f9 100%);">
  <div class="container">
    <div style="max-width: 800px; margin: 0 auto;">
      <div style="text-align: center; margin-bottom: 32px;">
        <div class="chip" style="background:rgba(65,105,225,0.1);color:#4169E1;border-color:rgba(65,105,225,0.2)"><span class="dot" style="background:#4169E1"></span>24/7 AI Support</div>
        <h2 style="font-size: 32px; margin-top: 12px; margin-bottom: 12px;">Ask AMPEdge AI</h2>
        <p style="color: var(--text);">Get instant answers to your electrical queries right here.</p>
      </div>
      
      <div class="embedded-chat-window" style="background: #fff; border: 1px solid var(--border); border-radius: 16px; box-shadow: var(--s2); overflow: hidden;">
        <div class="chat-header" style="background: linear-gradient(135deg, #4169E1, #8A2BE2); padding: 16px 20px; color: #fff; display: flex; align-items: center; gap: 16px;">
          <div style="width: 44px; height: 44px; background: rgba(255,255,255,0.2); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 22px;">🤖</div>
          <div>
            <div style="font-weight: 700; font-size: 16px; letter-spacing: 0.5px;">AMPEdge AI</div>
            <div style="font-size: 13px; opacity: 0.85; margin-top: 2px;">🟢 Online - Ready to help</div>
          </div>
        </div>
        <div class="chat-body" id="embeddedChatBody" style="padding: 24px 20px; height: 350px; overflow-y: auto; display: flex; flex-direction: column; gap: 16px; background: #f8fafc;">
          <div class="chat-msg bot-msg" style="max-width: 85%; padding: 14px 18px; border-radius: 12px; font-size: 14.5px; line-height: 1.5; background: #fff; border: 1px solid #e2e8f0; color: #1e293b; align-self: flex-start; border-bottom-left-radius: 4px; box-shadow: 0 2px 4px rgba(0,0,0,0.02)">Hello! I'm the AMPEdge AI Assistant. How can I help you with your electrical needs today?</div>
        </div>
        <div class="chat-input-area" style="padding: 16px 20px; background: #fff; border-top: 1px solid var(--border); display: flex; gap: 12px;">
          <input type="text" id="embeddedChatInput" placeholder="Type your question here..." onkeypress="if(event.key==='Enter') sendEmbeddedMsg()" style="flex: 1; padding: 14px 20px; border: 1px solid #cbd5e1; border-radius: 30px; outline: none; font-size: 15px;"/>
          <button onclick="sendEmbeddedMsg()" style="background: #4169E1; color: #fff; border: none; width: 50px; height: 50px; border-radius: 50%; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 20px; box-shadow: 0 4px 12px rgba(65,105,225,0.3); transition: transform 0.2s" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">➤</button>
        </div>
      </div>
    </div>
  </div>
</section>

"""

js_embedded_chat = """

window.sendEmbeddedMsg = function() {
  const inp = document.getElementById('embeddedChatInput');
  if(!inp) return;
  const txt = inp.value.trim();
  if(!txt) return;
  const b = document.getElementById('embeddedChatBody');
  if(!b) return;
  b.innerHTML += `<div class="chat-msg user-msg" style="max-width: 85%; padding: 14px 18px; border-radius: 12px; font-size: 14.5px; line-height: 1.5; background: #4169E1; color: #fff; align-self: flex-end; border-bottom-right-radius: 4px; border: none; box-shadow: 0 2px 4px rgba(65,105,225,0.2)">${txt}</div>`;
  inp.value = '';
  b.scrollTop = b.scrollHeight;
  setTimeout(() => {
    b.innerHTML += `<div class="chat-msg bot-msg" style="max-width: 85%; padding: 14px 18px; border-radius: 12px; font-size: 14.5px; line-height: 1.5; background: #fff; border: 1px solid #e2e8f0; color: #1e293b; align-self: flex-start; border-bottom-left-radius: 4px; box-shadow: 0 2px 4px rgba(0,0,0,0.02)">Thanks for reaching out! Since I'm an AI assistant in demo mode, please use the WhatsApp or Google Form below to contact our team directly for detailed queries!</div>`;
    b.scrollTop = b.scrollHeight;
  }, 1000);
};
"""

for f in ['index.html', 'booking.html', 'partner.html', 'marketplace.html']:
    with open(f, 'r', encoding='utf-8') as file:
        data = file.read()
    
    # remove old float AI chatbot
    data = data.replace(old_html_ai_chat, '')
    
    # insert the new embedded AI chatbot right before the Google form section
    if '<!-- Embedded AI Chatbot Section -->' not in data:
        data = data.replace('<!-- Google Form Section -->', embedded_ai_html + '<!-- Google Form Section -->')
    
    with open(f, 'w', encoding='utf-8') as file:
        file.write(data)

with open('js/main.js', 'r', encoding='utf-8') as file:
    js_data = file.read()

if 'sendEmbeddedMsg' not in js_data:
    with open('js/main.js', 'a', encoding='utf-8') as file:
        file.write(js_embedded_chat)

print("Update 3 completed successfully!")
