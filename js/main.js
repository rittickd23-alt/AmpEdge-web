/* ============================================
   AMPEDGE — Premium Main JavaScript
   ============================================ */

// ── Navbar scroll ────────────────────────────
window.addEventListener('scroll', () => {
  const n = document.getElementById('navbar');
  if (n) n.classList.toggle('scrolled', window.scrollY > 20);
});

// ── Mobile Nav ───────────────────────────────
function openMob() {
  const n = document.getElementById('mobNav');
  if (n) n.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeMob() {
  const n = document.getElementById('mobNav');
  if (n) n.classList.remove('open');
  document.body.style.overflow = '';
}

// ── Scroll reveal ────────────────────────────
const revealEls = document.querySelectorAll('.fade-up');
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.remove('hidden');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

window.addEventListener('DOMContentLoaded', () => {
  revealEls.forEach(el => {
    const r = el.getBoundingClientRect();
    if (r.top > window.innerHeight * 0.85) {
      el.classList.add('hidden');
    }
    io.observe(el);
  });
});

// ── Testimonial Slider ────────────────────────
let ti = 0;
const GAP = 404; // card width + gap

function scrollTesti(dir) {
  const track = document.getElementById('testiTrack');
  if (!track) return;
  const max = track.querySelectorAll('.testi-card').length - 1;
  ti = Math.max(0, Math.min(max, ti + dir));
  track.style.transform = `translateX(-${ti * GAP}px)`;
  updateDots();
}
function goTesti(idx) {
  ti = idx;
  const track = document.getElementById('testiTrack');
  if (track) track.style.transform = `translateX(-${ti * GAP}px)`;
  updateDots();
}
function updateDots() {
  document.querySelectorAll('.testi-dot').forEach((d, i) => {
    d.classList.toggle('active', i === ti);
  });
}
// Auto-play
setInterval(() => {
  const track = document.getElementById('testiTrack');
  if (!track) return;
  ti = (ti + 1) % track.querySelectorAll('.testi-card').length;
  track.style.transform = `translateX(-${ti * GAP}px)`;
  updateDots();
}, 5000);

// ── Service Chip Select ───────────────────────
function chipSel(el) {
  const group = el.closest('div');
  if (!group) return;
  group.querySelectorAll('.svc-chip').forEach(c => c.classList.remove('selected'));
  el.classList.add('selected');
}

// ── Category chip ─────────────────────────────
function chipClick(el) {
  document.querySelectorAll('.chip-item').forEach(c => c.classList.remove('active'));
  el.classList.add('active');
}

// ── Date select ───────────────────────────────
function dateClick(el) {
  if (el.classList.contains('disabled')) return;
  document.querySelectorAll('.date-item:not(.disabled)').forEach(d => d.classList.remove('selected'));
  el.classList.add('selected');
}

// ── Time slot select ──────────────────────────
function timeClick(el) {
  if (el.classList.contains('unavail')) return;
  document.querySelectorAll('.time-slot:not(.unavail)').forEach(t => t.classList.remove('selected'));
  el.classList.add('selected');
}

// ── Add to cart ───────────────────────────────
let cart = JSON.parse(sessionStorage.getItem('ampedge_cart') || '[]');

// Update all cart badges on page load
function updateCartBadge() {
  const count = cart.length;
  document.querySelectorAll('.cart-badge-count').forEach(el => {
    el.textContent = count;
  });
  // Target the nav cart button by id
  const navBtn = document.getElementById('navCartBtn');
  if (navBtn) {
    navBtn.innerHTML = `🛒 Cart (${count})`;
  }
  // Also update any other elements that show "Cart (N)"
  document.querySelectorAll('a, button').forEach(el => {
    if (el.id === 'navCartBtn') return; // already handled
    if (el.textContent.match(/🛒\s*Cart\s*\(\d+\)/)) {
      el.innerHTML = `🛒 Cart (${count})`;
    }
  });
}

// Run on page load
document.addEventListener('DOMContentLoaded', updateCartBadge);
// Also run immediately for scripts loaded at bottom
updateCartBadge();

// Cart popup — show/hide on cart button click
document.addEventListener('DOMContentLoaded', () => {
  const navBtn = document.getElementById('navCartBtn');
  if (navBtn) {
    navBtn.addEventListener('click', (e) => {
      e.preventDefault();
      toggleCartPopup();
    });
  }
});

function toggleCartPopup() {
  let popup = document.getElementById('cartPopup');
  if (popup) {
    popup.remove();
    return;
  }
  popup = document.createElement('div');
  popup.id = 'cartPopup';
  popup.style.cssText = `
    position: fixed; top: 72px; right: 24px; width: 380px; max-height: 70vh;
    background: #fff; border-radius: 20px; box-shadow: 0 20px 60px rgba(10,15,44,.2);
    z-index: 1001; display: flex; flex-direction: column; overflow: hidden;
    border: 1px solid rgba(65,105,225,.1);
    animation: toastIn 0.3s cubic-bezier(.34,1.56,.64,1);
  `;

  const items = JSON.parse(sessionStorage.getItem('ampedge_cart') || '[]');

  if (items.length === 0) {
    popup.innerHTML = `
      <div style="padding:32px;text-align:center">
        <div style="font-size:48px;margin-bottom:12px;opacity:0.4">🛒</div>
        <h3 style="font-size:18px;font-weight:800;color:#0a0f2c;margin-bottom:8px">Your cart is empty</h3>
        <p style="font-size:14px;color:#6b7280;margin-bottom:20px">Browse our marketplace and add products!</p>
        <a href="marketplace.html" class="btn btn-primary btn-sm" style="display:inline-flex">Explore Products →</a>
        <div style="margin-top:16px"><span style="cursor:pointer;font-size:13px;color:#6b7280" onclick="document.getElementById('cartPopup')?.remove()">Close</span></div>
      </div>
    `;
  } else {
    let total = 0;
    let itemsHTML = items.map((item, i) => {
      const price = parseInt(item.price.replace(/[₹,]/g, '')) || 0;
      total += price;
      return `
        <div style="display:flex;align-items:center;justify-content:space-between;padding:14px 0;border-bottom:1px solid rgba(0,0,0,.06)">
          <div style="flex:1">
            <div style="font-size:14px;font-weight:700;color:#0a0f2c">${item.name}</div>
            <div style="font-size:13px;color:#4169E1;font-weight:600;margin-top:2px">${item.price}</div>
          </div>
          <button onclick="removeCartItem(${i})" style="width:32px;height:32px;border-radius:8px;background:rgba(239,68,68,.1);border:none;color:#ef4444;font-size:16px;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all 0.2s" onmouseover="this.style.background='#ef4444';this.style.color='#fff'" onmouseout="this.style.background='rgba(239,68,68,.1)';this.style.color='#ef4444'">✕</button>
        </div>
      `;
    }).join('');

    popup.innerHTML = `
      <div style="padding:20px 24px;border-bottom:1px solid rgba(0,0,0,.06);display:flex;align-items:center;justify-content:space-between">
        <h3 style="font-size:16px;font-weight:800;color:#0a0f2c;margin:0">🛒 Your Cart (${items.length})</h3>
        <span style="cursor:pointer;font-size:20px;color:#6b7280;padding:4px" onclick="document.getElementById('cartPopup')?.remove()">✕</span>
      </div>
      <div style="padding:0 24px;overflow-y:auto;flex:1">${itemsHTML}</div>
      <div style="padding:20px 24px;border-top:1px solid rgba(0,0,0,.06);background:#f8faff">
        <div style="display:flex;justify-content:space-between;margin-bottom:14px">
          <span style="font-size:14px;font-weight:600;color:#6b7280">Total</span>
          <span style="font-size:18px;font-weight:900;color:#4169E1">₹${total.toLocaleString('en-IN')}</span>
        </div>
        <a href="https://wa.me/919123667258?text=Hi!%20I'd%20like%20to%20order%20these%20products%20from%20AmpEdge:%20${encodeURIComponent(items.map(i => i.name + ' (' + i.price + ')').join(', '))}" target="_blank" style="display:flex;align-items:center;justify-content:center;gap:8px;width:100%;padding:14px;background:linear-gradient(135deg,#4169E1,#2c4fd4);color:#fff;border-radius:14px;font-size:15px;font-weight:800;text-decoration:none;box-shadow:0 4px 20px rgba(65,105,225,0.4);transition:all 0.2s" onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform=''">Order via WhatsApp 💬</a>
        <button onclick="clearCart()" style="width:100%;padding:10px;margin-top:8px;background:none;border:1.5px solid rgba(239,68,68,.3);border-radius:10px;color:#ef4444;font-size:13px;font-weight:700;cursor:pointer;transition:all 0.2s" onmouseover="this.style.background='#ef4444';this.style.color='#fff';this.style.borderColor='#ef4444'" onmouseout="this.style.background='none';this.style.color='#ef4444';this.style.borderColor='rgba(239,68,68,.3)'">Clear Cart</button>
      </div>
    `;
  }
  document.body.appendChild(popup);
}

function removeCartItem(index) {
  cart.splice(index, 1);
  sessionStorage.setItem('ampedge_cart', JSON.stringify(cart));
  updateCartBadge();
  // Re-render popup
  document.getElementById('cartPopup')?.remove();
  toggleCartPopup();
  // Update product buttons on page
  refreshAddButtons();
}

function clearCart() {
  cart = [];
  sessionStorage.setItem('ampedge_cart', JSON.stringify(cart));
  updateCartBadge();
  document.getElementById('cartPopup')?.remove();
  toggleCartPopup();
  // Reset all add buttons
  refreshAddButtons();
  showCartToast('Cart cleared', 'remove');
}

function refreshAddButtons() {
  document.querySelectorAll('.add-btn').forEach(btn => {
    const card = btn.closest('.product-card');
    if (!card) return;
    const name = card.querySelector('.prod-name')?.textContent?.trim();
    if (name && cart.some(item => item.name === name)) {
      btn.textContent = '✓ Added';
      btn.style.background = '#10b981';
      btn.style.boxShadow = '0 2px 8px rgba(16,185,129,0.35)';
      btn.dataset.added = 'true';
    } else {
      btn.textContent = '+ Cart';
      btn.style.background = '';
      btn.style.boxShadow = '';
      btn.dataset.added = 'false';
    }
  });
}

// Mark already-added products on page load
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.add-btn').forEach(btn => {
    const card = btn.closest('.product-card');
    if (!card) return;
    const name = card.querySelector('.prod-name')?.textContent?.trim();
    if (name && cart.some(item => item.name === name)) {
      btn.textContent = '✓ Added';
      btn.style.background = '#10b981';
      btn.style.boxShadow = '0 2px 8px rgba(16,185,129,0.35)';
      btn.dataset.added = 'true';
    }
  });
});

