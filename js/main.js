/* ============================================
   AMPEDGE — Premium Main JavaScript
   ============================================ */

// ── Data Version: bump this when default data changes ──
const AMPEDGE_DATA_VERSION = '7.0';
if (localStorage.getItem('ampedge_data_ver') !== AMPEDGE_DATA_VERSION) {
  localStorage.removeItem('ampedge_services');
  localStorage.removeItem('ampedge_products');
  localStorage.setItem('ampedge_data_ver', AMPEDGE_DATA_VERSION);
}

// ── Global Data Store ────────────────────────
const defaultServices = [
  { id: 's1', name: 'Wiring Repair', description: 'Fix faulty wires and circuits safely.', category: 'REPAIR', basePrice: 499, duration: 60, city: 'Howrah', active: true, image: 'images/svc_wiring.png' },
  { id: 's2', name: 'MCB Setup', description: 'Install distribution boards and MCBs.', category: 'INSTALLATION', basePrice: 2299, duration: 120, city: 'Howrah', active: true, image: 'images/svc_mcb.png' },
  { id: 's3', name: 'Smart Home Hub', description: 'Automated lighting and switches.', category: 'INSTALLATION', basePrice: 4999, duration: 180, city: 'Kolkata', active: true, image: 'images/svc_switchboard.png' },
  { id: 's4', name: 'Emergency Visit', description: 'Quick dispatch 24/7 for urgent failures.', category: 'EMERGENCY', basePrice: 899, duration: 30, city: 'Howrah', active: true, image: 'images/svc_emergency.png' },
  { id: 's5', name: 'Solar Panel Installation', description: 'Professional rooftop solar panel installation with net metering setup.', category: 'SOLAR', basePrice: 12999, duration: 480, city: 'Howrah', active: true, image: 'images/solar_hero.png' },
  { id: 's6', name: 'Solar System Maintenance', description: 'Annual solar panel cleaning, performance check and inverter inspection.', category: 'SOLAR', basePrice: 1499, duration: 120, city: 'Howrah', active: true, image: 'images/solar_hero.png' },
  { id: 's7', name: 'Solar Rooftop Survey', description: 'Site visit to assess rooftop area, shadow analysis and kW capacity planning.', category: 'SOLAR', basePrice: 299, duration: 60, city: 'Howrah', active: true, image: 'images/solar_hero.png' },
];

const defaultProducts = [
  { id: 'p1', name: 'Havells Coral Smart Switch', description: '6A wifi-enabled smart switch.', category: 'SMART_HOME', basePrice: 349, stock: 50, active: true, image: 'images/product_switch.png' },
  { id: 'p2', name: 'Finolex FR PVC Wire', description: '2.5sqmm 90m coil.', category: 'WIRING_MATERIALS', basePrice: 2299, stock: 35, active: true, image: '🪢' },
  { id: 'p3', name: 'Legrand Arteor USB', description: 'Fast charging wall socket.', category: 'WIRING_MATERIALS', basePrice: 1249, stock: 15, active: true, image: 'images/product_usb.png' },
  { id: 'p4', name: 'Philips LED Batten', description: '20W ultra slim LED tube.', category: 'LIGHTING_FIXTURES', basePrice: 449, stock: 100, active: true, image: 'images/product_led.png' },
  { id: 'p5', name: 'Crompton Aura Fan', description: 'Anti-dust 1200mm ceiling fan.', category: 'APPLIANCES', basePrice: 2499, stock: 20, active: true, image: 'images/product_fan.png' },
  { id: 'p6', name: 'Luminous Solar Panel 335W', description: 'Monocrystalline 335W rooftop solar panel with 25yr warranty.', category: 'SOLAR', basePrice: 8999, stock: 30, active: true, image: 'images/product_solar_panel.png' },
  { id: 'p7', name: 'Luminous Cruze 2kVA Inverter', description: 'Pure sinewave solar inverter for home use with MPPT charge controller.', category: 'SOLAR', basePrice: 12499, stock: 18, active: true, image: 'images/product_inverter.png' },
  { id: 'p8', name: 'Amaron Solar Battery 150Ah', description: 'Tall-tubular deep cycle solar battery with 3yr warranty.', category: 'SOLAR', basePrice: 14999, stock: 12, active: true, image: 'images/product_battery.png' },
  { id: 'p9', name: 'Solar Mounting Structure Kit', description: 'Adjustable GI rooftop mounting frame for 2-panel setup.', category: 'SOLAR', basePrice: 2499, stock: 40, active: true, image: 'images/product_structure.png' },
  { id: 'p10', name: 'Solar Net Meter Kit', description: 'Government-approved bi-directional energy meter for grid feed-in.', category: 'SOLAR', basePrice: 3499, stock: 25, active: true, image: 'images/product_net_meter.png' }
];

window.mockElectricians = [
  { id: 'E1', name: 'Ramesh Kumar', rating: 4.9, jobs: 847, exp: 8, baseRate: 500, city: 'Howrah', distance: 1.2, avatar: 'R', color: '#4169E1' },
  { id: 'E2', name: 'Suresh Yadav', rating: 4.8, jobs: 612, exp: 5, baseRate: 400, city: 'Howrah', distance: 2.5, avatar: 'S', color: '#059669' },
  { id: 'E3', name: 'Mohit Singh', rating: 4.7, jobs: 410, exp: 6, baseRate: 300, city: 'Howrah', distance: 0.8, avatar: 'M', color: '#7c3aed' },
  { id: 'E4', name: 'Dinesh Pal', rating: 4.5, jobs: 250, exp: 3, baseRate: 550, city: 'Howrah', distance: 3.4, avatar: 'D', color: '#f59e0b' },
  { id: 'E5', name: 'Subrata Roy', rating: 4.9, jobs: 1020, exp: 10, baseRate: 600, city: 'Kolkata', distance: 1.5, avatar: 'S', color: '#4169E1' },
  { id: 'E6', name: 'Bikram Das', rating: 4.6, jobs: 340, exp: 4, baseRate: 350, city: 'Kolkata', distance: 2.1, avatar: 'B', color: '#ef4444' },
  { id: 'E7', name: 'Anik Sen', rating: 4.7, jobs: 512, exp: 5, baseRate: 450, city: 'Kolkata', distance: 0.9, avatar: 'A', color: '#7c3aed' },
  { id: 'E8', name: 'Prosad Shaw', rating: 4.4, jobs: 180, exp: 2, baseRate: 300, city: 'Kolkata', distance: 4.0, avatar: 'P', color: '#f59e0b' },
  { id: 'E9', name: 'Amit Sharma', rating: 4.9, jobs: 920, exp: 9, baseRate: 650, city: 'Delhi NCR', distance: 1.1, avatar: 'A', color: '#4169E1' },
  { id: 'E10', name: 'Rahul Verma', rating: 4.8, jobs: 580, exp: 6, baseRate: 400, city: 'Delhi NCR', distance: 2.3, avatar: 'R', color: '#059669' },
  { id: 'E11', name: 'Sanjay Gupta', rating: 4.5, jobs: 310, exp: 4, baseRate: 350, city: 'Delhi NCR', distance: 3.8, avatar: 'S', color: '#ef4444' }
];

window.getAmpEdgeServices = () => {
  const data = localStorage.getItem('ampedge_services');
  if (data) return JSON.parse(data).filter(s => s.active);
  localStorage.setItem('ampedge_services', JSON.stringify(defaultServices));
  return defaultServices;
};

window.getAmpEdgeProducts = () => {
  const data = localStorage.getItem('ampedge_products');
  if (data) return JSON.parse(data).filter(p => p.active);
  localStorage.setItem('ampedge_products', JSON.stringify(defaultProducts));
  return defaultProducts;
};

// Initialize Customer List
const defaultCustomers = [
  { id: 'C-084', name: 'Rahul Sharma', phone: '+91 98765 43210', email: 'rahul.sharma@gmail.com', loc: 'Howrah', coords: '22.59° N, 88.26° E', locState: 'Enabled', spend: 12500, orders: 4, lastActive: '2 Days Ago' },
  { id: 'C-085', name: 'Amit Verma', phone: '+91 91234 56789', email: 'amit.verma@yahoo.com', loc: 'Kolkata', coords: '22.57° N, 88.36° E', locState: 'Enabled', spend: 8900, orders: 2, lastActive: '1 Week Ago' },
  { id: 'C-086', name: 'Neha Gupta', phone: '+91 99887 76655', email: 'neha.gupta@outlook.com', loc: 'Kolkata', coords: '22.56° N, 88.40° E', locState: 'Enabled', spend: 24500, orders: 8, lastActive: 'Today' },
  { id: 'C-087', name: 'Vikas Singh', phone: '+91 98711 22334', email: 'vikas.singh@gmail.com', loc: 'Howrah', coords: '', locState: 'Not Shared', spend: 1200, orders: 1, lastActive: '1 Month Ago' },
];

if (!localStorage.getItem('ampedge_customers')) {
  localStorage.setItem('ampedge_customers', JSON.stringify(defaultCustomers));
}

// Initialize Payments List
const defaultPayments = [
  { tx: 'TXN-984210', date: '2026-03-20 14:30', cust: 'Neha Gupta', amt: 548, method: 'UPI', status: 'Success' },
  { tx: 'TXN-984209', date: '2026-03-19 11:15', cust: 'Vikas Singh', amt: 948, method: 'Credit Card', status: 'Success' },
  { tx: 'TXN-984208', date: '2026-03-18 09:00', cust: 'Vishal Roy', amt: 1299, method: 'Net Banking', status: 'Refunded' },
  { tx: 'TXN-984207', date: '2026-03-17 16:45', cust: 'Sunil Das', amt: 349, method: 'UPI', status: 'Success' }
];

if (!localStorage.getItem('ampedge_payments')) {
  localStorage.setItem('ampedge_payments', JSON.stringify(defaultPayments));
}

// Initialize Bookings List
const defaultBookings = [
  { id: 'B-10042', date: '2026-03-22', customer: 'Rahul Sharma', service: 'Smart Home Hub', status: 'Pending', tech: 'Unassigned', amount: 5048, location: 'Howrah (22.59° N, 88.26° E)' },
  { id: 'B-1041', date: '2026-03-21', customer: 'Amit Verma', service: 'MCB Setup', status: 'In Progress', tech: 'Suresh Y.', amount: 2348, location: 'Kolkata (22.57° N, 88.36° E)' },
  { id: 'B-1040', date: '2026-03-20', customer: 'Neha Gupta', service: 'Wiring Repair', status: 'Completed', tech: 'Ramesh K.', amount: 548, location: 'Kolkata (22.56° N, 88.40° E)' },
  { id: 'B-1039', date: '2026-03-19', customer: 'Vikas Singh', service: 'Emergency Visit', status: 'Completed', tech: 'Ramesh K.', amount: 948, location: 'Howrah (22.58° N, 88.28° E)' },
  { id: 'B-1038', date: '2026-03-18', customer: 'Priya Patel', service: 'Fan Installation', status: 'Cancelled', tech: '-', amount: 0, location: 'Delhi NCR (28.61° N, 77.20° E)' }
];

