/* ══════════════════════════════════════════
   ARYAN LENS — script.js
   Photographer Portfolio + Payment System
   ══════════════════════════════════════════ */

/* ── PHOTO DATA ── */
const photos = [
  { id:1,  emoji:'👰',  cat:'weddings',  title:'Golden Hour Vows',         location:'Udaipur, Rajasthan', price:4999,  desc:'A tender moment as the last rays of sun kissed the couple at the Palace grounds.' },
  { id:2,  emoji:'🌄',  cat:'nature',    title:'Valley of Mist',            location:'Coorg, Karnataka',   price:2999,  desc:'Pre-dawn fog rolling over the coffee estate hills in perfect silence.' },
  { id:3,  emoji:'👤',  cat:'portraits', title:'The Weaver\'s Eyes',        location:'Varanasi, UP',       price:3499,  desc:'A portrait capturing decades of craft and quiet dignity in a single frame.' },
  { id:4,  emoji:'🎉',  cat:'events',    title:'Opening Night',             location:'Mumbai, Maharashtra',price:2499,  desc:'Energy, light, and movement from a gallery opening in Bandra West.' },
  { id:5,  emoji:'✈️',  cat:'travel',    title:'Rooftops at Dusk',          location:'Jaipur, Rajasthan',  price:3999,  desc:'Pink City skyline from an old haveli terrace — colours no filter can match.' },
  { id:6,  emoji:'💒',  cat:'weddings',  title:'The First Dance',           location:'Goa',               price:5499,  desc:'An intimate moment suspended in motion, captured in the blue hour.' },
  { id:7,  emoji:'🦋',  cat:'nature',    title:'Macro World',               location:'Kaziranga, Assam',   price:2199,  desc:'A butterfly landing on wildflowers — nature\'s own still life.' },
  { id:8,  emoji:'👩‍🎨', cat:'portraits', title:'Studio Series III',        location:'Delhi Studio',       price:2799,  desc:'Part of an ongoing editorial series on Indian women artisans.' },
  { id:9,  emoji:'🎭',  cat:'events',    title:'Stage & Shadow',            location:'Kolkata, WB',        price:1999,  desc:'Theatre performance captured in dramatic chiaroscuro lighting.' },
  { id:10, emoji:'🏔️', cat:'travel',    title:'Himalayan Solitude',        location:'Spiti Valley, HP',   price:4499,  desc:'Snow-capped peaks at 4,500 metres — silence you can almost hear.' },
  { id:11, emoji:'💍',  cat:'weddings',  title:'Haldi Ceremony',            location:'Jaipur, Rajasthan',  price:3299,  desc:'Pure joy and turmeric gold — the most colourful morning of the year.' },
  { id:12, emoji:'🌊',  cat:'nature',    title:'Monsoon Surge',             location:'Kerala Backwaters',  price:3799,  desc:'The Arabian Sea asserting itself at the onset of the southwest monsoon.' },
];

const testimonials = [
  { text:"Aryan captured our wedding in a way that still brings tears to our eyes every time we look at the album. Every frame tells a story.",  name:'Priya & Rohan Mehta',  role:'Wedding Clients, Udaipur', init:'PM' },
  { text:"We hired Aryan for our brand campaign shoot. The portraits he delivered were beyond anything we briefed — truly world-class.",           name:'Sneha Kapoor',         role:'Creative Director, Vogue IN', init:'SK' },
  { text:"The travel series Aryan shot for our tourism board went viral. His eye for light and moment is unmatched in the industry.",             name:'Vikram Nair',          role:'Kerala Tourism Board', init:'VN' },
  { text:"Booked the Portrait session package. Got more than I expected — the preparation consultation alone changed how I present myself.",      name:'Ananya Iyer',          role:'Portrait Client, Mumbai', init:'AI' },
  { text:"Aryan photographed our flagship store opening. The event coverage was spectacular — every key moment captured, nothing missed.",        name:'Aditya Birla',         role:'Brand Manager, ABFRL', init:'AB' },
  { text:"We've worked with many photographers for nature campaigns. Aryan is in a league of his own when it comes to patience and composition.", name:'Deepa Sharma',         role:'WWF India, Campaign Lead', init:'DS' },
];