function addToCart(btn) {
  const card = btn.closest('.product-card');
  if (!card) return;

  const name = card.querySelector('.prod-name')?.textContent?.trim() || 'Product';
  const priceText = card.querySelector('.prod-price')?.childNodes[0]?.textContent?.trim() || '₹0';

  // If already added, remove from cart
  if (btn.dataset.added === 'true') {
    cart = cart.filter(item => item.name !== name);
    sessionStorage.setItem('ampedge_cart', JSON.stringify(cart));
    btn.textContent = '+ Cart';
    btn.style.background = '';
    btn.style.boxShadow = '';
    btn.dataset.added = 'false';
    updateCartBadge();
    showCartToast(`${name} removed from cart`, 'remove');
    return;
  }

  // Add to cart
  cart.push({ name, price: priceText });
  sessionStorage.setItem('ampedge_cart', JSON.stringify(cart));
  btn.dataset.added = 'true';

  // Visual feedback — stays as "Added"
  btn.textContent = '✓ Added';
  btn.style.background = '#10b981';
  btn.style.boxShadow = '0 2px 8px rgba(16,185,129,0.35)';

  // Update badge
  updateCartBadge();

  // Toast notification
  showCartToast(`${name} added to cart!`, 'add');
}

// Toast notification system
function showCartToast(message, type) {
  // Remove any existing toast
  const existing = document.querySelector('.cart-toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'cart-toast';
  const bgColor = type === 'add' ? '#10b981' : '#ef4444';
  const icon = type === 'add' ? '🛒' : '✕';
  toast.innerHTML = `<span style="font-size:18px;margin-right:8px">${icon}</span> ${message}`;
  toast.style.cssText = `
    position: fixed; bottom: 100px; right: 24px; z-index: 9999;
    background: ${bgColor}; color: #fff; padding: 14px 24px; border-radius: 14px;
    font-size: 14px; font-weight: 600; font-family: 'Inter', sans-serif;
    box-shadow: 0 8px 32px rgba(0,0,0,0.2);
    display: flex; align-items: center;
    animation: toastIn 0.4s cubic-bezier(.34,1.56,.64,1), toastOut 0.3s ease 2.5s forwards;
  `;
  document.body.appendChild(toast);

  // Add animation keyframes if not already present
  if (!document.getElementById('toastCSS')) {
    const style = document.createElement('style');
    style.id = 'toastCSS';
    style.textContent = `
      @keyframes toastIn { from { transform: translateX(120%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
      @keyframes toastOut { from { transform: translateX(0); opacity: 1; } to { transform: translateX(120%); opacity: 0; } }
    `;
    document.head.appendChild(style);
  }

  setTimeout(() => toast.remove(), 3000);
}

// ── Price range label ─────────────────────────
function updatePrice(val) {
  const lbl = document.getElementById('priceLabel');
  if (lbl) lbl.textContent = +val >= 9999 ? 'Any price' : `Up to ₹${parseInt(val).toLocaleString('en-IN')}`;
}

// ── Partner tab ───────────────────────────────
function switchTab(type) {
  const e = document.getElementById('tabE');
  const v = document.getElementById('tabV');
  if (!e || !v) return;
  const isE = type === 'e';
  e.classList.toggle('active', isE);
  v.classList.toggle('active', !isE);
  
  const docs = document.getElementById('electricianDocs');
  if (docs) docs.style.display = isE ? '' : 'none';
  const spec = document.getElementById('specGroup');
  if (spec) spec.style.display = isE ? 'block' : 'none';
}

// ── Smooth scroll for hash links ──────────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', ev => {
    const t = document.querySelector(a.getAttribute('href'));
    if (t) { ev.preventDefault(); t.scrollIntoView({ behavior: 'smooth' }); }
  });
});