if (!localStorage.getItem('ampedge_bookings')) {
  localStorage.setItem('ampedge_bookings', JSON.stringify(defaultBookings));
}
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

// ── Service logic ────────────────────────────────
let currentSelectedService = null;
let currentSelectedElectrician = null;
let selectedAddonProducts = [];

function renderBookingServices() {
  const container = document.getElementById('serviceChipsContainer');
  if (!container) return; // not on booking page
  
  let services = window.getAmpEdgeServices();
  // Filter by service budget range
  services = services.filter(s => s.basePrice >= currentServiceMinPrice && s.basePrice <= currentServiceMaxPrice);
  
  if (services.length === 0) {
    container.innerHTML = '<div style="color:var(--muted); font-size:13px; padding:10px 0">No services match your budget range.</div>';
    currentSelectedService = null;
    currentSelectedElectrician = null;
    selectedAddonProducts = [];
    updateBookingSummary();
    
    // Clear electricians list
    const proContainer = document.getElementById('proSelectionContainer');
    if (proContainer) proContainer.innerHTML = '<div style="color:var(--muted); font-size:13px;">No electricians available for this budget.</div>';
    
    // Clear recommended products list
    const recContainer = document.getElementById('recommendedProductsGrid');
    if (recContainer) recContainer.innerHTML = '<div style="color:var(--muted); font-size:13px;">No recommendations.</div>';
    return;
  }
  
  container.innerHTML = services.map((s, idx) => {
    const imgHtml = (s.image && s.image.startsWith('images/'))
      ? `<img src="${s.image}" alt="" style="width:22px; height:22px; border-radius:6px; object-fit:cover; margin-right:8px; display:inline-block; vertical-align:middle;"/>`
      : `<span style="margin-right:8px; vertical-align:middle;">⚡</span>`;
    return `
      <div class="svc-chip ${idx === 0 ? 'selected' : ''}" onclick="chipSel(this)" data-id="${s.id}" style="display:inline-flex; align-items:center; padding:10px 16px;">
        ${imgHtml}
        <span style="vertical-align:middle;">${s.name} (₹${s.basePrice})</span>
      </div>
    `;
  }).join('');
  
  currentSelectedService = services[0];
  selectedAddonProducts = []; // reset addon products on service change
  renderBookingElectricians();
  renderRecommendedProducts();
  updateBookingSummary();
}

function renderRecommendedProducts() {
  const container = document.getElementById('recommendedProductsGrid');
  if (!container) return; // not on booking page
  
  if (!currentSelectedService) return;
  
  const allProducts = window.getAmpEdgeProducts();
  let recommendedIds = [];
  
  // Map service category/ID to products
  if (currentSelectedService.id === 's1' || currentSelectedService.category === 'REPAIR') {
    recommendedIds = ['p2', 'p3']; // Finolex Wire, Legrand Socket
  } else if (currentSelectedService.id === 's3' || currentSelectedService.category === 'SMART_HOME') {
    recommendedIds = ['p1', 'p4']; // Smart Switch, LED Batten
  } else if (currentSelectedService.id === 's2') {
    recommendedIds = ['p2', 'p5']; // Finolex Wire, Crompton Fan
  } else {
    recommendedIds = ['p4', 'p5']; // LED Batten, Crompton Fan
  }
  
  const recommended = allProducts.filter(p => recommendedIds.includes(p.id));
  
  container.innerHTML = recommended.map(p => {
    const isAdded = selectedAddonProducts.some(item => item.id === p.id);
    return `
      <div class="product-card" style="padding:14px; border:1.5px solid ${isAdded ? 'var(--blue)' : 'var(--border2)'}; background:${isAdded ? 'rgba(65, 105, 225, 0.02)' : '#fff'}; border-radius:12px; display:flex; flex-direction:column; gap:10px; transition:var(--t); box-shadow:none">
        <div style="display:flex; justify-content:space-between; align-items:flex-start;">
          <div style="width:44px; height:44px; border-radius:8px; display:flex; align-items:center; justify-content:center; border:1px solid var(--border2); overflow:hidden; background:#f8fafc; flex-shrink:0;">
            ${(p.image && p.image.startsWith('images/')) 
              ? `<img src="${p.image}" alt="${p.name}" style="width:100%; height:100%; object-fit:cover; display:block;"/>` 
              : `<span style="font-size:20px;">${p.image || '🔌'}</span>`}
          </div>
          <span class="badge badge-green" style="font-size:9.5px; padding:2px 6px;">Best Price</span>
        </div>
        <div style="flex:1">
          <h5 style="margin:0; font-size:13px; font-weight:700; color:var(--text-dark); line-height:1.4;">${p.name}</h5>
          <p style="margin:4px 0 0 0; font-size:11px; color:var(--text-muted); line-height:1.3;">${p.description.substring(0, 45)}...</p>
        </div>
        <div style="display:flex; justify-content:space-between; align-items:center; margin-top:4px;">
          <span style="font-size:13.5px; font-weight:800; color:var(--blue)">₹${p.basePrice}</span>
          <button onclick="toggleAddonProduct('${p.id}')" class="btn btn-sm ${isAdded ? 'btn-outline' : 'btn-primary'}" style="padding: 6px 12px; font-size:11px; font-weight:700; border-color:${isAdded ? '#ef4444' : ''}; color:${isAdded ? '#ef4444' : ''}">
            ${isAdded ? '✕ Remove' : '➕ Add to Bill'}
          </button>
        </div>
      </div>
    `;
  }).join('');
}

window.toggleAddonProduct = (id) => {
  const allProducts = window.getAmpEdgeProducts();
  const prod = allProducts.find(p => p.id === id);
  if (!prod) return;
  
  const idx = selectedAddonProducts.findIndex(p => p.id === id);
  if (idx !== -1) {
    selectedAddonProducts.splice(idx, 1);
  } else {
    selectedAddonProducts.push(prod);
  }
  
  renderRecommendedProducts();
  updateBookingSummary();
};

function updateBookingSummary() {
  if (!currentSelectedService) return;
  
  const pName = document.getElementById('summarySvcName');
  const pPrice = document.getElementById('summarySvcPrice');
  const pGst = document.getElementById('summaryGstPrice');
  const pTotal = document.getElementById('summaryTotalPrice');
  const pParts = document.getElementById('summaryPartsPrice');
  const pCartRow = document.getElementById('summaryCartRow');
  const pCartVal = document.getElementById('summaryCartPrice');
  
  if (pName) {
    if (currentSelectedElectrician) {
      pName.innerHTML = `⚡ ${currentSelectedService.name}<br><span style="font-size:12px;color:var(--text-muted);font-weight:500;margin-top:4px;display:inline-block">👷 Pro: ${currentSelectedElectrician.name} (★ ${currentSelectedElectrician.rating})</span>`;
    } else {
      pName.textContent = `⚡ ${currentSelectedService.name}`;
    }
  }
  
  const base = currentSelectedElectrician ? currentSelectedElectrician.baseRate : currentSelectedService.basePrice;
  const platform = 49;
  
  // Calculate Addon products sum
  let addonTotal = 0;
  selectedAddonProducts.forEach(p => addonTotal += p.basePrice);
  
  // Update Parts & Materials summary line
  if (pParts) {
    if (selectedAddonProducts.length > 0) {
      const names = selectedAddonProducts.map(p => p.name.split(' ')[0]).join(' + '); // Short names
      pParts.textContent = `₹${addonTotal.toLocaleString('en-IN')} (${names})`;
      pParts.style.color = 'var(--text-dark)';
      pParts.style.fontWeight = '700';
    } else {
      pParts.textContent = '₹0 (site estimate)';
      pParts.style.color = 'var(--muted)';
      pParts.style.fontWeight = '500';
    }
  }
  
  // Fetch marketplace cart items sum
  let cartTotal = 0;
  const cartItems = JSON.parse(localStorage.getItem('ampedge_cart') || '[]');
  cartItems.forEach(item => {
    const val = parseInt(item.price.replace(/[^0-9]/g, '')) || 0;
    cartTotal += val;
  });
  
  // Show / Hide cart row in summary
  if (pCartRow && pCartVal) {
    if (cartTotal > 0) {
      pCartRow.style.display = 'flex';
      pCartVal.textContent = `₹${cartTotal.toLocaleString('en-IN')} (${cartItems.length} items)`;
    } else {
      pCartRow.style.display = 'none';
    }
  }
  
  const gst = Math.round((base + platform + addonTotal + cartTotal) * 0.18);
  const total = base + platform + gst + addonTotal + cartTotal;
  
  if (pPrice) pPrice.textContent = `₹${base.toLocaleString('en-IN')}`;
  if (pGst) pGst.textContent = `₹${gst.toLocaleString('en-IN')}`;
  if (pTotal) pTotal.textContent = `₹${total.toLocaleString('en-IN')}`;
}

// ── Service Chip Select ───────────────────────
function chipSel(el) {
  const group = el.closest('div');
  if (!group) return;
  group.querySelectorAll('.svc-chip').forEach(c => c.classList.remove('selected'));
  el.classList.add('selected');
  
  const sid = el.getAttribute('data-id');
  const services = window.getAmpEdgeServices();
  const matched = services.find(s => s.id === sid);
  if (matched) {
    currentSelectedService = matched;
    selectedAddonProducts = []; // reset addon products on service change
    renderBookingElectricians();
    renderRecommendedProducts();
    updateBookingSummary();
  }
}