const sessions = [
  { name:'Portrait Session',   price:'₹15,000', duration:'2 hrs', key:'portrait' },
  { name:'Wedding Full-Day',   price:'₹75,000', duration:'10 hrs', key:'wedding'  },
  { name:'Event Coverage',     price:'₹25,000', duration:'4 hrs', key:'event'    },
  { name:'Nature Expedition',  price:'₹35,000', duration:'Full day', key:'nature' },
  { name:'Travel Assignment',  price:'₹55,000', duration:'2 days', key:'travel'  },
  { name:'Brand Campaign',     price:'₹90,000', duration:'Custom', key:'brand'   },
];

/* ── STATE ── */
let currentFilter  = 'all';
let lbIndex        = 0;
let filteredPhotos = [...photos];
let paymentTarget  = null; // { type:'photo'|'session', data:{} }

/* ══════════════════════════════════════════
   GALLERY RENDER
   ══════════════════════════════════════════ */
const gradMap = {
  weddings: 'linear-gradient(135deg,#fce4ec,#f8bbd0)',
  nature:   'linear-gradient(135deg,#e8f5e9,#c8e6c9)',
  portraits:'linear-gradient(135deg,#fff3e8,#ffd5a8)',
  events:   'linear-gradient(135deg,#e3f2fd,#bbdefb)',
  travel:   'linear-gradient(135deg,#f3e5f5,#ce93d8)',
};
function catGrad(cat) { return gradMap[cat] || 'linear-gradient(135deg,#f5f5f5,#e0e0e0)'; }

function renderGallery(filter = 'all') {
  const grid = document.getElementById('photoGrid');
  filteredPhotos = filter === 'all' ? photos : photos.filter(p => p.cat === filter);
  grid.innerHTML = '';
  filteredPhotos.forEach((p, i) => {
    const item = document.createElement('div');
    item.className = 'photo-item aos';
    item.style.transitionDelay = (i % 4 * 0.07) + 's';
    item.innerHTML = `
      <div class="photo-thumb" style="background:${catGrad(p.cat)}">${p.emoji}
        <div class="photo-hover">
          <div class="photo-hover-cat">${p.cat}</div>
          <div class="photo-hover-title">${p.title}</div>
          <div class="photo-hover-price">₹${p.price.toLocaleString('en-IN')}</div>
        </div>
      </div>`;
    item.addEventListener('click', () => openLightbox(i));
    grid.appendChild(item);
  });
  setTimeout(() => {
    grid.querySelectorAll('.aos').forEach(el => { observer.observe(el); el.classList.add('visible'); });
  }, 40);
}

document.getElementById('filterTabs').addEventListener('click', e => {
  const btn = e.target.closest('.filter-btn');
  if (!btn) return;
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  currentFilter = btn.dataset.filter;
  renderGallery(currentFilter);
});

renderGallery();

/* ══════════════════════════════════════════
   LIGHTBOX
   ══════════════════════════════════════════ */
function openLightbox(idx) {
  lbIndex = idx;
  updateLightbox();
  document.getElementById('lightbox').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow = '';
}
function updateLightbox() {
  const p = filteredPhotos[lbIndex];
  document.getElementById('lbPhoto').style.background = catGrad(p.cat);
  document.getElementById('lbPhoto').querySelector('.lb-emoji').textContent = p.emoji;
  document.getElementById('lbCat').textContent   = p.cat.toUpperCase();
  document.getElementById('lbTitle').textContent = p.title;
  document.getElementById('lbLoc').textContent   = p.location;
  document.getElementById('lbDesc').textContent  = p.desc;
  document.getElementById('lbPrice').textContent = `₹${p.price.toLocaleString('en-IN')}`;
  document.getElementById('lbCounter').textContent = `${lbIndex + 1} / ${filteredPhotos.length}`;
}
document.getElementById('lbPrev').addEventListener('click', () => {
  lbIndex = (lbIndex - 1 + filteredPhotos.length) % filteredPhotos.length;
  updateLightbox();
});
document.getElementById('lbNext').addEventListener('click', () => {
  lbIndex = (lbIndex + 1) % filteredPhotos.length;
  updateLightbox();
});
document.getElementById('lightbox').addEventListener('click', e => {
  if (e.target === document.getElementById('lightbox')) closeLightbox();
});
document.addEventListener('keydown', e => {
  if (!document.getElementById('lightbox').classList.contains('open')) return;
  if (e.key === 'Escape')     closeLightbox();
  if (e.key === 'ArrowLeft')  { lbIndex = (lbIndex - 1 + filteredPhotos.length) % filteredPhotos.length; updateLightbox(); }
  if (e.key === 'ArrowRight') { lbIndex = (lbIndex + 1) % filteredPhotos.length; updateLightbox(); }
});

