/* ══════════════════════════════════════════
   HARU — script.js   (Production-Ready)
   Nature & Wildlife Photography Portfolio
   ══════════════════════════════════════════ */

'use strict';

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */
const BASE = 'https://github.com/abhishektech10/photographerportfolio/releases/download/Picture/';
const IMG  = (n) => BASE + `pic${n}.jpg`;

const realPhotos = [
  { id:'r1', src:IMG(1), isReal:true, cat:'wildlife', title:'Lakeside Birds',         location:'Pantanal, Brazil',              price:'$89', priceNum:89, desc:'A peaceful lakeside scene with beautiful geese gathered near the water — one of Haru\'s most beloved shots from the Brazilian wetlands.' },
  { id:'r2', src:IMG(2), isReal:true, cat:'nature',   title:'Scenic Lake Landscape',  location:'Serra da Mantiqueira, Brazil',  price:'$75', priceNum:75, desc:'A serene lake framed by wooden bridges and lush green hills. Shot at golden hour with a long exposure to capture the perfect stillness.' },
  { id:'r3', src:IMG(3), isReal:true, cat:'portrait', title:'Cat Portrait',           location:'São Paulo, Brazil',            price:'$95', priceNum:95, desc:'A curious cat captured mid-thought, observing its surroundings. This image demonstrates Haru\'s talent for personality and emotion in animal photography.' },
];

const photos = [
  { id:'r1', src:IMG(1), isReal:true,  cat:'wildlife',  title:'Lakeside Birds',          location:'Pantanal, Brazil',             price:'$89',  priceNum:89  },
  { id:'r2', src:IMG(2), isReal:true,  cat:'nature',    title:'Scenic Lake Landscape',   location:'Serra da Mantiqueira, Brazil', price:'$75',  priceNum:75  },
  { id:'r3', src:IMG(3), isReal:true,  cat:'portrait',  title:'Cat Portrait',            location:'São Paulo, Brazil',           price:'$95',  priceNum:95  },
  { id:'p4', emoji:'🦁', isReal:false, cat:'wildlife',  title:'The Sovereign',           location:'Masai Mara, Kenya',           price:'$65',  priceNum:65  },
  { id:'p5', emoji:'🌲', isReal:false, cat:'nature',    title:'Cathedral Forest',        location:'Olympic NP, USA',             price:'$55',  priceNum:55  },
  { id:'p6', emoji:'🐘', isReal:false, cat:'animal',   title:'The Matriarch',           location:'Amboseli, Kenya',             price:'$72',  priceNum:72  },
  { id:'p7', emoji:'🏔️',isReal:false, cat:'landscape', title:'Above the Clouds',        location:'Patagonia, Chile',            price:'$80',  priceNum:80  },
  { id:'p8', emoji:'🦅', isReal:false, cat:'wildlife',  title:'Thermal Rider',           location:'Grand Canyon, USA',           price:'$58',  priceNum:58  },
  { id:'p9', emoji:'🌊', isReal:false, cat:'nature',    title:'The Wave Breaks',         location:'Nazaré, Portugal',            price:'$69',  priceNum:69  },
  { id:'p10',emoji:'🐺', isReal:false, cat:'animal',   title:'Pack Leader',             location:'Yellowstone, USA',            price:'$77',  priceNum:77  },
  { id:'p11',emoji:'🌅', isReal:false, cat:'landscape', title:'Golden Delta',            location:'Okavango Delta, Botswana',    price:'$84',  priceNum:84  },
  { id:'p12',emoji:'🦋', isReal:false, cat:'nature',    title:'Metamorphosis',           location:'Costa Rica',                  price:'$48',  priceNum:48  },
];

const catGrads = {
  wildlife:  'linear-gradient(135deg,#e8f5e9,#a5d6a7)',
  nature:    'linear-gradient(135deg,#e3f2fd,#90caf9)',
  animal:    'linear-gradient(135deg,#fff3e8,#ffcc80)',
  landscape: 'linear-gradient(135deg,#f3e5f5,#ce93d8)',
  portrait:  'linear-gradient(135deg,#fce4ec,#f48fb1)',
};
const catGrad = (cat) => catGrads[cat] || 'linear-gradient(135deg,#f5f5f5,#e0e0e0)';