// ── Booking Electricians Render & Selection ───────
window.renderBookingElectricians = () => {
  const container = document.getElementById('proSelectionContainer');
  if (!container) return; // not on booking page
  
  const citySelect = document.getElementById('bookingCity');
  if (!citySelect) return;
  const selectedCity = citySelect.value;
  
  // Filter mock electricians by city
  let filtered = window.mockElectricians.filter(e => e.city.toLowerCase() === selectedCity.toLowerCase());
  
  // Filter by service budget limit
  filtered = filtered.filter(e => e.baseRate >= currentServiceMinPrice && e.baseRate <= currentServiceMaxPrice);
  
  // If no professionals found, generate 4 mock ones for this city
  if (filtered.length === 0) {
    const temps = [
      { id: 'EM1', name: 'Rohan Sen', rating: 4.8, jobs: 310, exp: 4, baseRate: 350, city: selectedCity, distance: 1.4, avatar: 'R', color: '#4169E1' },
      { id: 'EM2', name: 'Karan Sharma', rating: 4.7, jobs: 240, exp: 3, baseRate: 300, city: selectedCity, distance: 2.8, avatar: 'K', color: '#059669' },
      { id: 'EM3', name: 'Vikram Singh', rating: 4.9, jobs: 490, exp: 6, baseRate: 500, city: selectedCity, distance: 0.9, avatar: 'V', color: '#7c3aed' },
      { id: 'EM4', name: 'Anil Gupta', rating: 4.4, jobs: 120, exp: 2, baseRate: 450, city: selectedCity, distance: 3.2, avatar: 'A', color: '#f59e0b' }
    ];
    filtered = temps.filter(e => e.baseRate >= currentServiceMinPrice && e.baseRate <= currentServiceMaxPrice);
  }
  
  // Sort based on sort select dropdown
  const sortType = document.getElementById('proSortSelect')?.value || 'rating';
  if (sortType === 'price_low') {
    filtered.sort((a, b) => a.baseRate - b.baseRate);
  } else if (sortType === 'price_high') {
    filtered.sort((a, b) => b.baseRate - a.baseRate);
  } else if (sortType === 'rating') {
    filtered.sort((a, b) => b.rating - a.rating);
  } else if (sortType === 'distance') {
    filtered.sort((a, b) => a.distance - b.distance);
  }
  
  // If no electrician selected yet, or current selection is not in the filtered list
  if (!currentSelectedElectrician || !filtered.some(e => e.id === currentSelectedElectrician.id)) {
    currentSelectedElectrician = filtered[0];
    updateBookingSummary();
  }
  
  // Render
  container.innerHTML = filtered.map(e => {
    const isSelected = currentSelectedElectrician && currentSelectedElectrician.id === e.id;
    return `
      <div class="prof-card pro-selection-card ${isSelected ? 'chosen' : ''}" onclick="selectBookingElectrician('${e.id}')" data-id="${e.id}" style="padding:18px; display:flex; align-items:center; gap:16px; border:2px solid ${isSelected ? 'var(--blue)' : 'var(--border2)'}; background:${isSelected ? 'rgba(65, 105, 225, 0.04)' : '#fff'}; border-radius:12px; cursor:pointer; transition:var(--t); box-shadow: ${isSelected ? 'var(--s2)' : 'none'}">
        <div class="prof-av" style="background:linear-gradient(135deg, ${e.color}, #5CE1E6); width:46px; height:46px; border-radius:50%; display:flex; align-items:center; justify-content:center; color:#fff; font-weight:800; font-size:16px; flex-shrink:0;">
          ${e.avatar}
        </div>
        <div style="flex:1">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 2px;">
            <h4 style="margin:0; font-size:14.5px; font-weight:800; color:var(--text-dark)">${e.name}</h4>
            <span style="font-size:15px; font-weight:800; color:var(--blue)">₹${e.baseRate}</span>
          </div>
          <div style="display:flex; gap:8px; font-size:12px; color:var(--text-muted); flex-wrap:wrap; align-items:center">
            <span style="color:#f59e0b; font-weight:700">★ ${e.rating.toFixed(1)}</span>
            <span>•</span>
            <span>${e.jobs} jobs</span>
            <span>•</span>
            <span>${e.exp} yrs exp</span>
            <span>•</span>
            <span style="color:#059669; font-weight:600">📍 ${e.distance.toFixed(1)} km</span>
          </div>
        </div>
        <div style="display:flex; align-items:center; justify-content:center; width:22px; height:22px; border-radius:50%; border:2px solid ${isSelected ? 'var(--blue)' : '#cbd5e1'}; background:${isSelected ? 'var(--blue)' : 'none'}; color:#fff; font-size:12px; font-weight:800">
          ${isSelected ? '✓' : ''}
        </div>
      </div>
    `;
  }).join('');
  
  // Keep the matched pros list in sync (if exists)
  renderSidebarMatchedPros(filtered);
};

window.sortBookingElectricians = () => {
  renderBookingElectricians();
};

window.selectBookingElectrician = (id) => {
  const citySelect = document.getElementById('bookingCity');
  const selectedCity = citySelect ? citySelect.value : 'Howrah';
  
  let list = window.mockElectricians.filter(e => e.city.toLowerCase() === selectedCity.toLowerCase());
  if (list.length === 0) {
    list = [
      { id: 'EM1', name: 'Rohan Sen', rating: 4.8, jobs: 310, exp: 4, baseRate: 350, city: selectedCity, distance: 1.4, avatar: 'R', color: '#4169E1' },
      { id: 'EM2', name: 'Karan Sharma', rating: 4.7, jobs: 240, exp: 3, baseRate: 300, city: selectedCity, distance: 2.8, avatar: 'K', color: '#059669' },
      { id: 'EM3', name: 'Vikram Singh', rating: 4.9, jobs: 490, exp: 6, baseRate: 500, city: selectedCity, distance: 0.9, avatar: 'V', color: '#7c3aed' },
      { id: 'EM4', name: 'Anil Gupta', rating: 4.4, jobs: 120, exp: 2, baseRate: 450, city: selectedCity, distance: 3.2, avatar: 'A', color: '#f59e0b' }
    ];
  }
  
  const matched = list.find(e => e.id === id);
  if (matched) {
    currentSelectedElectrician = matched;
    renderBookingElectricians();
    updateBookingSummary();
  }
};

function renderSidebarMatchedPros(list) {
  const container = document.querySelector('.price-box:nth-child(2)');
  if (!container || !container.querySelector('h3')?.textContent.includes('Matched')) return;
  
  const h3 = container.querySelector('h3');
  // Rebuild list of pros
  const prosHtml = list.slice(0, 3).map(e => {
    const isSelected = currentSelectedElectrician && currentSelectedElectrician.id === e.id;
    return `
      <div class="prof-card" onclick="selectBookingElectrician('${e.id}')" style="cursor:pointer; border:1.5px solid ${isSelected ? 'var(--blue)' : 'transparent'}; background:${isSelected ? 'rgba(65, 105, 225, 0.02)' : 'none'}; padding:8px; border-radius:8px; margin-bottom:8px">
        <div class="prof-av" style="background:linear-gradient(135deg,${e.color},#5ce1e6)">${e.avatar}</div>
        <div style="flex:1">
          <div class="prof-name" style="font-weight:${isSelected ? '800' : '600'}">${e.name}</div>
          <div class="prof-meta">★ ${e.rating} · ${e.jobs} jobs · ₹${e.baseRate}</div>
        </div>
        <span class="badge ${isSelected ? 'badge-blue' : 'badge-green'}">${isSelected ? 'Selected' : 'Available'}</span>
      </div>
    `;
  }).join('');
  
  container.innerHTML = `<h3>👷 Matched Professionals</h3>` + prosHtml;
}

document.addEventListener('DOMContentLoaded', () => {
  renderBookingServices();
  renderHomeDynamicSections();
});

window.renderHomeDynamicSections = () => {
  const services = window.getAmpEdgeServices();
  const products = window.getAmpEdgeProducts();

  // 1. Hero Dashboard (Live Service Dashboard)
  const heroDash = document.querySelector('.hero-main-card');
  if (heroDash) {
    const dashServices = services.slice(0, 4);
    const rows = heroDash.querySelectorAll('.service-row');
    dashServices.forEach((s, i) => {
      if (rows[i]) {
        const nameEl = rows[i].querySelector('.sr-name');
        const priceEl = rows[i].querySelector('.sr-price');
        if(nameEl) nameEl.textContent = s.name;
        if(priceEl) priceEl.textContent = `₹${s.basePrice.toLocaleString('en-IN')}`;
      }
    });
  }

  // 2. Our Services Grid
  const svcGrid = document.getElementById('homeServicesGrid');
  if (svcGrid) {
    const homeServices = services.slice(0, 4);
    svcGrid.innerHTML = homeServices.map((s, i) => {
      let iconHtml = '';
      if (s.image && s.image.startsWith('images/')) {
        iconHtml = `<img src="${s.image}" alt="${s.name}" style="width:100%; height:100%; object-fit:cover; display:block; border-radius:18px;"/>`;
      } else {
        let icon = '⚡';
        if (s.category === 'REPAIR') icon = '🔧';
        else if (s.category === 'INSTALLATION') icon = '🔌';
        else if (s.category === 'COMMERCIAL') icon = '🏭';
        else if (s.category === 'EMERGENCY') icon = '🚨';
        iconHtml = icon;
      }
      
      return `
        <div class="svc-card fade-up" style="transition-delay:${i * 0.08}s">
          <div class="svc-icon-wrap" style="overflow:hidden;">${iconHtml}</div>
          <h3>${s.name}</h3>
          <p>${s.description}</p>
          <a href="booking.html" class="svc-link">Book Now <span>→</span></a>
        </div>
      `;
    }).join('');
  }

  // 3. Marketplace Categories Preview
  const mpGrid = document.getElementById('homeMarketplaceGrid');
  if (mpGrid) {
    // Group by category
    const catsMap = {};
    products.forEach(p => {
      if (!catsMap[p.category]) catsMap[p.category] = { count: 0, icon: p.image || '📦' };
      catsMap[p.category].count++;
    });
    
    const categories = Object.keys(catsMap).slice(0, 5);
    mpGrid.innerHTML = categories.map((cat, i) => {
      const data = catsMap[cat];
      const label = cat.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
      
      const iconHtml = (data.icon && data.icon.startsWith('images/'))
        ? `<img src="${data.icon}" alt="${label}" style="width:46px; height:46px; object-fit:contain; margin:0 auto 14px; display:block;"/>`
        : `<span class="mpc-icon">${data.icon}</span>`;

      return `
        <a href="marketplace.html" class="mpc mpc-cat-card fade-up" style="transition-delay:${i * 0.08}s; display:flex; flex-direction:column; align-items:center; justify-content:center;">
          ${iconHtml}
          <h4>${label}</h4>
          <span class="mpc-count">${data.count > 40 ? data.count : (data.count + 40)}+ Products</span>
        </a>
      `;
    }).join('');
  }
};

// Listen for storage changes to sync across tabs instantly
window.addEventListener('storage', (e) => {
  if (e.key === 'ampedge_services' || e.key === 'ampedge_products') {
    renderHomeDynamicSections();
    renderBookingServices();
    renderMarketplaceProducts();
  }
});

// ── Marketplace rendering ─────────────────────────────
let currentCategoryFilter = 'ALL';
let currentSearchTerm = '';
let currentPriceLimit = Infinity;
let currentMinPriceLimit = 0;
let currentMaxPriceLimit = 999999;

// ── Service Budget filtering ──────────────────────────
let currentServiceMinPrice = 0;
let currentServiceMaxPrice = 999999;

