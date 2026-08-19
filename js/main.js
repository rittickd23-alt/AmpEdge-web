/* ============================================
   AMPEDGE — Premium Main JavaScript
   ============================================ */

// ── Data Version: force trigger build for restored stable state ──
const AMPEDGE_DATA_VERSION = '9.0';
if (localStorage.getItem('ampedge_data_ver') !== AMPEDGE_DATA_VERSION) {
  localStorage.removeItem('ampedge_services');
  localStorage.removeItem('ampedge_products');
  localStorage.setItem('ampedge_data_ver', AMPEDGE_DATA_VERSION);
}

// ── Global Data Store ────────────────────────
const defaultServices = [
  // 👑 AMC Sector Plan (₹14,000 / Year)
  { id: 's_amc_14k', name: 'Annual AMC 360° Complete Shield (₹14,000/yr)', description: 'Full 365-day home & AC coverage. Unlimited free breakdown visits, 4x Free AC deep services, electrical safety audit. (Labor 100% free, Materials extra).', category: 'AMC', basePrice: 14000, duration: 365, city: 'Howrah', active: true, image: 'images/svc_switchboard.png' },

  // 🛠️ Housing & Electrical Repairing Sector
  { id: 's_mcb_repair', name: 'MCB & DB Board Repair / Tripping Fix', description: 'Diagnose short circuits, fix tripping MCB switches, and repair distribution boxes.', category: 'REPAIR', basePrice: 299, duration: 45, city: 'Howrah', active: true, image: 'images/svc_mcb.png' },
  { id: 's_switch_repair', name: 'Switchboard & Modular Socket Repair', description: 'Repair burnt switches, loose sockets, fan regulators, and smart switch replacement.', category: 'REPAIR', basePrice: 199, duration: 30, city: 'Howrah', active: true, image: 'images/svc_switchboard.png' },
  { id: 's_fan_repair', name: 'Ceiling / Wall / Exhaust Fan Repair', description: 'Fix humming noise, capacitor change, motor winding test, and speed issue diagnosis.', category: 'REPAIR', basePrice: 249, duration: 45, city: 'Howrah', active: true, image: 'images/product_fan.png' },
  { id: 's_light_repair', name: 'LED Light & Batten / Chandelier Repair', description: 'Install or repair LED tube lights, downlights, profile lighting, and false ceiling fixtures.', category: 'REPAIR', basePrice: 199, duration: 30, city: 'Howrah', active: true, image: 'images/product_led.png' },
  { id: 's_ac_deep_clean', name: 'AC Deep Servicing & Cooling Repair', description: 'Deep foam jet cleaning, indoor/outdoor coil wash, gas pressure check, and cooling fix.', category: 'REPAIR', basePrice: 499, duration: 60, city: 'Howrah', active: true, image: 'images/svc_wiring.png' },
  { id: 's_inverter_repair', name: 'Inverter & Battery Wiring Repair', description: 'Fix battery backup issues, change heavy DC lugs, repair inverter bypass switch.', category: 'REPAIR', basePrice: 349, duration: 45, city: 'Howrah', active: true, image: 'images/product_inverter.png' },
  { id: 's_wiring_repair', name: 'House Wiring & Short Circuit Troubleshooting', description: 'Emergency fault detection, concealed conduit rewiring, and neutral earth leakage fix.', category: 'REPAIR', basePrice: 499, duration: 60, city: 'Howrah', active: true, image: 'images/svc_wiring.png' },

  // Solar & Emergency
  { id: 's_solar_inst', name: 'Rooftop Solar System Installation', description: 'Complete rooftop solar panel setup with net metering liaisoning and structure mounting.', category: 'SOLAR', basePrice: 12999, duration: 480, city: 'Howrah', active: true, image: 'images/solar_hero.png' },
  { id: 's_emerg_visit', name: '24/7 Emergency Electrician Dispatch', description: 'Rapid 30-min emergency response for sudden blackouts, spark hazards, and wire fire risks.', category: 'EMERGENCY', basePrice: 899, duration: 30, city: 'Howrah', active: true, image: 'images/svc_emergency.png' }
];