const sessions = {
  nature:   { name:'Nature Walk',         price:'$400',   priceNum:400,  dur:'Half day' },
  wildlife: { name:'Wildlife Expedition', price:'$1,800', priceNum:1800, dur:'2 full days' },
  world:    { name:'World Assignment',    price:'$3,500', priceNum:3500, dur:'Custom' },
  portrait: { name:'Portrait Session',    price:'$350',   priceNum:350,  dur:'2 hrs' },
};

const testimonials = [
  { text:"Haru photographed our wildlife documentary expedition in Kenya. Her ability to anticipate animal behaviour and capture it in a single frame is something I have never seen in 20 years of commissioning photographers.", name:'Dr. Lena Hoffman',  role:'BBC Wildlife, Series Producer',       init:'LH' },
  { text:"We licensed Haru's Arctic series for our climate campaign. The images stopped people mid-scroll and drove a 340% increase in donations compared to our previous campaign imagery.",                                    name:'Marcus Webb',       role:'WWF International, Campaign Director', init:'MW' },
  { text:"Booked Haru for a wildlife expedition in Botswana as a birthday gift. She turned it into the most extraordinary week of my life. The images she delivered are gallery-quality — framed and hanging in my home.",        name:'Priya Rao',         role:'Private Client, London',              init:'PR' },
  { text:"Haru shot the cover of our annual Nature issue. Her photograph became one of the most-shared covers in our magazine history. We work with nobody else for nature commissions.",                                          name:'Sophie Laurent',    role:'GEO Magazine, Photo Editor',          init:'SL' },
  { text:"Purchased three prints for our office. Every single person who walks in asks about them. Haru's packaging and delivery was impeccable, and the print quality is extraordinary.",                                         name:'James Okafor',      role:'Print Collector, New York',           init:'JO' },
  { text:"We sent Haru to Iceland for our Wild Places brand campaign. She delivered images that defined our entire visual identity for the next three years. Simply the best nature photographer working today.",                   name:'Akiko Tanaka',      role:'Patagonia, Creative Director',         init:'AT' },
];

/* ─────────────────────────────────────────
   STATE
───────────────────────────────────────── */
let currentFilter  = 'all';
let filteredPhotos = [...photos];
let lbIndex        = 0;
let lbPool         = realPhotos;
let payTarget      = null;
let testiCurrent   = 0;
let testiAutoTimer = null;
let isPayOpen      = false;
let isLbOpen       = false;

/* ─────────────────────────────────────────
   UTILS
───────────────────────────────────────── */
function qs(sel, ctx = document)  { return ctx.querySelector(sel); }
function qsa(sel, ctx = document) { return [...ctx.querySelectorAll(sel)]; }

function showToast(msg) {
  const container = qs('#toastContainer');
  if (!container) return;
  const t = document.createElement('div');
  t.className = 'toast';
  t.textContent = msg;
  t.setAttribute('role', 'status');
  container.appendChild(t);
  setTimeout(() => {
    t.classList.add('out');
    t.addEventListener('animationend', () => t.remove(), { once: true });
  }, 3600);
}

function trapFocus(el) {
  const focusable = qsa('a,button,input,textarea,select,[tabindex]:not([tabindex="-1"])', el)
    .filter(f => !f.disabled && f.offsetParent !== null);
  if (!focusable.length) return;
  const first = focusable[0], last = focusable[focusable.length - 1];
  el._trapHandler = (e) => {
    if (e.key !== 'Tab') return;
    if (e.shiftKey) { if (document.activeElement === first) { e.preventDefault(); last.focus(); } }
    else             { if (document.activeElement === last)  { e.preventDefault(); first.focus(); } }
  };
  el.addEventListener('keydown', el._trapHandler);
  focusable[0].focus();
}

function releaseFocus(el) {
  if (el._trapHandler) el.removeEventListener('keydown', el._trapHandler);
}

