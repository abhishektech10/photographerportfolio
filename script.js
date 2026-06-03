/* ══════════════════════════════════════════
   HARU — script.js
   Nature & Wildlife Photography Portfolio
   ══════════════════════════════════════════ */

/* ── IMAGE BASE URL ── */
const BASE = 'https://github.com/abhishektech10/photographerportfolio/releases/download/Picture/';
const IMG  = (n) => BASE + `pic${n}.jpg`;

/* ── REAL PHOTOS (3 from GitHub) ── */
const realPhotos = [
  { id:'r1', src: IMG(1), cat:'wildlife',  title:'First Light, Last Wild',  location:'Arctic Tundra, Norway',       price:'$89', desc:'At −28°C, Haru waited seven hours in a snow blind for this moment — a reminder of why the wild must be protected.' },
  { id:'r2', src: IMG(2), cat:'nature',    title:'Canopy & Silence',         location:'Borneo Rainforest, Malaysia',  price:'$75', desc:'Three weeks off-grid in the Borneo interior. The rainforest rewarded patience with a frame shortlisted for Nature Photographer of the Year 2024.' },
  { id:'r3', src: IMG(3), cat:'portrait',  title:'Woman in the Storm',       location:'Snaefellsnes Peninsula, Iceland', price:'$95', desc:'Self-portrait on a remote timer at 70 km/h winds. Part of the "Presence" series, exhibited across 14 cities worldwide.' },
];

/* ── GALLERY DATA (real photos + emoji placeholders) ── */
const photos = [
  { id:'r1', src:IMG(1),  isReal:true,  cat:'wildlife',   title:'First Light, Last Wild',    location:'Arctic Tundra, Norway',         price:'$89'  },
  { id:'r2', src:IMG(2),  isReal:true,  cat:'nature',     title:'Canopy & Silence',           location:'Borneo Rainforest, Malaysia',   price:'$75'  },
  { id:'r3', src:IMG(3),  isReal:true,  cat:'portrait',   title:'Woman in the Storm',         location:'Iceland',                       price:'$95'  },
  { id:'p4', emoji:'🦁',  isReal:false, cat:'wildlife',   title:'The Sovereign',              location:'Masai Mara, Kenya',             price:'$65'  },
  { id:'p5', emoji:'🌲',  isReal:false, cat:'nature',     title:'Cathedral Forest',           location:'Olympic NP, USA',               price:'$55'  },
  { id:'p6', emoji:'🐘',  isReal:false, cat:'animal',     title:'The Matriarch',              location:'Amboseli, Kenya',               price:'$72'  },
  { id:'p7', emoji:'🏔️', isReal:false, cat:'landscape',  title:'Above the Clouds',           location:'Patagonia, Chile',              price:'$80'  },
  { id:'p8', emoji:'🦅',  isReal:false, cat:'wildlife',   title:'Thermal Rider',              location:'Grand Canyon, USA',             price:'$58'  },
  { id:'p9', emoji:'🌊',  isReal:false, cat:'nature',     title:'The Wave Breaks',            location:'Nazaré, Portugal',              price:'$69'  },
  { id:'p10',emoji:'🐺',  isReal:false, cat:'animal',     title:'Pack Leader',                location:'Yellowstone, USA',              price:'$77'  },
  { id:'p11',emoji:'🌅',  isReal:false, cat:'landscape',  title:'Golden Delta',               location:'Okavango Delta, Botswana',      price:'$84'  },
  { id:'p12',emoji:'🦋',  isReal:false, cat:'nature',     title:'Metamorphosis',              location:'Costa Rica',                    price:'$48'  },
];

const catGrads = {
  wildlife: 'linear-gradient(135deg,#e8f5e9,#a5d6a7)',
  nature:   'linear-gradient(135deg,#e3f2fd,#90caf9)',
  animal:   'linear-gradient(135deg,#fff3e8,#ffcc80)',
  landscape:'linear-gradient(135deg,#f3e5f5,#ce93d8)',
  portrait: 'linear-gradient(135deg,#fce4ec,#f48fb1)',
};
const catGrad = (cat) => catGrads[cat] || 'linear-gradient(135deg,#f5f5f5,#e0e0e0)';

/* ── TESTIMONIALS ── */
const testimonials = [
  { text:'Haru photographed our wildlife documentary expedition in Kenya. Her ability to anticipate animal behaviour and capture it in a single frame is something I have never seen in 20 years of commissioning photographers.', name:'Dr. Lena Hoffman',   role:'BBC Wildlife, Series Producer',     init:'LH' },
  { text:"We licensed Haru's Arctic series for our climate campaign. The images stopped people mid-scroll and drove a 340% increase in donations compared to our previous campaign imagery.",                                   name:'Marcus Webb',        role:'WWF International, Campaign Director',init:'MW' },
  { text:"Booked Haru for a wildlife expedition in Botswana as a birthday gift. She turned it into the most extraordinary week of my life. The images she delivered are gallery-quality — framed and hanging in my home.",       name:'Priya Rao',          role:'Private Client, London',            init:'PR' },
  { text:'Haru shot the cover of our annual Nature issue. Her "Canopy & Silence" image became one of the most-shared covers in our magazine history. We work with nobody else for nature commissions.',                         name:'Sophie Laurent',     role:'GEO Magazine, Photo Editor',        init:'SL' },
  { text:"Purchased three prints for our office. Every single person who walks in asks about them. Haru's packaging and delivery was impeccable, and the print quality is extraordinary.",                                       name:'James Okafor',       role:'Print Collector, New York',         init:'JO' },
  { text:'We sent Haru to Iceland for our "Wild Places" brand campaign. She delivered images that defined our entire visual identity for the next 3 years. Simply the best nature photographer working today.',                  name:'Akiko Tanaka',       role:'Patagonia, Creative Director',      init:'AT' },
];