const defaultProducts = [
  // Wires & Cables
  { id: 'p1', name: 'Finolex FR PVC Wire 1.5 sq mm', description: '90m Coil • 100% Pure Electrolytic Copper wire with fire retardant insulation.', category: 'WIRES_CABLES', brand: 'Finolex', basePrice: 1899, stock: 45, active: true, image: 'images/product_wire_finolex.svg' },
  { id: 'p2', name: 'Polycab FlameGuard 2.5 sq mm', description: '90m Coil • Heavy duty flame retardant copper wire for high wattage appliances.', category: 'WIRES_CABLES', brand: 'Polycab', basePrice: 2499, stock: 35, active: true, image: 'images/product_wire_polycab.svg' },
  { id: 'p3', name: 'Havells LifeLine Plus 4.0 sq mm', description: 'HRFR heat-resistant industrial & heavy load wiring for AC/Geysers.', category: 'WIRES_CABLES', brand: 'Havells', basePrice: 3899, stock: 25, active: true, image: 'images/product_wire_havells.svg' },
  { id: 'p4', name: 'Solar DC Cable 4.0 sq mm', description: 'UV protected dual-insulated tinned copper rooftop solar wire.', category: 'WIRES_CABLES', brand: 'Solar Max', basePrice: 1299, stock: 60, active: true, image: 'images/product_wire_solar.svg' },
  { id: 'p5', name: 'Anchor 1.0 sq mm Flexible Wire', description: 'Multi-strand pure copper lighting wire for home electrical conduits.', category: 'WIRES_CABLES', brand: 'Anchor', basePrice: 1199, stock: 50, active: true, image: 'images/product_wire_anchor.svg' },

  // Switches & Sockets
  { id: 'p6', name: 'Havells Coral Smart Switch', description: '6A WiFi & Touch-enabled smart switch with app automation.', category: 'SWITCHES_SOCKETS', brand: 'Havells', basePrice: 349, stock: 50, active: true, image: 'images/product_switch.png' },
  { id: 'p7', name: 'Legrand Arteor USB Socket', description: 'Fast charging Type-C & Type-A wall socket modular unit.', category: 'SWITCHES_SOCKETS', brand: 'Legrand', basePrice: 1249, stock: 25, active: true, image: 'images/product_usb.png' },
  { id: 'p8', name: 'Anchor Roma 16A 2-Way Switch', description: 'Heavy duty polycarbonate modular power switch for geysers and AC.', category: 'SWITCHES_SOCKETS', brand: 'Anchor', basePrice: 189, stock: 80, active: true, image: 'images/product_switch_roma.svg' },
  { id: 'p9', name: 'Schneider AvatarOn Touch Switch', description: 'Frameless glossy white minimalist luxury designer switch.', category: 'SWITCHES_SOCKETS', brand: 'Schneider', basePrice: 429, stock: 40, active: true, image: 'images/product_switch_schneider.svg' },
  { id: 'p10', name: 'Goldmedal Curve 16A Socket', description: 'Power socket with safety shutter and neon indicator.', category: 'SWITCHES_SOCKETS', brand: 'Goldmedal', basePrice: 220, stock: 75, active: true, image: 'images/product_socket_goldmedal.svg' },

  // MCB & Distribution Boards
  { id: 'p11', name: 'Havells Euroload 32A DP MCB', description: '10kA high short circuit capacity double pole main breaker.', category: 'MCB_DB', brand: 'Havells', basePrice: 649, stock: 30, active: true, image: 'images/product_mcb_havells.svg' },
  { id: 'p12', name: 'Schneider Acti9 63A 4P RCCB', description: '30mA human shock protection residual current isolator.', category: 'MCB_DB', brand: 'Schneider', basePrice: 2899, stock: 15, active: true, image: 'images/product_rccb_schneider.svg' },
  { id: 'p13', name: 'Legrand 4-Way SPN DB Enclosure', description: 'IP43 sheet steel powder coated distribution box with busbar.', category: 'MCB_DB', brand: 'Legrand', basePrice: 1450, stock: 20, active: true, image: 'images/product_db_legrand.svg' },

  // LED Lighting
  { id: 'p14', name: 'Philips 20W LED Batten Tube', description: '20W ultra slim glare-free cool daylight LED tube light.', category: 'LIGHTING_FIXTURES', brand: 'Philips', basePrice: 449, stock: 100, active: true, image: 'images/product_led.png' },
  { id: 'p15', name: 'Syska 12W Inverter Emergency Bulb', description: '4-hour battery backup automatic rechargeable emergency LED.', category: 'LIGHTING_FIXTURES', brand: 'Syska', basePrice: 389, stock: 65, active: true, image: 'images/product_syska_bulb.svg' },
  { id: 'p16', name: 'Crompton 15W Round Downlight', description: '15W surface panel ceiling LED with 4kV surge protection.', category: 'LIGHTING_FIXTURES', brand: 'Crompton', basePrice: 499, stock: 55, active: true, image: 'images/product_downlight_crompton.svg' },
  { id: 'p17', name: 'Wipro Garnet 5m Smart RGB Strip', description: 'WiFi enabled 16 million colors LED strip with Alexa sync.', category: 'LIGHTING_FIXTURES', brand: 'Wipro', basePrice: 1199, stock: 30, active: true, image: 'images/product_wipro_strip.svg' },

  // Fans & Appliances
  { id: 'p18', name: 'Crompton Aura 1200mm Fan', description: 'Anti-dust 1200mm high-speed metallic finish ceiling fan.', category: 'APPLIANCES', brand: 'Crompton', basePrice: 2499, stock: 20, active: true, image: 'images/product_fan.png' },
  { id: 'p19', name: 'Havells Stealth Air BLDC Fan', description: '28W 5-star super silent energy saver BLDC ceiling fan with remote.', category: 'APPLIANCES', brand: 'Havells', basePrice: 4299, stock: 15, active: true, image: 'images/product_fan_bldc.svg' },
  { id: 'p20', name: 'Orient 400mm Wall Mount Fan', description: 'High airflow aerodynamic blades with smooth oscillation.', category: 'APPLIANCES', brand: 'Orient', basePrice: 2199, stock: 18, active: true, image: 'images/product_fan_wall.svg' },
  { id: 'p21', name: 'Bajaj Maxima 200mm Exhaust Fan', description: 'Heavy duty rust-proof high suction kitchen & bathroom exhaust.', category: 'APPLIANCES', brand: 'Bajaj', basePrice: 1099, stock: 35, active: true, image: 'images/product_fan_exhaust.svg' },

  // Solar Energy Solutions
  { id: 'p22', name: 'Luminous Solar Panel 335W', description: 'Monocrystalline 335W rooftop solar panel with 25yr warranty.', category: 'SOLAR', brand: 'Luminous', basePrice: 8999, stock: 30, active: true, image: 'images/product_solar_panel.png' },
  { id: 'p23', name: 'Luminous Cruze 2kVA Inverter', description: 'Pure sinewave solar inverter with smart MPPT charge controller.', category: 'SOLAR', brand: 'Luminous', basePrice: 12499, stock: 18, active: true, image: 'images/product_inverter.png' },
  { id: 'p24', name: 'Amaron Solar Battery 150Ah', description: 'Tall-tubular deep cycle solar battery with 3yr replacement warranty.', category: 'SOLAR', brand: 'Amaron', basePrice: 14999, stock: 12, active: true, image: 'images/product_battery.png' },
  { id: 'p25', name: 'Solar Mounting Structure Kit', description: 'Adjustable GI rooftop mounting frame for 2-panel setup.', category: 'SOLAR', brand: 'Solar Max', basePrice: 2499, stock: 40, active: true, image: 'images/product_structure.png' },
  { id: 'p26', name: 'Solar Net Meter Kit', description: 'Government-approved bi-directional energy meter for grid feed-in.', category: 'SOLAR', brand: 'Solar Max', basePrice: 3499, stock: 25, active: true, image: 'images/product_net_meter.png' },

  // Tools & Safety
  { id: 'p27', name: 'Digital True-RMS Multimeter', description: 'AC/DC voltage, resistance, diode & continuity tester with probes.', category: 'TOOLS_SAFETY', brand: 'AmpEdge Pro', basePrice: 899, stock: 50, active: true, image: 'images/product_multimeter.svg' },
  { id: 'p28', name: 'Insulated Wire Stripper & Crimper', description: '8-in-1 precision electrician cutter and crimping tool.', category: 'TOOLS_SAFETY', brand: 'AmpEdge Pro', basePrice: 449, stock: 65, active: true, image: 'images/product_wire_stripper.svg' },
  { id: 'p29', name: 'High Voltage Safety Kit', description: 'Class 0 dielectric rubber gloves and shock-resistant safety gear.', category: 'TOOLS_SAFETY', brand: 'AmpEdge Safe', basePrice: 1299, stock: 30, active: true, image: 'images/product_safety_gloves.svg' }
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
  
  // Parse query parameters for service selection on load
  const params = new URLSearchParams(window.location.search);
  const selectQuery = params.get('select');
  if (selectQuery) {
    const query = selectQuery.toLowerCase();
    if (query === 'installation') {
      services = services.filter(s => s.category === 'INSTALLATION');
    } else if (query === 'repair') {
      services = services.filter(s => s.category === 'REPAIR');
    } else if (query === 'maintenance') {
      services = services.filter(s => s.name.toLowerCase().includes('maintenance') || s.description.toLowerCase().includes('maintenance'));
    } else if (query === 'industrial') {
      services = services.filter(s => s.category === 'COMMERCIAL' || s.name.toLowerCase().includes('industrial') || s.description.toLowerCase().includes('industrial'));
    } else if (query === 'smarthome') {
      services = services.filter(s => s.name.toLowerCase().includes('smart home') || s.description.toLowerCase().includes('smart'));
    } else if (query === 'solar') {
      services = services.filter(s => s.category === 'SOLAR');
    } else if (query === 'emergency') {
      services = services.filter(s => s.category === 'EMERGENCY');
    }
  }

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
        'Switches': ['SMART_HOME', 'SWITCHES_SOCKETS', 'WIRING_MATERIALS'],
        'Wires & Cables': ['WIRES_CABLES', 'WIRING_MATERIALS'],
        'MCB & DB': ['MCB_DB', 'WIRING_MATERIALS'],
        'LED Lighting': ['LIGHTING_FIXTURES'],
        'Fans': ['APPLIANCES'],
        'Tools & Safety': ['TOOLS_SAFETY'],
        '☀️ Solar': ['SOLAR'],
        'Solar': ['SOLAR']
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
        <div class="prod-brand">${p.brand ? p.brand : p.category.replace(/_/g, ' ')}</div>
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

// ── Dynamic Budget Search & Category URLs Mapping for AI Chat ──────
function getProductCategoryUrl(category) {
  const cat = category.toUpperCase();
  if (cat === 'SMART_HOME') return 'switches';
  if (cat === 'WIRING_MATERIALS') return 'wires';
  if (cat === 'LIGHTING_FIXTURES') return 'lighting';
  if (cat === 'APPLIANCES') return 'fans';
  if (cat === 'SOLAR') return 'solar';
  return 'switches';
}

function getBudgetRecommendations(limit, lang) {
  const products = window.getAmpEdgeProducts ? window.getAmpEdgeProducts() : defaultProducts;
  const services = window.getAmpEdgeServices ? window.getAmpEdgeServices() : defaultServices;
  
  const matchingProducts = products.filter(p => p.basePrice <= limit);
  const matchingServices = services.filter(s => s.basePrice <= limit);
  
  if (matchingProducts.length === 0 && matchingServices.length === 0) {
    if (lang === 'hi' || lang === 'hinglish') {
      return `⚠️ क्षमा करें, ₹${limit} के बजट में कोई उत्पाद या सेवा उपलब्ध नहीं है। हमारे उत्पाद ₹349 से और सेवाएं ₹299 से शुरू होती हैं।`;
    } else if (lang === 'bn' || lang === 'benglish') {
      return `⚠️ দুঃখিত, ₹${limit} বাজেটের মধ্যে কোনো পণ্য বা পরিষেবা উপলব্ধ নেই। আমাদের পণ্য ₹৩৪৯ এবং পরিষেবা ₹২৯৯ থেকে শুরু হয়।`;
    } else {
      return `⚠️ Sorry, no products or services are available under the budget of ₹${limit}. Our products start from ₹349 and services start from ₹299.`;
    }
  }
  
  let reply = "";
  if (lang === 'hi' || lang === 'hinglish') {
    reply = `🎯 **₹${limit} के बजट में उपलब्ध उत्पाद और सेवाएं:**<br><br>`;
    if (matchingServices.length > 0) {
      reply += `🛠️ **सेवाएं (Services):**<br>`;
      matchingServices.forEach(s => {
        reply += `• <a href="booking.html?select=${s.category.toLowerCase()}" style="color:#4169E1;font-weight:700">${s.name}</a> — **₹${s.basePrice}**<br>`;
      });
      reply += `<br>`;
    }
    if (matchingProducts.length > 0) {
      reply += `🛒 **उत्पाद (Products):**<br>`;
      matchingProducts.forEach(p => {
        let catUrl = getProductCategoryUrl(p.category);
        reply += `• <a href="marketplace.html?category=${catUrl}" style="color:#4169E1;font-weight:700">${p.name}</a> — **₹${p.basePrice}**<br>`;
      });
    }
  } else if (lang === 'bn' || lang === 'benglish') {
    reply = `🎯 **₹${limit} বাজেটের মধ্যে উপলব্ধ পণ্য এবং পরিষেবা:**<br><br>`;
    if (matchingServices.length > 0) {
      reply += `🛠️ **পরিষেবা (Services):**<br>`;
      matchingServices.forEach(s => {
        reply += `• <a href="booking.html?select=${s.category.toLowerCase()}" style="color:#4169E1;font-weight:700">${s.name}</a> — **₹${s.basePrice}**<br>`;
      });
      reply += `<br>`;
    }
    if (matchingProducts.length > 0) {
      reply += `🛒 **পণ্য (Products):**<br>`;
      matchingProducts.forEach(p => {
        let catUrl = getProductCategoryUrl(p.category);
        reply += `• <a href="marketplace.html?category=${catUrl}" style="color:#4169E1;font-weight:700">${p.name}</a> — **₹${p.basePrice}**<br>`;
      });
    }
  } else {
    reply = `🎯 **Available under your budget of ₹${limit}:**<br><br>`;
    if (matchingServices.length > 0) {
      reply += `🛠️ **Services:**<br>`;
      matchingServices.forEach(s => {
        reply += `• <a href="booking.html?select=${s.category.toLowerCase()}" style="color:#4169E1;font-weight:700">${s.name}</a> — **₹${s.basePrice}**<br>`;
      });
      reply += `<br>`;
    }
    if (matchingProducts.length > 0) {
      reply += `🛒 **Products:**<br>`;
      matchingProducts.forEach(p => {
        let catUrl = getProductCategoryUrl(p.category);
        reply += `• <a href="marketplace.html?category=${catUrl}" style="color:#4169E1;font-weight:700">${p.name}</a> — **₹${p.basePrice}**<br>`;
      });
    }
  }
  
  return reply;
}

function getAIResponse(userText) {
  const text = userText.toLowerCase();
  
  // 1. Language Detection / Selection Check
  let lang = window.activeChatLanguage || 'en';
  
  // If greeting query, show the welcome message WITH language buttons!
  const isGreeting = text.includes('hello') || text.includes('hi') || text.includes('hey') || text.includes('good morning') || text.includes('good evening') || text.includes('namaste') || text.includes('hola') || text.includes('ನಮಸ್ಕಾರ') || text.includes('வணக்கம்');
  if (isGreeting) {
    return `👋 **Welcome to AMPEdge Solutions!**<br><br>
Please select your preferred language to begin / कृपया अपनी पसंदीदा भाषा चुनें:<br><br>
<div style="display:flex; gap:8px; flex-wrap:wrap; margin-top:8px;">
  <button class="btn btn-outline btn-xs" onclick="setChatLanguage('en', this)" style="padding:6px 12px; font-size:12px; margin:0; cursor:pointer; background:#fff; border:1px solid var(--border); border-radius:6px;">English 🇬🇧</button>
  <button class="btn btn-outline btn-xs" onclick="setChatLanguage('hi', this)" style="padding:6px 12px; font-size:12px; margin:0; cursor:pointer; background:#fff; border:1px solid var(--border); border-radius:6px;">Hindi (हिंदी) 🇮🇳</button>
  <button class="btn btn-outline btn-xs" onclick="setChatLanguage('hinglish', this)" style="padding:6px 12px; font-size:12px; margin:0; cursor:pointer; background:#fff; border:1px solid var(--border); border-radius:6px;">Hinglish 🇮🇳</button>
  <button class="btn btn-outline btn-xs" onclick="setChatLanguage('bn', this)" style="padding:6px 12px; font-size:12px; margin:0; cursor:pointer; background:#fff; border:1px solid var(--border); border-radius:6px;">Bengali (বাংলা) 🇧🇩</button>
  <button class="btn btn-outline btn-xs" onclick="setChatLanguage('benglish', this)" style="padding:6px 12px; font-size:12px; margin:0; cursor:pointer; background:#fff; border:1px solid var(--border); border-radius:6px;">Benglish 🇧🇩</button>
  <button class="btn btn-outline btn-xs" onclick="setChatLanguage('ta', this)" style="padding:6px 12px; font-size:12px; margin:0; cursor:pointer; background:#fff; border:1px solid var(--border); border-radius:6px;">Tamil (தமிழ்)</button>
  <button class="btn btn-outline btn-xs" onclick="setChatLanguage('te', this)" style="padding:6px 12px; font-size:12px; margin:0; cursor:pointer; background:#fff; border:1px solid var(--border); border-radius:6px;">Telugu (తెలుగు)</button>
  <button class="btn btn-outline btn-xs" onclick="setChatLanguage('kn', this)" style="padding:6px 12px; font-size:12px; margin:0; cursor:pointer; background:#fff; border:1px solid var(--border); border-radius:6px;">Kannada (ಕನ್ನಡ)</button>
  <button class="btn btn-outline btn-xs" onclick="setChatLanguage('ml', this)" style="padding:6px 12px; font-size:12px; margin:0; cursor:pointer; background:#fff; border:1px solid var(--border); border-radius:6px;">Malayalam (മലയാളം)</button>
  <button class="btn btn-outline btn-xs" onclick="setChatLanguage('gu', this)" style="padding:6px 12px; font-size:12px; margin:0; cursor:pointer; background:#fff; border:1px solid var(--border); border-radius:6px;">Gujarati (ગુજરાતી)</button>
  <button class="btn btn-outline btn-xs" onclick="setChatLanguage('pa', this)" style="padding:6px 12px; font-size:12px; margin:0; cursor:pointer; background:#fff; border:1px solid var(--border); border-radius:6px;">Punjabi (ਪੰਜਾਬੀ)</button>
</div>`;
  }

  if (!window.activeChatLanguage) {
    if (/[\u0900-\u097F]/.test(userText)) {
      lang = 'hi';
    } else if (/[\u0980-\u09FF]/.test(userText)) {
      // Bengali script (Bengali, Assamese)
      lang = 'bn';
    } else if (/[\u0B80-\u0BFF]/.test(userText)) {
      // Tamil script
      lang = 'ta';
    } else if (/[\u0C00-\u0C7F]/.test(userText)) {
      // Telugu script
      lang = 'te';
    } else if (/[\u0C80-\u0CFF]/.test(userText)) {
      // Kannada script
      lang = 'kn';
    } else if (/[\u0D00-\u0D7F]/.test(userText)) {
      // Malayalam script
      lang = 'ml';
    } else if (/[\u0A80-\u0AFF]/.test(userText)) {
      // Gujarati script
      lang = 'gu';
    } else if (/[\u0A00-\u0A7F]/.test(userText)) {
      // Punjabi (Gurmukhi) script
      lang = 'pa';
    } else if (
      text.includes('kaise') || text.includes('karna') || text.includes('karo') || text.includes('mera') || 
      text.includes('kab') || text.includes('paise') || text.includes('refund') || text.includes('warranty') || 
      text.includes('booking') || text.includes('hai') || text.includes('chahiye') || text.includes('karke') ||
      text.includes('naam') || text.includes('dikhaiye') || text.includes('bataiye')
    ) {
      lang = 'hinglish';
    } else if (
      text.includes('kivabe') || text.includes('korbo') || text.includes('amar') || text.includes('kobe') || 
      text.includes('taka') || text.includes('ferot') || text.includes('somossa') || text.includes('korun') ||
      text.includes('bolun') || text.includes('dekhun')
    ) {
      lang = 'benglish';
    }
  }

  // 2. Budget/Price queries
  // Matches expressions like: under 500, below 1000, 190 rs, 190 rupees, 500 में, etc.
  const budgetMatch = text.match(/(?:under|below|budget|price|rs|₹|rupees|में|কম|টাকার|অধীনে)\s*(\d+)/i) || 
                      text.match(/(\d+)\s*(?:under|below|budget|price|rs|₹|rupees|में|কম|টাকার)/i);
                      
  if (budgetMatch) {
    const limit = parseInt(budgetMatch[1]);
    if (!isNaN(limit)) {
      return getBudgetRecommendations(limit, lang);
    }
  }

  // 3. Identify Query Intent
  const isBooking = text.includes('book') || text.includes('service') || text.includes('booking') || 
                    text.includes('बुक') || text.includes('बुक') || text.includes('बुकिंग') || 
                    text.includes('బుక్') || text.includes('புக்') || text.includes('ಬುಕ್') || 
                    text.includes('റിപ്പയർ') || text.includes('സർവീസ്');
  
  const isProduct = text.includes('product') || text.includes('marketplace') || text.includes('buy') || text.includes('shop') ||
                    text.includes('item') || text.includes('material') || text.includes('switches') || text.includes('wires') ||
                    text.includes('सामान') || text.includes('खरीद') || text.includes('उत्पाद') || text.includes('কিনতে') || 
                    text.includes('পণ্য') || text.includes('பொருள்') || text.includes('கொనుగోలు') || 
                    text.includes('സാധനങ്ങൾ') || text.includes('ખરીદી');
  
  const isContact = text.includes('contact') || text.includes('phone') || text.includes('call') || text.includes('whatsapp') || 
                    text.includes('number') || text.includes('email') || text.includes('mail') || text.includes('address') ||
                    text.includes('नंबर') || text.includes('फोन') || text.includes('पता') || text.includes('যোগাযোগ') || 
                    text.includes('தொடர்பு') || text.includes('సంప్రదించండి') || text.includes('ബന്ധപ്പെടുക') || 
                    text.includes('સરનામું') || text.includes('ਪਤਾ');
  
  const isWarranty = text.includes('warranty') || text.includes('guarantee') || text.includes('days') ||
                     text.includes('वारंटी') || text.includes('गारंटी') || text.includes('ওয়ারেন্টি') || 
                     text.includes('உத்தரவாதம்') || text.includes('హామీ') || text.includes('വാറന്റി') || 
                     text.includes('વોરંટી');
  
  const isPlan = text.includes('plan') || text.includes('subscription') || text.includes('modular') || text.includes('premium') ||
                 text.includes('ಪ್ಲಾನ್') || text.includes('திட்டம்') || text.includes('ప్లాన్') || 
                 text.includes('ಪ್ಲಾನ') || text.includes('યોજના') || text.includes('ਪਲਾਨ') ||
                 text.includes('प्लान') || text.includes('প্ল্যান');
  
  const isPartner = text.includes('partner') || text.includes('job') || text.includes('join') || text.includes('work') || text.includes('electrician') ||
                    text.includes('पार्टनर') || text.includes('नौकरी') || text.includes('ਕাজের') || text.includes('വേല') || 
                    text.includes('ఉద్యోగం') || text.includes('ભાગીદારી') || text.includes('কাজের');

  // 3. Multi-lingual Response Dictionary
  const responses = {
    hi: {
      booking: "⚡ **बुकिंग गाइड:**<br>आप हमारी वेबसाइट पर 'Book a Service' पर जाकर बुकिंग कर सकते हैं। शहर और पिनकोड चुनें, फिर अपनी आवश्यकतानुसार इलेक्ट्रिशियन सिलेक्ट करें। काम पूरा होने के बाद ही पेमेंट करें। सभी बुकिंग पर **90 दिनों की वारंटी** है।",
      product: "🛒 **मार्केटप्लेस उत्पाद:**<br>हम प्रीमियम प्रमाणित उत्पाद बेचते हैं जैसे Havells Coral स्मार्ट स्विच (₹349), Finolex तार (₹2299), Legrand USB सॉकेट (₹1249), Philips LED लाइट (₹449) और Crompton पंखे (₹2499)। इन्हें खरीदने के लिए Marketplace पेज पर जाएं।",
      contact: "📞 **संपर्क जानकारी:**<br>• व्हाट्सऐप बिजनेस: <a href='https://wa.me/919874600265' target='_blank' style='color:#25D366;font-weight:700'>+91 98746 00265</a><br>• हेल्पलाइन: +91 91236 67258 / +91 97483 98418<br>• ईमेल: ampedge.info@gmail.com<br>• पता: West Bauria, Howrah 711307",
      warranty: "🛡️ **वारंटी और रिफंड:**<br>हमारी सभी रिपेयर और इंस्टालेशन सेवाओं पर **90 दिनों की पोस्ट-सर्विस वारंटी** है। अनुपयोगी मार्केटप्लेस उत्पादों पर 7 दिनों की वापसी नीति है।",
      plan: "👑 **सब्सक्रिप्शन प्लान:**<br>• बेस (₹199/माह): 1 फ्री सुरक्षा ऑडिट<br>• मॉड्यूलर (₹499/माह): 2 फ्री ऑडिट, 0 बुकिंग शुल्क<br>• प्रीमियम (₹999/माह): असीमित फ्री विजिट, 10% ऑफ उत्पाद।",
      partner: "🤝 **साझेदारी कार्यक्रम:**<br>यदि आप एक इलेक्ट्रिशियन हैं, तो हमारे साथ जुड़ें। रोज़ाना कमाई सीधे बैंक अकाउंट में पाएं, दुर्घटना बीमा और काम के लचीले घंटे। आवेदन के लिए 'Become Partner' पेज पर जाएं।",
      fallback: "नमस्ते! मैं एम्पएज सहायता एजेंट हूँ। मुझे बुकिंग, वारंटी, रिफंड, कांटेक्ट नंबर या योजनाओं के बारे में पूछें। मैं हिंदी, बंगाली और अंग्रेजी समेत सभी क्षेत्रीय भाषाएं समझ सकता हूँ।"
    },
    hinglish: {
      booking: "⚡ **Booking Kaise Karein:**<br>Aap 'Book a Service' page par jaakar booking kar sakte hain. City aur pincode select karein, apna electrician chuney aur slot book karein. Kaam se satisfied hone par hi pay karein. Sabhi bookings par **90-day warranty** hai.",
      product: "🛒 **Marketplace Products:**<br>Hum premium certified products jaise Havells Coral Smart Switch (₹349), Finolex Wire (₹2299), Legrand USB Socket (₹1249), Philips LED (₹449) aur Crompton Fan (₹2499) best price par deliver karte hain. Kharidne ke liye Marketplace page par jayein.",
      contact: "📞 **Contact Support:**<br>• WhatsApp Business: <a href='https://wa.me/919874600265' target='_blank' style='color:#25D366;font-weight:700'>+91 98746 00265</a><br>• Call Support: +91 91236 67258 / +91 97483 98418<br>• Email ID: ampedge.info@gmail.com<br>• Address: West Bauria, Howrah",
      warranty: "🛡️ **Warranty & Return Policy:**<br>Humari sabhi electrical services par auto-active **90-day post-service warranty** milti hai. Marketplace products ko aap 7 days ke andar return kar sakte hain.",
      plan: "👑 **Subscription Plans:**<br>Humare pass 3 membership models hain:<br>• Base Plan (₹199/month): 1 Free safety audit.<br>• Modular Plan (₹499/month): 2 Free audits, zero platform booking fee.<br>• Premium Plan (₹999/month): Unlimited free emergency visits, 10% discount on marketplace products.",
      partner: "🤝 **Electrician Partner Program:**<br>Electricians aur contractors humare sath jud kar daily payouts kama sakte hain. Steady job stream, accident insurance aur training ke liye 'Become Partner' page par apply karein.",
      fallback: "Hello! Main AMPEdge Solutions ka AI Agent hoon. Mujhe booking, products, contact info, ya policies ke baare mein puchein. Main Hinglish, Hindi, Bengali, aur local regional languages samajh sakta hoon!"
    },
    bn: {
      booking: "⚡ **বুকিং নির্দেশিকা:**<br>আপনি আমাদের 'Book a Service' পেজে গিয়ে খুব সহজেই বুক করতে পারেন। শহর এবং পিনকোড দিয়ে আপনার টেকনিশিয়ান বেছে নিন। কাজ সম্পূর্ণ হওয়ার পর বিল পে করুন। সমস্ত বুকিংয়ে **৯০ দিনের ওয়ারেন্টি** দেওয়া হয়।",
      product: "🛒 **বাজারের পণ্য:**<br>আমাদের স্টোরে Havells Coral স্মার্ট সুইচ (₹349), Finolex ক্যাবল (₹2299), Legrand USB সকেট (₹1249), Philips LED লাইট (₹449) এবং Crompton ফ্যান (₹2499) রয়েছে। অর্ডার করতে Marketplace পেজে যান।",
      contact: "📞 **যোগাযোগের তথ্য:**<br>• হোয়াটস্যাপ বিজনেস: <a href='https://wa.me/919874600265' target='_blank' style='color:#25D366;font-weight:700'>+91 98746 00265</a><br>• হেল্পলাইন: +91 91236 67258 / +91 97483 98418<br>• ইমেল: ampedge.info@gmail.com<br>• ঠিকানা: West Bauria, Howrah 711307",
      warranty: "🛡️ **ওয়ারেন্টি ও রিফান্ড:**<br>আমাদের সমস্ত সার্ভিসের সাথে **৯০ দিনের অফিশিয়াল ওয়ারেন্টি** দেওয়া হয়। পণ্য ক্রয়ের পর পছন্দ না হলে ৭ দিনের রিটার্ন পলিসি রয়েছে।",
      plan: "👑 **সাবস্ক্রিপশন প্ল্যান:**<br>• বেস (₹১৯৯/মাস): ১টি ফ্রি সেফটি অডিট<br>• মডুলার (₹৪৯৯/মাস): ২টি ফ্রি অডিট, ০ বুকিং চার্জ<br>• প্রিমিয়াম (₹৯৯৯/মাস): আনলিমিটেড এমার্জেন্সি ভিজিট, ১০% প্রোডাক্ট অফ।",
      partner: "🤝 **পার্টনারশিপ প্রোগ্রাম:**<br>আমাদের সাথে যুক্ত হয়ে প্রতিদিনের উপার্জন সরাসরি ব্যাংক অ্যাকাউন্টে পান। রেজিষ্ট্রেশন করতে 'Become Partner' পেজে যান।",
      fallback: "নমস্কার! আমি এ্যাম্পএজ হেল্প এজেন্ট। আমি বুকিং, ওয়ারেন্টি, রিফান্ড পলিসি ও যোগাযোগ নাম্বার সম্পর্কে সাহায্য করতে পারি। আমি বাংলা, হিন্দি ও ইংরেজি বুঝতে পারি।"
    },
    benglish: {
      booking: "⚡ **Booking Process:**<br>Aapni 'Book a Service' page-e giye booking korte paren. City ebong pincode diye, electrician select korun ebong slot book korun. Kajer por payment korun. Sob service-e **90 days warranty** thakbe.",
      product: "🛒 **Product Orders:**<br>Switches, wires, MCBs, LED lighting, fans amader Marketplace page theke order korte paren. Check out-er somoy installation add korte paren.",
      contact: "📞 **Contact Support:**<br>• WhatsApp Business: <a href='https://wa.me/919874600265' target='_blank' style='color:#25D366;font-weight:700'>+91 98746 00265</a><br>• Phone support: +91 91236 67258 / +91 97483 98418<br>• Email ID: ampedge.info@gmail.com",
      warranty: "🛡️ **Warranty & Refund:**<br>Amader sob electrical repair-e 90-day warranty royeche. Unused products 7 diner moddhe return korte paren.",
      plan: "👑 **Subscription Plans:**<br>Base (₹199), Modular (₹499), ebong Premium (₹999) plan royeche. Subscriptions page theke choose korte paren.",
      partner: "🤝 **Partner Program:**<br>Electrician ebong contractors amader sathe partner hisebe kaj korte paren. Partner page-e giye form fill-up korun.",
      fallback: "Hello! Ami AMPEdge Solutions-er AI Agent. Amake booking, refund policy ba contact details niye jigges korte paren."
    },
    ta: {
      booking: "⚡ **புக்கிங் வழிகாட்டி:**<br>எங்கள் இணையதளத்தில் 'Book a Service' பக்கத்திற்குச் சென்று எளிதாகப் புக் செய்யலாம். உங்கள் நகரம் மற்றும் பின்கோடைத் தேர்ந்தெடுத்து, எலக்ட்ரீஷியனைத் தேர்வு செய்யவும். வேலை முடிந்ததும் பணம் செலுத்தலாம். **90 நாட்கள் உத்தரவாதம்** உண்டு.",
      product: "🛒 **மின் பொருட்கள்:**<br>ஹேவெல்ஸ் ஸ்மார்ட் ஸ்விட்ச் (₹349), ஃபினோலெக்ஸ் வயர் (₹2299), பிலிப்ஸ் எல்இடி விளக்கு (₹449) ஆகியவற்றை எங்கள் Marketplace பக்கத்தில் வாங்கலாம்.",
      contact: "📞 **தொடர்பு கொள்ள:**<br>• வாட்ஸ்அப்: <a href='https://wa.me/919874600265' target='_blank'>+91 98746 00265</a><br>• தொலைபேசி: +91 91236 67258 / +91 97483 98418<br>• மின்னஞ்சல்: ampedge.info@gmail.com",
      warranty: "🛡️ **உத்தரவாதம் & ரீஃபண்ட்:**<br>அனைத்து பழுதுபார்க்கும் சேவைகளுக்கும் **90 நாட்கள் உத்தரவாதம்** வழங்கப்படுகிறது. பயன்படுத்தப்படாத தயாரிப்புகளுக்கு 7 நாட்கள் ரிட்டர்ன் வசதி உண்டு.",
      fallback: "வணக்கம்! நான் ஏஎம்பிஎட்ஜ் உதவி முகவர். புக்கிங், பொருட்கள், உத்தரவாதம் அல்லது தொடர்பு விவரங்கள் பற்றி என்னிடம் கேட்கலாம்."
    },
    te: {
      booking: "⚡ **బుకింగ్ గైడ్:**<br>మా వెబ్‌సైట్‌లో 'Book a Service' పేజీకి వెళ్లి సులభంగా బుకింగ్ చేసుకోవచ్చు. మీ నగరం మరియు పిన్‌కోడ్‌ని ఎంచుకుని, ఎలక్ట్రీషియన్‌ను ఎంచుకోండి. పని పూర్తయ్యాకే చెల్లించండి. **90 రోజుల వారంటీ** ఉంటుంది.",
      product: "🛒 **ఉత్పత్తుల మార్కెట్‌ప్లేస్:**<br>హ్యావెల్స్ స్మార్ట్ స్విచ్‌లు (₹349), ఫినోలెక్స్ వైర్లు (₹2299), ఫిలిప్స్ ఎల్‌ఈడీ లైట్లు (₹449) మా Marketplace పేజీ నుండి ఆర్డర్ చేయవచ్చు.",
      contact: "📞 **సహాయ కేంద్రం:**<br>• వాట్సాప్: <a href='https://wa.me/919874600265' target='_blank'>+91 98746 00265</a><br>• హెల్ప్‌లైన్: +91 91236 67258 / +91 97483 98418",
      warranty: "🛡️ **వారంటీ మరియు రిఫండ్:**<br>మా అన్ని సర్వీసులపై **90 రోజుల వారంటీ** ఉంటుంది. ఉపయోగించని ఉత్పత్తులను 7 రోజులలోపు తిరిగి ఇవ్వవచ్చు.",
      fallback: "నమస్తే! నేను మీ ఏఎம்பிఎట్జ్ సహాయ ఏజెంట్‌ను. బుకింగ్, ఉత్పత్తులు, వారంటీ లేదా కాంటాక్ట్ సమాచారం కోసం అడగండి."
    },
    kn: {
      booking: "⚡ **ಬುಕಿಂಗ್ ಮಾರ್ಗದರ್ಶಿ:**<br>ನಮ್ಮ ವೆಬ್‌ಸೈಟ್‌ನ 'Book a Service' ಪುಟಕ್ಕೆ ಹೋಗಿ ಸುಲಭವಾಗಿ ಬುಕ್ ಮಾಡಬಹುದು. ನಗರ ಮತ್ತು ಪಿನ್‌ಕೋಡ್ ನಮೂದಿಸಿ ಎಲೆಕ್ಟ್ರಿಷಿಯನ್ ಆಯ್ಕೆ ಮಾಡಿ. ಕೆಲಸ ಮುಗಿದ ನಂತರವೇ ಪಾವತಿಸಿ. **90 ದಿನಗಳ ವಾರಂಟಿ** ಇರುತ್ತದೆ.",
      product: "🛒 **ಉತ್ಪನ್ನಗಳ ವಿವರ:**<br>ಹ್ಯಾವೆಲ್ಸ್ ಸ್ಮಾರ್ಟ್ ಸ್ವಿಚ್ (₹349), ಫಿನೋಲೆಕ್ಸ್ ವೈರ್ (₹2299), ಫಿಲಿಪ್ಸ್ ಎಲ್‌ಇಡಿ ಲೈಟ್ ಮತ್ತು ಕ್ರಾಂಪ್ಟನ್ ಫ್ಯಾನ್‌ಗಳನ್ನು ನಮ್ಮ Marketplace ಪುಟದಿಂದ ಖರೀದಿಸಬಹುದು.",
      contact: "📞 **ಸಂಪರ್ಕಿಸಿ:**<br>• ವಾಟ್ಸಾಪ್: <a href='https://wa.me/919874600265' target='_blank'>+91 98746 00265</a><br>• ಸಹಾಯವಾಣಿ: +91 91236 67258 / +91 97483 98418",
      warranty: "🛡️ **ವಾರಂಟಿ ವಿವರ:**<br>ನಮ್ಮ ಎಲ್ಲಾ ಸೇವೆಗಳಿಗೆ **90 ದಿನಗಳ ವಾರಂಟಿ** ಇರುತ್ತದೆ. ಉತ್ಪನ್ನಗಳಿಗೆ 7 ದಿನಗಳ ರಿಟರ್ನ್ ಪಾಲಿಸಿ ಇದೆ.",
      fallback: "ನಮಸ್ಕಾರ! ನಾನು ನಿಮ್ಮ ಎಎಂಪಿಯೆಡ್ಜ್ ಸಹಾಯ ಏಜೆಂಟ್. ಬುಕಿಂಗ್, ಉತ್ಪನ್ನಗಳು ಅಥವಾ ಸಂಪರ್ಕ ಸಂಖ್ಯೆಗಳ ಬಗ್ಗೆ ಕೇಳಿ."
    },
    ml: {
      booking: "⚡ **ബുക്കിംഗ് ഗൈഡ്:**<br>ഞങ്ങളുടെ 'Book a Service' പേജിൽ പോയി നിങ്ങൾക്ക് എളുപ്പത്തിൽ ബുക്ക് ചെയ്യാം. നിങ്ങളുടെ നഗരവും പിൻകോഡും തിരഞ്ഞെടുത്ത് ഇലക്ട്രീഷ്യനെ തിരഞ്ഞെടുക്കുക. ജോലി കഴിഞ്ഞ ശേഷം മാത്രം പണം നൽകുക. **90 ദിവസത്തെ വാറന്റി** ഉണ്ട്.",
      product: "🛒 **ഉൽപ്പന്നങ്ങൾ:**<br>സ്വിച്ചുകൾ (₹349), വയറുകൾ (₹2299), ഫാനുകൾ എന്നിവ ഞങ്ങളുടെ Marketplace പേജിൽ നിന്ന് വാങ്ങാം.",
      contact: "📞 **ബന്ധപ്പെടുക:**<br>• വാട്ട്സ്ആപ്പ്: <a href='https://wa.me/919874600265' target='_blank'>+91 98746 00265</a><br>• ഹെൽപ്‌ലൈൻ: +91 91236 67258 / +91 97483 98418",
      warranty: "🛡️ **വാറന്റി:**<br>ഞങ്ങളുടെ എല്ലാ സേവനങ്ങൾക്കും **90 ദിവസത്തെ വാറന്റി** ലഭിക്കും. ഉൽപ്പന്നങ്ങൾക്ക് 7 ദിവസത്തെ റിട്ടേൺ പോളിസി ഉണ്ട്.",
      fallback: "നമസ്കാരം! ഞാൻ നിങ്ങളുടെ എഎംപിഎഡ്ജ് സഹായ ഏജന്റാണ്. ബുക്കിംഗ്, ഉൽപ്പന്നങ്ങൾ അല്ലെങ്കിൽ കോൺടാക്റ്റ് വിവരങ്ങൾക്കായി ചോദിക്കുക."
    },
    gu: {
      booking: "⚡ **બુકિંગ માર્ગદર્શિકા:**<br>અમારી વેબસાઇટ પર 'Book a Service' પેજ પર જઈને બુકિંગ કરી શકો છો. સિટી અને પિનકોડ પસંદ કરી તમારા ઇલેક્ટ્રિશિયનની પસંદગી કરો. કામ પૂર્ણ થયા પછી જ પેમેન્ટ કરો. **90 દિવસની વોરંટી** મળશે.",
      product: "🛒 **પ્રોડક્ટ્સ માર્કેટપ્લેસ:**<br>સ્વિચ (₹349), વાયર (₹2299), કેબલ, એમસીબી અને ફેન ખરીદવા માટે અમારા Marketplace પેજની મુલાકાત લો.",
      contact: "📞 **સંપર્ક માહિતી:**<br>• વોટ્સએપ: <a href='https://wa.me/919874600265' target='_blank'>+91 98746 00265</a><br>• હેલ્પલાઇન: +91 91236 67258 / +91 97483 98418",
      warranty: "🛡️ **વોરંટી અને રિફંડ:**<br>અમારી બધી જ રિપેરિંગ સેવાઓ પર **90 દિવસની વોરંટી** છે. વપરાશ વગરના ઉત્પાદનો પર 7 દિવસની રીટર્ન પોલિસી છે.",
      fallback: "નમસ્તે! હું એએમપીએજ સહાયક એજન્ટ છું. બુકિંગ, વોરંટી, રિફંડ અથવા સંપર્ક નંબર વિશે પૂછો."
    },
    pa: {
      booking: "⚡ **ਬੁਕਿੰਗ ਗਾਈਡ:**<br>ਤੁਸੀਂ ਸਾਡੀ ਵੈੱਬਸਾਈਟ 'ਤੇ 'Book a Service' ਪੇਜ 'ਤੇ ਜਾ ਕੇ ਬੁਕਿੰਗ ਕਰ ਸਕਦੇ ਹੋ। ਸ਼ਹਿਰ ਅਤੇ ਪਿਨਕੋਡ ਚੁਣੋ, ਫਿਰ ਇਲੈਕਟ੍ਰੀਸ਼ੀਅਨ ਸਿਲੈਕਟ ਕਰੋ। ਕੰਮ ਪੂਰਾ ਹੋਣ 'ਤੇ ਹੀ ਪੇਮੈਂਟ ਕਰੋ। **90 ਦਿਨਾਂ ਦੀ ਵਾਰੰਟੀ** ਹੈ।",
      product: "🛒 **ਪ੍ਰੋਡਕਟ ਮਾਰਕੀਟਪਲੇਸ:**<br>ਸਵਿੱਚ (₹349), ਤਾਰਾਂ (₹2299), ਐਮਸੀਬੀ ਅਤੇ ਪੱਖੇ ਖਰੀਦਣ ਲਈ ਸਾਡੇ Marketplace ਪੇਜ 'ਤੇ ਜਾਓ।",
      contact: "📞 **ਸੰਪਰਕ ਜਾਣਕਾਰੀ:**<br>• ਵਟਸਐਪ: <a href='https://wa.me/919874600265' target='_blank'>+91 98746 00265</a><br>• ਹੈਲਪਲਾਈਨ: +91 91236 67258 / +91 97483 98418",
      warranty: "🛡️ **ਵਾਰੰਟੀ ਅਤੇ ਰਿਫੰਡ:**<br>ਸਾਡੀਆਂ ਸਾਰੀਆਂ ਰਿਪੇਅਰ ਸੇਵਾਵਾਂ 'ਤੇ **90 ਦਿਨਾਂ ਦੀ ਵਾਰੰਟੀ** ਹੈ। ਉਤਪਾਦਾਂ 'ਤੇ 7 ਦਿਨਾਂ ਦੀ ਵਾਪਸੀ ਨੀਤੀ ਹੈ।",
      fallback: "ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ! ਮੈਂ ਏਐਮਪੀਐਜ ਸਹਾਇਤਾ ਏਜੰਟ ਹਾਂ। ਮੈਨੂੰ ਬੁਕਿੰਗ, ਵਾਰੰਟੀ, ਰਿਫੰਡ ਜਾਂ ਸੰਪਰਕ ਨੰਬਰ ਬਾਰੇ ਪੁੱਛੋ।"
    },
    en: {
      booking: "⚡ **Booking Process:**<br>Go to the 'Book a Service' tab, select your city/pincode, choose your service type and preferred partner, select a slot, and confirm. Pay only after complete satisfaction! All bookings carry a **90-day warranty**.",
      product: "🛒 **Products & Marketplace:**<br>We deliver genuine certified electrical products with best price guarantees:<br>• Havells Coral Smart Switch — ₹349<br>• Finolex PVC Wire — ₹2,299<br>• Legrand USB Socket — ₹1,249<br>• Philips LED Tube — ₹449<br>• Crompton Ceiling Fan — ₹2,499<br>Visit our Marketplace page to order.",
      contact: "📞 **Contact Support:**<br>• WhatsApp Business: <a href='https://wa.me/919874600265' target='_blank' style='color:#25D366;font-weight:700'>+91 98746 00265</a><br>• Helpline: +91 91236 67258 / +91 97483 98418<br>• Email Support: ampedge.info@gmail.com<br>• Registered Office: West Bauria, Howrah 711307",
      warranty: "🛡️ **Warranty & Refund:**<br>All repairs and installations carry a **90-day post-service warranty**. Unused products can be returned within 7 days for a 100% refund.",
      plan: "👑 **Subscription Plans:**<br>Choose our Prime subscriptions to save on bookings and products:<br>• Base Plan (₹199/month): 1 Free safety audit.<br>• Modular Plan (₹499/month): 2 Free safety audits, zero platform booking fee.<br>• Premium Plan (₹999/month): Unlimited emergency visits, free checkups, 10% off products.",
      partner: "🤝 **Partner Program:**<br>For electricians, technicians, and contractors. Work dynamically, accept service bookings near you, and withdraw earnings daily! Sign up on our Partnership page.",
      fallback: "Hello! I am your AMPEdge Solutions AI Agent. How can I help you today? You can ask me about our services, marketplace products, booking, refund policy, subscription plans, or contact numbers. I support Hindi, Bengali, Tamil, Telugu, Kannada, Malayalam, Gujarati, and Punjabi!"
    }
  };

  const currentLang = responses[lang] || responses['en'];
  
  let reply = currentLang.fallback;
  let detectedIntent = 'fallback';
  
  if (isBooking) {
    reply = currentLang.booking;
    detectedIntent = 'booking';
  } else if (isProduct) {
    reply = currentLang.product;
    detectedIntent = 'product';
  } else if (isContact) {
    reply = currentLang.contact;
    detectedIntent = 'contact';
  } else if (isWarranty) {
    reply = currentLang.warranty;
    detectedIntent = 'warranty';
  } else if (isPlan && currentLang.plan) {
    reply = currentLang.plan;
    detectedIntent = 'plan';
  } else if (isPartner) {
    reply = currentLang.partner;
    detectedIntent = 'partner';
  }
  
  // Appends redirection button if applicable
  if (detectedIntent === 'booking') {
    let btnText = "Book Service ⚡";
    if (lang === 'hi') btnText = "सर्विस बुक करें ⚡";
    else if (lang === 'bn') btnText = "সার্ভিস বুক করুন ⚡";
    else if (lang === 'ta') btnText = "சேவை புக் செய்க ⚡";
    else if (lang === 'te') btnText = "సర్వీస్ బుక్ చేయండి ⚡";
    else if (lang === 'kn') btnText = "ಸೇವೆ ಬುಕ್ ಮಾಡಿ ⚡";
    else if (lang === 'ml') btnText = "ബുക്കിംഗ് ചെയ്യുക ⚡";
    else if (lang === 'gu') btnText = "સેવા બુક કરો ⚡";
    else if (lang === 'pa') btnText = "ਸੇਵਾ ਬੁੱਕ ਕਰੋ ⚡";
    reply += `<br/><br/><a href="booking.html" class="btn btn-primary btn-sm" style="display:inline-block; background:var(--blue); color:#fff !important; padding:8px 16px; border-radius:8px; font-weight:700; font-size:13px; text-decoration:none; margin-top:8px; box-shadow:0 4px 10px rgba(65,105,225,0.2)">${btnText}</a>`;
  } else if (detectedIntent === 'product') {
    let btnText = "Go to Marketplace 🛒";
    if (lang === 'hi') btnText = "मार्केटप्लेस पर जाएं 🛒";
    else if (lang === 'bn') btnText = "মার্কেটপ্লেসে যান 🛒";
    else if (lang === 'ta') btnText = "பொருட்கள் வாங்க 🛒";
    else if (lang === 'te') btnText = "మార్కెట్‌ప్లేస్ కి వెళ్ళండి 🛒";
    else if (lang === 'kn') btnText = "ಮಾರುಕಟ್ಟೆಗೆ ಹೋಗಿ 🛒";
    else if (lang === 'ml') btnText = "മാർക്കറ്റ് പ്ലേസ് 🛒";
    else if (lang === 'gu') btnText = "માર્કેટપ્લેસ પર જાઓ 🛒";
    else if (lang === 'pa') btnText = "ਮਾਰਕੀਟਪਲੇਸ 'ਤੇ ਜਾਓ 🛒";
    reply += `<br/><br/><a href="marketplace.html" class="btn btn-primary btn-sm" style="display:inline-block; background:var(--blue); color:#fff !important; padding:8px 16px; border-radius:8px; font-weight:700; font-size:13px; text-decoration:none; margin-top:8px; box-shadow:0 4px 10px rgba(65,105,225,0.2)">${btnText}</a>`;
  } else if (detectedIntent === 'plan') {
    let btnText = "View Subscription Plans 👑";
    if (lang === 'hi') btnText = "सब्सक्रिप्शन प्लान्स 👑";
    else if (lang === 'bn') btnText = "মেম্বারশিপ প্ল্যান 👑";
    else if (lang === 'ta') btnText = "பிளான்கள் பார்க்க 👑";
    else if (lang === 'te') btnText = "ప్లాన్స్ చూడండి 👑";
    else if (lang === 'kn') btnText = "ಯೋಜನೆಗಳನ್ನು ನೋಡಿ 👑";
    else if (lang === 'ml') btnText = "പ്ലാനുകൾ കാണുക 👑";
    else if (lang === 'gu') btnText = "યોજનાઓ જુઓ 👑";
    else if (lang === 'pa') btnText = "ਪਲਾਨ ਦੇਖੋ 👑";
    reply += `<br/><br/><a href="subscription.html" class="btn btn-primary btn-sm" style="display:inline-block; background:var(--blue); color:#fff !important; padding:8px 16px; border-radius:8px; font-weight:700; font-size:13px; text-decoration:none; margin-top:8px; box-shadow:0 4px 10px rgba(65,105,225,0.2)">${btnText}</a>`;
  } else if (detectedIntent === 'partner') {
    let btnText = "Become Partner 🤝";
    if (lang === 'hi') btnText = "पार्टनर बनें 🤝";
    else if (lang === 'bn') btnText = "পার্টনার হোন 🤝";
    else if (lang === 'ta') btnText = "பங்குதாரராக 🤝";
    else if (lang === 'te') btnText = "భాగస్వామి అవ్వండి 🤝";
    else if (lang === 'kn') btnText = "ಪಾಲುದಾರರಾಗಿ 🤝";
    else if (lang === 'ml') btnText = "പങ്കാളിയാകുക 🤝";
    else if (lang === 'gu') btnText = "ભાગીદાર બનો 🤝";
    else if (lang === 'pa') btnText = "ਭਾਗੀਦਾਰ ਬਣੋ 🤝";
    reply += `<br/><br/><a href="partner.html" class="btn btn-primary btn-sm" style="display:inline-block; background:var(--blue); color:#fff !important; padding:8px 16px; border-radius:8px; font-weight:700; font-size:13px; text-decoration:none; margin-top:8px; box-shadow:0 4px 10px rgba(65,105,225,0.2)">${btnText}</a>`;
  }
  
  return reply;
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

window.formatCardNumber = function(input) {
  let val = input.value.replace(/\s+/g, '').replace(/[^0-9]/g, '');
  let formatted = '';
  for (let i = 0; i < val.length; i++) {
    if (i > 0 && i % 4 === 0) formatted += ' ';
    formatted += val[i];
  }
  input.value = formatted;
};

window.formatCardExpiry = function(input) {
  let val = input.value.replace(/[^0-9]/g, '');
  if (val.length >= 2) {
    input.value = val.substring(0, 2) + '/' + val.substring(2, 4);
  } else {
    input.value = val;
  }
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

  // Validate Payment Tab Info
  const upiPane = document.getElementById('tab-upi');
  const cardPane = document.getElementById('tab-card');
  
  if (upiPane && upiPane.style.display === 'block') {
    const upiId = document.getElementById('checkoutUpiId')?.value.trim();
    if (!upiId || !upiId.includes('@')) {
      alert("Please enter a valid UPI ID (e.g. name@upi).");
      return;
    }
  } else if (cardPane && cardPane.style.display === 'block') {
    const cardNum = document.getElementById('checkoutCardNumber')?.value.replace(/\s+/g, '');
    const expiry = document.getElementById('checkoutCardExpiry')?.value.trim();
    const cvv = document.getElementById('checkoutCardCvv')?.value.trim();
    
    if (!cardNum || cardNum.length !== 16 || !/^\d{16}$/.test(cardNum)) {
      alert("Please enter a valid 16-digit Card Number.");
      return;
    }
    if (!expiry || !/^\d{2}\/\d{2}$/.test(expiry)) {
      alert("Please enter a valid Expiry Date (MM/YY).");
      return;
    }
    const month = parseInt(expiry.split('/')[0]);
    if (month < 1 || month > 12) {
      alert("Please enter a valid Expiry Month (01-12).");
      return;
    }
    if (!cvv || cvv.length !== 3 || !/^\d{3}$/.test(cvv)) {
      alert("Please enter a valid 3-digit CVV.");
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

// ── GLOBAL FOOTER DYNAMIC MODALS AND ROUTING ──────────────────

// 1. Dynamic Marketplace Category URL Filter on Load
(function() {
  const params = new URLSearchParams(window.location.search);
  const catParam = params.get('category');
  if (catParam) {
    const val = catParam.toLowerCase();
    if (val === 'switches') {
      currentCategoryFilter = 'Switches';
    } else if (val === 'wires' || val === 'cables') {
      currentCategoryFilter = 'Wires & Cables';
    } else if (val === 'mcb' || val === 'db') {
      currentCategoryFilter = 'MCB & DB';
    } else if (val === 'lighting' || val === 'led') {
      currentCategoryFilter = 'LED Lighting';
    } else if (val === 'fans') {
      currentCategoryFilter = 'Fans';
    } else if (val === 'solar') {
      currentCategoryFilter = '☀️ Solar';
    }
    
    // Update active visual tab class on load
    window.addEventListener('DOMContentLoaded', () => {
      document.querySelectorAll('.chip-item').forEach(btn => {
        const text = btn.textContent.trim().toLowerCase();
        if (text === currentCategoryFilter.toLowerCase() || (currentCategoryFilter === '☀️ Solar' && text.includes('solar'))) {
          btn.classList.add('active');
        } else {
          btn.classList.remove('active');
        }
      });
      renderMarketplaceProducts();
    });
  }
})();

// ── GLOBAL DOWNLOAD APP CUSTOMIZED MODAL SYSTEM ─────────
document.addEventListener('DOMContentLoaded', () => {
  const downloadModalHTML = `
    <div id="downloadAppModal" class="modal-overlay" style="z-index: 100005; display:flex; align-items:center; justify-content:center; opacity:0; pointer-events:none; transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1); background: rgba(10, 15, 44, 0.75); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); padding: 16px;">
      <div class="modal-content" style="max-width: 540px; width: 100%; border-radius: 28px; overflow: hidden; box-shadow: 0 30px 80px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.15); background: #ffffff; position: relative; transform: scale(0.92); transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);">
        
        <!-- Close Button -->
        <button class="btn-icon" style="position:absolute; top:16px; right:16px; background:rgba(255,255,255,0.2); border:none; width:36px; height:36px; border-radius:50%; font-size:18px; font-weight:700; cursor:pointer; color:#ffffff; backdrop-filter:blur(8px); display:flex; align-items:center; justify-content:center; z-index:10; transition:transform 0.2s, background 0.2s;" onmouseover="this.style.background='rgba(255,255,255,0.35)'; this.style.transform='scale(1.08)'" onmouseout="this.style.background='rgba(255,255,255,0.2)'; this.style.transform='scale(1)'" onclick="closeDownloadAppModal()">✕</button>

        <!-- Header Hero Graphic -->
        <div style="background: linear-gradient(145deg, #0a0f2c 0%, #131a4a 60%, #1e293b 100%); padding: 36px 28px 28px; color: #ffffff; text-align: center; position: relative; overflow: hidden;">
          <!-- Ambient Glow Circles -->
          <div style="position:absolute; top:-40px; left:50%; transform:translateX(-50%); width:220px; height:220px; background:radial-gradient(circle, rgba(92,225,230,0.35) 0%, transparent 70%); border-radius:50%; pointer-events:none;"></div>
          
          <!-- App Icon with Badge -->
          <div style="position:relative; width:76px; height:76px; margin:0 auto 16px; z-index:2;">
            <div style="width:100%; height:100%; border-radius:22px; background:linear-gradient(135deg, #4169E1 0%, #5CE1E6 100%); display:flex; align-items:center; justify-content:center; box-shadow:0 12px 30px rgba(65,105,225,0.45); border:2px solid rgba(255,255,255,0.4); font-size:36px;">
              ⚡
            </div>
            <div style="position:absolute; bottom:-4px; right:-6px; background:#10b981; color:#fff; border-radius:12px; padding:2px 8px; font-size:10px; font-weight:800; border:2px solid #0a0f2c; letter-spacing:0.5px;">PRO</div>
          </div>

          <h2 style="font-family:var(--font-pjs); font-size: clamp(22px, 3.5vw, 26px); font-weight:900; margin:0 0 6px; letter-spacing:-0.5px; color:#ffffff;">
            AMPEdge <span style="background:linear-gradient(135deg, #5CE1E6, #ffd700); -webkit-background-clip:text; -webkit-text-fill-color:transparent;">Official App</span>
          </h2>
          <p style="color:rgba(255,255,255,0.75); font-size:13.5px; margin:0 0 14px; line-height:1.4;">India's Smartest Electrical & Solar On-Demand Platform</p>
          
          <!-- Rating & Version Pill -->
          <div style="display:inline-flex; align-items:center; gap:10px; background:rgba(255,255,255,0.1); border:1px solid rgba(255,255,255,0.18); border-radius:30px; padding:6px 16px; font-size:12px; font-weight:700;">
            <span style="color:#ffd700;">★★★★★</span>
            <span>4.9 / 5.0</span>
            <span style="opacity:0.4;">|</span>
            <span style="color:#5CE1E6;">10,000+ Installs</span>
          </div>
        </div>

        <!-- Body Section -->
        <div style="padding: 26px 28px; background: #ffffff;">
          
          <!-- Key Features Grid -->
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 22px;">
            <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:14px; padding:12px; display:flex; align-items:center; gap:10px;">
              <div style="font-size:22px;">⚡</div>
              <div>
                <div style="font-size:12.5px; font-weight:800; color:#0f172a;">15-Min Dispatch</div>
                <div style="font-size:11px; color:#64748b;">Instant nearby pro matchmaking</div>
              </div>
            </div>
            <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:14px; padding:12px; display:flex; align-items:center; gap:10px;">
              <div style="font-size:22px;">📍</div>
              <div>
                <div style="font-size:12.5px; font-weight:800; color:#0f172a;">Live GPS Map</div>
                <div style="font-size:11px; color:#64748b;">Real-time electrician tracking</div>
              </div>
            </div>
            <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:14px; padding:12px; display:flex; align-items:center; gap:10px;">
              <div style="font-size:22px;">🎁</div>
              <div>
                <div style="font-size:12.5px; font-weight:800; color:#0f172a;">₹150 App Bonus</div>
                <div style="font-size:11px; color:#64748b;">Flat discount on first booking</div>
              </div>
            </div>
            <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:14px; padding:12px; display:flex; align-items:center; gap:10px;">
              <div style="font-size:22px;">🛡️</div>
              <div>
                <div style="font-size:12.5px; font-weight:800; color:#0f172a;">Digital Warranty</div>
                <div style="font-size:11px; color:#64748b;">90-day auto-saved service card</div>
              </div>
            </div>
          </div>

          <!-- QR & APK Card -->
          <div style="background: linear-gradient(135deg, #f0fdf4 0%, #f8fafc 100%); border: 1.5px dashed #22c55e; border-radius: 18px; padding: 18px; display: flex; align-items: center; gap: 18px; margin-bottom: 22px;">
            <!-- QR Code -->
            <div style="background:#ffffff; padding:8px; border-radius:12px; border:1px solid #e2e8f0; box-shadow:0 4px 12px rgba(0,0,0,0.05); flex-shrink:0;">
              <svg width="80" height="80" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="100" height="100" fill="white"/>
                <rect x="8" y="8" width="28" height="28" rx="4" fill="#0f172a"/>
                <rect x="14" y="14" width="16" height="16" rx="2" fill="white"/>
                <rect x="18" y="18" width="8" height="8" fill="#4169E1"/>
                <rect x="64" y="8" width="28" height="28" rx="4" fill="#0f172a"/>
                <rect x="70" y="14" width="16" height="16" rx="2" fill="white"/>
                <rect x="74" y="18" width="8" height="8" fill="#4169E1"/>
                <rect x="8" y="64" width="28" height="28" rx="4" fill="#0f172a"/>
                <rect x="14" y="70" width="16" height="16" rx="2" fill="white"/>
                <rect x="18" y="74" width="8" height="8" fill="#4169E1"/>
                <rect x="42" y="10" width="6" height="6" fill="#0f172a"/>
                <rect x="50" y="18" width="8" height="6" fill="#0f172a"/>
                <rect x="42" y="28" width="12" height="6" fill="#0f172a"/>
                <rect x="10" y="44" width="10" height="6" fill="#0f172a"/>
                <rect x="26" y="44" width="8" height="12" fill="#0f172a"/>
                <rect x="40" y="40" width="20" height="20" rx="4" fill="#5CE1E6"/>
                <rect x="46" y="46" width="8" height="8" fill="#0f172a"/>
                <rect x="66" y="44" width="12" height="6" fill="#0f172a"/>
                <rect x="84" y="44" width="6" height="12" fill="#0f172a"/>
                <rect x="44" y="66" width="6" height="14" fill="#0f172a"/>
                <rect x="56" y="72" width="14" height="6" fill="#0f172a"/>
                <rect x="76" y="66" width="14" height="6" fill="#0f172a"/>
                <rect x="84" y="78" width="6" height="12" fill="#0f172a"/>
              </svg>
            </div>
            
            <div style="flex:1;">
              <div style="display:inline-flex; align-items:center; gap:6px; background:#dcfce7; color:#15803d; padding:2px 8px; border-radius:20px; font-size:11px; font-weight:800; margin-bottom:4px;">
                <span>📷</span> Scan with Phone Camera
              </div>
              <div style="font-size:13.5px; font-weight:800; color:#0f172a; margin-bottom:2px;">Quick Instant Install</div>
              <div style="font-size:11.5px; color:#64748b;">Package: <code style="background:#e2e8f0; padding:1px 4px; border-radius:4px;">in.co.ampedge.app</code> (18.4 MB)</div>
            </div>
          </div>

          <!-- Action Buttons -->
          <div style="display: flex; flex-direction: column; gap: 12px;">
            <!-- Google Play Store Button -->
            <a href="https://play.google.com/store" target="_blank" class="btn" style="background:#0f172a; color:#ffffff; padding:14px 20px; border-radius:16px; display:flex; align-items:center; justify-content:center; gap:12px; text-decoration:none; box-shadow:0 6px 20px rgba(15,23,42,0.25); transition:transform 0.2s;" onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='translateY(0)'">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.609 1.814L13.792 12 3.61 22.186a2.37 2.37 0 0 1-.61-.925V2.739c.16-.367.37-.68.61-.925z" fill="#00E676"/>
                <path d="M15.212 13.417l-1.42-1.417 1.42-1.417 3.642 2.048c1.03.579 1.03 1.523 0 2.102l-3.642 2.048c-.001 0-.001 0 0 0z" fill="#FFD600"/>
                <path d="M13.792 12L3.609 1.814l11.45 6.442L13.792 12z" fill="#00B0FF"/>
                <path d="M3.609 22.186L13.792 12l1.267 3.744-11.45 6.442z" fill="#FF3D00"/>
              </svg>
              <div style="text-align:left; line-height:1.2;">
                <div style="font-size:10.5px; text-transform:uppercase; opacity:0.8; letter-spacing:0.5px;">GET IT ON</div>
                <div style="font-size:16px; font-weight:800; font-family:var(--font-pjs);">Google Play Store</div>
              </div>
            </a>

            <!-- Direct APK Button with Simulated Download Progress -->
            <button id="directApkBtn" onclick="triggerCustomApkDownload()" class="btn" style="background:linear-gradient(135deg, #4169E1 0%, #2563eb 100%); color:#ffffff; padding:14px 20px; border-radius:16px; display:flex; align-items:center; justify-content:center; gap:10px; font-weight:800; font-size:14px; box-shadow:0 6px 20px rgba(65,105,225,0.35); transition:transform 0.2s; position:relative; overflow:hidden;" onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='translateY(0)'">
              <span style="font-size:18px;">📥</span>
              <span id="directApkBtnText">Direct APK Download (v1.0.4)</span>
            </button>
          </div>

          <!-- Security Footer -->
          <div style="display:flex; align-items:center; justify-content:center; gap:14px; margin-top:16px; font-size:12px; color:#64748b;">
            <span>🔒 100% Virus Free</span>
            <span>•</span>
            <span>📱 Android 8.0+</span>
            <span>•</span>
            <span>⚡ Instant Setup</span>
          </div>

        </div>

      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', downloadModalHTML);
  
  const dlStyle = document.createElement('style');
  dlStyle.textContent = `
    #downloadAppModal.active {
      opacity: 1 !important;
      pointer-events: auto !important;
    }
    #downloadAppModal.active .modal-content {
      transform: scale(1) !important;
    }
  `;
  document.head.appendChild(dlStyle);
});

window.openDownloadAppModal = function() {
  const modal = document.getElementById('downloadAppModal');
  if (modal) modal.classList.add('active');
};

window.closeDownloadAppModal = function() {
  const modal = document.getElementById('downloadAppModal');
  if (modal) modal.classList.remove('active');
};

window.triggerCustomApkDownload = function() {
  const btn = document.getElementById('directApkBtn');
  const txt = document.getElementById('directApkBtnText');
  if (!btn || !txt) return;

  btn.style.pointerEvents = 'none';
  txt.innerHTML = '⏳ Preparing Download (18.4 MB)...';
  btn.style.background = '#059669';

  setTimeout(() => {
    txt.innerHTML = '⚡ Downloading: AMPEdge-v1.0.4.apk (45%)...';
  }, 700);

  setTimeout(() => {
    txt.innerHTML = '✓ Download Complete! (Check Notifications)';
    btn.style.background = '#10b981';
    
    // Create simulated file download
    const blob = new Blob(['AMPEdge Android Official Package v1.0.4 - Certified Build'], { type: 'application/vnd.android.package-archive' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'AMPEdge-v1.0.4.apk';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
  }, 1600);

  setTimeout(() => {
    btn.style.pointerEvents = 'auto';
    btn.style.background = 'linear-gradient(135deg, #4169E1 0%, #2563eb 100%)';
    txt.innerHTML = '📥 Direct APK Download (v1.0.4)';
    window.closeDownloadAppModal();
  }, 3500);
};


// 2. Global Footer Info Modal System
document.addEventListener('DOMContentLoaded', () => {
  const modalHTML = `
    <div id="footerInfoModal" class="modal-overlay" style="z-index: 100000; display:flex; align-items:center; justify-content:center; opacity:0; pointer-events:none; transition: opacity 0.3s ease;">
      <div class="modal-content" style="max-width: 650px; padding: 28px; max-height: 85vh; overflow-y: auto; border-radius: 16px; box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1); border: 1px solid var(--border);">
        <div class="modal-header" style="display:flex; align-items:center; justify-content:space-between; border-bottom: 1px solid var(--border); padding-bottom: 14px; margin-bottom: 18px;">
          <h3 id="footerInfoTitle" style="font-family: var(--font-pjs); font-size: 22px; color: var(--text-dark); margin:0;">Title</h3>
          <button class="btn-icon" style="background:none; border:none; font-size:22px; cursor:pointer; color:var(--text-muted); font-weight:700;" onclick="closeFooterInfoModal()">✕</button>
        </div>
        <div id="footerInfoBody" style="font-size: 14.5px; line-height: 1.7; color: var(--text-muted);">
          <!-- Dynamic Content -->
        </div>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', modalHTML);
  
  // Inject modal overlay transition CSS styles
  const style = document.createElement('style');
  style.textContent = `
    #footerInfoModal.active {
      opacity: 1 !important;
      pointer-events: auto !important;
    }
  `;
  document.head.appendChild(style);
});

window.closeFooterInfoModal = function() {
  const modal = document.getElementById('footerInfoModal');
  if (modal) modal.classList.remove('active');
};

window.showFooterInfoModal = function(type) {
  const modal = document.getElementById('footerInfoModal');
  const titleEl = document.getElementById('footerInfoTitle');
  const bodyEl = document.getElementById('footerInfoBody');
  
  if (!modal || !titleEl || !bodyEl) return;
  
  const contentDb = {
    about: {
      title: "About AMPEdge Solutions ⚡",
      body: `
        <div style="text-align: center; margin-bottom: 22px;">
          <img src="images/logo.png" alt="AMPEdge Solutions" style="height: 52px; margin-bottom: 12px; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));"/>
          <h4 style="font-size: 18px; color: var(--blue); margin: 0 0 8px 0; font-family: var(--font-pjs);">Powering the Edge of Tomorrow</h4>
          <p style="font-style: italic; color:var(--text-muted); font-size:13.5px; margin:0;">"Pay only after complete satisfaction. Guaranteed."</p>
        </div>
        <p><strong>AMPEdge Solutions</strong> is India's premier, state-of-the-art platform connecting residential and commercial properties with certified, highly trained electrician partners. We stand for speed, safety, and modern convenience.</p>
        <h5 style="color: var(--text-dark); margin: 20px 0 10px 0; font-size: 16px; font-weight:700;">Our Core Values:</h5>
        <ul style="padding-left: 20px; margin-bottom: 20px; display:grid; gap:8px;">
          <li><strong>90-Day Post-Service Warranty:</strong> Every booking is secured under our official warranty. If the same issue pops up again within 90 days, we fix it completely free.</li>
          <li><strong>Rigorous Partner Vetting:</strong> All onboarded technicians undergo background screening, qualification verification, and extensive field safety testing.</li>
          <li><strong>Upfront Transparent Estimates:</strong> We use real-time wire calculators and standard rate books so there are never any hidden costs or surprise markups.</li>
        </ul>
      `
    },
    help: {
      title: "Help Centre & FAQ ❓",
      body: `
        <p>Need assistance? Here are quick answers to our most common customer queries:</p>
        <div style="display: flex; flex-direction: column; gap: 18px; margin-top: 16px; margin-bottom:24px;">
          <div>
            <h5 style="color: var(--blue); margin: 0 0 6px 0; font-size: 15px; font-weight:700;">Q: How do I book an electrician partner?</h5>
            <p style="margin: 0;">A: Go to the "Book a Service" tab, select your city and pincode, pick your property type, select the specific services needed, choose your preferred electrician partner based on distance/ratings, select a date and slot, and confirm. Done!</p>
          </div>
          <div>
            <h5 style="color: var(--blue); margin: 0 0 6px 0; font-size: 15px; font-weight:700;">Q: What is the 90-day service warranty?</h5>
            <p style="margin: 0;">A: Every booking through our site is backed by a 90-day warranty. If the repair fails or the setup breaks within 90 days, we'll send a technician to resolve it for free.</p>
          </div>
          <div>
            <h5 style="color: var(--blue); margin: 0 0 6px 0; font-size: 15px; font-weight:700;">Q: How does the Marketplace work?</h5>
            <p style="margin: 0;">A: You can purchase switches, wires, cables, MCBs, LED fittings, and fans directly from our platform. At checkout, you can also optionally choose to add professional installation by verified partners near you.</p>
          </div>
        </div>
        
        <hr style="border:none; border-top:1px solid var(--border); margin:20px 0 16px 0;"/>
        <h5 style="color:var(--text-dark); font-size:15px; margin:0 0 6px 0; font-weight:700;">📨 Submit a Custom Query to Admin</h5>
        <p style="margin:0 0 12px 0; font-size:12.5px; color:var(--text-muted);">If your query is not resolved above, type your message in any language below. Our admin support team will review and contact you shortly.</p>
        <div style="display:flex; flex-direction:column; gap:10px;">
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
            <input type="text" id="helpTicketName" placeholder="Your Name" style="padding:10px; border:1px solid var(--border); border-radius:8px; font-size:13px; outline:none; background:var(--bg); color:var(--text-dark);" autocomplete="off"/>
            <input type="tel" id="helpTicketPhone" placeholder="Your Phone Number" maxlength="10" oninput="this.value = this.value.replace(/[^0-9]/g, '')" style="padding:10px; border:1px solid var(--border); border-radius:8px; font-size:13px; outline:none; background:var(--bg); color:var(--text-dark);" autocomplete="off"/>
          </div>
          <textarea id="helpTicketMsg" rows="3" placeholder="Write your problem here in English, Hindi, Bengali, etc..." style="width:100%; padding:10px 14px; border:1px solid var(--border); border-radius:8px; font-size:13.5px; outline:none; resize:none; font-family:inherit; background:var(--bg); color:var(--text-dark);" autocomplete="off"></textarea>
          <button type="button" class="btn btn-primary" onclick="submitHelpTicket(this)" style="padding:10px 16px; font-size:13px; align-self:flex-start; margin:0;">Send Message ⚡</button>
        </div>
      `
    },
    contact: {
      title: "Contact Us 📞",
      body: `
        <p>Have specific queries or custom corporate requirements? Reach out directly to the AMPEdge Solutions team:</p>
        <div style="background: var(--bg2); padding: 22px; border-radius: 12px; display: grid; gap: 16px; margin-top: 16px; border: 1px solid var(--border);">
          <div style="display: flex; align-items: center; gap: 12px;">
            <span style="font-size: 20px;">📧</span> 
            <div><strong>Email Support:</strong> <a href="mailto:ampedge.info@gmail.com" style="color: var(--blue); text-decoration:none;">ampedge.info@gmail.com</a></div>
          </div>
          <div style="display: flex; align-items: center; gap: 12px;">
            <span style="font-size: 20px;">📞</span> 
            <div><strong>Phone Helpdesk:</strong> +91 91236 67258 &nbsp;|&nbsp; +91 97483 98418</div>
          </div>
          <div style="display: flex; align-items: center; gap: 12px;">
            <span style="font-size: 20px; color: #25D366;">💬</span> 
            <div><strong>WhatsApp Business:</strong> <a href="https://wa.me/919874600265" target="_blank" style="color: #25D366; font-weight: 700; text-decoration: none;">+91 98746 00265</a></div>
          </div>
          <div style="display: flex; align-items: flex-start; gap: 12px;">
            <span style="font-size: 20px;">📍</span> 
            <div><strong>Registered Office:</strong> West Bauria, Chackasi, Palpara, Howrah 711307, West Bengal, India</div>
          </div>
        </div>
      `
    },
    privacy: {
      title: "Privacy Policy 🔒",
      body: `
        <p>Last updated: July 2026</p>
        <p>Your privacy is vital to us. This policy describes how we collect, store, and process your information:</p>
        <h5 style="color: var(--text-dark); margin: 16px 0 6px 0; font-size: 15px; font-weight:700;">1. Personal Coordinates & Geolocation</h5>
        <p>We request access to geolocation data solely to match-make you with close electrician partners and autofill addresses. This coordinates data is processed instantly and never shared with external agencies.</p>
        <h5 style="color: var(--text-dark); margin: 16px 0 6px 0; font-size: 15px; font-weight:700;">2. Cookies & Analytics</h5>
        <p>We use simple local cookies to persist your cart selections, booking step inputs, and active session details so you do not lose your selections when reloading pages.</p>
      `
    },
    terms: {
      title: "Terms of Service 📝",
      body: `
        <p>Last updated: July 2026</p>
        <p>Please read these Terms of Service before using our service platforms:</p>
        <h5 style="color: var(--text-dark); margin: 16px 0 6px 0; font-size: 15px; font-weight:700;">1. Customer Account & Accuracy</h5>
        <p>When booking tasks or placing product orders, you must provide valid name, phone, and address details. Falsifying information or bypassing electrician safety checks is strictly forbidden.</p>
        <h5 style="color: var(--text-dark); margin: 16px 0 6px 0; font-size: 15px; font-weight:700;">2. Right to Refuse Service</h5>
        <p>To secure our partners' safety, AMPEdge Solutions reserves the right to decline or cancel service dispatches in case of hostile on-site conditions or non-compliant environments.</p>
      `
    },
    refund: {
      title: "Refund Policy 💳",
      body: `
        <p>We provide straightforward refund terms across products and services:</p>
        <h5 style="color: var(--text-dark); margin: 16px 0 6px 0; font-size: 15px; font-weight:700;">1. Marketplace Product Returns</h5>
        <p>Unused, unmounted electrical products in their original manufacturer packaging can be returned within <strong>7 days</strong> of delivery. Contact our helpline to schedule an inspection-pickup.</p>
        <h5 style="color: var(--text-dark); margin: 16px 0 6px 0; font-size: 15px; font-weight:700;">2. Booking Cancellation & Fees</h5>
        <p>Service bookings can be canceled for free up to <strong>2 hours</strong> before the selected technician slot. Late cancellations are subject to a nominal ₹99 dispatch charge.</p>
      `
    },
    press: {
      title: "Press & Media Releases 📰",
      body: `
        <div style="display: flex; flex-direction: column; gap: 18px; margin-top: 10px;">
          <div style="border-left: 3px solid var(--blue); padding-left: 14px;">
            <h5 style="margin: 0 0 6px 0; font-size: 15px; font-weight:700; color:var(--text-dark);">AMPEdge Solutions Awarded Top Urban Tech Startup 🏆</h5>
            <p style="margin: 0; font-size: 13.5px;">"Howrah's AMPEdge Solutions receives recognition for bringing background-checked, vetted electricians to suburban homes instantly." — <em>StartUp India Connect</em></p>
          </div>
          <div style="border-left: 3px solid var(--blue); padding-left: 14px;">
            <h5 style="margin: 0 0 6px 0; font-size: 15px; font-weight:700; color:var(--text-dark);">Revolutionizing Solar Adoption in Suburban Homes ☀️</h5>
            <p style="margin: 0; font-size: 13.5px;">"With their smart solar installation calculators and net metering matching system, AMPEdge makes rooftop solar setups highly transparent." — <em>Green Energy Review</em></p>
          </div>
        </div>
      `
    }
  };
  
  const content = contentDb[type];
  if (content) {
    titleEl.textContent = content.title;
    bodyEl.innerHTML = content.body;
    modal.classList.add('active');
    
    // Auto-expand Help AI Agent Chat Drawer on the right when Help is clicked
    if (type === 'help' && typeof openHelpChatDrawer === 'function') {
      setTimeout(() => {
        openHelpChatDrawer();
      }, 300);
    }
  }
};

// ── Help Centre Webform Submission to Admin ──────────────────
window.submitHelpTicket = function(btn) {
  const nameInput = document.getElementById('helpTicketName');
  const phoneInput = document.getElementById('helpTicketPhone');
  const msgInput = document.getElementById('helpTicketMsg');
  
  if (!msgInput || !msgInput.value.trim()) {
    alert("⚠️ Please type your message/problem first.");
    return;
  }
  
  const name = nameInput ? nameInput.value.trim() : 'Anonymous';
  const phone = phoneInput ? phoneInput.value.trim() : 'N/A';
  const msg = msgInput.value.trim();
  
  const tickets = JSON.parse(localStorage.getItem('ampedge_help_tickets') || '[]');
  const newId = 'TKT-' + (1000 + tickets.length);
  const now = new Date();
  
  tickets.push({
    id: newId,
    name: name,
    phone: phone,
    message: msg,
    status: 'Pending',
    date: now.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
    source: 'Help Centre Webform'
  });
  
  localStorage.setItem('ampedge_help_tickets', JSON.stringify(tickets));
  
  // Clear inputs
  if (nameInput) nameInput.value = '';
  if (phoneInput) phoneInput.value = '';
  msgInput.value = '';
  
  // Visual success feedback
  const oldText = btn.innerHTML;
  btn.innerHTML = '✓ Sent Successfully!';
  btn.style.background = '#059669';
  btn.style.borderColor = '#059669';
  btn.style.pointerEvents = 'none';
  
  setTimeout(() => {
    btn.innerHTML = oldText;
    btn.style.background = '';
    btn.style.borderColor = '';
    btn.style.pointerEvents = 'auto';
    alert("📍 Message forwarded to Admin Portal. Ticket ID: " + newId);
  }, 1500);
};

// ── Multilingual Help AI Agent Sidebar Chat Drawer ──────────
document.addEventListener('DOMContentLoaded', () => {
  const drawerHTML = `
    <div id="helpChatDrawer" style="position:fixed; top:0; right:-380px; width:360px; height:100vh; background:var(--bg); border-left:1px solid var(--border); z-index:100010; display:flex; flex-direction:column; box-shadow:-10px 0 30px rgba(0,0,0,0.15); transition: right 0.4s cubic-bezier(0.16, 1, 0.3, 1);">
      <!-- Drawer Header -->
      <div style="background: linear-gradient(135deg, var(--blue) 0%, #8A2BE2 100%); padding: 18px 20px; color:#fff; display:flex; align-items:center; justify-content:space-between;">
        <div style="display:flex; align-items:center; gap:10px;">
          <div style="width:38px; height:38px; border-radius:50%; background:rgba(255,255,255,0.2); display:flex; align-items:center; justify-content:center; font-size:20px; font-weight:bold;">🤖</div>
          <div>
            <h4 style="margin:0; font-size:15px; font-family:var(--font-pjs); font-weight:700;">AMPEdge Help Agent</h4>
            <span style="font-size:11.5px; opacity:0.85; display:flex; align-items:center; gap:4px;"><span style="width:6px; height:6px; background:#4ade80; border-radius:50%; display:inline-block;"></span> Online | Multilingual Support</span>
          </div>
        </div>
        <button style="background:none; border:none; color:#fff; font-size:22px; cursor:pointer; font-weight:700;" onclick="closeHelpChatDrawer()">✕</button>
      </div>
      
      <!-- Drawer Messages Body -->
      <div id="helpChatDrawerBody" style="flex:1; padding:20px; overflow-y:auto; display:flex; flex-direction:column; gap:12px; background:var(--bg2);">
        <!-- Welcome Message -->
      </div>
      
      <!-- Quick Options Panel -->
      <div style="padding:10px 14px; background:var(--bg); border-top:1px solid var(--border); display:flex; gap:6px; flex-wrap:wrap;">
        <button class="btn btn-outline btn-xs" onclick="sendQuickHelpMsg('How to book service?')">How to book?</button>
        <button class="btn btn-outline btn-xs" onclick="sendQuickHelpMsg('Warranty policy?')">Warranty?</button>
        <button class="btn btn-outline btn-xs" onclick="sendQuickHelpMsg('Raise support ticket')">Raise Ticket 📨</button>
      </div>

      <!-- Drawer Input Area -->
      <div style="padding:14px 16px; background:var(--bg); border-top:1px solid var(--border); display:flex; gap:10px; align-items:center;">
        <input type="text" id="helpChatDrawerInput" placeholder="Type message in Hindi, English, বাংলা..." onkeypress="if(event.key==='Enter') sendHelpChatMsg()" style="flex:1; padding:12px 16px; border:1px solid var(--border); border-radius:24px; outline:none; font-size:13.5px; background:var(--bg2); color:var(--text-dark);" autocomplete="off"/>
        <button onclick="sendHelpChatMsg()" style="background: var(--blue); color: #fff; border: none; width: 40px; height: 40px; border-radius: 50%; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 16px; box-shadow: 0 4px 10px rgba(65,105,225,0.25); transition: transform 0.2s" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">➔</button>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', drawerHTML);
});

window.openHelpChatDrawer = function() {
  const drawer = document.getElementById('helpChatDrawer');
  if (drawer) {
    drawer.style.right = '0';
    // Load initial welcome message
    const body = document.getElementById('helpChatDrawerBody');
    if (body && body.children.length === 0) {
      body.innerHTML = `
        <div class="chat-msg bot-msg" style="${botMsgStyle}">
          <strong>English:</strong> Hello! I am your Help Center AI Agent. I can guide you about our services, booking process, warranties, or how to contact our team. How can I help you?
        </div>
        <div class="chat-msg bot-msg" style="${botMsgStyle}">
          <strong>हिंदी:</strong> नमस्ते! मैं आपका सहायता एजेंट हूँ। मैं आपको हमारी सेवाओं, बुकिंग, वारंटी या सपोर्ट टीम से संपर्क करने के बारे में जानकारी दे सकता हूँ।
        </div>
        <div class="chat-msg bot-msg" style="${botMsgStyle}">
          <strong>বাংলা:</strong> নমস্কার! আমি আপনার সাহায্যকারী এজেন্ট। আমি আমাদের সার্ভিস, বুকিং প্রসেস, ওয়ারেন্টি অথবা কন্ট্যাক্ট করার বিষয় নিয়ে আপনাকে সাহায্য করতে পারি।
        </div>
      `;
    }
  }
};

window.closeHelpChatDrawer = function() {
  const drawer = document.getElementById('helpChatDrawer');
  if (drawer) drawer.style.right = '-380px';
};

window.sendHelpChatMsg = function() {
  const inp = document.getElementById('helpChatDrawerInput');
  if (!inp) return;
  const txt = inp.value.trim();
  if (!txt) return;
  
  const body = document.getElementById('helpChatDrawerBody');
  if (!body) return;
  
  // 1. Append user message
  body.innerHTML += `<div class="chat-msg user-msg" style="${userMsgStyle}">${txt}</div>`;
  inp.value = '';
  body.scrollTop = body.scrollHeight;
  
  // 2. Append typing indicator
  body.innerHTML += typingHTML;
  body.scrollTop = body.scrollHeight;
  
  setTimeout(() => {
    // Remove typing indicator
    const ti = body.querySelector('.typing-indicator');
    if (ti) ti.remove();
    
    let reply = "";
    
    // Check if user is submitting a ticket via hashtag
    if (txt.toLowerCase().startsWith('#ticket') || txt.toLowerCase().includes('raise ticket')) {
      if (txt.toLowerCase().startsWith('#ticket')) {
        const ticketContent = txt.substring(7).trim();
        if (ticketContent) {
          const tickets = JSON.parse(localStorage.getItem('ampedge_help_tickets') || '[]');
          const newId = 'TKT-' + (1000 + tickets.length);
          const now = new Date();
          tickets.push({
            id: newId,
            name: 'Chatbot User',
            phone: 'From Help AI Chat',
            message: ticketContent,
            status: 'Pending',
            date: now.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
            source: 'Help AI Agent'
          });
          localStorage.setItem('ampedge_help_tickets', JSON.stringify(tickets));
          reply = `📨 **Ticket Raised Successfully!**<br><br>Your query has been forwarded to the Admin Portal. our team will review it shortly.<br>• **Ticket ID:** ${newId}<br>• **Content:** "${ticketContent}"`;
        } else {
          reply = "⚠️ Please specify your query after the #ticket tag.<br>Example: `#ticket Please check my solar panel wiring.`";
        }
      } else {
        reply = "📨 **Raise a Support Ticket:**<br>Please type your message starting with **#ticket** followed by your query.<br>Example:<br>`#ticket Please repair my switchboard.`";
      }
    } else {
      reply = getHelpAgentResponse(txt);
    }
    
    body.innerHTML += `<div class="chat-msg bot-msg" style="${botMsgStyle}">${reply}</div>`;
    body.scrollTop = body.scrollHeight;
  }, 1000);
};