console.log('%c⚡ AMPEDGE — Premium Website Loaded', 'font-family:system-ui;color:#4169E1;font-size:16px;font-weight:900;background:#eef2ff;padding:6px 14px;border-radius:6px;');


// ── AMPEdge AI Chatbot ─────────────────────────
const ampedgeKB = [
  // Greetings
  { keys: ['hello','hi','hey','good morning','good evening','good afternoon','namaste','hola'],
    reply: "Hello! 👋 Welcome to AMPEdge — India's premier electrical services platform. How can I help you today? You can ask about our services, products, pricing, or anything electrical!" },
  // Services — General
  { keys: ['service','services','what do you do','what you do','offerings','offer'],
    reply: "⚡ We offer a wide range of professional electrical services:\n\n🔌 **Electrical Installation** — wiring, DB boards, sockets & switches\n🔧 **Repair & Maintenance** — fault diagnosis, MCB trips, short circuits\n🏭 **Industrial & Commercial** — power panels, transformers, HV setups\n🏠 **Smart Home & Automation** — IoT switches, automated lighting, EV charging\n🚨 **Emergency Services** — 24/7 urgent electrical support\n\nWould you like to book a service? Visit our <a href='booking.html' style='color:#4169E1;font-weight:600'>Booking Page</a>!" },
  // Installation
  { keys: ['installation','install','wiring','wire','new wiring','house wiring','office wiring'],
    reply: "🔌 **Electrical Installation Services:**\n\n• Complete house / office wiring\n• Distribution Board (DB) installation\n• Socket & switch fitting\n• New construction electrical work\n• Rewiring of old buildings\n\n💰 Starting from **₹1,499**. Book now on our <a href='booking.html' style='color:#4169E1;font-weight:600'>Services Page</a>!" },
  // Repair
  { keys: ['repair','fix','broken','fault','not working','trip','short circuit','mcb','problem','issue','emergency'],
    reply: "🔧 **Repair & Maintenance:**\n\n• Electrical fault diagnosis & repair\n• Short circuit & MCB trip fixing\n• Wiring failure repair\n• Appliance electrical issues\n• 24/7 Emergency support available!\n\n📞 For urgent help, call/WhatsApp: <a href='https://wa.me/919123667258' target='_blank' style='color:#25D366;font-weight:600'>+91 91236 67258</a>" },
  // Smart Home
  { keys: ['smart home','automation','iot','smart switch','smart light','ev charging','ev charger','automated'],
    reply: "🏠 **Smart Home & Automation:**\n\n• IoT-enabled smart switches\n• Automated lighting systems\n• Home energy management\n• EV charging station setup\n• Voice assistant integration\n\n💰 Starting from **₹4,999**. Our certified experts will transform your home!" },
  // Industrial
  { keys: ['industrial','commercial','factory','warehouse','transformer','high voltage','hv','panel','power distribution'],
    reply: "🏭 **Industrial & Commercial Services:**\n\n• High-voltage installations\n• Power distribution panels\n• Transformer connections\n• Factory electrical setups\n• Commercial building wiring\n• Annual maintenance contracts (AMC)\n\nContact us for a custom quote: <a href='https://wa.me/919123667258' target='_blank' style='color:#25D366;font-weight:600'>WhatsApp</a>" },
  // Pricing
  { keys: ['price','pricing','cost','charge','rate','how much','kitna','fees','budget','estimate','quote'],
    reply: "💰 **AMPEdge Pricing Guide:**\n\n• Electrical Installation — from **₹1,499**\n• MCB Panel Setup — from **₹2,299**\n• Smart Home Setup — from **₹4,999**\n• Repair & Maintenance — from **₹499**\n• Annual Maintenance — from **₹899/year**\n\n✅ Transparent pricing, zero hidden charges!\nGet an instant quote on our <a href='booking.html' style='color:#4169E1;font-weight:600'>Booking Page</a>." },
  // Marketplace / Products
  { keys: ['product','products','buy','shop','marketplace','switch','cable','wire','led','light','fan','mcb','db board','online','order'],
    reply: "🛒 **AMPEdge Marketplace:**\n\nWe sell genuine, certified electrical products from top brands:\n\n• 🔦 Switches & Sockets — from ₹349\n• 🪢 Wires & Cables — from ₹2,299\n• ⚡ MCB & DB Boards — from ₹784\n• 💡 LED Lighting — from ₹449\n• 🌀 Fans & Appliances — from ₹2,499\n\n**Brands:** Havells, Legrand, Philips, Finolex, Anchor, Crompton, Syska, Polycab\n\nBrowse all at <a href='marketplace.html' style='color:#4169E1;font-weight:600'>Marketplace</a>!" },
  // Booking
  { keys: ['book','booking','appointment','schedule','visit','technician','electrician','engineer'],
    reply: "📋 **Book a Service — Easy 4 Steps:**\n\n1️⃣ Choose your service\n2️⃣ Get an instant quote\n3️⃣ A verified professional visits\n4️⃣ Pay securely after job completion\n\n✅ Same-day appointments available!\n\n👉 <a href='booking.html' style='color:#4169E1;font-weight:600'>Book Now</a>" },
  // Partner
  { keys: ['partner','join','electrician job','work with','career','become partner','registration','register'],
    reply: "🤝 **Become an AMPEdge Partner:**\n\nJoin 2,000+ verified professionals on our platform!\n\n✅ Steady stream of jobs\n✅ Flexible schedule\n✅ Weekly payments\n✅ Free training & certification\n✅ Insurance coverage\n\n👉 <a href='partner.html' style='color:#4169E1;font-weight:600'>Apply Now</a>" },
  // Contact
  { keys: ['contact','phone','call','number','email','reach','whatsapp','address','location','where'],
    reply: "📞 **Contact AMPEdge:**\n\n📧 Email: **ampedge.info@gmail.com**\n💬 WhatsApp: <a href='https://wa.me/919123667258' target='_blank' style='color:#25D366;font-weight:600'>+91 91236 67258</a>, <a href='https://wa.me/919748398418' target='_blank' style='color:#25D366;font-weight:600'>+91 97483 98418</a>\n📍 Address: West Bauria, Chackasi, Palpara, Howrah 711307\n▶ YouTube: <a href='https://www.youtube.com/channel/UCl_t66zGTsJYdc9l-c-wzDg' target='_blank' style='color:#FF0000;font-weight:600'>@AmpEdge-i9d</a>\n\nWe're available 24/7 for emergency support!" },
  // About
  { keys: ['about','who are you','what is ampedge','company','about ampedge','tell me about'],
    reply: "⚡ **About AMPEdge:**\n\nAMPEdge is India's premier electrical services platform, trusted by **50,000+ customers** across the country.\n\n🔹 2,000+ verified professionals\n🔹 98% customer satisfaction rate\n🔹 ISO-verified, background-checked experts\n🔹 90-day service warranty\n🔹 Transparent pricing, zero hidden charges\n\nWe offer both professional electrical services AND a marketplace for genuine electrical products from top brands." },
  // Safety
  { keys: ['safe','safety','warranty','guarantee','trust','reliable','verified','certified','license'],
    reply: "🛡️ **Safety & Trust at AMPEdge:**\n\n✅ All electricians are government-licensed & background-checked\n✅ ISO-verified professionals\n✅ 90-day service warranty on all work\n✅ No-questions satisfaction guarantee\n✅ Genuine, certified products only\n✅ 4.9/5.0 average rating from 12,000+ reviews\n\nYour safety is our top priority!" },
  // Payment
  { keys: ['payment','pay','upi','cash','card','online payment','payment method'],
    reply: "💳 **Payment Options:**\n\n• UPI (Google Pay, PhonePe, Paytm)\n• Debit / Credit Cards\n• Net Banking\n• Cash on completion\n\n🔒 You pay **only after** the job is completed to your satisfaction. Secure and hassle-free!" },
  // Areas / Coverage
  { keys: ['area','areas','city','cities','coverage','available','kolkata','howrah','delhi','mumbai','bangalore','where available'],
    reply: "📍 **AMPEdge Coverage:**\n\nWe currently serve customers across major Indian cities including:\n\n• Kolkata & Howrah (HQ)\n• Delhi NCR\n• Mumbai\n• Bangalore\n• Hyderabad\n• Pune\n• And expanding rapidly!\n\nContact us to check availability in your area." },
  // Thanks
  { keys: ['thank','thanks','thank you','thx','great','awesome','nice','good','perfect','ok','okay'],
    reply: "You're welcome! 😊 Happy to help. If you have any more questions about our services or products, feel free to ask anytime!\n\n⚡ AMPEdge — Powering Reliable Electrical Solutions" },
  // YouTube
  { keys: ['youtube','video','channel','subscribe'],
    reply: "▶️ **AMPEdge YouTube Channel:**\n\nCheck out our YouTube channel for electrical tips, tutorials, and service demos!\n\n👉 <a href='https://www.youtube.com/channel/UCl_t66zGTsJYdc9l-c-wzDg' target='_blank' style='color:#FF0000;font-weight:600'>Subscribe to @AmpEdge-i9d</a>" },
  // Query / Form
  { keys: ['query','question','form','complaint','feedback','suggest'],
    reply: "📝 **Submit a Query:**\n\nYou can submit your questions or feedback through our Google Form and our team will respond quickly!\n\n👉 <a href='https://docs.google.com/forms/d/e/1FAIpQLSfjzl8Dq__HaJcXXJ-WqSJNPICsWlWXqGctNVRLJo4eCyRTSA/viewform' target='_blank' style='color:#4169E1;font-weight:600'>Fill the Query Form</a>\n\nOr WhatsApp us directly: <a href='https://wa.me/919123667258' target='_blank' style='color:#25D366;font-weight:600'>+91 91236 67258</a>" },
];

