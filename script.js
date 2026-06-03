/* ══════════════════════════════════════════
   DATA
   ══════════════════════════════════════════ */

/* GitHub Images */
const BASE = 'https://github.com/abhishektech10/photographerportfolio/releases/download/Picture/';
const IMG  = (n) => `${BASE}pic${n}.jpg`;

const IMGS = {
  lakeside:  IMG(1),
  bridge:    IMG(2),
  cat:       IMG(3),
  forest:    IMG(1),
  wildlife1: IMG(1),
  wildlife2: IMG(2),
  nature1:   IMG(2),
  nature2:   IMG(1),
  animal1:   IMG(3),
  animal2:   IMG(3),
  land1:     IMG(2),
  land2:     IMG(1),
};

const realPhotos = [
  {
    id: 'r1',
    src: IMGS.lakeside,
    cat: 'wildlife',
    title: 'First Light, Last Wild',
    location: 'Arctic Tundra, Norway',
    price: '$89',
    desc: 'At −28°C, Haru waited seven hours in a snow blind for this moment — a reminder of why the wild must be protected.'
  },
  {
    id: 'r2',
    src: IMGS.bridge,
    cat: 'nature',
    title: 'Canopy & Silence',
    location: 'Borneo Rainforest, Malaysia',
    price: '$75',
    desc: 'Three weeks off-grid in the Borneo interior. The rainforest rewarded patience with a frame shortlisted for Nature Photographer of the Year.'
  },
  {
    id: 'r3',
    src: IMGS.cat,
    cat: 'portrait',
    title: 'Woman in the Storm',
    location: 'Iceland',
    price: '$95',
    desc: 'Self-portrait on a remote timer in extreme weather conditions.'
  }
];

const photos = [
  { id:'r1',  src:IMGS.lakeside,  isReal:true, cat:'wildlife',  title:'First Light, Last Wild', location:'Arctic Tundra, Norway', price:'$89' },
  { id:'r2',  src:IMGS.bridge,    isReal:true, cat:'nature',    title:'Canopy & Silence', location:'Borneo Rainforest, Malaysia', price:'$75' },
  { id:'r3',  src:IMGS.cat,       isReal:true, cat:'portrait',  title:'Woman in the Storm', location:'Iceland', price:'$95' },
  { id:'p4',  src:IMGS.wildlife1, isReal:true, cat:'wildlife',  title:'The Sovereign', location:'Masai Mara, Kenya', price:'$65' },
  { id:'p5',  src:IMGS.nature1,   isReal:true, cat:'nature',    title:'Cathedral Forest', location:'Olympic NP, USA', price:'$55' },
  { id:'p6',  src:IMGS.animal1,   isReal:true, cat:'animal',    title:'The Matriarch', location:'Amboseli, Kenya', price:'$72' },
  { id:'p7',  src:IMGS.land1,     isReal:true, cat:'landscape', title:'Above the Clouds', location:'Patagonia, Chile', price:'$80' },
  { id:'p8',  src:IMGS.wildlife2, isReal:true, cat:'wildlife',  title:'Thermal Rider', location:'Grand Canyon, USA', price:'$58' },
  { id:'p9',  src:IMGS.nature2,   isReal:true, cat:'nature',    title:'The Wave Breaks', location:'Nazaré, Portugal', price:'$69' },
  { id:'p10', src:IMGS.animal2,   isReal:true, cat:'animal',    title:'Pack Leader', location:'Yellowstone, USA', price:'$77' },
  { id:'p11', src:IMGS.land2,     isReal:true, cat:'landscape', title:'Golden Delta', location:'Okavango Delta, Botswana', price:'$84' },
  { id:'p12', src:IMGS.forest,    isReal:true, cat:'nature',    title:'Metamorphosis', location:'Costa Rica', price:'$48' }
];