/* ─────────────────────────────────────────
   INTERSECTION OBSERVER
───────────────────────────────────────── */
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add('visible');
    if (e.target.classList.contains('stat-number')) animateCounter(e.target);
    observer.unobserve(e.target);
  });
}, { threshold: 0.12 });

function observeAos() {
  qsa('.aos, .stat-number').forEach(el => observer.observe(el));
}
observeAos();

/* ─────────────────────────────────────────
   ANIMATED COUNTERS
───────────────────────────────────────── */
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  if (isNaN(target)) return;
  const suffixEl = el.querySelector('.stat-suffix');
  const suffix   = suffixEl ? suffixEl.outerHTML : '';
  const step     = target / (1800 / 16);
  let cur        = 0;
  const iv = setInterval(() => {
    cur = Math.min(cur + step, target);
    el.innerHTML = Math.floor(cur) + suffix;
    if (cur >= target) clearInterval(iv);
  }, 16);
}

/* ─────────────────────────────────────────
   NAVIGATION
───────────────────────────────────────── */
const navbar   = qs('#navbar');
const navLinks = qsa('.nav-links a:not(.nav-cta)');
const sections = qsa('section[id]');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
  let cur = '';
  sections.forEach(s => { if (window.scrollY >= s.offsetTop - 120) cur = s.id; });
  navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + cur));
}, { passive: true });

/* Mobile menu */
const hamburger   = qs('#hamburger');
const mobileMenu  = qs('#mobileMenu');
const mobileClose = qs('#mobileClose');
let prevFocus     = null;

function openMobile() {
  prevFocus = document.activeElement;
  mobileMenu.removeAttribute('hidden');
  mobileMenu.classList.add('open');
  hamburger.classList.add('open');
  hamburger.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
  trapFocus(mobileMenu);
}

function closeMobile() {
  mobileMenu.classList.remove('open');
  hamburger.classList.remove('open');
  hamburger.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
  releaseFocus(mobileMenu);
  setTimeout(() => {
    mobileMenu.setAttribute('hidden', '');
    if (prevFocus) prevFocus.focus();
  }, 300);
}

hamburger.addEventListener('click', () => {
  mobileMenu.classList.contains('open') ? closeMobile() : openMobile();
});
mobileClose.addEventListener('click', closeMobile);

qsa('.mobile-link').forEach(link => {
  link.addEventListener('click', closeMobile);
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    if (mobileMenu.classList.contains('open')) closeMobile();
    if (isLbOpen) closeLightbox();
    if (isPayOpen) closePayment();
  }
});

/* ─────────────────────────────────────────
   GALLERY
───────────────────────────────────────── */
function renderGallery(filter = 'all') {
  const grid = qs('#photoGrid');
  filteredPhotos = filter === 'all' ? [...photos] : photos.filter(p => p.cat === filter);
  grid.innerHTML = '';

  filteredPhotos.forEach((p, i) => {
    const item = document.createElement('div');
    item.className = 'photo-item' + (p.isReal ? ' photo-item--real' : '') + ' aos';
    item.style.transitionDelay = (i % 3 * 0.07) + 's';
    item.setAttribute('role', 'listitem');
    item.setAttribute('tabindex', '0');
    item.setAttribute('aria-label', `${p.title} — ${p.cat} — ${p.price}`);

    let thumbContent;
    if (p.isReal) {
      thumbContent = `<img src="${p.src}" alt="${p.title}" loading="lazy" width="400" height="300">`;
    } else {
      thumbContent = `<div class="photo-emoji" aria-hidden="true" style="background:${catGrad(p.cat)};aspect-ratio:4/3;width:100%">${p.emoji}</div>`;
    }

    item.innerHTML = `
      <div class="photo-thumb"${p.isReal ? '' : ''}>
        ${thumbContent}
        <div class="photo-hover" aria-hidden="true">
          <div class="photo-hover-cat">${p.cat}</div>
          <div class="photo-hover-title">${p.title}</div>
          <div class="photo-hover-price">${p.price}</div>
        </div>
      </div>`;

    const handler = () => openGalleryLightbox(i);
    item.addEventListener('click', handler);
    item.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handler(); } });
    grid.appendChild(item);
  });

  // Re-observe new AOS elements
  qsa('.aos', grid).forEach(el => observer.observe(el));
}