/* ── STATE ── */
let currentFilter  = 'all';
let filteredPhotos = [...photos];
let lbIndex        = 0;
let lbPool         = realPhotos; // lightbox always uses real photos for featured
let payTarget      = null;

/* ══════════════════════════════════════════
   GALLERY RENDER
   ══════════════════════════════════════════ */
function renderGallery(filter = 'all') {
  const grid = document.getElementById('photoGrid');
  filteredPhotos = filter === 'all' ? photos : photos.filter(p => p.cat === filter);
  grid.innerHTML = '';

  filteredPhotos.forEach((p, i) => {
    const item = document.createElement('div');
    item.className = 'photo-item' + (p.isReal ? ' photo-item--real' : '') + ' aos';
    item.style.transitionDelay = (i % 3 * 0.07) + 's';

    const thumbContent = p.isReal
      ? `<img src="${p.src}" alt="${p.title}" loading="lazy">`
      : `<span style="font-size:3.5rem">${p.emoji}</span>`;

    item.innerHTML = `
      <div class="photo-thumb" style="${p.isReal ? '' : 'background:' + catGrad(p.cat) + ';aspect-ratio:4/3'}">
        ${thumbContent}
        <div class="photo-hover">
          <div class="photo-hover-cat">${p.cat}</div>
          <div class="photo-hover-title">${p.title}</div>
          <div class="photo-hover-price">${p.price}</div>
        </div>
      </div>`;

    item.addEventListener('click', () => openGalleryLightbox(i));
    grid.appendChild(item);
  });

  setTimeout(() => {
    grid.querySelectorAll('.aos').forEach(el => { observer.observe(el); el.classList.add('visible'); });
  }, 40);
}

/* Gallery filter */
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
   LIGHTBOX — gallery items
   ══════════════════════════════════════════ */
function openGalleryLightbox(idx) {
  lbPool  = filteredPhotos;
  lbIndex = idx;
  updateLightbox();
  document.getElementById('lightbox').classList.add('open');
  document.body.style.overflow = 'hidden';
}

/* Lightbox — featured real photos */
function openLightboxReal(idx) {
  lbPool  = realPhotos;
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
  const p   = lbPool[lbIndex];
  const img = document.getElementById('lbImg');

  if (p.isReal !== false && p.src) {
    img.src   = p.src;
    img.style.display = 'block';
    document.getElementById('lbPhoto').style.background = '#111';
  } else {
    img.src   = '';
    img.style.display = 'none';
    document.getElementById('lbPhoto').style.background = catGrad(p.cat);
    // Show emoji fallback
    let emojiEl = document.getElementById('lbEmoji');
    if (!emojiEl) {
      emojiEl = document.createElement('div');
      emojiEl.id = 'lbEmoji';
      emojiEl.style.cssText = 'font-size:6rem;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%)';
      document.getElementById('lbPhoto').appendChild(emojiEl);
    }
    emojiEl.textContent = p.emoji || '📷';
    emojiEl.style.display = 'block';
  }
  // Hide emoji on real photos
  const emojiEl = document.getElementById('lbEmoji');
  if (emojiEl && (p.isReal !== false && p.src)) emojiEl.style.display = 'none';

  document.getElementById('lbCat').textContent     = (p.cat || 'PHOTOGRAPHY').toUpperCase();
  document.getElementById('lbTitle').textContent   = p.title || '';
  document.getElementById('lbLoc').textContent     = p.location || '';
  document.getElementById('lbDesc').textContent    = p.desc || '';
  document.getElementById('lbPrice').textContent   = p.price || '';
  document.getElementById('lbCounter').textContent = `${lbIndex + 1} / ${lbPool.length}`;
}

document.getElementById('lbPrev').addEventListener('click', () => {
  lbIndex = (lbIndex - 1 + lbPool.length) % lbPool.length;
  updateLightbox();
});
document.getElementById('lbNext').addEventListener('click', () => {
  lbIndex = (lbIndex + 1) % lbPool.length;
  updateLightbox();
});
document.getElementById('lightbox').addEventListener('click', e => {
  if (e.target === document.getElementById('lightbox')) closeLightbox();
});
document.addEventListener('keydown', e => {
  if (!document.getElementById('lightbox').classList.contains('open')) return;
  if (e.key === 'Escape')     closeLightbox();
  if (e.key === 'ArrowLeft')  { lbIndex = (lbIndex - 1 + lbPool.length) % lbPool.length; updateLightbox(); }
  if (e.key === 'ArrowRight') { lbIndex = (lbIndex + 1) % lbPool.length; updateLightbox(); }
});