const catGrads = {
  wildlife: 'linear-gradient(135deg,#e8f5e9,#a5d6a7)',
  nature:   'linear-gradient(135deg,#e3f2fd,#90caf9)',
  animal:   'linear-gradient(135deg,#fff3e8,#ffcc80)',
  landscape:'linear-gradient(135deg,#f3e5f5,#ce93d8)',
  portrait: 'linear-gradient(135deg,#fce4ec,#f48fb1)',
};
const catGrad = (cat) => catGrads[cat] || 'linear-gradient(135deg,#f5f5f5,#e0e0e0)';

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
let lbPool         = realPhotos;
let payTarget      = null;
let touchStartX    = 0;
let touchStartY    = 0;

/* ══════════════════════════════════════════
   UTILITY FUNCTIONS
   ══════════════════════════════════════════ */
const isMobile = () => window.innerWidth < 768;
const isTablet = () => window.innerWidth < 1024;

/* ══════════════════════════════════════════
   GALLERY RENDER
   ══════════════════════════════════════════ */
function renderGallery(filter = 'all') {
  const grid = document.getElementById('photoGrid');
  if (!grid) return;
  
  filteredPhotos = filter === 'all' ? photos : photos.filter(p => p.cat === filter);
  grid.innerHTML = '';

  filteredPhotos.forEach((p, i) => {
    const item = document.createElement('div');
    item.className = 'photo-item' + (p.isReal ? ' photo-item--real' : '') + ' aos';
    item.style.transitionDelay = (i % 3 * 0.07) + 's';

    const thumbContent = p.isReal
      ? `<img src="${p.src}" alt="${p.title}" loading="lazy" decoding="async">`
      : `<span style="font-size:clamp(2rem,5vw,3.5rem)">${p.emoji}</span>`;

    item.innerHTML = `
      <div class="photo-thumb" style="${p.isReal ? '' : 'background:' + catGrad(p.cat) + ';aspect-ratio:4/3'}">
        ${thumbContent}
        <div class="photo-hover">
          <div class="photo-hover-cat">${p.cat}</div>
          <div class="photo-hover-title">${p.title}</div>
          <div class="photo-hover-price">${p.price}</div>
        </div>
      </div>`;

    item.addEventListener('click', () => openGalleryLightbox(i), false);
    grid.appendChild(item);
  });

  setTimeout(() => {
    const aos = grid.querySelectorAll('.aos');
    aos.forEach(el => { 
      observer.observe(el); 
      el.classList.add('visible'); 
    });
  }, 40);
}

/* Gallery filter */
const filterTabs = document.getElementById('filterTabs');
if (filterTabs) {
  filterTabs.addEventListener('click', e => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentFilter = btn.dataset.filter;
    renderGallery(currentFilter);
  }, false);
}

renderGallery();

/* ══════════════════════════════════════════
   LIGHTBOX — GALLERY ITEMS
   ══════════════════════════════════════════ */