/* ══════════════════════════════════════════
   PAYMENT MODAL
   ══════════════════════════════════════════ */
function openPaymentPhoto() {
  const p = filteredPhotos[lbIndex];
  paymentTarget = { type: 'photo', data: p };
  document.getElementById('payTitle').textContent = 'Purchase Photo';
  document.getElementById('paySubtitle').textContent = 'High-resolution digital download — yours forever.';
  document.getElementById('payItemEmoji').textContent = p.emoji;
  document.getElementById('payItemName').textContent = p.title;
  document.getElementById('payItemSub').textContent  = p.location;
  document.getElementById('payItemPrice').textContent = `₹${p.price.toLocaleString('en-IN')}`;
  document.getElementById('payBtnLabel').textContent = `Pay ₹${p.price.toLocaleString('en-IN')}`;
  showSection('photo');
  document.getElementById('paymentModal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function openPaymentSession(key) {
  const s = sessions.find(x => x.key === key) || sessions[0];
  paymentTarget = { type: 'session', data: s };
  document.getElementById('payTitle').textContent = 'Book a Session';
  document.getElementById('paySubtitle').textContent = 'Reserve your photography session — confirm within 24 hrs.';
  document.getElementById('payItemEmoji').textContent = '📸';
  document.getElementById('payItemName').textContent = s.name;
  document.getElementById('payItemSub').textContent  = s.duration;
  document.getElementById('payItemPrice').textContent = s.price;
  document.getElementById('payBtnLabel').textContent = `Book for ${s.price}`;
  showSection('session');
  document.getElementById('paymentModal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closePayment() {
  document.getElementById('paymentModal').classList.remove('open');
  document.body.style.overflow = '';
}
document.getElementById('paymentModal').addEventListener('click', e => {
  if (e.target === document.getElementById('paymentModal')) closePayment();
});

/* Method tabs */
document.querySelectorAll('.method-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.method-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const method = tab.dataset.method;
    document.querySelectorAll('.payment-form-section').forEach(s => s.style.display = 'none');
    const target = document.getElementById('form-' + method);
    if (target) target.style.display = 'block';
  });
});

function showSection(type) {
  const photoSection   = document.getElementById('photoBuySection');
  const sessionSection = document.getElementById('sessionBookSection');
  if (type === 'photo') {
    photoSection.style.display   = 'block';
    sessionSection.style.display = 'none';
  } else {
    photoSection.style.display   = 'none';
    sessionSection.style.display = 'block';
    // reset session selection
    document.querySelectorAll('.session-option').forEach(o => o.classList.remove('active'));
    const def = document.querySelector(`.session-option[data-key="${paymentTarget.data.key}"]`);
    if (def) def.classList.add('active');
  }
}

/* Session picker inside modal */
document.querySelectorAll('.session-option').forEach(opt => {
  opt.addEventListener('click', () => {
    document.querySelectorAll('.session-option').forEach(o => o.classList.remove('active'));
    opt.classList.add('active');
    const key = opt.dataset.key;
    const s   = sessions.find(x => x.key === key);
    if (s) {
      document.getElementById('payItemName').textContent  = s.name;
      document.getElementById('payItemSub').textContent   = s.duration;
      document.getElementById('payItemPrice').textContent = s.price;
      document.getElementById('payBtnLabel').textContent  = `Book for ${s.price}`;
    }
  });
});

/* Simulate payment */
function processPayment(btn) {
  const orig = btn.textContent;
  btn.textContent = '⏳ Processing...';
  btn.disabled = true;
  setTimeout(() => {
    btn.textContent = '✅ Payment Successful!';
    btn.style.background = '#22c55e';
    setTimeout(() => {
      closePayment();
      btn.textContent = orig;
      btn.disabled = false;
      btn.style.background = '';
      showToast(paymentTarget?.type === 'session'
        ? '📅 Session booked! Check your email for confirmation.'
        : '🖼️ Download link sent to your email!');
    }, 1800);
  }, 2000);
}