// Filter buttons
qs('#filterTabs').addEventListener('click', e => {
  const btn = e.target.closest('.filter-btn');
  if (!btn) return;
  qsa('.filter-btn').forEach(b => {
    b.classList.remove('active');
    b.setAttribute('aria-pressed', 'false');
  });
  btn.classList.add('active');
  btn.setAttribute('aria-pressed', 'true');
  currentFilter = btn.dataset.filter;
  renderGallery(currentFilter);
});

renderGallery();

/* ─────────────────────────────────────────
   FEATURED SECTION BUTTONS
───────────────────────────────────────── */
for (let i = 0; i < 3; i++) {
  const imgWrap = qs(`#feat-img-${i}`);
  const btn     = qs(`#feat-btn-${i}`);
  const handler = () => openLightboxReal(i);

  if (imgWrap) {
    imgWrap.addEventListener('click', handler);
    imgWrap.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handler(); } });
  }
  if (btn) btn.addEventListener('click', handler);
}

/* ─────────────────────────────────────────
   LIGHTBOX
───────────────────────────────────────── */
const lightbox  = qs('#lightbox');
const lbImg     = qs('#lbImg');
const lbEmoji   = qs('#lbEmoji');
const lbImgWrap = qs('#lbImgWrap');

function openGalleryLightbox(idx) {
  lbPool  = filteredPhotos;
  lbIndex = idx;
  updateLightbox();
  openLightboxEl();
}

function openLightboxReal(idx) {
  lbPool  = realPhotos;
  lbIndex = idx;
  updateLightbox();
  openLightboxEl();
}

function openLightboxEl() {
  prevFocus = document.activeElement;
  lightbox.classList.add('open');
  lightbox.removeAttribute('aria-hidden');
  document.body.style.overflow = 'hidden';
  isLbOpen = true;
  trapFocus(lightbox);
}

function closeLightbox() {
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = isPayOpen ? 'hidden' : '';
  releaseFocus(lightbox);
  isLbOpen = false;
  setTimeout(() => { if (prevFocus && !isPayOpen) prevFocus.focus(); }, 300);
}

function updateLightbox() {
  const p = lbPool[lbIndex];
  if (!p) return;

  if (p.isReal && p.src) {
    lbImg.src = p.src;
    lbImg.alt = p.title || '';
    lbImg.style.display = 'block';
    lbImgWrap.style.background = '#0f0f0f';
    lbEmoji.style.display = 'none';
  } else {
    lbImg.src = '';
    lbImg.style.display = 'none';
    lbImgWrap.style.background = catGrad(p.cat);
    lbEmoji.style.display = 'block';
    lbEmoji.textContent = p.emoji || '📷';
  }

  qs('#lbCat').textContent     = (p.cat || 'PHOTOGRAPHY').toUpperCase();
  qs('#lbTitle').textContent   = p.title || '';
  qs('#lbLoc').textContent     = p.location || '';
  qs('#lbDesc').textContent    = p.desc || '';
  qs('#lbPrice').textContent   = p.price || '';
  qs('#lbCounter').textContent = `${lbIndex + 1} / ${lbPool.length}`;

  qs('#lbPrev').setAttribute('aria-label', `Previous photo (${((lbIndex - 1 + lbPool.length) % lbPool.length) + 1} of ${lbPool.length})`);
  qs('#lbNext').setAttribute('aria-label', `Next photo (${((lbIndex + 1) % lbPool.length) + 1} of ${lbPool.length})`);
}

qs('#lbPrev').addEventListener('click', () => {
  lbIndex = (lbIndex - 1 + lbPool.length) % lbPool.length;
  updateLightbox();
});
qs('#lbNext').addEventListener('click', () => {
  lbIndex = (lbIndex + 1) % lbPool.length;
  updateLightbox();
});
qs('#lbClose').addEventListener('click', closeLightbox);