window.sendQuickHelpMsg = function(msgText) {
  const inp = document.getElementById('helpChatDrawerInput');
  if (inp) {
    inp.value = msgText;
    window.sendHelpChatMsg();
  }
};

function getHelpAgentResponse(userText) {
  const text = userText.toLowerCase();
  
  // Detect Language
  let lang = 'en'; // default English
  if (
    text.includes('नमस्ते') || text.includes('हैलो') || text.includes('बुक') || text.includes('रिफंड') || 
    text.includes('वारंटी') || text.includes('फ़ोन') || text.includes('नंबर') || text.includes('काम') ||
    text.includes('शिकायत') || text.includes('कॉल') || text.includes('मदद') || text.includes('संपर्क')
  ) {
    lang = 'hi';
  } else if (
    text.includes('নমস্কার') || text.includes('হ্যালো') || text.includes('বুক') || text.includes('রিফান্ড') || 
    text.includes('ওয়ারেন্টি') || text.includes('নাম্বার') || text.includes('যোগাযোগ') || text.includes('সাহায্য') ||
    text.includes('কল') || text.includes('কেমন') || text.includes('করবো')
  ) {
    lang = 'bn';
  }
  
  // Check keywords
  const isBooking = text.includes('book') || text.includes('service') || text.includes('बुक') || text.includes('সার্ভিস') || text.includes('বুক');
  const isRefund = text.includes('refund') || text.includes('return') || text.includes('cancel') || text.includes('रिफंड') || text.includes('वापसी') || text.includes('ফেরত') || text.includes('রিফান্ড');
  const isContact = text.includes('contact') || text.includes('phone') || text.includes('call') || text.includes('whatsapp') || text.includes('नंबर') || text.includes('संपर्क') || text.includes('কন্ট্যাক্ট') || text.includes('হোয়াটস্যাপ') || text.includes('ফোন');
  const isWarranty = text.includes('warranty') || text.includes('guarantee') || text.includes('वारंटी') || text.includes('ওয়ারেন্টি');
  const isTicket = text.includes('ticket') || text.includes('raise') || text.includes('sms') || text.includes('forwd') || text.includes('सपोर्ट') || text.includes('टिकट') || text.includes('মেসেজ');
  
  if (lang === 'hi') {
    if (isBooking) {
      return "⚡ **बुकिंग गाइड:**<br>आप हमारी वेबसाइट पर 'Book a Service' पर जाकर बुकिंग कर सकते हैं। शहर और पिनकोड चुनें, फिर अपनी आवश्यकतानुसार इलेक्ट्रिशियन सिलेक्ट करें। काम पूरा होने के बाद ही पेमेंट करें।";
    }
    if (isRefund) {
      return "💳 **रिफंड और कैंसिलेशन:**<br>मार्केटप्लेस प्रॉडक्ट्स पर 7 दिनों की वापसी नीति है। आप अपॉइंटमेंट से 2 घंटे पहले बुकिंग मुफ्त में कैंसिल कर सकते हैं।";
    }
    if (isContact) {
      return "📞 **संपर्क जानकारी:**<br>• व्हाट्सऐप: <a href='https://wa.me/919874600265' target='_blank'>+91 98746 00265</a><br>• कॉल: +91 91236 67258 / +91 97483 98418<br>• ईमेल: ampedge.info@gmail.com";
    }
    if (isWarranty) {
      return "🛡️ **वारंटी पॉलिसी:**<br>हमारी सभी रिपेयर और इंस्टालेशन सेवाओं पर ऑटोमैटिकली 90 दिनों की पोस्ट-सर्विस वारंटी मिलती है।";
    }
    if (isTicket) {
      return "📨 **टिकट सबमिट:**<br>अगर आपकी समस्या हल नहीं हुई है, तो आप फुटर में 'Help Centre' फ़ॉर्म भरकर या यहाँ अपनी डिटेल्स देकर एडमिन के पास सीधे टिकट सबमिट कर सकते हैं।";
    }
    return "💡 मैं एम्पएज सहायता एजेंट हूँ। मुझे बुकिंग, वारंटी, रिफंड या कांटेक्ट नंबर के बारे में पूछें। आप 'Raise Ticket' लिखकर एडमिन को भी संदेश भेज सकते हैं।";
  } else if (lang === 'bn') {
    if (isBooking) {
      return "⚡ **বুকিং গাইড:**<br>আমাদের 'Book a Service' পেজে গিয়ে আপনি সহজে বুক করতে পারেন। শহর এবং পিনকোড দিয়ে আপনার পছন্দের টেকনিশিয়ান নির্বাচন করুন। সম্পূর্ণ সন্তুষ্ট হওয়ার পর বিল পরিশোধ করুন।";
    }
    if (isRefund) {
      return "💳 **রিফান্ড ও ক্যান্সেলেশন:**<br>অব্যবহৃত প্রোডাক্ট ৭ দিনের মধ্যে রিটার্ন করতে পারেন। বুকিং ক্যানসেল করার জন্য কোনো চার্জ লাগবে না যদি আপনি টেকনিশিয়ান বের হওয়ার ২ ঘণ্টা আগে ক্যানসেল করেন।";
    }
    if (isContact) {
      return "📞 **যোগাযোগের তথ্য:**<br>• হোয়াটস্যাপ: <a href='https://wa.me/919874600265' target='_blank'>+91 98746 00265</a><br>• হেল্পলাইন: +91 91236 67258 / +91 97483 98418<br>• ইমেইল: ampedge.info@gmail.com";
    }
    if (isWarranty) {
      return "🛡️ **ওয়ারেন্টি পলিসি:**<br>প্রতিটি ইলেকট্রিক্যাল সার্ভিসের সাথে ৯০ দিনের অফিশিয়াল ওয়ারেন্টি দেওয়া হয়। কোনো সমস্যা হলে সম্পূর্ণ ফ্রিতে পুনরায় মেরামত করে দেওয়া হবে।";
    }
    if (isTicket) {
      return "📨 **টিকিট সাবমিট:**<br>আপনার সমস্যা এডমিন টিমের কাছে পাঠাতে হেল্প সেন্টার ফর্মটি ফিলাপ করুন অথবা সরাসরি এখানে আপনার ডিটেইলস পাঠিয়ে দিন।";
    }
    return "💡 আমি এ্যাম্পএজ হেল্প এজেন্ট। আমি বুকিং, ওয়ারেন্টি, রিফান্ড পলিসি ও যোগাযোগ নাম্বার সম্পর্কে সাহায্য করতে পারি। আপনি অ্যাডমিনকে মেসেজ পাঠাতে চাইলে 'Raise Ticket' লিখতে পারেন।";
  } else {
    // English (fallback)
    if (isBooking) {
      return "⚡ **Booking Process:**<br>Go to the 'Book a Service' tab, select your city/pincode, choose your service type and preferred partner, select a slot, and confirm. Pay only after complete satisfaction!";
    }
    if (isRefund) {
      return "💳 **Refunds & Cancellation:**<br>We offer a 7-day return policy on unused products. Service cancellations are free up to 2 hours before the scheduled time slot.";
    }
    if (isContact) {
      return "📞 **Contact Support:**<br>• WhatsApp: <a href='https://wa.me/919874600265' target='_blank'>+91 98746 00265</a><br>• Helpline: +91 91236 67258 / +91 97483 98418<br>• Email: ampedge.info@gmail.com";
    }
    if (isWarranty) {
      return "🛡️ **90-Day Warranty:**<br>All electrical repairs and installation services carry an automated 90-day warranty. Any recurrence will be fixed free.";
    }
    if (isTicket) {
      return "📨 **Raise Support Ticket:**<br>You can submit a custom query directly to our Admin team. Simply type 'Raise Ticket' or fill out the form in the Help Centre modal.";
    }
    return "💡 I am your AMPEdge Help Agent. You can ask me about our services, booking process, warranty, refund policy, or contact numbers. To submit a message to our Admin, type 'Raise Ticket'.";
  }
}