function showToast(msg) {
  const t = document.createElement('div');
  t.style.cssText = `
    position:fixed; bottom:2rem; left:50%; transform:translateX(-50%);
    background:#111; color:#fff; padding:0.8rem 1.6rem;
    border-radius:100px; font-size:0.85rem; font-weight:600;
    z-index:99999; white-space:nowrap;
    box-shadow:0 8px 32px rgba(0,0,0,0.3);
    animation:fadeUp 0.4s ease both;
  `;
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 4000);
}

/* ══════════════════════════════════════════
   PRICING — Book button handlers
   ══════════════════════════════════════════ */
document.querySelectorAll('.btn-pricing[data-session]').forEach(btn => {
  btn.addEventListener('click', () => openPaymentSession(btn.dataset.session));
});

/* ══════════════════════════════════════════
   NAV — scroll & active links
   ══════════════════════════════════════════ */
const navbar   = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-links a:not(.nav-cta)');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
  let cur = '';
  sections.forEach(s => { if (window.scrollY >= s.offsetTop - 100) cur = s.id; });
  navLinks.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + cur);
  });
});

/* ══════════════════════════════════════════
   MOBILE MENU
   ══════════════════════════════════════════ */
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
  document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
});
function closeMobile() {
  mobileMenu.classList.remove('open');
  document.body.style.overflow = '';
}

/* ══════════════════════════════════════════
   TESTIMONIALS CAROUSEL
   ══════════════════════════════════════════ */
let testiCurrent = 0;
const perView = () => window.innerWidth < 768 ? 1 : window.innerWidth < 1024 ? 2 : 3;

function renderTestimonials() {
  const track = document.getElementById('testiTrack');
  const dots  = document.getElementById('testiDots');
  track.innerHTML = testimonials.map(t => `
    <div class="testi-card">
      <div class="testi-stars">★★★★★</div>
      <div class="testi-quote">${t.text}</div>
      <div class="testi-author">
        <div class="testi-avatar">${t.init}</div>
        <div>
          <div class="testi-name">${t.name}</div>
          <div class="testi-role">${t.role}</div>
        </div>
      </div>
    </div>`).join('');
  const total = testimonials.length - perView() + 1;
  dots.innerHTML = Array.from({ length: total }, (_, i) =>
    `<div class="testi-dot ${i === 0 ? 'active' : ''}" onclick="goToTesti(${i})"></div>`
  ).join('');
}

function goToTesti(i) {
  const track = document.getElementById('testiTrack');
  const card  = track.querySelector('.testi-card');
  if (!card) return;
  const w = card.offsetWidth + 24;
  testiCurrent = Math.max(0, Math.min(i, testimonials.length - perView()));
  track.style.transform = `translateX(-${testiCurrent * w}px)`;
  document.querySelectorAll('.testi-dot').forEach((d, j) =>
    d.classList.toggle('active', j === testiCurrent));
}

document.getElementById('testiPrev').addEventListener('click', () => goToTesti(testiCurrent - 1));
document.getElementById('testiNext').addEventListener('click', () => goToTesti(testiCurrent + 1));
setInterval(() => goToTesti((testiCurrent + 1) % (testimonials.length - perView() + 1)), 5000);
renderTestimonials();
window.addEventListener('resize', () => { renderTestimonials(); goToTesti(0); });

/* ══════════════════════════════════════════
   ANIMATED COUNTERS
   ══════════════════════════════════════════ */
function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  const suffix = el.querySelector('.stat-suffix').outerHTML;
  const step   = target / (1800 / 16);
  let cur = 0;
  const iv = setInterval(() => {
    cur = Math.min(cur + step, target);
    el.innerHTML = Math.floor(cur) + suffix;
    if (cur >= target) clearInterval(iv);
  }, 16);
}

/* ══════════════════════════════════════════
   INTERSECTION OBSERVER — AOS + Counters
   ══════════════════════════════════════════ */
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      if (e.target.classList.contains('stat-number')) animateCounter(e.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.aos, .stat-number').forEach(el => observer.observe(el));

/* ══════════════════════════════════════════
   CONTACT FORM
   ══════════════════════════════════════════ */
function submitForm(btn) {
  btn.textContent = '✓ Message Sent!';
  btn.style.background = '#22c55e';
  setTimeout(() => { btn.textContent = 'Send Enquiry →'; btn.style.background = ''; }, 3000);
}