// Default fallback response
const defaultReply = "🤔 I'm not sure I understood that. Here's what I can help you with:\n\n• ⚡ Our electrical **services**\n• 🛒 **Products** & marketplace\n• 💰 **Pricing** information\n• 📋 How to **book** a service\n• 🤝 **Partner** with us\n• 📞 **Contact** information\n\nTry asking about any of these topics, or reach out to our team via <a href='https://wa.me/919123667258' target='_blank' style='color:#25D366;font-weight:600'>WhatsApp</a>!";

function getAIResponse(userText) {
  const lower = userText.toLowerCase();
  for (const entry of ampedgeKB) {
    for (const key of entry.keys) {
      if (lower.includes(key)) return entry.reply;
    }
  }
  return defaultReply;
}

const userMsgStyle = "max-width: 85%; padding: 14px 18px; border-radius: 12px; font-size: 14.5px; line-height: 1.5; background: #4169E1; color: #fff; align-self: flex-end; border-bottom-right-radius: 4px; border: none; box-shadow: 0 2px 4px rgba(65,105,225,0.2)";
const botMsgStyle = "max-width: 85%; padding: 14px 18px; border-radius: 12px; font-size: 14.5px; line-height: 1.7; background: #fff; border: 1px solid #e2e8f0; color: #1e293b; align-self: flex-start; border-bottom-left-radius: 4px; box-shadow: 0 2px 4px rgba(0,0,0,0.02)";
const typingHTML = `<div class="chat-msg bot-msg typing-indicator" style="${botMsgStyle}"><span class="dot-typing"><span>.</span><span>.</span><span>.</span></span></div>`;