function openGalleryLightbox(idx) {
  lbPool  = filteredPhotos;
  lbIndex = idx;
  updateLightbox();
  const lb = document.getElementById('lightbox');
  if (lb) {
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}

function openLightboxReal(idx) {
  lbPool  = realPhotos;
  lbIndex = idx;
  updateLightbox();
  const lb = document.getElementById('lightbox');
  if (lb) {
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}

function closeLightbox() {
  const lb = document.getElementById('lightbox');
  if (lb) {
    lb.classList.remove('open');
    document.body.style.overflow = '';
  }
}

function updateLightbox() {
  const p   = lbPool[lbIndex];
  const img = document.getElementById('lbImg');
  const lbPhoto = document.getElementById('lbPhoto');
  
  if (!img || !lbPhoto) return;

  if (p.isReal !== false && p.src) {
    img.src   = p.src;
    img.style.display = 'block';
    lbPhoto.style.background = '#111';
  } else {
    img.src   = '';
    img.style.display = 'none';
    lbPhoto.style.background = catGrad(p.cat);
    
    let emojiEl = document.getElementById('lbEmoji');
    if (!emojiEl) {
      emojiEl = document.createElement('div');
      emojiEl.id = 'lbEmoji';
      emojiEl.style.cssText = 'font-size:clamp(3rem,15vw,6rem);position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);pointer-events:none;';
      lbPhoto.appendChild(emojiEl);
    }
    emojiEl.textContent = p.emoji || '📷';
    emojiEl.style.display = 'block';
  }
  
  const emojiEl = document.getElementById('lbEmoji');
  if (emojiEl && (p.isReal !== false && p.src)) emojiEl.style.display = 'none';

  const lbCat = document.getElementById('lbCat');
  const lbTitle = document.getElementById('lbTitle');
  const lbLoc = document.getElementById('lbLoc');
  const lbDesc = document.getElementById('lbDesc');
  const lbPrice = document.getElementById('lbPrice');
  const lbCounter = document.getElementById('lbCounter');

  if (lbCat) lbCat.textContent = (p.cat || 'PHOTOGRAPHY').toUpperCase();
  if (lbTitle) lbTitle.textContent = p.title || '';
  if (lbLoc) lbLoc.textContent = p.location || '';
  if (lbDesc) lbDesc.textContent = p.desc || '';
  if (lbPrice) lbPrice.textContent = p.price || '';
  if (lbCounter) lbCounter.textContent = `${lbIndex + 1} / ${lbPool.length}`;
}

const lbPrev = document.getElementById('lbPrev');
const lbNext = document.getElementById('lbNext');

if (lbPrev) {
  lbPrev.addEventListener('click', () => {
    lbIndex = (lbIndex - 1 + lbPool.length) % lbPool.length;
    updateLightbox();
  }, false);
}

if (lbNext) {
  lbNext.addEventListener('click', () => {
    lbIndex = (lbIndex + 1) % lbPool.length;
    updateLightbox();
  }, false);
}

const lightbox = document.getElementById('lightbox');
if (lightbox) {
  lightbox.addEventListener('click', e => {
    if (e.target === lightbox) closeLightbox();
  }, false);
  
  // Touch swipe support
  lightbox.addEventListener('touchstart', e => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
  }, false);
  
  lightbox.addEventListener('touchend', e => {
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    const diffX = touchStartX - touchEndX;
    const diffY = Math.abs(touchStartY - touchEndY);
    
    if (Math.abs(diffX) > 50 && diffY < 50) {
      if (diffX > 0) {
        lbIndex = (lbIndex + 1) % lbPool.length;
      } else {
        lbIndex = (lbIndex - 1 + lbPool.length) % lbPool.length;
      }
      updateLightbox();
    }
  }, false);
}

document.addEventListener('keydown', e => {
  const lb = document.getElementById('lightbox');
  if (!lb || !lb.classList.contains('open')) return;
  
  if (e.key === 'Escape') {
    closeLightbox();
  } else if (e.key === 'ArrowLeft') {
    lbIndex = (lbIndex - 1 + lbPool.length) % lbPool.length;
    updateLightbox();
  } else if (e.key === 'ArrowRight') {
    lbIndex = (lbIndex + 1) % lbPool.length;
    updateLightbox();
  }
}, false);

/* ══════════════════════════════════════════
   PAYMENT MODAL
   ══════════════════════════════════════════ */
function openPaymentPhoto() {
  const p = lbPool[lbIndex];
  payTarget = { type: 'photo', data: p };

  const payTitle = document.getElementById('payTitle');
  const paySubtitle = document.getElementById('paySubtitle');
  const payItemName = document.getElementById('payItemName');
  const payItemSub = document.getElementById('payItemSub');
  const payItemPrice = document.getElementById('payItemPrice');
  const payBtnLabel = document.getElementById('payBtnLabel');
  const payItemImg = document.getElementById('payItemImg');

  if (payTitle) payTitle.textContent = 'Purchase Print';
  if (paySubtitle) paySubtitle.textContent = 'High-resolution digital download — yours forever.';
  if (payItemName) payItemName.textContent = p.title || 'Photo';
  if (payItemSub) payItemSub.textContent = p.location || '';
  if (payItemPrice) payItemPrice.textContent = p.price || '';
  if (payBtnLabel) payBtnLabel.textContent = `Pay ${p.price || '$89'}`;

  if (payItemImg) {
    if (p.src) { 
      payItemImg.src = p.src; 
      payItemImg.style.display = 'block'; 
    } else { 
      payItemImg.style.display = 'none'; 
    }
  }

  const photoBuySection = document.getElementById('photoBuySection');
  const sessionBookSection = document.getElementById('sessionBookSection');
  
  if (photoBuySection) photoBuySection.style.display = 'block';
  if (sessionBookSection) sessionBookSection.style.display = 'none';

  const paymentModal = document.getElementById('paymentModal');
  if (paymentModal) {
    paymentModal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
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

  const payTitle = document.getElementById('payTitle');
  const paySubtitle = document.getElementById('paySubtitle');
  const payItemName = document.getElementById('payItemName');
  const payItemSub = document.getElementById('payItemSub');
  const payItemPrice = document.getElementById('payItemPrice');
  const payBtnLabel = document.getElementById('payBtnLabel');
  const payItemImg = document.getElementById('payItemImg');

  if (payTitle) payTitle.textContent = 'Book a Session';
  if (paySubtitle) paySubtitle.textContent = 'Reserve your photography session — confirmed within 24 hrs.';
  if (payItemName) payItemName.textContent = s.name;
  if (payItemSub) payItemSub.textContent = s.dur;
  if (payItemPrice) payItemPrice.textContent = s.price;
  if (payBtnLabel) payBtnLabel.textContent = `Book for ${s.price}`;

  if (payItemImg) {
    payItemImg.src = IMG(1);
    payItemImg.style.display = 'block';
  }

  const photoBuySection = document.getElementById('photoBuySection');
  const sessionBookSection = document.getElementById('sessionBookSection');
  
  if (photoBuySection) photoBuySection.style.display = 'none';
  if (sessionBookSection) sessionBookSection.style.display = 'block';

  // Highlight active session
  document.querySelectorAll('.session-option').forEach(o => {
    o.classList.toggle('active', o.dataset.key === key);
  });

  const paymentModal = document.getElementById('paymentModal');
  if (paymentModal) {
    paymentModal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}

function closePayment() {
  const paymentModal = document.getElementById('paymentModal');
  if (paymentModal) {
    paymentModal.classList.remove('open');
    document.body.style.overflow = '';
  }
}

const paymentModal = document.getElementById('paymentModal');
if (paymentModal) {
  paymentModal.addEventListener('click', e => {
    if (e.target === paymentModal) closePayment();
  }, false);
}

/* Payment method tabs */
document.querySelectorAll('.method-tab[data-method]').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.method-tab[data-method]').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    document.querySelectorAll('.payment-form-section').forEach(s => s.style.display = 'none');
    const target = document.getElementById('form-' + tab.dataset.method);
    if (target) target.style.display = 'block';
  }, false);
});