lightbox.addEventListener('click', e => {
  if (e.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', e => {
  if (!isLbOpen) return;
  if (e.key === 'ArrowLeft')  { lbIndex = (lbIndex - 1 + lbPool.length) % lbPool.length; updateLightbox(); }
  if (e.key === 'ArrowRight') { lbIndex = (lbIndex + 1) % lbPool.length; updateLightbox(); }
});

// Buy print button from lightbox
qs('#lbBuyBtn').addEventListener('click', () => {
  const p = lbPool[lbIndex];
  openPaymentPhoto(p);
});

/* ─────────────────────────────────────────
   PAYMENT MODAL
───────────────────────────────────────── */
const payModal = qs('#payModal');

function openPaymentPhoto(p) {
  if (!p) return;
  payTarget = { type: 'photo', data: p };

  qs('#payTitle').textContent    = 'Purchase Print';
  qs('#paySubtitle').textContent = 'High-resolution digital download — yours forever.';
  qs('#payItemName').textContent = p.title || 'Photo';
  qs('#payItemSub').textContent  = p.location || '';
  qs('#payItemPrice').textContent= p.price || '';
  qs('#payBtnLabel').textContent = `Pay ${p.price || '$89'}`;

  const imgEl = qs('#payItemImg');
  if (p.src) { imgEl.src = p.src; imgEl.alt = p.title || ''; imgEl.style.display = 'block'; }
  else        { imgEl.style.display = 'none'; }

  qs('#photoBuySection').style.display   = 'block';
  qs('#sessionBuySection').style.display = 'none';

  // Reset size chips
  qsa('.size-chip').forEach((c, i) => {
    c.classList.toggle('active', i === 0);
    c.setAttribute('aria-pressed', i === 0 ? 'true' : 'false');
  });

  openPayModalEl();
}

function openPaymentSession(key) {
  const s = sessions[key] || sessions.nature;
  payTarget = { type: 'session', data: s, key };

  qs('#payTitle').textContent    = 'Book a Session';
  qs('#paySubtitle').textContent = 'Reserve your photography session — confirmed within 24 hrs.';
  qs('#payItemName').textContent = s.name;
  qs('#payItemSub').textContent  = s.dur;
  qs('#payItemPrice').textContent= s.price;
  qs('#payBtnLabel').textContent = `Book for ${s.price}`;

  const imgEl = qs('#payItemImg');
  imgEl.src = IMG(1); imgEl.alt = 'Session preview'; imgEl.style.display = 'block';

  qs('#photoBuySection').style.display   = 'none';
  qs('#sessionBuySection').style.display = 'block';

  qsa('.session-chip').forEach(o => {
    const active = o.dataset.key === key;
    o.classList.toggle('active', active);
    o.setAttribute('aria-pressed', active ? 'true' : 'false');
  });

  openPayModalEl();
}

function openPayModalEl() {
  prevFocus = document.activeElement;
  payModal.classList.add('open');
  payModal.removeAttribute('aria-hidden');
  document.body.style.overflow = 'hidden';
  isPayOpen = true;
  trapFocus(payModal);
}

function closePayment() {
  payModal.classList.remove('open');
  payModal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = isLbOpen ? 'hidden' : '';
  releaseFocus(payModal);
  isPayOpen = false;
  setTimeout(() => { if (prevFocus) prevFocus.focus(); }, 300);
}

qs('#payClose').addEventListener('click', closePayment);
payModal.addEventListener('click', e => { if (e.target === payModal) closePayment(); });

// Pricing card book buttons
qsa('.btn-book').forEach(btn => {
  btn.addEventListener('click', () => openPaymentSession(btn.dataset.session));
});

// Payment method tabs
qsa('.pay-method').forEach(tab => {
  tab.addEventListener('click', () => {
    qsa('.pay-method').forEach(t => { t.classList.remove('active'); t.setAttribute('aria-pressed','false'); });
    tab.classList.add('active');
    tab.setAttribute('aria-pressed','true');
    qsa('.pay-form-section').forEach(s => s.style.display = 'none');
    const target = qs('#form-' + tab.dataset.method);
    if (target) target.style.display = 'block';
  });
});

// Size chips
qsa('.size-chip').forEach(chip => {
  chip.addEventListener('click', () => {
    qsa('.size-chip').forEach(c => { c.classList.remove('active'); c.setAttribute('aria-pressed','false'); });
    chip.classList.add('active');
    chip.setAttribute('aria-pressed','true');
    const price = parseInt(chip.dataset.price, 10);
    if (!isNaN(price)) {
      const label = price === 0 ? 'Free (Digital)' : `Pay $${price}`;
      qs('#payBtnLabel').textContent = label;
    }
  });
});

// Session chips
qsa('.session-chip').forEach(chip => {
  chip.addEventListener('click', () => {
    qsa('.session-chip').forEach(c => { c.classList.remove('active'); c.setAttribute('aria-pressed','false'); });
    chip.classList.add('active');
    chip.setAttribute('aria-pressed','true');
    const price = parseInt(chip.dataset.price, 10);
    if (!isNaN(price)) {
      qs('#payBtnLabel').textContent = `Book for $${price.toLocaleString()}`;
      qs('#payItemPrice').textContent = `$${price.toLocaleString()}`;
    }
  });
});

// Process payment
qs('#payBtn').addEventListener('click', function() {
  const btn = this;
  const orig = qs('#payBtnLabel').textContent;
  btn.disabled = true;
  qs('#payBtnLabel').textContent = '⏳ Processing…';
  setTimeout(() => {
    qs('#payBtnLabel').textContent = '✅ Confirmed!';
    btn.style.background = '#22c55e';
    setTimeout(() => {
      closePayment();
      btn.disabled = false;
      btn.style.background = '';
      qs('#payBtnLabel').textContent = orig;
      showToast(payTarget?.type === 'session'
        ? '📅 Session booked! Confirmation email on its way.'
        : '🖼️ Download link sent to your email!');
    }, 1800);
  }, 2200);
});

/* ─────────────────────────────────────────
   SERVICE PILLS (contact form)
───────────────────────────────────────── */
qsa('#servicePills .service-pill').forEach(pill => {
  pill.addEventListener('click', () => {
    qsa('#servicePills .service-pill').forEach(p => {
      p.classList.remove('active');
      p.setAttribute('aria-pressed', 'false');
    });
    pill.classList.add('active');
    pill.setAttribute('aria-pressed', 'true');
  });
});

/* ─────────────────────────────────────────
   TESTIMONIALS CAROUSEL
───────────────────────────────────────── */
function perView() {
  if (window.innerWidth >= 1024) return 3;
  if (window.innerWidth >= 640)  return 2;
  return 1;
}

function renderTestimonials() {
  const track = qs('#testiTrack');
  const dots  = qs('#testiDots');
  if (!track || !dots) return;

  track.innerHTML = testimonials.map((t, i) => `
    <div class="testi-card" role="article" aria-label="Testimonial from ${t.name}">
      <div class="testi-stars" aria-label="5 stars">★★★★★</div>
      <blockquote class="testi-quote">${t.text}</blockquote>
      <div class="testi-author">
        <div class="testi-avatar" aria-hidden="true">${t.init}</div>
        <div>
          <div class="testi-name">${t.name}</div>
          <div class="testi-role">${t.role}</div>
        </div>
      </div>
    </div>`).join('');

  const totalDots = Math.max(1, testimonials.length - perView() + 1);
  dots.innerHTML = Array.from({ length: totalDots }, (_, i) =>
    `<button class="testi-dot ${i === 0 ? 'active' : ''}" data-i="${i}" aria-label="Go to testimonial page ${i + 1}" role="tab"></button>`
  ).join('');

  dots.querySelectorAll('.testi-dot').forEach(dot => {
    dot.addEventListener('click', () => goToTesti(parseInt(dot.dataset.i, 10)));
  });

  testiCurrent = 0;
  applyTestiTransform();
}

function applyTestiTransform() {
  const track = qs('#testiTrack');
  const cards = qsa('.testi-card', track);
  if (!cards.length) return;
  const cardW   = cards[0].offsetWidth;
  const gap     = 20; // matches CSS 1.25rem ≈ 20px
  const offset  = testiCurrent * (cardW + gap);
  track.style.transform = `translateX(-${offset}px)`;
  qsa('.testi-dot').forEach((d, j) => d.classList.toggle('active', j === testiCurrent));
}

function goToTesti(i) {
  const maxIdx = Math.max(0, testimonials.length - perView());
  testiCurrent = Math.max(0, Math.min(i, maxIdx));
  applyTestiTransform();
}

qs('#testiPrev').addEventListener('click', () => goToTesti(testiCurrent - 1));
qs('#testiNext').addEventListener('click', () => goToTesti(testiCurrent + 1));

function startTestiAuto() {
  clearInterval(testiAutoTimer);
  testiAutoTimer = setInterval(() => {
    const maxIdx = Math.max(0, testimonials.length - perView());
    goToTesti(testiCurrent >= maxIdx ? 0 : testiCurrent + 1);
  }, 5000);
}

qs('#testimonials').addEventListener('mouseenter', () => clearInterval(testiAutoTimer));
qs('#testimonials').addEventListener('mouseleave', startTestiAuto);
qs('#testimonials').addEventListener('focusin',    () => clearInterval(testiAutoTimer));
qs('#testimonials').addEventListener('focusout',   startTestiAuto);

let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => { renderTestimonials(); startTestiAuto(); }, 150);
}, { passive: true });