// ── Global Set Chat Language Option Click Handler ──────────
window.setChatLanguage = function(langCode, btn) {
  window.activeChatLanguage = langCode;
  
  if (btn) {
    const parent = btn.parentNode;
    if (parent) {
      parent.querySelectorAll('button').forEach(b => {
        b.style.pointerEvents = 'none';
        b.style.opacity = '0.5';
      });
      btn.style.opacity = '1';
      btn.style.background = 'var(--blue)';
      btn.style.color = '#fff';
      btn.style.borderColor = 'var(--blue)';
    }
  }

  const welcomeNotes = {
    en: "Great! I will assist you in English now. Ask me about our services, products, booking, refunds, or support options!",
    hi: "बहुत बढ़िया! अब मैं हिंदी में आपकी सहायता करूँगा। हमारी सेवाओं, उत्पादों, बुकिंग, रिफंड या सपोर्ट के बारे में कुछ भी पूछें!",
    hinglish: "Sahi hai! Ab main aapse Hinglish mein baat karunga. Humare products, services, booking ya refund ke baare mein kuch bhi puchein!",
    bn: "অসাধারণ! এখন আমি আপনাকে বাংলায় সাহায্য করবো। আমাদের সার্ভিস, প্রোডাক্ট, বুকিং, রিফান্ড পলিসি বা যোগাযোগ নাম্বার সম্পর্কে জিজ্ঞাসা করতে পারেন!",
    benglish: "Sahi bapar! Ami akhon aponake Benglish-e sahajjo korbo. Amader products, services ba support niye jigges korte paren!",
    ta: "மிக நன்று! நான் இப்போது உங்களுக்கு தமிழில் உதவப் போகிறேன். எங்கள் சேவைகள், தயாரிப்புகள், புக்கிங் அல்லது ரீஃபண்ட் பற்றி கேட்கலாம்!",
    te: "చాలా మంచిది! ఇప్పుడు నేను మీకు తెలుగులో సహాయం చేస్తాను. మా సేవలు, ఉత్పత్తులు, బుకింగ్స్ లేదా రిఫండ్ గురించి అడగండి!",
    kn: "ಉತ್ತಮ! ನಾನು ಈಗ ನಿಮಗೆ ಕನ್ನಡದಲ್ಲಿ ಸಹಾಯ ಮಾಡುತ್ತೇನೆ. ನಮ್ಮ ಸೇವೆಗಳು, ಉತ್ಪನ್ನಗಳು, ಬುಕಿಂಗ್ ಅಥವಾ ಮರುಪಾವತಿ ಬಗ್ಗೆ ಕೇಳಿ!",
    ml: "കൊള്ളാം! ഞാൻ ഇപ്പോൾ മലയാളത്തിൽ സഹായിക്കാം. സേവനങ്ങൾ, ഉൽപ്പന്നങ്ങൾ, ബുക്കിംഗ് അല്ലെങ്കിൽ റീഫണ്ട് വിവരങ്ങൾ എന്നിവ ചോദിക്കാം!",
    gu: "ખૂબ સરસ! હવે હું તમને ગુજરાતીમાં મદદ કરીશ. અમારી સેવાઓ, ઉત્પાદનો, બુકિંગ અથવા રિફંડ વિશે પૂછો!",
    pa: "ਬਹੁਤ ਵਧੀਆ! ਹੁਣ ਮੈਂ ਪੰਜਾਬੀ ਵਿੱਚ ਤੁਹਾਡੀ ਮਦਦ ਕਰਾਂਗਾ। ਸਾਡੀਆਂ ਸੇਵਾਵਾਂ, ਉਤਪਾਦਾਂ, ਬੁਕਿੰਗ ਜਾਂ ਰਿਫੰਡ ਬਾਰੇ ਪੁੱਛੋ!"
  };

  const responseText = welcomeNotes[langCode] || welcomeNotes['en'];
  
  const embeddedBody = document.getElementById('embeddedChatBody');
  const popupBody = document.getElementById('chatBody');
  const drawerBody = document.getElementById('helpChatDrawerBody');
  
  const formattedMsg = `<div class="chat-msg bot-msg" style="${botMsgStyle}">🤖 ${responseText}</div>`;
  
  if (embeddedBody) {
    embeddedBody.innerHTML += formattedMsg;
    embeddedBody.scrollTop = embeddedBody.scrollHeight;
  }
  if (popupBody) {
    popupBody.innerHTML += formattedMsg;
    popupBody.scrollTop = popupBody.scrollHeight;
  }
  if (drawerBody) {
    drawerBody.innerHTML += formattedMsg;
    drawerBody.scrollTop = drawerBody.scrollHeight;
  }
};