function renderMarketplaceProducts() {
  const grid = document.getElementById('productGrid');
  if (!grid) return; // Not on marketplace page

  const products = window.getAmpEdgeProducts();
  
  const filtered = products.filter(p => {
    // filter by search term
    if (currentSearchTerm && !p.name.toLowerCase().includes(currentSearchTerm.toLowerCase())) return false;
    
    // filter by category
    if (currentCategoryFilter !== 'ALL') {
      const match = {
        'Switches': ['SMART_HOME', 'WIRING_MATERIALS'],
        'Wires & Cables': ['WIRING_MATERIALS'],
        'MCB & DB': ['WIRING_MATERIALS'],
        'LED Lighting': ['LIGHTING_FIXTURES'],
        'Fans': ['APPLIANCES'],
      }[currentCategoryFilter] || [];
      if (!match.includes(p.category)) return false;
    }
    
    // filter by price
    if (p.basePrice < currentMinPriceLimit || p.basePrice > currentMaxPriceLimit) return false;
    if (p.basePrice > currentPriceLimit) return false;
    
    return true;
  });

  const countDiv = document.querySelector('.mp-count');
  if (countDiv) countDiv.innerHTML = `Showing <strong>${filtered.length} products</strong>`;

  if (filtered.length === 0) {
    grid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--muted)">No products found matching your criteria.</div>';
    return;
  }

  grid.innerHTML = filtered.map(p => `
    <div class="product-card">
      <div class="product-img-wrap" style="overflow:hidden; display:flex; align-items:center; justify-content:center; height:180px; position:relative; background:linear-gradient(135deg,var(--bg) 0%,var(--bg2) 100%);">
        ${(p.image && p.image.startsWith('images/'))
          ? `<img src="${p.image}" alt="${p.name}" style="width:100%; height:100%; object-fit:cover; display:block; transition:transform 0.5s ease" onmouseover="this.style.transform='scale(1.06)'" onmouseout="this.style.transform='scale(1)'"/>`
          : `<span style="font-size:32px">${p.image || '📦'}</span>`}
        ${p.stock < 20 ? '<div class="prod-badge"><span class="badge badge-orange">Limited Stock</span></div>' : ''}
        <div class="prod-wish">♡</div>
      </div>
      <div class="product-info">
        <div class="prod-brand">${p.category.replace('_', ' ')}</div>
        <div class="prod-name">${p.name}</div>
        <div class="prod-rating"><span class="stars">★★★★★</span>4.8</div>
        <div class="prod-footer">
          <div class="prod-price">₹${p.basePrice.toLocaleString('en-IN')}</div>
          <button class="add-btn" onclick="addToCart(this)" data-added="false">+ Cart</button>
        </div>
      </div>
    </div>
  `).join('');
  
  if (typeof refreshAddButtons === 'function') refreshAddButtons();
}

document.addEventListener('DOMContentLoaded', () => {
  renderMarketplaceProducts();
  
  const searchInput = document.querySelector('.search-input');
  const searchBtn = document.querySelector('.search-bar .btn-primary');
  
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentSearchTerm = e.target.value;
      renderMarketplaceProducts();
    });
  }
});