function addTypingCSS() {
  if (document.getElementById('typingCSS')) return;
  const style = document.createElement('style');
  style.id = 'typingCSS';
  style.textContent = `
    .dot-typing span { animation: blink 1.4s infinite both; font-size: 24px; font-weight: 900; color: #94a3b8; }
    .dot-typing span:nth-child(2) { animation-delay: 0.2s; }
    .dot-typing span:nth-child(3) { animation-delay: 0.4s; }
    @keyframes blink { 0%, 80%, 100% { opacity: 0; } 40% { opacity: 1; } }
    .chat-msg.bot-msg a { color: #4169E1; text-decoration: none; font-weight: 600; }
    .chat-msg.bot-msg a:hover { text-decoration: underline; }
  `;
  document.head.appendChild(style);
}
addTypingCSS();

// Popup chatbot
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
  b.innerHTML += typingHTML;
  b.scrollTop = b.scrollHeight;
  setTimeout(() => {
    const ti = b.querySelector('.typing-indicator');
    if(ti) ti.remove();
    const reply = getAIResponse(txt).replace(/\n/g, '<br>');
    b.innerHTML += `<div class="chat-msg bot-msg">${reply}</div>`;
    b.scrollTop = b.scrollHeight;
  }, 1200);
};

// Embedded chatbot
window.sendEmbeddedMsg = function() {
  const inp = document.getElementById('embeddedChatInput');
  if(!inp) return;
  const txt = inp.value.trim();
  if(!txt) return;
  const b = document.getElementById('embeddedChatBody');
  if(!b) return;
  b.innerHTML += `<div class="chat-msg user-msg" style="${userMsgStyle}">${txt}</div>`;
  inp.value = '';
  b.scrollTop = b.scrollHeight;
  b.innerHTML += typingHTML;
  b.scrollTop = b.scrollHeight;
  setTimeout(() => {
    const ti = b.querySelector('.typing-indicator');
    if(ti) ti.remove();
    const reply = getAIResponse(txt).replace(/\n/g, '<br>');
    b.innerHTML += `<div class="chat-msg bot-msg" style="${botMsgStyle}">${reply}</div>`;
    b.scrollTop = b.scrollHeight;
  }, 1200);
};