renderTestimonials();
startTestiAuto();

/* ─────────────────────────────────────────
   CONTACT FORM
───────────────────────────────────────── */
function validateField(input) {
  const id    = input.id;
  const errEl = qs(`#${id}-error`);
  if (!errEl) return true;

  let msg = '';
  if (input.required && !input.value.trim()) {
    msg = 'This field is required.';
  } else if (input.type === 'email' && input.value) {
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRe.test(input.value.trim())) msg = 'Please enter a valid email address.';
  }

  errEl.textContent = msg;
  input.classList.toggle('error', !!msg);
  return !msg;
}

qsa('#firstName, #lastName, #email, #message').forEach(input => {
  input.addEventListener('blur',  () => validateField(input));
  input.addEventListener('input', () => { if (input.classList.contains('error')) validateField(input); });
});

qs('#submitBtn').addEventListener('click', () => {
  const fields  = qsa('#firstName, #lastName, #email, #message');
  const allOk   = fields.map(validateField).every(Boolean);
  const status  = qs('#formStatus');
  const btn     = qs('#submitBtn');

  if (!allOk) {
    status.className = 'form-status error';
    status.textContent = 'Please fix the errors above before submitting.';
    const first = fields.find(f => f.classList.contains('error'));
    if (first) first.focus();
    return;
  }

  btn.disabled = true;
  status.className = 'form-status';
  status.textContent = '';

  // Simulate submission
  setTimeout(() => {
    status.className = 'form-status success';
    status.textContent = '✓ Message sent! Haru will reply within 24 hours.';
    fields.forEach(f => {
      f.value = '';
      f.classList.remove('error');
      const err = qs(`#${f.id}-error`);
      if (err) err.textContent = '';
    });
    qs('#phone').value = '';
    qs('#date').value  = '';
    btn.disabled = false;
    btn.textContent = '✓ Sent!';
    btn.style.background = '#22c55e';
    setTimeout(() => {
      btn.innerHTML = 'Send Message <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>';
      btn.style.background = '';
    }, 3000);
  }, 1500);
});

/* ─────────────────────────────────────────
   CARD NUMBER FORMATTING
───────────────────────────────────────── */
const cardNumberInput = qs('#cardNumber');
if (cardNumberInput) {
  cardNumberInput.addEventListener('input', function() {
    let v = this.value.replace(/\D/g,'').substring(0,16);
    this.value = v.replace(/(.{4})/g,'$1 ').trim();
  });
}
const cardExpiryInput = qs('#cardExpiry');
if (cardExpiryInput) {
  cardExpiryInput.addEventListener('input', function() {
    let v = this.value.replace(/\D/g,'').substring(0,4);
    if (v.length >= 2) v = v.substring(0,2) + ' / ' + v.substring(2);
    this.value = v;
  });
}