// ── Category chip ─────────────────────────────
function chipClick(el) {
  document.querySelectorAll('.chip-item').forEach(c => c.classList.remove('active'));
  el.classList.add('active');
  const cat = el.textContent.trim();
  currentCategoryFilter = cat === 'All Products' ? 'ALL' : cat;
  renderMarketplaceProducts();
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
let cart = JSON.parse(localStorage.getItem('ampedge_cart') || '[]');

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

  const items = JSON.parse(localStorage.getItem('ampedge_cart') || '[]');

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
        <a href="javascript:void(0)" onclick="openCheckout(true)" style="display:flex;align-items:center;justify-content:center;gap:8px;width:100%;padding:14px;background:linear-gradient(135deg,#4169E1,#2c4fd4);color:#fff;border-radius:14px;font-size:15px;font-weight:800;text-decoration:none;box-shadow:0 4px 20px rgba(65,105,225,0.4);transition:all 0.2s" onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform=''">Checkout Now 🔒</a>
        <button onclick="clearCart()" style="width:100%;padding:10px;margin-top:8px;background:none;border:1.5px solid rgba(239,68,68,.3);border-radius:10px;color:#ef4444;font-size:13px;font-weight:700;cursor:pointer;transition:all 0.2s" onmouseover="this.style.background='#ef4444';this.style.color='#fff';this.style.borderColor='#ef4444'" onmouseout="this.style.background='none';this.style.color='#ef4444';this.style.borderColor='rgba(239,68,68,.3)'">Clear Cart</button>
      </div>
    `;
  }
  document.body.appendChild(popup);
}

function removeCartItem(index) {
  cart.splice(index, 1);
  localStorage.setItem('ampedge_cart', JSON.stringify(cart));
  updateCartBadge();
  // Re-render popup
  document.getElementById('cartPopup')?.remove();
  toggleCartPopup();
  // Update product buttons on page
  refreshAddButtons();
}

function clearCart() {
  cart = [];
  localStorage.setItem('ampedge_cart', JSON.stringify(cart));
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
    localStorage.setItem('ampedge_cart', JSON.stringify(cart));
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
  localStorage.setItem('ampedge_cart', JSON.stringify(cart));
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
  if (typeof currentPriceLimit !== 'undefined') {
    currentPriceLimit = +val >= 9999 ? Infinity : +val;
    
    // Clear product budget radio selection since custom slider was used
    const radios = ['pbAll', 'pbLow', 'pbMed', 'pbHigh'];
    radios.forEach(id => {
      const el = document.getElementById(id);
      if (el) el.checked = false;
    });
    // Reset range bounds
    currentMinPriceLimit = 0;
    currentMaxPriceLimit = currentPriceLimit;
    
    renderMarketplaceProducts();
  }
}

window.setProductBudget = (min, max) => {
  currentMinPriceLimit = min;
  currentMaxPriceLimit = max;
  
  // Sync range slider if a preset is clicked
  const slider = document.querySelector('.range-slider');
  const lbl = document.getElementById('priceLabel');
  if (slider) {
    if (max === 999999) {
      slider.value = 10000;
      if (lbl) lbl.textContent = 'Any price';
    } else {
      slider.value = max;
      if (lbl) lbl.textContent = `Up to ₹${max.toLocaleString('en-IN')}`;
    }
    currentPriceLimit = max;
  }
  
  renderMarketplaceProducts();
};

window.setServiceBudget = (min, max, activeBtnId) => {
  currentServiceMinPrice = min;
  currentServiceMaxPrice = max;
  
  const buttons = ['btnSvcAll', 'btnSvcLow', 'btnSvcMed', 'btnSvcHigh'];
  buttons.forEach(id => {
    const btn = document.getElementById(id);
    if (btn) {
      if (id === activeBtnId) {
        btn.className = 'btn btn-sm btn-primary';
        btn.style.color = '#fff';
      } else {
        btn.className = 'btn btn-sm btn-outline';
        btn.style.color = '';
      }
    }
  });
  
  renderBookingServices();
};

window.resetProductFilters = () => {
  currentMinPriceLimit = 0;
  currentMaxPriceLimit = 999999;
  currentPriceLimit = Infinity;
  currentSearchTerm = '';
  currentCategoryFilter = 'ALL';
  
  // Reset search input
  const input = document.querySelector('.search-input');
  if (input) input.value = '';
  
  // Reset category chips
  const chips = document.querySelectorAll('.chip-item');
  chips.forEach((c, idx) => {
    c.classList.toggle('active', idx === 0);
  });
  
  // Reset brand checkbox filters
  const checkboxes = document.querySelectorAll('.fc-opt input[type="checkbox"]');
  checkboxes.forEach(cb => {
    // If it's brand checkboxes, we can check the default checked ones (Havells, Legrand)
    const label = cb.nextElementSibling?.textContent;
    if (['Havells', 'Legrand', 'In Stock'].includes(label)) {
      cb.checked = true;
    } else {
      cb.checked = false;
    }
  });
  
  // Reset radios
  const radios = ['pbAll', 'pbLow', 'pbMed', 'pbHigh'];
  radios.forEach((id, idx) => {
    const el = document.getElementById(id);
    if (el) el.checked = idx === 0;
  });
  
  // Reset slider
  const slider = document.querySelector('.range-slider');
  const lbl = document.getElementById('priceLabel');
  if (slider) {
    slider.value = 10000;
    if (lbl) lbl.textContent = 'Any price';
  }
  
  renderMarketplaceProducts();
};

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

  const heading = document.getElementById('formHeading');
  if (heading) {
    heading.textContent = isE ? 'Electrician or Contractor Application Form' : 'Vendor Application Form';
  }
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
    reply: "Hello! 👋 Welcome to AMPEdge Solutions — India's premier electrical services and product marketplace. How can I help you today? You can ask me about our services, marketplace products, partnership programs, subscription plans, contact numbers, or WhatsApp support!" },
  // Services
  { keys: ['service','services','what do you do','what you do','offerings','offer','repair','installation','wiring','install','mcb','switchboard','board','wiring repair','mcb setup','smart home hub','emergency visit','light installation','fan installation'],
    reply: "⚡ **AMPEdge Professional Services:**\n\n• 🪢 **Wiring Repair** — Fix faulty wires & circuits. Starting at **₹499**.\n• 🔌 **MCB Setup** — Install DB boards & MCBs. Starting at **₹2,299**.\n• 🏠 **Smart Home Hub** — Automated lighting & switches. Starting at **₹4,999**.\n• 🚨 **Emergency Visit** — 24/7 urgent repair dispatch. Starting at **₹899**.\n• ☀️ **Solar Panel Installation** — Rooftop panels & net metering. Starting at **₹12,999**.\n• 🛠️ **Solar Maintenance** — cleaning & inverter check. Starting at **₹1,499**.\n• 📋 **Solar Rooftop Survey** — kW capacity planning. Starting at **₹299**.\n\nAll services include a **90-day warranty**. Book a service on our <a href='booking.html' style='color:#4169E1;font-weight:700'>Services Page</a>!" },
  // Marketplace / Products
  { keys: ['product','products','buy','shop','marketplace','switch','cable','wire','led','light','fan','inverter','battery','mounting','net meter','solar panel','online','order','material','materials','mcbs','fans','lights','switches'],
    reply: "🛒 **AMPEdge Marketplace Products:**\n\nWe deliver genuine certified electrical products with best price guarantees:\n\n• 💡 **Havells Coral Smart Switch** — ₹349\n• 🪢 **Finolex FR PVC Wire (2.5sqmm 90m)** — ₹2,299\n• 🔌 **Legrand Arteor USB Socket** — ₹1,249\n• 💡 **Philips LED Batten (20W)** — ₹449\n• 🌀 **Crompton Aura Fan (1200mm)** — ₹2,499\n• ☀️ **Luminous Solar Panel (335W)** — ₹8,999\n• ⚡ **Luminous Cruze 2kVA Inverter** — ₹12,499\n• 🔋 **Amaron Solar Battery (150Ah)** — ₹14,999\n• 🔩 **Solar Mounting Structure Kit** — ₹2,499\n• 📊 **Solar Net Meter Kit** — ₹3,499\n\nShop now on our <a href='marketplace.html' style='color:#4169E1;font-weight:700'>Marketplace Page</a>!" },
  // Subscriptions
  { keys: ['subscription','subscriptions','plan','plans','subscribe','base plan','modular plan','premium plan','membership','base model','modular model','premium model','base','modular','premium'],
    reply: "👑 **AMPEdge Prime Subscription Plans:**\n\nSave big on maintenance and platform fees with our models:\n\n• 🟢 **Base Model (₹199/month)**: 1 Free electrical safety audit per year, priority technician scheduling.\n• 🔵 **Modular Model (₹499/month)**: 2 Free safety audits per year, zero platform booking fees, and 5% extra discount on products.\n• 🟡 **Premium Model (₹999/month)**: Unlimited emergency technician visits, free annual safety checkups, 10% discount on all marketplace products, and 24/7 VIP support line.\n\nChoose your plan on our <a href='subscription.html' style='color:#4169E1;font-weight:700'>Subscriptions Page</a>!" },
  // Partnership
  { keys: ['partner','partnership','join','electrician job','work with','become partner','registration','register','apply','jobs','income','earn','driver','app'],
    reply: "🤝 **AMPEdge Partnership Program:**\n\nFor electricians, technicians, and electrical contractors. Work dynamically using our partnership portal — just switch on the app, accept service bookings near you, and withdraw your earnings daily!\n\n• Steady stream of verified jobs\n• Choose your own working hours\n• Daily instant payouts to your bank account\n• Free training, tools assistance, and accident insurance coverage\n\nSign up today on our <a href='partner.html' style='color:#4169E1;font-weight:700'>Partnership Page</a>!" },
  // Contacts & Support
  { keys: ['contact','phone','call','number','email','reach','whatsapp','address','location','where','office','mail','id','mobile','support','help','customer care','support team','helpline'],
    reply: "📞 **AMPEdge Contact & Support:**\n\n• 💬 **WhatsApp Business:** <a href='https://wa.me/919874600265' target='_blank' style='color:#25D366;font-weight:700'>+91 98746 00265</a>\n• 📞 **Customer Team Support:** +91 91236 67258 &nbsp;|&nbsp; +91 97483 98418\n• 📧 **Email ID:** ampedge.info@gmail.com\n• 📍 **Office Address:** West Bauria, Chackasi, Palpara, Howrah 711307\n\nWe provide 24/7 customer support for emergency repairs!" },
  // Terms & Conditions
  { keys: ['terms','conditions','terms and conditions','warranty','guarantee','cancellation','refund','policy','rules','legal','t&c','claim'],
    reply: "🛡️ **AMPEdge Terms & Service Policies:**\n\n• **90-Day Warranty:** All repairs and installations carry an absolute 90-day warranty. If any fault recurs, we fix it for free.\n• **Pay After Satisfaction:** You only pay after the electrician completes the work to your full satisfaction.\n• **Cancellation Policy:** You can cancel bookings for free at any time before the technician is dispatched.\n• **Product Returns:** Unused marketplace products can be returned within 7 days for a 100% refund, processed within 5-7 business days." },
  // Thanks
  { keys: ['thank','thanks','thank you','thx','great','awesome','nice','good','perfect','ok','okay','dhanyavad'],
    reply: "You're welcome! 😊 I'm glad I could help. Let me know if you need any other details about AMPEdge Solutions!" }
];

// Default fallback response
const defaultReply = "🤔 I'm not sure I understood that. Here's what I can help you with:\n\n• ⚡ Our electrical **services**\n• 🛒 **Products** & marketplace\n• 👑 **Subscription plans**\n• 🤝 **Partner** with us\n• 📞 **Contact** details\n• 🛡️ **Terms & warranty** info\n\nTry asking about any of these topics, or chat with our team on <a href='https://wa.me/919874600265' target='_blank' style='color:#25D366;font-weight:600'>WhatsApp</a>!";

function getAIResponse(userText) {
  const lower = userText.toLowerCase();
  for (const entry of ampedgeKB) {
    for (const key of entry.keys) {
      // Use word boundary matches so sub-words like 'this' or 'thin' don't trigger 'hi'
      const escapedKey = key.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
      const regex = new RegExp('\\b' + escapedKey + '\\b', 'i');
      if (regex.test(lower)) return entry.reply;
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

// Checkout & Payment Logic
window.openCheckout = function(isCart = false) {
  // Validate Booking Flow inputs if we are on the booking page
  const bName = document.getElementById('bookingName');
  const bPhone = document.getElementById('bookingPhone');
  if (bName && bPhone) {
    if (bName.value.trim() === '') {
      alert("Please enter your Full Name.");
      return;
    }
    if (!/^\d{10}$/.test(bPhone.value.trim())) {
      alert("Please enter a valid 10-digit Phone Number.");
      return;
    }
  }

  const modal = document.getElementById('checkoutModal');
  if(!modal) return;
  
  const modalTotal = document.getElementById('checkoutTotalAmount');
  if (isCart) {
    const items = JSON.parse(localStorage.getItem('ampedge_cart') || '[]');
    let total = 0;
    items.forEach(i => total += parseInt(i.price.replace(/[^0-9]/g, '')) || 0);
    if(modalTotal) modalTotal.textContent = '₹' + total.toLocaleString('en-IN');
  } else {
    // Get final price from summary if any
    const summaryTotal = document.getElementById('summaryTotalPrice');
    if(summaryTotal && modalTotal) {
      modalTotal.textContent = summaryTotal.textContent.trim() || '₹1,590';
    } else if (modalTotal) {
      modalTotal.textContent = '₹1,590';
    }
  }
  
  // Dynamic installation addon cross-selling initialization
  const instSection = document.getElementById('checkoutInstallationSection');
  if (instSection) {
    if (window.location.pathname.includes('marketplace.html')) {
      instSection.style.display = 'block';
      selectedMarketplaceElectrician = null;
      const amtText = modalTotal ? modalTotal.textContent : '0';
      baseProductOrderTotal = parseInt(amtText.replace(/[^0-9]/g, '')) || 0;
      
      // If location is already present in storage, show electricians list automatically
      if (localStorage.getItem('ampedge_user_loc')) {
        renderMarketplaceCheckoutElectricians();
      } else {
        const container = document.getElementById('checkoutElectriciansContainer');
        const promptText = document.getElementById('checkoutLocPromptText');
        const locBtn = document.getElementById('checkoutLocBtn');
        if (container) container.style.display = 'none';
        if (promptText) {
          promptText.style.display = 'block';
          promptText.textContent = 'Enable location to view verified electrician partners near you to set up your product.';
        }
        if (locBtn) {
          locBtn.style.display = 'inline-flex';
          locBtn.textContent = '📍 Use Current Location';
        }
      }
    } else {
      instSection.style.display = 'none';
    }
  }
  
  modal.classList.add('active');
};

// ── Marketplace Checkout Electrician Suggestions ─────
let selectedMarketplaceElectrician = null;
let baseProductOrderTotal = 0;

window.requestMarketplaceLocation = function() {
  if (!navigator.geolocation) {
    alert("Geolocation is not supported by your browser.");
    return;
  }
  
  const btn = document.getElementById('checkoutLocBtn');
  if (btn) btn.textContent = 'Enabling...';
  
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      
      const closest = getClosestCity(lat, lng);
      const locStr = `${closest.name} (${lat.toFixed(2)}° N, ${lng.toFixed(2)}° E)`;
      
      localStorage.setItem('ampedge_user_loc', locStr);
      localStorage.setItem('ampedge_user_lat', lat);
      localStorage.setItem('ampedge_user_lng', lng);
      
      renderMarketplaceCheckoutElectricians();
      showToastNotification(`📍 Location enabled: Near ${closest.name}`);
    },
    (error) => {
      console.warn("Location access denied: ", error.message);
      if (btn) btn.textContent = '📍 Use Current Location';
      alert("Please enable location permission in your browser to view nearby electricians.");
    }
  );
};

window.renderMarketplaceCheckoutElectricians = function() {
  const container = document.getElementById('checkoutElectriciansContainer');
  const promptText = document.getElementById('checkoutLocPromptText');
  const locBtn = document.getElementById('checkoutLocBtn');
  
  if (!container) return;
  
  const userLoc = localStorage.getItem('ampedge_user_loc') || 'Howrah';
  const cityName = userLoc.split(' (')[0];
  
  let filtered = window.mockElectricians.filter(e => e.city.toLowerCase() === cityName.toLowerCase());
  if (filtered.length === 0) {
    filtered = window.mockElectricians.slice(0, 3);
  }
  
  if (promptText) promptText.style.display = 'none';
  if (locBtn) locBtn.style.display = 'none';
  container.style.display = 'flex';
  
  const prosList = filtered.slice(0, 3).map(e => {
    const installFee = Math.round(e.baseRate * 0.7); // 30% discount on installation for buying product
    const isSelected = selectedMarketplaceElectrician && selectedMarketplaceElectrician.id === e.id;
    return `
      <div onclick="selectMarketplaceElectrician('${e.id}', ${installFee})" style="padding:10px; border:1px solid ${isSelected ? 'var(--blue)' : 'var(--border2)'}; background:${isSelected ? 'rgba(65,105,225,0.03)' : '#fff'}; border-radius:8px; cursor:pointer; display:flex; align-items:center; gap:10px; transition:0.2s">
        <div style="width:30px; height:30px; border-radius:50%; background:linear-gradient(135deg,${e.color},#5ce1e6); display:flex; align-items:center; justify-content:center; color:#fff; font-weight:800; font-size:12px;">${e.avatar}</div>
        <div style="flex:1">
          <div style="font-size:12.5px; font-weight:700; color:var(--text-dark)">${e.name}</div>
          <div style="font-size:11px; color:var(--text-muted)">★ ${e.rating} · ${e.distance.toFixed(1)} km away</div>
        </div>
        <div style="text-align:right">
          <span style="font-size:12px; font-weight:800; color:var(--blue)">+₹${installFee}</span>
          <div style="font-size:10px; color:#059669; font-weight:600">Install Fee</div>
        </div>
        <div style="width:16px; height:16px; border-radius:50%; border:1px solid ${isSelected ? 'var(--blue)' : '#cbd5e1'}; background:${isSelected ? 'var(--blue)' : 'none'}; display:flex; align-items:center; justify-content:center; color:#fff; font-size:9px">
          ${isSelected ? '✓' : ''}
        </div>
      </div>
    `;
  }).join('');
  
  container.innerHTML = `
    <span style="font-size:12px; font-weight:700; color:var(--text-dark); margin-bottom:4px; display:block">Available nearby for installation:</span>
    ${prosList}
    <button type="button" onclick="clearMarketplaceElectricianSelection()" class="btn btn-sm btn-outline" style="padding:4px 8px; font-size:10.5px; align-self:flex-end; border-color:#ef4444; color:#ef4444; margin-top:4px">✕ No Installation Needed</button>
  `;
};

window.selectMarketplaceElectrician = function(id, installFee) {
  const e = window.mockElectricians.find(item => item.id === id);
  if (!e) return;
  
  selectedMarketplaceElectrician = { ...e, installFee: installFee };
  
  const modalTotal = document.getElementById('checkoutTotalAmount');
  if (modalTotal) {
    const finalTotal = baseProductOrderTotal + installFee;
    modalTotal.textContent = '₹' + finalTotal.toLocaleString('en-IN');
  }
  
  renderMarketplaceCheckoutElectricians();
};

window.clearMarketplaceElectricianSelection = function() {
  selectedMarketplaceElectrician = null;
  const modalTotal = document.getElementById('checkoutTotalAmount');
  if (modalTotal) {
    modalTotal.textContent = '₹' + baseProductOrderTotal.toLocaleString('en-IN');
  }
  renderMarketplaceCheckoutElectricians();
};

window.switchCheckoutTab = function(tabId) {
  // Update Tabs
  document.querySelectorAll('.chk-tab').forEach(t => {
    t.classList.remove('active');
    t.style.borderBottomColor = 'transparent';
    t.style.color = 'var(--text-muted)';
  });
  const activeBtn = event.currentTarget;
  activeBtn.classList.add('active');
  activeBtn.style.borderBottomColor = 'var(--blue)';
  activeBtn.style.color = 'var(--blue)';
  
  // Update Panes
  document.querySelectorAll('.tab-pane').forEach(p => p.style.display = 'none');
  const pane = document.getElementById('tab-' + tabId);
  if(pane) pane.style.display = 'block';
};

window.processPayment = function() {
  // Validate Checkout modal fields if present
  const cNameInput = document.getElementById('checkoutName');
  const cPhoneInput = document.getElementById('checkoutPhone');
  if (cNameInput && cPhoneInput) {
    if (cNameInput.value.trim() === '') {
      alert("Please enter your Name.");
      return;
    }
    if (!/^\d{10}$/.test(cPhoneInput.value.trim())) {
      alert("Please enter a valid 10-digit Phone Number.");
      return;
    }
  }

  const rzpKey = localStorage.getItem('ampedge_razorpay_key');
  if (rzpKey && typeof Razorpay !== 'undefined') {
    processRazorpayPayment(rzpKey);
  } else {
    processMockPayment();
  }
};

window.processRazorpayPayment = function(key) {
  const btn = document.getElementById('paySecureBtn');
  const amountText = document.getElementById('checkoutTotalAmount')?.textContent || '0';
  const amount = parseInt(amountText.replace(/[^0-9]/g, '')) || 0;
  
  // Get Customer Details
  let cName = document.querySelector('#checkoutName')?.value.trim() || 
              document.querySelector('input[placeholder="Rahul Sharma"]')?.value.trim() || "Customer";
  let cPhone = document.querySelector('#checkoutPhone')?.value.trim() || 
               document.querySelector('input[placeholder="+91 98765 43210"]')?.value.trim() || "0000000000";

  const options = {
    "key": key,
    "amount": amount * 100, // Razorpay takes paisa
    "currency": "INR",
    "name": "AMPEdge",
    "description": "Electrical Service / Product Purchase",
    "image": "images/admin-logo.png",
    "handler": function (response){
      // Success Callback
      saveTransaction(response.razorpay_payment_id, amount, cName, cPhone, 'Razorpay');
      completeCheckoutFlow(response.razorpay_payment_id);
    },
    "prefill": {
      "name": cName,
      "contact": cPhone
    },
    "theme": { "color": "#4169E1" }
  };
  
  const rzp = new Razorpay(options);
  rzp.on('payment.failed', function (response){
    alert("Payment Failed: " + response.error.description);
  });
  rzp.open();
};

window.processMockPayment = function() {
  const btn = document.getElementById('paySecureBtn');
  const orgText = btn.innerHTML;
  btn.innerHTML = 'Processing... ⏳';
  btn.style.opacity = '0.8';
  btn.style.pointerEvents = 'none';
  
  setTimeout(() => {
    btn.innerHTML = orgText;
    btn.style.opacity = '1';
    btn.style.pointerEvents = 'auto';
    
    // Generate Random Ref Number
    const refId = 'MOCK-' + Math.floor(100000 + Math.random() * 900000);
    
    // Determine payment details
    const amountText = document.getElementById('checkoutTotalAmount')?.textContent || '0';
    const amount = parseInt(amountText.replace(/[^0-9]/g, '')) || 0;
    
    let cName = document.querySelector('#checkoutName')?.value.trim() || 
                document.querySelector('input[placeholder="Rahul Sharma"]')?.value.trim() || "Guest User";
    let cPhone = document.querySelector('#checkoutPhone')?.value.trim() || 
                 document.querySelector('input[placeholder="+91 98765 43210"]')?.value.trim() || "No Phone";

    saveTransaction(refId, amount, cName, cPhone, 'Mock UPI');
    completeCheckoutFlow(refId);
  }, 1500);
};

function saveTransaction(id, amount, cName, cPhone, method) {
  const now = new Date();
  const formattedDate = now.toISOString().split('T')[0] + ' ' + now.toTimeString().split(' ')[0].substring(0, 5);
  
  // 1) Save to Payments
  let payments = JSON.parse(localStorage.getItem('ampedge_payments') || '[]');
  let payType = 'service';
  let payDetails = 'Electrician Service Booking';
  let payBrand = '-';
  
  if (window.location.pathname.includes('marketplace.html')) {
    payType = 'product';
    const cartItems = JSON.parse(localStorage.getItem('ampedge_cart') || '[]');
    if (cartItems.length > 0) {
      payDetails = cartItems.map(item => item.name).join(', ');
      payBrand = [...new Set(cartItems.map(item => item.name.split(' ')[0]))].join(', ');
    } else {
      payDetails = 'Marketplace Products';
    }
  } else if (window.location.pathname.includes('booking.html')) {
    const cartItems = JSON.parse(localStorage.getItem('ampedge_cart') || '[]');
    const svcName = document.getElementById('summarySvcName')?.innerText.replace('⚡ ', '').split('\n')[0].trim() || 'General Service';
    if (cartItems.length > 0) {
      payType = 'unified';
      const cartNames = cartItems.map(item => item.name).join(', ');
      payDetails = `${svcName} + Products (${cartNames})`;
      payBrand = [...new Set(cartItems.map(item => item.name.split(' ')[0]))].join(', ');
    } else {
      payDetails = svcName;
    }
  }
  
  payments.unshift({ 
    tx: 'TXN-' + id, 
    date: formattedDate, 
    cust: cName, 
    amt: amount, 
    method: method, 
    status: 'Success',
    type: payType,
    details: payDetails,
    brand: payBrand
  });
  localStorage.setItem('ampedge_payments', JSON.stringify(payments));
  
  // Get active location if saved
  const activeLoc = localStorage.getItem('ampedge_user_loc') || 'Not Shared';
  
  // 2) Save to Bookings (if on booking page)
  if (window.location.pathname.includes('booking.html')) {
    let bookings = JSON.parse(localStorage.getItem('ampedge_bookings') || '[]');
    let svcName = document.getElementById('summarySvcName')?.innerText.replace('⚡ ', '').split('\n')[0].trim() || 'General Service';
    if (selectedAddonProducts.length > 0) {
      const addons = selectedAddonProducts.map(p => p.name).join(', ');
      svcName += ` (+ ${addons})`;
    }
    
    // Add cart products list to description if unified checkout is active
    const cartItems = JSON.parse(localStorage.getItem('ampedge_cart') || '[]');
    if (cartItems.length > 0) {
      const cartNames = cartItems.map(item => item.name).join(', ');
      svcName += ` & Purchased Products (${cartNames})`;
      
      // Clear cart since it is paid for
      localStorage.removeItem('ampedge_cart');
      if (typeof cart !== 'undefined') cart = [];
      if (typeof updateCartBadge === 'function') updateCartBadge();
    }
    
    bookings.unshift({ 
      id: 'B-' + id, 
      date: now.toISOString().split('T')[0], 
      customer: cName, 
      service: svcName, 
      status: 'Pending', 
      tech: currentSelectedElectrician ? currentSelectedElectrician.name : 'Unassigned', 
      amount: amount,
      location: activeLoc
    });
    localStorage.setItem('ampedge_bookings', JSON.stringify(bookings));
  }
  
  // 2b) Save to Bookings (if product checkout includes installation selection on marketplace page)
  if (window.location.pathname.includes('marketplace.html') && typeof selectedMarketplaceElectrician !== 'undefined' && selectedMarketplaceElectrician) {
    let bookings = JSON.parse(localStorage.getItem('ampedge_bookings') || '[]');
    bookings.unshift({ 
      id: 'B-INST-' + id, 
      date: now.toISOString().split('T')[0], 
      customer: cName, 
      service: `Product Installation (Marketplace Addon)`, 
      status: 'Pending', 
      tech: selectedMarketplaceElectrician.name, 
      amount: selectedMarketplaceElectrician.installFee,
      location: activeLoc
    });
    localStorage.setItem('ampedge_bookings', JSON.stringify(bookings));
  }
  
  // 3) Update Customers
  let customers = JSON.parse(localStorage.getItem('ampedge_customers') || '[]');
  let exist = customers.find(c => c.phone === cPhone);
  
  const emailVal = `${cName.toLowerCase().replace(/\s+/g, '')}@gmail.com`;
  const isGeoShared = activeLoc !== 'Not Shared';
  const city = isGeoShared ? activeLoc.split(' (')[0] : 'Unknown';
  const coords = isGeoShared ? activeLoc.split('(')[1].replace(')', '') : '';
  const locState = isGeoShared ? 'Enabled' : 'Not Shared';
  
  if (exist) {
    exist.spend += amount;
    exist.orders += 1;
    exist.lastActive = 'Today';
    if (isGeoShared) {
      exist.loc = city;
      exist.coords = coords;
      exist.locState = locState;
    }
  } else {
    customers.unshift({ 
      id: 'C-' + Math.floor(100+Math.random()*900), 
      name: cName, 
      phone: cPhone, 
      email: emailVal,
      loc: city, 
      coords: coords,
      locState: locState,
      spend: amount, 
      orders: 1, 
      lastActive: 'Today' 
    });
  }
  localStorage.setItem('ampedge_customers', JSON.stringify(customers));
}

function completeCheckoutFlow(id) {
  // Hide checkout, show success
  document.getElementById('checkoutModal').classList.remove('active');
  const refEl = document.getElementById('bookingRefId');
  if(refEl) refEl.textContent = id;
  
  // Show success modal if exists
  const successModal = document.getElementById('successModal');
  if (successModal) {
    successModal.classList.add('active');
  } else {
    alert("Payment Successful! Ref ID: " + id);
  }
  
  localStorage.removeItem('ampedge_cart');
  if (typeof updateCartBadge === 'function') updateCartBadge();
}

// ── Technician Portal Logic ───────────────────
window.openTechLogin = () => {
  const modal = document.getElementById('techLoginModal');
  if(modal) modal.classList.add('active');
};

window.logoutTech = () => {
  sessionStorage.removeItem('tech_auth');
  document.getElementById('techPortal').style.display = 'none';
  document.body.style.overflow = '';
};

window.processTechLogin = () => {
  const pass = document.getElementById('techPass').value;
  const err = document.getElementById('techLoginError');
  
  if (pass === 'Tech2026') {
    sessionStorage.setItem('tech_auth', 'true');
    document.getElementById('techLoginModal').classList.remove('active');
    showTechPortal();
  } else {
    if(err) err.style.display = 'block';
  }
};

function showTechPortal() {
  const portal = document.getElementById('techPortal');
  if(!portal) return;
  portal.style.display = 'block';
  document.body.style.overflow = 'hidden';
  renderTechJobs();
}

window.renderTechJobs = () => {
  const bookings = JSON.parse(localStorage.getItem('ampedge_bookings') || '[]');
  const availableList = document.getElementById('availableJobsList');
  const myJobsList = document.getElementById('myJobsList');
  
  if(!availableList || !myJobsList) return;
  
  // Available Jobs (Unassigned)
  const available = bookings.filter(b => b.tech === 'Unassigned' && b.status !== 'Cancelled');
  availableList.innerHTML = available.length ? available.map(b => `
    <div style="background:#fff; padding:18px; border-radius:12px; border:1px solid #e2e8f0">
      <div style="display:flex; justify-content:space-between; margin-bottom:10px">
        <span style="font-size:12px; font-weight:700; color:#1e56a0">${b.id}</span>
        <span style="font-size:12px; font-weight:700; color:#059669">₹${b.amount}</span>
      </div>
      <h4 style="margin:0 0 4px 0; font-size:15px">${b.service}</h4>
      <p style="margin:0; font-size:13px; color:#64748b">📅 ${b.date} · 📍 4.2km away</p>
      <button class="btn btn-primary btn-sm" style="width:100%; margin-top:14px; padding:10px" onclick="acceptJob('${b.id}')">Accept Job</button>
    </div>
  `).join('') : '<p style="text-align:center; color:#64748b; font-size:14px; padding:20px">No new jobs available right now.</p>';

  // My Jobs (Assigned to Ramesh Kumar - Mock Name)
  const myJobs = bookings.filter(b => b.tech === 'Ramesh K.' || b.tech === 'Ramesh Kumar');
  myJobsList.innerHTML = myJobs.length ? myJobs.map(b => `
    <div style="background:#fff; padding:18px; border-radius:12px; border:2px solid ${b.status === 'Completed' ? '#059669' : '#2979ff'}">
      <div style="display:flex; justify-content:space-between; margin-bottom:10px">
        <span style="font-size:12px; font-weight:700; color:#1e56a0">${b.id}</span>
        <span class="badge ${b.status === 'Completed' ? 'badge-green' : 'badge-blue'}">${b.status}</span>
      </div>
      <h4 style="margin:0 0 4px 0; font-size:15px">${b.service}</h4>
      <p style="margin:0; font-size:13px; color:#64748b">👤 ${b.customer} · 📍 Howrah</p>
      ${b.status !== 'Completed' ? `<button class="btn btn-outline btn-sm" style="width:100%; margin-top:14px; padding:10px" onclick="completeJob('${b.id}')">Mark as Completed</button>` : ''}
    </div>
  `).join('') : '<p style="text-align:center; color:#64748b; font-size:14px; padding:20px">You haven\'t accepted any jobs yet.</p>';
  
  // Update Earnings
  const earnings = myJobs.filter(b => b.status === 'Completed').reduce((sum, b) => sum + b.amount, 0);
  const earningsEl = document.getElementById('techEarnings');
  if(earningsEl) earningsEl.textContent = '₹' + (28450 + earnings).toLocaleString('en-IN');
  const activeCountEl = document.getElementById('techActiveCount');
  if(activeCountEl) activeCountEl.textContent = myJobs.filter(b => b.status !== 'Completed').length;
};

window.acceptJob = (id) => {
  let bookings = JSON.parse(localStorage.getItem('ampedge_bookings') || '[]');
  const idx = bookings.findIndex(b => b.id === id);
  if(idx !== -1) {
    bookings[idx].tech = 'Ramesh K.';
    bookings[idx].status = 'In Progress';
    localStorage.setItem('ampedge_bookings', JSON.stringify(bookings));
    renderTechJobs();
  }
};

window.completeJob = (id) => {
  let bookings = JSON.parse(localStorage.getItem('ampedge_bookings') || '[]');
  const idx = bookings.findIndex(b => b.id === id);
  if(idx !== -1) {
    bookings[idx].status = 'Completed';
    localStorage.setItem('ampedge_bookings', JSON.stringify(bookings));
    renderTechJobs();
  }
};

document.addEventListener('DOMContentLoaded', () => {
  if (sessionStorage.getItem('tech_auth') === 'true') {
    showTechPortal();
  }
  
  // Geolocation Setup
  initializeLocationPrompt();
});

// ── Geolocation & Location Tracking ─────────────────
const cities = [
  { name: 'Kolkata', lat: 22.5726, lng: 88.3639, pin: "700001" },
  { name: 'Howrah', lat: 22.5958, lng: 88.2636, pin: "711101" },
  { name: 'Delhi NCR', lat: 28.6139, lng: 77.2090, pin: "110001" },
  { name: 'Mumbai', lat: 19.0760, lng: 72.8777, pin: "400001" },
  { name: 'Bangalore', lat: 12.9716, lng: 77.5946, pin: "560001" },
  { name: 'Hyderabad', lat: 17.3850, lng: 78.4867, pin: "500001" },
  { name: 'Pune', lat: 18.5204, lng: 73.8567, pin: "411001" }
];

function initializeLocationPrompt() {
  // If location already shared or prompt dismissed this session, don't show
  if (localStorage.getItem('ampedge_user_loc') || sessionStorage.getItem('ampedge_loc_prompt_dismissed')) {
    // If already shared, auto-fill if on booking page
    if (localStorage.getItem('ampedge_user_loc') && window.location.pathname.includes('booking.html')) {
      autoFillLocation();
    }
    return;
  }
  
  // Create Geolocation Popup Banner
  const banner = document.createElement('div');
  banner.id = 'locationPromptBanner';
  banner.style.cssText = `
    position: fixed;
    bottom: 24px;
    right: 24px;
    z-index: 99999;
    max-width: 350px;
    background: rgba(255, 255, 255, 0.98);
    border: 1px solid rgba(0, 0, 0, 0.08);
    border-radius: 16px;
    box-shadow: 0 12px 36px rgba(0, 0, 0, 0.16);
    padding: 20px;
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    display: flex;
    flex-direction: column;
    gap: 14px;
    font-family: var(--font-pjs), system-ui, sans-serif;
    animation: slideInUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) both;
  `;
  
  // Add animation keyframes to head
  if (!document.getElementById('geoAnimationCSS')) {
    const style = document.createElement('style');
    style.id = 'geoAnimationCSS';
    style.textContent = `
      @keyframes slideInUp {
        from { transform: translateY(60px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
      }
    `;
    document.head.appendChild(style);
  }
  
  banner.innerHTML = `
    <div style="display: flex; align-items: flex-start; gap: 14px;">
      <div style="width: 42px; height: 42px; border-radius: 50%; background: rgba(65, 105, 225, 0.1); display: flex; align-items: center; justify-content: center; font-size: 20px; flex-shrink: 0; color: #4169E1;">📍</div>
      <div>
        <h4 style="margin: 0 0 4px 0; font-size: 15px; font-weight: 800; color: #0a0f2c;">Turn On Location</h4>
        <p style="margin: 0; font-size: 13px; line-height: 1.5; color: #64748b;">Help us find certified electricians and products nearest to you.</p>
      </div>
    </div>
    <div style="display: flex; justify-content: flex-end; gap: 8px;">
      <button onclick="dismissLocationPrompt()" style="background: none; border: none; padding: 8px 14px; font-size: 13px; font-weight: 700; color: #64748b; cursor: pointer; border-radius: 8px; transition: background 0.2s;">Dismiss</button>
      <button onclick="requestGeolocation(false)" style="background: #4169E1; border: none; padding: 8px 16px; font-size: 13px; font-weight: 700; color: #fff; cursor: pointer; border-radius: 8px; box-shadow: 0 4px 12px rgba(65, 105, 225, 0.25); transition: transform 0.2s;">Enable Location</button>
    </div>
  `;
  
  document.body.appendChild(banner);
}

window.dismissLocationPrompt = function() {
  const banner = document.getElementById('locationPromptBanner');
  if (banner) banner.remove();
  sessionStorage.setItem('ampedge_loc_prompt_dismissed', 'true');
};

window.requestGeolocation = function(silent = false) {
  if (!navigator.geolocation) {
    if (!silent) alert("Geolocation is not supported by your browser.");
    return;
  }
  
  const btn = event?.currentTarget;
  const orgText = btn ? btn.textContent : '';
  if (btn) btn.textContent = 'Enabling...';
  
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      
      // Find closest city from coordinates
      const closest = getClosestCity(lat, lng);
      const locStr = `${closest.name} (${lat.toFixed(2)}° N, ${lng.toFixed(2)}° E)`;
      
      // Save to localStorage
      localStorage.setItem('ampedge_user_loc', locStr);
      localStorage.setItem('ampedge_user_lat', lat);
      localStorage.setItem('ampedge_user_lng', lng);
      
      // Remove banner
      const banner = document.getElementById('locationPromptBanner');
      if (banner) banner.remove();
      
      // Auto-fill form
      autoFillLocation();
      
      // Success toast
      showToastNotification(`📍 Location enabled: Near ${closest.name}`);
    },
    (error) => {
      console.warn("Location access denied: ", error.message);
      if (btn) btn.textContent = orgText;
      if (!silent) {
        showToastNotification("⚠️ Please enable location permission in your browser.");
      }
      dismissLocationPrompt();
    }
  );
};

window.autofillLiveAddress = function(btn) {
  if (!navigator.geolocation) {
    showToastNotification("⚠️ Geolocation is not supported by your browser.");
    return;
  }
  
  const orgText = btn ? btn.innerHTML : '';
  if (btn) {
    btn.innerHTML = '⚡ Tracking...';
    btn.style.pointerEvents = 'none';
  }
  
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      
      // Save location coordinates to local storage
      localStorage.setItem('ampedge_user_lat', lat);
      localStorage.setItem('ampedge_user_lng', lng);
      
      const closestCity = getClosestCity(lat, lng);
      localStorage.setItem('ampedge_user_loc', `${closestCity.name} (${lat.toFixed(2)}° N, ${lng.toFixed(2)}° E)`);
      autoFillLocation(); // automatically fill Step 2 city selector
      
      // Fetch details from OpenStreetMap Nominatim reverse geocoding API
      fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`)
        .then(res => res.json())
        .then(data => {
          if (btn) {
            btn.innerHTML = orgText;
            btn.style.pointerEvents = 'auto';
          }
          if (data && data.address) {
            const addr = data.address;
            const road = addr.road || addr.suburb || addr.neighbourhood || '';
            const house = addr.house_number || addr.building || '';
            const district = addr.city_district || addr.suburb || '';
            const city = addr.city || addr.town || addr.village || addr.county || '';
            const state = addr.state || '';
            const postcode = addr.postcode || '';
            
            const line1 = [house, road].filter(Boolean).join(', ') || data.name || 'Current Location';
            const line2 = [district, city, state, postcode].filter(Boolean).join(', ');
            
            const line1Input = document.getElementById('bookingAddressLine1');
            const line2Input = document.getElementById('bookingAddressLine2');
            
            if (line1Input) line1Input.value = line1;
            if (line2Input) line2Input.value = line2;
            
            showToastNotification("📍 Live Address autofilled successfully!");
          } else {
            showToastNotification("⚠️ Address could not be resolved. Please type manually.");
          }
        })
        .catch(err => {
          console.error(err);
          if (btn) {
            btn.innerHTML = orgText;
            btn.style.pointerEvents = 'auto';
          }
          showToastNotification("⚠️ Address lookup failed. Please type manually.");
        });
    },
    (error) => {
      console.warn(error);
      if (btn) {
        btn.innerHTML = orgText;
        btn.style.pointerEvents = 'auto';
      }
      showToastNotification("⚠️ Geolocation access denied by browser.");
    }
  );
};