/* Size tabs */
document.querySelectorAll('.size-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.size-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
  }, false);
});

/* Session picker */
document.querySelectorAll('.session-option').forEach(opt => {
  opt.addEventListener('click', () => {
    document.querySelectorAll('.session-option').forEach(o => o.classList.remove('active'));
    opt.classList.add('active');
    openPaymentSession(opt.dataset.key);
  }, false);
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
  t.style.cssText = 'position:fixed;bottom:max(1rem,env(safe-area-inset-bottom));left:50%;transform:translateX(-50%);background:#111;color:#fff;padding:0.8rem 1.6rem;border-radius:100px;font-size:0.85rem;font-weight:600;z-index:99999;white-space:nowrap;box-shadow:0 8px 32px rgba(0,0,0,0.3);animation:fadeUp 0.4s ease both;max-width:90vw';
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
  if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 20);
  
  let cur = '';
  sections.forEach(s => { 
    if (window.scrollY >= s.offsetTop - 100) cur = s.id; 
  });
  navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + cur));
}, { passive: true });

/* ── MOBILE MENU ── */
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

if (hamburger) {
  hamburger.addEventListener('click', () => {
    if (mobileMenu) {
      mobileMenu.classList.toggle('open');
      document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
      hamburger.setAttribute('aria-expanded', mobileMenu.classList.contains('open'));
    }
  }, false);
}