// ── GLOBAL AUTHENTICATION & USER PROFILE ENGINE ─────────

// Current active auth state
let currentAuthRole = 'customer'; // 'customer' or 'partner'
let currentAuthTab = 'signin';    // 'signin' or 'signup'
let currentAuthMethod = 'google'; // 'google', 'phone', 'email'
let isOtpSent = false;

// Helper to get authenticated user
window.getAmpEdgeAuthUser = function() {
  try {
    const raw = localStorage.getItem('ampedge_auth_user');
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
};

// Ensure Auth Modals HTML is injected in DOM
window.ensureAuthModalInDOM = function() {
  if (document.getElementById('authModal')) return;
  
  const authModalHTML = `
    <!-- AUTH MODAL (Customer & Electrician Partner) -->
    <div id="authModal" class="modal-overlay" style="z-index: 100008; display:none; align-items:center; justify-content:center; opacity:0; pointer-events:none; transition: all 0.3s ease; position:fixed; top:0; left:0; width:100%; height:100%; background: rgba(10, 15, 44, 0.75); backdrop-filter: blur(10px); padding: 16px; box-sizing:border-box;">
      <div class="modal-content" style="max-width: 460px; width: 100%; border-radius: 24px; overflow: hidden; box-shadow: 0 30px 80px rgba(0,0,0,0.45); background: #ffffff; position: relative; border:1px solid rgba(255,255,255,0.2);">
        
        <button type="button" class="btn-icon" style="position:absolute; top:14px; right:14px; background:#f1f5f9; border:none; width:32px; height:32px; border-radius:50%; font-size:15px; font-weight:700; cursor:pointer; color:#64748b; z-index:10; display:flex; align-items:center; justify-content:center;" onclick="closeAuthModal()">✕</button>
        
        <!-- Role Selector Switcher -->
        <div style="background: #f8fafc; padding: 14px 18px; border-bottom: 1px solid #e2e8f0; display: flex; gap: 8px;">
          <button id="authRoleCustomer" type="button" onclick="setAuthRole('customer')" style="flex:1; padding:9px; border-radius:12px; border:1.5px solid #4169E1; background:#4169E1; color:#fff; font-weight:800; font-size:13px; cursor:pointer; display:flex; align-items:center; justify-content:center; gap:6px; transition:0.2s;">
            <span>👤</span> Customer (ग्राहक)
          </button>
          <button id="authRolePartner" type="button" onclick="setAuthRole('partner')" style="flex:1; padding:9px; border-radius:12px; border:1.5px solid #cbd5e1; background:#ffffff; color:#64748b; font-weight:800; font-size:13px; cursor:pointer; display:flex; align-items:center; justify-content:center; gap:6px; transition:0.2s;">
            <span>⚡</span> Electrician Partner
          </button>
        </div>

        <div style="padding: 22px 24px;">
          <!-- Tabs (Sign In vs Sign Up) -->
          <div style="display:flex; border-bottom: 1px solid #e2e8f0; margin-bottom: 18px;">
            <button id="authTabSignIn" type="button" onclick="setAuthTab('signin')" style="flex:1; padding:8px; background:none; border:none; border-bottom:2.5px solid var(--blue); color:var(--text-dark); font-weight:800; font-size:14.5px; cursor:pointer;">
              Sign In
            </button>
            <button id="authTabSignUp" type="button" onclick="setAuthTab('signup')" style="flex:1; padding:8px; background:none; border:none; border-bottom:2.5px solid transparent; color:var(--muted); font-weight:600; font-size:14.5px; cursor:pointer;">
              Create Account
            </button>
          </div>

          <div style="text-align:center; margin-bottom:18px;">
            <h3 id="authModalHeading" style="font-family:var(--font-pjs); font-size:20px; font-weight:900; color:var(--text-dark); margin:0 0 4px;">Welcome Back!</h3>
            <p id="authModalSubheading" style="color:var(--muted); font-size:12.5px; margin:0; line-height:1.5;">Access your bookings, AMC shield status, and orders.</p>
          </div>

          <!-- 1. Google Auth Primary Button -->
          <button id="btnGoogleSubmit" onclick="handleGoogleAuth()" type="button" class="btn" style="width:100%; background:#ffffff; border:1.5px solid #cbd5e1; color:#0f172a; padding:11px 16px; border-radius:12px; font-weight:800; font-size:13.5px; display:flex; align-items:center; justify-content:center; gap:10px; box-shadow:0 2px 6px rgba(0,0,0,0.04); cursor:pointer; transition:all 0.2s;" onmouseover="this.style.borderColor='#4169E1'; this.style.boxShadow='0 4px 12px rgba(65,105,225,0.15)'" onmouseout="this.style.borderColor='#cbd5e1'; this.style.boxShadow='0 2px 6px rgba(0,0,0,0.04)'">
            <svg width="18" height="18" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/></svg>
            Continue with Google
          </button>

          <!-- Divider -->
          <div style="display:flex; align-items:center; gap:10px; margin:16px 0;">
            <div style="flex:1; height:1px; background:#e2e8f0;"></div>
            <span style="font-size:11px; color:#94a3b8; font-weight:700; text-transform:uppercase;">or continue with</span>
            <div style="flex:1; height:1px; background:#e2e8f0;"></div>
          </div>

          <!-- Method Pills (Phone vs Email) -->
          <div style="display:flex; gap:8px; margin-bottom:14px;">
            <button id="authMethodPhone" type="button" onclick="setAuthMethod('phone')" style="flex:1; padding:7px; border-radius:10px; border:1px solid #cbd5e1; background:#ffffff; font-size:12px; font-weight:700; color:#64748b; cursor:pointer;">
              📱 Mobile OTP
            </button>
            <button id="authMethodEmail" type="button" onclick="setAuthMethod('email')" style="flex:1; padding:7px; border-radius:10px; border:1px solid #cbd5e1; background:#ffffff; font-size:12px; font-weight:700; color:#64748b; cursor:pointer;">
              ✉️ Email ID
            </button>
          </div>

          <!-- 2. Phone OTP Form -->
          <div id="authFormPhone" style="display:none;">
            <div style="margin-bottom:12px;">
              <label style="font-size:11.5px; font-weight:700; color:#0f172a; display:block; margin-bottom:4px;">Mobile Number</label>
              <div style="display:flex; border:1px solid #cbd5e1; border-radius:10px; overflow:hidden;">
                <span style="background:#f1f5f9; padding:10px 12px; font-weight:800; font-size:13px; color:#475569; border-right:1px solid #cbd5e1;">🇮🇳 +91</span>
                <input id="authPhoneInput" type="tel" placeholder="Enter 10-digit number" maxlength="10" style="flex:1; padding:10px 12px; border:none; outline:none; font-size:13.5px; font-weight:600;"/>
              </div>
            </div>
            
            <div id="authOtpRow" style="display:none; margin-bottom:12px;">
              <label style="font-size:11.5px; font-weight:700; color:#0f172a; display:block; margin-bottom:4px;">Enter 6-Digit OTP Code</label>
              <input id="authOtpInput" type="text" placeholder="e.g. 449800" maxlength="6" style="width:100%; padding:10px 12px; border:1px solid #cbd5e1; border-radius:10px; outline:none; font-size:15px; font-weight:800; letter-spacing:4px; text-align:center; box-sizing:border-box;"/>
            </div>

            <button id="btnPhoneSubmit" onclick="handlePhoneOtpAuth()" type="button" class="btn btn-primary" style="width:100%; justify-content:center; padding:11px; font-weight:800; border-radius:10px;">
              Get OTP Verification Code →
            </button>
          </div>

          <!-- 3. Email Form -->
          <form id="authFormEmail" onsubmit="handleEmailAuth(event)" style="display:none;">
            <div style="margin-bottom:10px;">
              <label style="font-size:11.5px; font-weight:700; color:#0f172a; display:block; margin-bottom:4px;">Email Address</label>
              <input id="authEmailInput" type="email" placeholder="name@example.com" style="width:100%; padding:10px 12px; border:1px solid #cbd5e1; border-radius:10px; outline:none; font-size:13px; box-sizing:border-box;"/>
            </div>
            
            <div style="margin-bottom:12px;">
              <label style="font-size:11.5px; font-weight:700; color:#0f172a; display:block; margin-bottom:4px;">Password</label>
              <input id="authPasswordInput" type="password" placeholder="••••••••" style="width:100%; padding:10px 12px; border:1px solid #cbd5e1; border-radius:10px; outline:none; font-size:13px; box-sizing:border-box;"/>
            </div>

            <button type="submit" class="btn btn-primary" style="width:100%; justify-content:center; padding:11px; font-weight:800; border-radius:10px;">
              Sign In with Email →
            </button>
          </form>

        </div>
        
        <div style="background:#f8fafc; padding:12px 18px; border-top:1px solid #e2e8f0; text-align:center; font-size:11px; color:#64748b;">
          By continuing, you agree to AMPEdge's <a href="terms.html" style="color:var(--blue); font-weight:700;">Terms</a> & <a href="privacy-policy.html" style="color:var(--blue); font-weight:700;">Privacy Policy</a>.
        </div>

      </div>
    </div>

    <!-- USER DASHBOARD MODAL -->
    <div id="userDashboardModal" class="modal-overlay" style="z-index: 100009; display:none; align-items:center; justify-content:center; opacity:0; pointer-events:none; transition: all 0.3s ease; position:fixed; top:0; left:0; width:100%; height:100%; background: rgba(10, 15, 44, 0.75); backdrop-filter: blur(10px); padding: 16px; box-sizing:border-box;">
      <div class="modal-content" style="max-width: 520px; width: 100%; border-radius: 24px; overflow: hidden; box-shadow: 0 30px 80px rgba(0,0,0,0.45); background: #ffffff; position: relative;">
        <div style="padding:18px 22px; border-bottom:1px solid #e2e8f0; display:flex; justify-content:space-between; align-items:center;">
          <h3 style="font-family:var(--font-pjs); font-size:18px; font-weight:800; color:#0f172a; margin:0;">Account Dashboard</h3>
          <button type="button" class="btn-icon" style="background:#f1f5f9; border:none; width:32px; height:32px; border-radius:50%; font-size:15px; font-weight:700; cursor:pointer; color:#64748b; display:flex; align-items:center; justify-content:center;" onclick="closeUserDashboardModal()">✕</button>
        </div>
        <div id="userDashboardBody" style="padding:22px;">
          <!-- Dynamic Content -->
        </div>
      </div>
    </div>
  `;
  
  document.body.insertAdjacentHTML('beforeend', authModalHTML);
};

// Open Auth Modal
window.openAuthModal = function(role = 'customer', tab = 'signin') {
  window.ensureAuthModalInDOM();
  currentAuthRole = role;
  currentAuthTab = tab;
  
  const modal = document.getElementById('authModal');
  if (!modal) return;
  
  updateAuthModalUI();
  modal.style.display = 'flex';
  setTimeout(() => {
    modal.style.opacity = '1';
    modal.style.pointerEvents = 'auto';
  }, 10);
};

window.closeAuthModal = function() {
  const modal = document.getElementById('authModal');
  if (modal) {
    modal.style.opacity = '0';
    modal.style.pointerEvents = 'none';
    setTimeout(() => {
      modal.style.display = 'none';
    }, 250);
  }
};

// Switch Role
window.setAuthRole = function(role) {
  currentAuthRole = role;
  updateAuthModalUI();
};

// Switch Tab
window.setAuthTab = function(tab) {
  currentAuthTab = tab;
  updateAuthModalUI();
};

// Switch Method
window.setAuthMethod = function(method) {
  currentAuthMethod = method;
  updateAuthModalUI();
};

function updateAuthModalUI() {
  const roleCustBtn = document.getElementById('authRoleCustomer');
  const rolePartBtn = document.getElementById('authRolePartner');
  const tabSignIn = document.getElementById('authTabSignIn');
  const tabSignUp = document.getElementById('authTabSignUp');
  const titleEl = document.getElementById('authModalHeading');
  const subEl = document.getElementById('authModalSubheading');
  
  const methodPhone = document.getElementById('authMethodPhone');
  const methodEmail = document.getElementById('authMethodEmail');
  
  const formGoogle = document.getElementById('authFormGoogle');
  const formPhone = document.getElementById('authFormPhone');
  const formEmail = document.getElementById('authFormEmail');
  
  // Role Buttons
  if (roleCustBtn && rolePartBtn) {
    if (currentAuthRole === 'customer') {
      roleCustBtn.style.background = '#4169E1';
      roleCustBtn.style.color = '#ffffff';
      roleCustBtn.style.borderColor = '#4169E1';
      
      rolePartBtn.style.background = '#ffffff';
      rolePartBtn.style.color = '#64748b';
      rolePartBtn.style.borderColor = '#cbd5e1';
    } else {
      rolePartBtn.style.background = '#059669';
      rolePartBtn.style.color = '#ffffff';
      rolePartBtn.style.borderColor = '#059669';
      
      roleCustBtn.style.background = '#ffffff';
      roleCustBtn.style.color = '#64748b';
      roleCustBtn.style.borderColor = '#cbd5e1';
    }
  }
  
  // Tabs
  if (tabSignIn && tabSignUp) {
    if (currentAuthTab === 'signin') {
      tabSignIn.style.borderBottom = '2.5px solid var(--blue)';
      tabSignIn.style.color = 'var(--text-dark)';
      tabSignIn.style.fontWeight = '800';
      
      tabSignUp.style.borderBottom = '2.5px solid transparent';
      tabSignUp.style.color = 'var(--muted)';
      tabSignUp.style.fontWeight = '600';
    } else {
      tabSignUp.style.borderBottom = '2.5px solid var(--blue)';
      tabSignUp.style.color = 'var(--text-dark)';
      tabSignUp.style.fontWeight = '800';
      
      tabSignIn.style.borderBottom = '2.5px solid transparent';
      tabSignIn.style.color = 'var(--muted)';
      tabSignIn.style.fontWeight = '600';
    }
  }
  
  // Heading Texts
  if (titleEl) {
    if (currentAuthRole === 'customer') {
      titleEl.innerHTML = currentAuthTab === 'signin' ? 'Welcome Back, Customer!' : 'Create Customer Account';
    } else {
      titleEl.innerHTML = currentAuthTab === 'signin' ? '⚡ Partner Electrician Login' : '⚡ Join as Certified Electrician';
    }
  }
  if (subEl) {
    if (currentAuthRole === 'customer') {
      subEl.textContent = 'Access your bookings, active AMC shield, and track electrician dispatch.';
    } else {
      subEl.textContent = 'Accept high-paying nearby jobs, view earnings, and manage service requests.';
    }
  }
  
  // Auth Method Pills
  if (methodPhone && methodEmail) {
    if (currentAuthMethod === 'phone') {
      methodPhone.style.background = '#0f172a';
      methodPhone.style.color = '#ffffff';
      methodPhone.style.borderColor = '#0f172a';
      
      methodEmail.style.background = '#ffffff';
      methodEmail.style.color = '#64748b';
      methodEmail.style.borderColor = '#cbd5e1';
    } else if (currentAuthMethod === 'email') {
      methodEmail.style.background = '#0f172a';
      methodEmail.style.color = '#ffffff';
      methodEmail.style.borderColor = '#0f172a';
      
      methodPhone.style.background = '#ffffff';
      methodPhone.style.color = '#64748b';
      methodPhone.style.borderColor = '#cbd5e1';
    } else {
      methodPhone.style.background = '#ffffff';
      methodPhone.style.color = '#64748b';
      methodPhone.style.borderColor = '#cbd5e1';
      methodEmail.style.background = '#ffffff';
      methodEmail.style.color = '#64748b';
      methodEmail.style.borderColor = '#cbd5e1';
    }
  }
  
  // Forms
  if (formPhone) formPhone.style.display = currentAuthMethod === 'phone' ? 'block' : 'none';
  if (formEmail) formEmail.style.display = currentAuthMethod === 'email' ? 'block' : 'none';
}

// 1. Google Auth
window.handleGoogleAuth = function() {
  const btn = document.getElementById('btnGoogleSubmit');
  if (btn) {
    btn.innerHTML = '🔄 Authenticating with Google Accounts...';
    btn.style.pointerEvents = 'none';
  }
  
  setTimeout(() => {
    let mockUser;
    if (currentAuthRole === 'customer') {
      mockUser = {
        name: 'Rahul Sharma',
        email: 'rahul.sharma@gmail.com',
        phone: '+91 98765 43210',
        role: 'Customer',
        authProvider: 'Google',
        avatar: 'R',
        joined: 'August 2026',
        amcActive: true,
        amcPlan: 'AMPEdge 360° Total Home & AC Annual AMC'
      };
    } else {
      mockUser = {
        name: 'Suresh Kumar',
        email: 'suresh.electrician@gmail.com',
        phone: '+91 91234 56789',
        role: 'Electrician Partner',
        authProvider: 'Google',
        avatar: 'S',
        rating: '4.9 ★',
        completedJobs: 418,
        earningsThisMonth: '₹34,800',
        activeLeads: 3
      };
    }
    
    localStorage.setItem('ampedge_auth_user', JSON.stringify(mockUser));
    renderAuthNavbar();
    closeAuthModal();
    
    alert(`🎉 Successfully Signed in with Google! Welcome back, ${mockUser.name} (${mockUser.role})`);
    
    if (btn) {
      btn.innerHTML = 'Continue with Google';
      btn.style.pointerEvents = 'auto';
    }
  }, 900);
};

// 2. Phone OTP Auth
window.handlePhoneOtpAuth = function() {
  const phoneInput = document.getElementById('authPhoneInput');
  const otpInput = document.getElementById('authOtpInput');
  const otpRow = document.getElementById('authOtpRow');
  const btn = document.getElementById('btnPhoneSubmit');
  
  if (!phoneInput || !phoneInput.value || phoneInput.value.length < 10) {
    alert('Please enter a valid 10-digit mobile phone number.');
    return;
  }
  
  if (!isOtpSent) {
    btn.innerHTML = '⏳ Sending 6-digit OTP to +91 ' + phoneInput.value + '...';
    setTimeout(() => {
      isOtpSent = true;
      if (otpRow) otpRow.style.display = 'block';
      btn.innerHTML = 'Verify OTP & Log In →';
      alert('📲 OTP Sent! Demo Verification Code is: 449800');
      if (otpInput) otpInput.value = '449800';
    }, 700);
  } else {
    if (!otpInput || otpInput.value !== '449800') {
      alert('Invalid OTP. Please enter 449800');
      return;
    }
    
    const user = {
      name: currentAuthRole === 'customer' ? 'Customer (' + phoneInput.value.slice(-4) + ')' : 'Partner (' + phoneInput.value.slice(-4) + ')',
      phone: '+91 ' + phoneInput.value,
      email: 'user' + phoneInput.value.slice(-4) + '@ampedge.co.in',
      role: currentAuthRole === 'customer' ? 'Customer' : 'Electrician Partner',
      authProvider: 'Phone OTP',
      avatar: currentAuthRole === 'customer' ? 'C' : 'P',
      joined: 'August 2026',
      amcActive: false
    };
    
    localStorage.setItem('ampedge_auth_user', JSON.stringify(user));
    renderAuthNavbar();
    closeAuthModal();
    isOtpSent = false;
    if (otpRow) otpRow.style.display = 'none';
    btn.innerHTML = 'Get OTP Verification Code →';
    alert(`🎉 Verified via Phone OTP! Logged in as ${user.name}`);
  }
};

// 3. Email Auth
window.handleEmailAuth = function(e) {
  if (e && e.preventDefault) e.preventDefault();
  
  const email = document.getElementById('authEmailInput').value;
  const pass = document.getElementById('authPasswordInput').value;
  const name = email ? email.split('@')[0] : 'User';
  
  if (!email || !pass) {
    alert('Please enter your email and password.');
    return;
  }
  
  const user = {
    name: name.charAt(0).toUpperCase() + name.slice(1),
    email: email,
    phone: '+91 98765 00000',
    role: currentAuthRole === 'customer' ? 'Customer' : 'Electrician Partner',
    authProvider: 'Email',
    avatar: name.charAt(0).toUpperCase() || 'U',
    joined: 'August 2026',
    amcActive: true,
    amcPlan: 'AMPEdge 360° Total Home & AC Annual AMC'
  };
  
  localStorage.setItem('ampedge_auth_user', JSON.stringify(user));
  renderAuthNavbar();
  closeAuthModal();
  alert(`🎉 Logged in successfully! Welcome, ${user.name}`);
};

// Logout
window.handleUserLogout = function() {
  localStorage.removeItem('ampedge_auth_user');
  renderAuthNavbar();
  closeUserDashboardModal();
  alert('🚪 You have been safely logged out.');
};

// Toggle Menu
window.toggleUserMenu = function(e) {
  if (e) e.stopPropagation();
  const dropdown = document.getElementById('userMenuDropdown');
  if (dropdown) {
    dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
  }
};

document.addEventListener('click', () => {
  const dropdown = document.getElementById('userMenuDropdown');
  if (dropdown) dropdown.style.display = 'none';
});

// Render Dynamic Navbar State with Small Person Icon Next to Shop Now
window.renderAuthNavbar = function() {
  const user = window.getAmpEdgeAuthUser();
  const navRights = document.querySelectorAll('.nav-right');
  
  navRights.forEach(nav => {
    let authArea = nav.querySelector('.nav-auth-area');
    if (!authArea) {
      authArea = document.createElement('div');
      authArea.className = 'nav-auth-area';
      authArea.style.display = 'inline-flex';
      authArea.style.alignItems = 'center';
      authArea.style.marginLeft = '8px';
      authArea.style.flexShrink = '0';
      nav.appendChild(authArea);
    } else {
      if (nav.lastElementChild !== authArea) {
        nav.appendChild(authArea);
      }
    }
    
    if (user) {
      authArea.innerHTML = `
        <div class="user-profile-dropdown" style="position:relative; flex-shrink:0;">
          <button type="button" onclick="toggleUserMenu(event)" class="btn" title="${user.name} (${user.role})" style="width:36px; height:36px; border-radius:50%; background:linear-gradient(135deg, #4169E1, #5CE1E6); color:#fff; font-weight:900; font-size:13.5px; border:2px solid #ffffff; box-shadow:0 3px 10px rgba(65,105,225,0.35); display:flex; align-items:center; justify-content:center; cursor:pointer; position:relative; padding:0; transition:transform 0.2s;" onmouseover="this.style.transform='scale(1.08)'" onmouseout="this.style.transform='scale(1)'">
            ${user.avatar || 'U'}
            <span style="position:absolute; bottom:-1px; right:-1px; width:9px; height:9px; background:#10b981; border:2px solid #fff; border-radius:50%;"></span>
          </button>
          
          <div id="userMenuDropdown" style="display:none; position:absolute; top:115%; right:0; width:240px; background:#ffffff; border-radius:16px; box-shadow:0 15px 35px rgba(0,0,0,0.15); border:1px solid #e2e8f0; padding:8px; z-index:100010;">
            <div style="padding:10px 12px; border-bottom:1px solid #f1f5f9; margin-bottom:4px;">
              <div style="font-size:13.5px; font-weight:800; color:#0f172a;">${user.name}</div>
              <div style="font-size:11.5px; color:#64748b;">${user.email || user.phone}</div>
              <div style="display:inline-block; margin-top:4px; font-size:10px; background:${user.role === 'Customer' ? '#dbeafe' : '#d1fae5'}; color:${user.role === 'Customer' ? '#1e40af' : '#065f46'}; padding:2px 8px; border-radius:10px; font-weight:800; text-transform:uppercase;">${user.role}</div>
            </div>
            
            <a href="javascript:void(0)" onclick="openUserDashboardModal()" style="display:flex; align-items:center; gap:8px; padding:10px 12px; font-size:13px; color:#0f172a; text-decoration:none; border-radius:8px; font-weight:700; transition:background 0.2s;" onmouseover="this.style.background='#f8fafc'" onmouseout="this.style.background='transparent'">
              <span>📊</span> My Dashboard & Bookings
            </a>
            
            <a href="subscription.html" style="display:flex; align-items:center; gap:8px; padding:10px 12px; font-size:13px; color:#0f172a; text-decoration:none; border-radius:8px; font-weight:700; transition:background 0.2s;" onmouseover="this.style.background='#f8fafc'" onmouseout="this.style.background='transparent'">
              <span>👑</span> My AMC & Active Plans
            </a>
            
            <a href="marketplace.html" style="display:flex; align-items:center; gap:8px; padding:10px 12px; font-size:13px; color:#0f172a; text-decoration:none; border-radius:8px; font-weight:700; transition:background 0.2s;" onmouseover="this.style.background='#f8fafc'" onmouseout="this.style.background='transparent'">
              <span>🛒</span> My Product Orders
            </a>
            
            <hr style="margin:4px 0; border:none; border-top:1px solid #f1f5f9;"/>
            
            <a href="javascript:void(0)" onclick="handleUserLogout()" style="display:flex; align-items:center; gap:8px; padding:10px 12px; font-size:13px; color:#ef4444; text-decoration:none; border-radius:8px; font-weight:800; transition:background 0.2s;" onmouseover="this.style.background='#fee2e2'" onmouseout="this.style.background='transparent'">
              <span>🚪</span> Log Out
            </a>
          </div>
        </div>
      `;
    } else {
      authArea.innerHTML = `
        <a href="javascript:void(0)" onclick="openAuthModal('customer', 'signin')" class="btn-auth-avatar-icon" title="My Account / Sign In" style="display:inline-flex; align-items:center; justify-content:center; width:36px; height:36px; border-radius:50%; background:#ffffff; border:1.5px solid #cbd5e1; color:#0f172a; cursor:pointer; box-shadow:0 2px 6px rgba(0,0,0,0.06); transition:all 0.2s; position:relative; flex-shrink:0; text-decoration:none;" onmouseover="this.style.borderColor='#4169E1'; this.style.color='#4169E1'; this.style.transform='scale(1.08)'" onmouseout="this.style.borderColor='#cbd5e1'; this.style.color='#0f172a'; this.style.transform='scale(1)'">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
        </a>
      `;
    }
  });
};

// Open Interactive User Dashboard Modal
window.openUserDashboardModal = function() {
  const user = window.getAmpEdgeAuthUser();
  if (!user) {
    openAuthModal('customer', 'signin');
    return;
  }
  
  window.ensureAuthModalInDOM();
  const modal = document.getElementById('userDashboardModal');
  const content = document.getElementById('userDashboardBody');
  if (!modal || !content) return;
  
  if (user.role === 'Customer') {
    content.innerHTML = `
      <div style="background:linear-gradient(135deg, #0a0f2c, #1e1b4b); border-radius:18px; padding:20px; color:#fff; margin-bottom:18px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px;">
        <div>
          <div style="font-size:11px; color:#ffd700; font-weight:800; text-transform:uppercase; letter-spacing:1px; margin-bottom:4px;">👑 Active Plan Status</div>
          <div style="font-size:17px; font-weight:800; color:#fff; font-family:var(--font-pjs);">AMPEdge 360° Total Home & AC Annual AMC</div>
          <div style="font-size:12px; color:rgba(255,255,255,0.7); margin-top:2px;">Valid until: <strong>19 August 2027</strong> (365 Days Active)</div>
        </div>
        <div style="background:#10b981; color:#fff; padding:5px 12px; border-radius:20px; font-weight:900; font-size:11px;">ACTIVE SHIELD ✓</div>
      </div>
      
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-bottom:18px;">
        <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:12px; padding:12px;">
          <div style="font-size:11px; color:#64748b; font-weight:700; text-transform:uppercase;">AC Services Remaining</div>
          <div style="font-size:20px; font-weight:900; color:#0f172a; font-family:var(--font-pjs); margin-top:2px;">4 of 4 Free</div>
        </div>
        <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:12px; padding:12px;">
          <div style="font-size:11px; color:#64748b; font-weight:700; text-transform:uppercase;">Breakdown Visits</div>
          <div style="font-size:20px; font-weight:900; color:#10b981; font-family:var(--font-pjs); margin-top:2px;">Unlimited (Free)</div>
        </div>
      </div>
      
      <h4 style="font-size:14px; font-weight:800; color:#0f172a; margin:0 0 10px 0;">Recent Service Bookings & Live Status</h4>
      <div style="display:flex; flex-direction:column; gap:10px; margin-bottom:18px;">
        <div style="background:#ffffff; border:1px solid #e2e8f0; border-radius:12px; padding:12px; display:flex; justify-content:space-between; align-items:center;">
          <div>
            <div style="font-size:13.5px; font-weight:800; color:#0f172a;">❄️ AC Deep Power Jet Service</div>
            <div style="font-size:11.5px; color:#64748b;">Scheduled: Today, 2:30 PM • Engineer: Ramesh Kumar</div>
          </div>
          <div style="text-align:right;">
            <span style="background:#dbeafe; color:#1e40af; font-size:11px; font-weight:800; padding:2px 8px; border-radius:8px;">⚡ Dispatched</span>
            <div style="font-size:11.5px; font-weight:800; color:#10b981; margin-top:2px;">₹0 (AMC Free)</div>
          </div>
        </div>
      </div>
      
      <div style="display:flex; gap:10px;">
        <a href="booking.html" class="btn btn-primary" style="flex:1; justify-content:center;">⚡ Book New Service</a>
        <a href="tel:+919123667258" class="btn btn-outline" style="flex:1; justify-content:center;">📞 Call Helpline</a>
      </div>
    `;
  } else {
    content.innerHTML = `
      <div style="background:linear-gradient(135deg, #064e3b, #059669); border-radius:18px; padding:20px; color:#fff; margin-bottom:18px;">
        <div style="font-size:11px; color:#a7f3d0; font-weight:800; text-transform:uppercase;">⚡ Electrician Partner Portal</div>
        <div style="font-size:20px; font-weight:800; color:#fff; font-family:var(--font-pjs); margin-top:2px;">${user.name}</div>
        <div style="font-size:12px; color:#d1fae5; margin-top:4px;">Rating: 4.9 ★ • Completed: 418 Jobs • Verified Pro ID: AMP-P-882</div>
      </div>
      
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-bottom:18px;">
        <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:12px; padding:12px;">
          <div style="font-size:11px; color:#64748b; font-weight:700; text-transform:uppercase;">This Month's Earnings</div>
          <div style="font-size:20px; font-weight:900; color:#059669; font-family:var(--font-pjs); margin-top:2px;">₹34,800</div>
        </div>
        <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:12px; padding:12px;">
          <div style="font-size:11px; color:#64748b; font-weight:700; text-transform:uppercase;">Nearby Active Leads</div>
          <div style="font-size:20px; font-weight:900; color:#4169E1; font-family:var(--font-pjs); margin-top:2px;">3 Jobs Waiting</div>
        </div>
      </div>
      
      <a href="partner.html" class="btn btn-primary" style="width:100%; justify-content:center;">View Full Partner Dashboard →</a>
    `;
  }
  
  modal.style.display = 'flex';
  setTimeout(() => {
    modal.style.opacity = '1';
    modal.style.pointerEvents = 'auto';
  }, 10);
};

window.closeUserDashboardModal = function() {
  const modal = document.getElementById('userDashboardModal');
  if (modal) {
    modal.style.opacity = '0';
    modal.style.pointerEvents = 'none';
    setTimeout(() => {
      modal.style.display = 'none';
    }, 250);
  }
};

// Initialize
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.ensureAuthModalInDOM();
    window.renderAuthNavbar();
  });
} else {
  window.ensureAuthModalInDOM();
  window.renderAuthNavbar();
}