function getClosestCity(lat, lng) {
  let min = Infinity;
  let closest = cities[0];
  cities.forEach(c => {
    let d = Math.sqrt(Math.pow(c.lat - lat, 2) + Math.pow(c.lng - lng, 2));
    if (d < min) {
      min = d;
      closest = c;
    }
  });
  return closest;
}

function autoFillLocation() {
  const citySelect = document.getElementById('bookingCity');
  const pincodeInput = document.getElementById('bookingPincode');
  
  const lat = parseFloat(localStorage.getItem('ampedge_user_lat'));
  const lng = parseFloat(localStorage.getItem('ampedge_user_lng'));
  
  if (lat && lng) {
    const closest = getClosestCity(lat, lng);
    if (citySelect) {
      citySelect.value = closest.name;
      // Trigger electricians list update
      renderBookingElectricians();
    }
    if (pincodeInput && !pincodeInput.value) pincodeInput.value = closest.pin;
  }
}

function showToastNotification(msg) {
  if (typeof showToast === 'function') {
    showToast(msg);
  } else {
    alert(msg);
  }
}

// ── 3D Canvas Header Animation Engine ────────────────
document.addEventListener('DOMContentLoaded', () => {
  const canvases = document.querySelectorAll('.header-3d-canvas');
  canvases.forEach(canvas => {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const theme = canvas.getAttribute('data-theme') || 'home';
    let width = canvas.width = canvas.offsetWidth;
    let height = canvas.height = canvas.offsetHeight;
    
    // Handle resize
    window.addEventListener('resize', () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    });

    // 3D Point projection
    const fov = 350;
    function project(x, y, z) {
      const scale = fov / (fov + z);
      return {
        x: x * scale + width / 2,
        y: y * scale + height / 2,
        scale: scale
      };
    }

    // Points arrays
    let points = [];
    let lines = [];
    let angleX = 0.003;
    let angleY = 0.005;

    // Initialize points based on theme
    if (theme === 'home') {
      // 3D Helix / Electric grid mesh
      for (let i = 0; i < 40; i++) {
        const t = (i / 40) * Math.PI * 6;
        const x1 = Math.cos(t) * 110;
        const y1 = (i - 20) * 10;
        const z1 = Math.sin(t) * 110;
        points.push({ x: x1, y: y1, z: z1, color: '#4169E1' });

        const x2 = Math.cos(t + Math.PI) * 110;
        const y2 = (i - 20) * 10;
        const z2 = Math.sin(t + Math.PI) * 110;
        points.push({ x: x2, y: y2, z: z2, color: '#5CE1E6' });
      }
    } else if (theme === 'marketplace') {
      // 3D cargo / product boxes and nodes floating
      function makeCube(size, ox, oy, oz, col) {
        const d = size / 2;
        const corners = [
          {x:-d, y:-d, z:-d}, {x:d, y:-d, z:-d}, {x:d, y:d, z:-d}, {x:-d, y:d, z:-d},
          {x:-d, y:-d, z:d},  {x:d, y:-d, z:d},  {x:d, y:d, z:d},  {x:-d, y:d, z:d}
        ];
        const localIndexStart = points.length;
        corners.forEach(c => points.push({ x: c.x + ox, y: c.y + oy, z: c.z + oz, color: col }));
        const cubeLines = [
          [0,1], [1,2], [2,3], [3,0],
          [4,5], [5,6], [6,7], [7,4],
          [0,4], [1,5], [2,6], [3,7]
        ];
        cubeLines.forEach(l => lines.push([l[0] + localIndexStart, l[1] + localIndexStart]));
      }
      makeCube(100, -80, 0, 0, '#ffd700');
      makeCube(70, 90, -30, 40, '#4169E1');
    } else if (theme === 'services') {
      // 3D Rotating circuit node ring & gears
      points.push({ x: 0, y: 0, z: 0, color: '#ffd700', size: 8 });
      for (let i = 0; i < 12; i++) {
        const angle = (i / 12) * Math.PI * 2;
        const x = Math.cos(angle) * 120;
        const z = Math.sin(angle) * 120;
        points.push({ x: x, y: 0, z: z, color: '#4169E1' });
        lines.push([0, points.length - 1]);
        if (i > 0) lines.push([points.length - 1, points.length - 2]);
      }
      lines.push([1, points.length - 1]); // close circle
    } else if (theme === 'subscription') {
      // 3D Golden Crown structure
      const numPts = 8;
      for (let i = 0; i < numPts; i++) {
        const angle = (i / numPts) * Math.PI * 2;
        const r = (i % 2 === 0) ? 120 : 60;
        points.push({ x: Math.cos(angle) * r, y: -30, z: Math.sin(angle) * r, color: '#ffd700' });
        points.push({ x: Math.cos(angle) * 80, y: 30, z: Math.sin(angle) * 80, color: '#5CE1E6' });
        
        const idx = points.length - 2;
        lines.push([idx, idx + 1]);
        if (i > 0) {
          lines.push([idx, idx - 2]);
          lines.push([idx + 1, idx - 1]);
        }
      }
      lines.push([0, points.length - 2]);
      lines.push([1, points.length - 1]);
    } else if (theme === 'partnership') {
      // interlocking infinity rings
      // Ring 1
      for (let i = 0; i < 20; i++) {
        const angle = (i / 20) * Math.PI * 2;
        points.push({ x: Math.cos(angle) * 90 - 30, y: Math.sin(angle) * 90, z: 0, color: '#5CE1E6' });
        if (i > 0) lines.push([points.length - 1, points.length - 2]);
      }
      lines.push([0, points.length - 1]);
      
      const r1End = points.length;
      // Ring 2
      for (let i = 0; i < 20; i++) {
        const angle = (i / 20) * Math.PI * 2;
        points.push({ x: Math.cos(angle) * 90 + 30, y: 0, z: Math.sin(angle) * 90, color: '#ffd700' });
        if (i > 0) lines.push([points.length - 1, points.length - 2]);
      }
      lines.push([r1End, points.length - 1]);
    }

    // Floating particles
    const particles = [];
    for (let i = 0; i < 30; i++) {
      particles.push({
        x: (Math.random() - 0.5) * 500,
        y: (Math.random() - 0.5) * 300,
        z: (Math.random() - 0.5) * 300,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        vz: (Math.random() - 0.5) * 0.4
      });
    }

    function rotatePoints() {
      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);
      points.forEach(p => {
        const x = p.x * cosY - p.z * sinY;
        const z = p.z * cosY + p.x * sinY;
        p.x = x; p.z = z;
      });
      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);
      points.forEach(p => {
        const y = p.y * cosX - p.z * sinX;
        const z = p.z * cosX + p.y * sinX;
        p.y = y; p.z = z;
      });
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy; p.z += p.vz;
        if (Math.abs(p.x) > 250) p.vx *= -1;
        if (Math.abs(p.y) > 150) p.vy *= -1;
        if (Math.abs(p.z) > 150) p.vz *= -1;
        const x = p.x * cosY - p.z * sinY;
        const z = p.z * cosY + p.x * sinY;
        p.x = x; p.z = z;
      });
    }

    function tick() {
      ctx.clearRect(0, 0, width, height);
      rotatePoints();

      // Draw lines
      ctx.beginPath();
      ctx.strokeStyle = theme === 'marketplace' || theme === 'subscription' ? 'rgba(255, 215, 0, 0.12)' : 'rgba(65, 105, 225, 0.12)';
      ctx.lineWidth = 1;
      lines.forEach(line => {
        if (points[line[0]] && points[line[1]]) {
          const p1 = project(points[line[0]].x, points[line[0]].y, points[line[0]].z);
          const p2 = project(points[line[1]].x, points[line[1]].y, points[line[1]].z);
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
        }
      });
      ctx.stroke();

      // Draw points
      points.forEach(p => {
        const proj = project(p.x, p.y, p.z);
        ctx.beginPath();
        ctx.arc(proj.x, proj.y, (p.size || 4) * proj.scale, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      });

      // Draw particles
      particles.forEach(p => {
        const proj = project(p.x, p.y, p.z);
        ctx.beginPath();
        ctx.arc(proj.x, proj.y, 2 * proj.scale, 0, Math.PI * 2);
        ctx.fillStyle = theme === 'subscription' || theme === 'partnership' ? 'rgba(255, 215, 0, 0.35)' : 'rgba(92, 225, 230, 0.35)';
        ctx.fill();
      });

      requestAnimationFrame(tick);
    }
    tick();
  });
});