/* ══════════════════════════════════════════
   PAYMENT MODAL
   ══════════════════════════════════════════ */
function openPaymentPhoto() {
  const p = lbPool[lbIndex];
  payTarget = { type: 'photo', data: p };

  document.getElementById('payTitle').textContent    = 'Purchase Print';
  document.getElementById('paySubtitle').textContent = 'High-resolution digital download — yours forever.';
  document.getElementById('payItemName').textContent = p.title || 'Photo';
  document.getElementById('payItemSub').textContent  = p.location || '';
  document.getElementById('payItemPrice').textContent= p.price || '';
  document.getElementById('payBtnLabel').textContent = `Pay ${p.price || '$89'}`;

  const imgEl = document.getElementById('payItemImg');
  if (p.src) { imgEl.src = p.src; imgEl.style.display = 'block'; }
  else        { imgEl.style.display = 'none'; }

  document.getElementById('photoBuySection').style.display   = 'block';
  document.getElementById('sessionBookSection').style.display = 'none';

  document.getElementById('paymentModal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function openPaymentSession(key) {
  const sessions = {
    nature:   { name:'Nature Walk',       price:'$400',   dur:'Half day' },
    wildlife: { name:'Wildlife Expedition',price:'$1,800', dur:'2 full days' },
    world:    { name:'World Assignment',  price:'$3,500', dur:'Custom' },
    portrait: { name:'Portrait Session',  price:'$350',   dur:'2 hrs' },
  };
  const s = sessions[key] || sessions.nature;
  payTarget = { type: 'session', data: s };

  document.getElementById('payTitle').textContent    = 'Book a Session';
  document.getElementById('paySubtitle').textContent = 'Reserve your photography session — confirmed within 24 hrs.';
  document.getElementById('payItemName').textContent = s.name;
  document.getElementById('payItemSub').textContent  = s.dur;
  document.getElementById('payItemPrice').textContent= s.price;
  document.getElementById('payBtnLabel').textContent = `Book for ${s.price}`;

  const imgEl = document.getElementById('payItemImg');
  imgEl.src = IMG(1); imgEl.style.display = 'block';

  document.getElementById('photoBuySection').style.display   = 'none';
  document.getElementById('sessionBookSection').style.display = 'block';

  // Highlight active session
  document.querySelectorAll('.session-option').forEach(o => {
    o.classList.toggle('active', o.dataset.key === key);
  });

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

/* Payment method tabs */
document.querySelectorAll('.method-tab[data-method]').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.method-tab[data-method]').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    document.querySelectorAll('.payment-form-section').forEach(s => s.style.display = 'none');
    const target = document.getElementById('form-' + tab.dataset.method);
    if (target) target.style.display = 'block';
  });
});

/* Size tabs */
document.querySelectorAll('.size-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.size-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
  });
});

/* Session picker */
document.querySelectorAll('.session-option').forEach(opt => {
  opt.addEventListener('click', () => {
    document.querySelectorAll('.session-option').forEach(o => o.classList.remove('active'));
    opt.classList.add('active');
    openPaymentSession(opt.dataset.key);
  });
});

/* Simulate payment */
function processPayment(btn) {
  const orig = btn.textContent;
  btn.textContent = '⏳ Processing...';
  btn.disabled = true;
  setTimeout(() => {
    btn.textContent = '✅ Confirmed!';
    btn.style.background = '#22c55e';
    setTimeout(() => {
      closePayment();
      btn.textContent = orig;
      btn.disabled = false;
      btn.style.background = '';
      showToast(payTarget?.type === 'session'
        ? '📅 Session booked! Confirmation email on its way.'
        : '🖼️ Download link sent to your email!');
    }, 1800);
  }, 2200);
}

function showToast(msg) {
  const t = document.createElement('div');
  t.style.cssText = 'position:fixed;bottom:2rem;left:50%;transform:translateX(-50%);background:#111;color:#fff;padding:0.8rem 1.6rem;border-radius:100px;font-size:0.85rem;font-weight:600;z-index:99999;white-space:nowrap;box-shadow:0 8px 32px rgba(0,0,0,0.3);animation:fadeUp 0.4s ease both';
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 4000);
}

/* ══════════════════════════════════════════
   NAV
   ══════════════════════════════════════════ */
const navbar   = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-links a:not(.nav-cta)');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
  let cur = '';
  sections.forEach(s => { if (window.scrollY >= s.offsetTop - 100) cur = s.id; });
  navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + cur));
});

/* ── MOBILE MENU ── */
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
        <div><div class="testi-name">${t.name}</div><div class="testi-role">${t.role}</div></div>
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
  testiCurrent = Math.max(0, Math.min(i, testimonials.length - perView()));
  track.style.transform = `translateX(-${testiCurrent * (card.offsetWidth + 24)}px)`;
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
   INTERSECTION OBSERVER
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
  setTimeout(() => { btn.textContent = 'Send Message →'; btn.style.background = ''; }, 3000);
}