function closeMobile() {
  if (mobileMenu) {
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
    if (hamburger) hamburger.setAttribute('aria-expanded', 'false');
  }
}

/* Close mobile menu on nav link click */
document.querySelectorAll('#mobileMenu a').forEach(link => {
  link.addEventListener('click', closeMobile, false);
});

/* ══════════════════════════════════════════
   TESTIMONIALS CAROUSEL
   ══════════════════════════════════════════ */
let testiCurrent = 0;
let testiInterval = null;
const perView = () => window.innerWidth < 768 ? 1 : window.innerWidth < 1024 ? 2 : 3;

function renderTestimonials() {
  const track = document.getElementById('testiTrack');
  const dots  = document.getElementById('testiDots');
  
  if (!track || !dots) return;

  track.innerHTML = testimonials.map(t => `
    <div class="testi-card">
      <div class="testi-stars">★★★★★</div>
      <div class="testi-quote">${t.text}</div>
      <div class="testi-author">
        <div class="testi-avatar">${t.init}</div>
        <div><div class="testi-name">${t.name}</div><div class="testi-role">${t.role}</div></div>
      </div>
    </div>`).join('');

  const total = Math.max(1, testimonials.length - perView() + 1);
  dots.innerHTML = Array.from({ length: total }, (_, i) =>
    `<div class="testi-dot ${i === 0 ? 'active' : ''}" onclick="goToTesti(${i})" role="button" tabindex="0"></div>`
  ).join('');
  
  // Add keyboard support for dots
  dots.querySelectorAll('.testi-dot').forEach((dot, i) => {
    dot.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        goToTesti(i);
      }
    }, false);
  });
}

function goToTesti(i) {
  const track = document.getElementById('testiTrack');
  const card  = track?.querySelector('.testi-card');
  if (!card) return;
  
  testiCurrent = Math.max(0, Math.min(i, testimonials.length - perView()));
  track.style.transform = `translateX(-${testiCurrent * (card.offsetWidth + 24)}px)`;
  
  document.querySelectorAll('.testi-dot').forEach((d, j) =>
    d.classList.toggle('active', j === testiCurrent));
}

const testiPrev = document.getElementById('testiPrev');
const testiNext = document.getElementById('testiNext');

if (testiPrev) {
  testiPrev.addEventListener('click', () => goToTesti(testiCurrent - 1), false);
}

if (testiNext) {
  testiNext.addEventListener('click', () => goToTesti(testiCurrent + 1), false);
}

function startTestiAutoplay() {
  clearInterval(testiInterval);
  testiInterval = setInterval(() => {
    goToTesti((testiCurrent + 1) % (testimonials.length - perView() + 1));
  }, 5000);
}

renderTestimonials();
startTestiAutoplay();

window.addEventListener('resize', () => { 
  renderTestimonials(); 
  goToTesti(0);
  startTestiAutoplay();
}, { passive: true });

/* Pause autoplay on interaction */
document.addEventListener('touchstart', () => clearInterval(testiInterval), { passive: true });
document.addEventListener('mousedown', () => clearInterval(testiInterval), { passive: true });
document.addEventListener('touchend', startTestiAutoplay, { passive: true });
document.addEventListener('mouseup', startTestiAutoplay, { passive: true });

/* ══════════════════════════════════════════
   ANIMATED COUNTERS
   ══════════════════════════════════════════ */
function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  const suffix = el.querySelector('.stat-suffix')?.outerHTML || '';
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
  btn.disabled = true;
  setTimeout(() => { 
    btn.textContent = 'Send Message →'; 
    btn.style.background = ''; 
    btn.disabled = false;
  }, 3000);
}

/* Form input accessibility */
document.querySelectorAll('input, textarea').forEach(input => {
  input.addEventListener('focus', function() {
    this.parentElement?.classList.add('focused');
  }, false);
  input.addEventListener('blur', function() {
    this.parentElement?.classList.remove('focused');
  }, false);
}); 
