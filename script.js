/* ══════════════════════════════════════════
   HARU — script.js
   Beautiful Photography from Brazil
   ══════════════════════════════════════════ */

/* ══════════════════════════════════════════
   DATA
   ══════════════════════════════════════════ */

// Unsplash images (no API key needed for display URLs)
const IMGS = {
  lakeside:  'https://images.unsplash.com/photo-1504173010664-32509107de95?w=1200&q=85',
  bridge:    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=85',
  cat:       'https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=1200&q=85',
  forest:    'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&q=85',
  wildlife1: 'https://images.unsplash.com/photo-1474511320723-9a56873867b5?w=800&q=80',
  wildlife2: 'https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=800&q=80',
  nature1:   'https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?w=800&q=80',
  nature2:   'https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=800&q=80',
  animal1:   'https://images.unsplash.com/photo-1474511320723-9a56873867b5?w=800&q=80',
  animal2:   'https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?w=800&q=80',
  land1:     'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
  land2:     'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=800&q=80',
};

const realPhotos = [
  {
    id: 'r1',
    src: IMGS.lakeside,
    cat: 'wildlife',
    title: 'Harmony by the Water',
    location: 'Lakeside, Brazil',
    price: '$89',
    desc: 'A peaceful lakeside scene with beautiful geese and birds gathered near the water. The reflections on the lake and the calm atmosphere showcase Haru\'s ability to capture harmony between wildlife and nature.',
  },
  {
    id: 'r2',
    src: IMGS.bridge,
    cat: 'nature',
    title: 'Wooden Bridge, Still Waters',
    location: 'Southern Brazil',
    price: '$75',
    desc: 'A serene landscape featuring a wooden bridge, green surroundings, and a tranquil lake. The composition highlights the natural beauty of the environment and Haru\'s eye for peaceful outdoor scenes.',
  },
  {
    id: 'r3',
    src: IMGS.cat,
    cat: 'animal',
    title: 'The Curious Observer',
    location: 'São Paulo, Brazil',
    price: '$65',
    desc: 'A curious cat resting while observing its surroundings. The focus on the cat\'s expression demonstrates Haru\'s talent for capturing personality and emotion in animal photography.',
  },
];

const photos = [
  { id: 'r1', src: IMGS.lakeside,  isReal: true,  cat: 'wildlife',  title: 'Harmony by the Water',      location: 'Lakeside, Brazil',        price: '$89' },
  { id: 'r2', src: IMGS.bridge,    isReal: true,  cat: 'nature',    title: 'Wooden Bridge, Still Waters', location: 'Southern Brazil',         price: '$75' },
  { id: 'r3', src: IMGS.cat,       isReal: true,  cat: 'animal',    title: 'The Curious Observer',        location: 'São Paulo, Brazil',       price: '$65' },
  { id: 'p4', src: IMGS.wildlife1, isReal: true,  cat: 'wildlife',  title: 'Amber Gaze',                  location: 'Pantanal, Brazil',        price: '$78' },
  { id: 'p5', src: IMGS.nature1,   isReal: true,  cat: 'nature',    title: 'Morning Canopy',              location: 'Amazon Rainforest',       price: '$55' },
  { id: 'p6', src: IMGS.animal2,   isReal: true,  cat: 'animal',    title: 'Shell Explorer',              location: 'Florianópolis, Brazil',   price: '$60' },
  { id: 'p7', src: IMGS.land1,     isReal: true,  cat: 'landscape', title: 'Summit Light',                location: 'Serra Gaúcha, Brazil',    price: '$80' },
  { id: 'p8', src: IMGS.wildlife2, isReal: true,  cat: 'wildlife',  title: 'Sunset Encounter',            location: 'Cerrado, Brazil',         price: '$72' },
  { id: 'p9', src: IMGS.nature2,   isReal: true,  cat: 'nature',    title: 'Ancient Grove',               location: 'Mata Atlântica, Brazil',  price: '$58' },
  { id: 'p10',src: IMGS.land2,     isReal: true,  cat: 'landscape', title: 'Red Earth at Dusk',           location: 'Chapada Diamantina, BA',  price: '$84' },
  { id: 'p11',src: IMGS.forest,    isReal: true,  cat: 'nature',    title: 'Cathedral Forest',            location: 'Paraná, Brazil',          price: '$67' },
  { id: 'p12',src: IMGS.animal1,   isReal: true,  cat: 'wildlife',  title: 'Reflection',                  location: 'Iguaçu, Brazil',          price: '$70' },
];

const testimonials = [
  { text: 'Haru photographed our wildlife documentary expedition. Her ability to anticipate animal behaviour and capture it in a single frame is something I have never seen in 20 years of commissioning photographers.', name: 'Dr. Lena Hoffman',  role: 'BBC Wildlife, Series Producer',       init: 'LH' },
  { text: 'We licensed Haru\'s nature series for our climate campaign. The images stopped people mid-scroll and drove a 340% increase in engagement compared to our previous campaign imagery.',                          name: 'Marcus Webb',       role: 'WWF International, Campaign Director', init: 'MW' },
  { text: 'Booked Haru for a wildlife expedition in the Pantanal as a birthday gift. She turned it into the most extraordinary week of my life. The images she delivered are gallery-quality.',                           name: 'Priya Rao',         role: 'Private Client, London',               init: 'PR' },
  { text: 'Haru shot the cover of our annual Nature issue. Her "Wooden Bridge" image became one of the most-shared covers in our magazine history. We work with nobody else for nature commissions.',                    name: 'Sophie Laurent',    role: 'GEO Magazine, Photo Editor',           init: 'SL' },
  { text: 'Purchased three prints for our studio. Every single person who visits asks about them. Haru\'s packaging and delivery was impeccable, and the print quality is extraordinary.',                               name: 'James Okafor',      role: 'Print Collector, New York',            init: 'JO' },
  { text: 'We sent Haru to the Amazon for our "Wild Places" brand campaign. She delivered images that defined our entire visual identity for the next 3 years. Simply the best nature photographer working today.',      name: 'Akiko Tanaka',      role: 'Patagonia, Creative Director',         init: 'AT' },
];

/* ══════════════════════════════════════════
   STATE
   ══════════════════════════════════════════ */
let currentFilter  = 'all';
let filteredPhotos = [...photos];
let lbIndex        = 0;
let lbPool         = realPhotos;
let payTarget      = null;
let testiCurrent   = 0;

/* ══════════════════════════════════════════
   GALLERY
   ══════════════════════════════════════════ */
function renderGallery(filter = 'all') {
  const grid = document.getElementById('photoGrid');
  filteredPhotos = filter === 'all' ? photos : photos.filter(p => p.cat === filter);
  grid.innerHTML = '';

  filteredPhotos.forEach((p, i) => {
    const item = document.createElement('div');
    item.className = 'photo-item photo-item--real';
    item.style.animationDelay = (i % 3 * 0.07) + 's';

    item.innerHTML = `
      <div class="photo-thumb">
        <img src="${p.src}" alt="${p.title}" loading="lazy">
        <div class="photo-hover">
          <div class="photo-hover-cat">${p.cat}</div>
          <div class="photo-hover-title">${p.title}</div>
          <div class="photo-hover-price">${p.price}</div>
        </div>
      </div>`;

    item.addEventListener('click', () => openGalleryLightbox(i));
    grid.appendChild(item);

    // Animate in
    requestAnimationFrame(() => {
      item.style.opacity = '0';
      item.style.transform = 'translateY(20px)';
      item.style.transition = `opacity 0.4s ease ${i * 0.04}s, transform 0.4s ease ${i * 0.04}s`;
      requestAnimationFrame(() => {
        item.style.opacity = '1';
        item.style.transform = 'translateY(0)';
      });
    });
  });
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
function openGalleryLightbox(idx) {
  lbPool  = filteredPhotos;
  lbIndex = idx;
  updateLightbox();
  document.getElementById('lightbox').classList.add('open');
  document.body.style.overflow = 'hidden';
}

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
  const p = lbPool[lbIndex];
  const img = document.getElementById('lbImg');

  if (p && p.src) {
    img.src = p.src;
    img.style.display = 'block';
    document.getElementById('lbPhoto').style.background = '#111';
  } else {
    img.src = '';
    img.style.display = 'none';
  }

  document.getElementById('lbCat').textContent    = (p.cat || 'PHOTOGRAPHY').toUpperCase();
  document.getElementById('lbTitle').textContent  = p.title || '';
  document.getElementById('lbLoc').textContent    = p.location || '';
  document.getElementById('lbDesc').textContent   = p.desc || '';
  document.getElementById('lbPrice').textContent  = p.price || '';
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
  if (!p) return;
  payTarget = { type: 'photo', data: p };

  document.getElementById('payTitle').textContent    = 'Purchase Print';
  document.getElementById('paySubtitle').textContent = 'High-resolution digital download — yours forever.';
  document.getElementById('payItemName').textContent = p.title || 'Photo';
  document.getElementById('payItemSub').textContent  = p.location || '';
  document.getElementById('payItemPrice').textContent = p.price || '';
  document.getElementById('payBtnLabel').textContent = `Pay ${p.price || '$89'}`;

  const imgEl = document.getElementById('payItemImg');
  if (p.src) { imgEl.src = p.src; imgEl.style.display = 'block'; }
  else        { imgEl.style.display = 'none'; }

  document.getElementById('photoBuySection').style.display    = 'block';
  document.getElementById('sessionBookSection').style.display = 'none';
  document.getElementById('paymentModal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function openPaymentSession(key) {
  const sessions = {
    nature:   { name: 'Nature Walk',         price: '$400',   dur: 'Half day' },
    wildlife: { name: 'Wildlife Expedition',  price: '$1,800', dur: '2 full days' },
    world:    { name: 'World Assignment',     price: '$3,500', dur: 'Custom timeline' },
    portrait: { name: 'Portrait Session',     price: '$350',   dur: '2 hours' },
  };
  const s = sessions[key] || sessions.nature;
  payTarget = { type: 'session', data: s };

  document.getElementById('payTitle').textContent    = 'Book a Session';
  document.getElementById('paySubtitle').textContent = 'Reserve your session — confirmed within 24 hours.';
  document.getElementById('payItemName').textContent = s.name;
  document.getElementById('payItemSub').textContent  = s.dur;
  document.getElementById('payItemPrice').textContent = s.price;
  document.getElementById('payBtnLabel').textContent = `Book for ${s.price}`;

  const imgEl = document.getElementById('payItemImg');
  imgEl.src = IMGS.lakeside; imgEl.style.display = 'block';

  document.getElementById('photoBuySection').style.display    = 'none';
  document.getElementById('sessionBookSection').style.display = 'block';

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

/* Method tabs */
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
    openPaymentSession(opt.dataset.key);
  });
});

/* Simulate payment */
function processPayment(btn) {
  const orig = btn.innerHTML;
  btn.innerHTML = '<span>⏳ Processing...</span>';
  btn.disabled = true;
  setTimeout(() => {
    btn.innerHTML = '<span>✅ Confirmed!</span>';
    btn.style.background = '#22c55e';
    setTimeout(() => {
      closePayment();
      btn.innerHTML = orig;
      btn.disabled = false;
      btn.style.background = '';
      showToast(payTarget?.type === 'session'
        ? '📅 Session booked! Confirmation email on its way.'
        : '🖼️ Download link sent to your email!');
    }, 1800);
  }, 2200);
}

/* ══════════════════════════════════════════
   TOAST
   ══════════════════════════════════════════ */
function showToast(msg) {
  const existing = document.querySelector('.haru-toast');
  if (existing) existing.remove();

  const t = document.createElement('div');
  t.className = 'haru-toast';
  t.style.cssText = [
    'position:fixed',
    'bottom:2rem',
    'left:50%',
    'transform:translateX(-50%) translateY(20px)',
    'background:#111',
    'color:#fff',
    'padding:0.8rem 1.6rem',
    'border-radius:100px',
    'font-family:"Helvetica Neue",Helvetica,Arial,sans-serif',
    'font-size:0.85rem',
    'font-weight:600',
    'z-index:99999',
    'white-space:nowrap',
    'box-shadow:0 8px 32px rgba(0,0,0,0.3)',
    'transition:transform 0.3s ease, opacity 0.3s ease',
    'opacity:0',
  ].join(';');
  t.textContent = msg;
  document.body.appendChild(t);

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      t.style.transform = 'translateX(-50%) translateY(0)';
      t.style.opacity = '1';
    });
  });

  setTimeout(() => {
    t.style.opacity = '0';
    t.style.transform = 'translateX(-50%) translateY(10px)';
    setTimeout(() => t.remove(), 300);
  }, 3500);
}

/* ══════════════════════════════════════════
   NAV + SCROLL
   ══════════════════════════════════════════ */
const navbar   = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-links a:not(.nav-cta)');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);

  let cur = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 120) cur = s.id;
  });
  navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + cur));
}, { passive: true });

/* ══════════════════════════════════════════
   MOBILE MENU
   ══════════════════════════════════════════ */
const hamburger   = document.getElementById('hamburger');
const mobileMenu  = document.getElementById('mobileMenu');
const mobileClose = document.getElementById('mobileClose');

hamburger.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', isOpen);
  mobileMenu.setAttribute('aria-hidden', !isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

mobileClose.addEventListener('click', closeMobile);

function closeMobile() {
  mobileMenu.classList.remove('open');
  hamburger.setAttribute('aria-expanded', 'false');
  mobileMenu.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

/* ══════════════════════════════════════════
   TESTIMONIALS CAROUSEL
   ══════════════════════════════════════════ */
function perView() {
  if (window.innerWidth < 640)  return 1;
  if (window.innerWidth < 1024) return 2;
  return 3;
}

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

  const total = Math.max(1, testimonials.length - perView() + 1);
  dots.innerHTML = Array.from({ length: total }, (_, i) =>
    `<div class="testi-dot${i === 0 ? ' active' : ''}" onclick="goToTesti(${i})" role="button" tabindex="0" aria-label="Go to testimonial ${i + 1}"></div>`
  ).join('');
}

function goToTesti(i) {
  const track = document.getElementById('testiTrack');
  const card  = track.querySelector('.testi-card');
  if (!card) return;

  const maxIdx = Math.max(0, testimonials.length - perView());
  testiCurrent = Math.max(0, Math.min(i, maxIdx));
  const cardW  = card.offsetWidth + 24; // gap
  track.style.transform = `translateX(-${testiCurrent * cardW}px)`;

  document.querySelectorAll('.testi-dot').forEach((d, j) => {
    d.classList.toggle('active', j === testiCurrent);
  });
}

document.getElementById('testiPrev').addEventListener('click', () => goToTesti(testiCurrent - 1));
document.getElementById('testiNext').addEventListener('click', () => goToTesti(testiCurrent + 1));

let testiInterval = setInterval(() => {
  const max = Math.max(0, testimonials.length - perView());
  goToTesti(testiCurrent >= max ? 0 : testiCurrent + 1);
}, 5000);

// Pause on hover
document.getElementById('testiTrack').addEventListener('mouseenter', () => clearInterval(testiInterval));
document.getElementById('testiTrack').addEventListener('mouseleave', () => {
  testiInterval = setInterval(() => {
    const max = Math.max(0, testimonials.length - perView());
    goToTesti(testiCurrent >= max ? 0 : testiCurrent + 1);
  }, 5000);
});

renderTestimonials();
window.addEventListener('resize', () => {
  renderTestimonials();
  goToTesti(0);
});

/* ══════════════════════════════════════════
   ANIMATED COUNTERS
   ══════════════════════════════════════════ */
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const suffix = el.querySelector('.stat-suffix')?.outerHTML || '';
  const duration = 1800;
  const step = target / (duration / 16);
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
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.aos, .stat-number').forEach(el => observer.observe(el));

/* ══════════════════════════════════════════
   CONTACT FORM
   ══════════════════════════════════════════ */
function submitForm(e) {
  e.preventDefault();
  const btn = document.getElementById('formSubmitBtn');
  const origContent = btn.innerHTML;

  btn.innerHTML = '<span>⏳ Sending...</span>';
  btn.disabled = true;

  setTimeout(() => {
    btn.innerHTML = '<span>✅ Message Sent!</span>';
    btn.classList.add('success');

    document.getElementById('contactForm').reset();

    setTimeout(() => {
      btn.innerHTML = origContent;
      btn.classList.remove('success');
      btn.disabled = false;
      showToast('✉️ Message received! Haru will reply within 48 hours.');
    }, 2500);
  }, 1500);

  return false;
}

/* ══════════════════════════════════════════
   SMOOTH ANCHOR SCROLL (for older browsers)
   ══════════════════════════════════════════ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = document.getElementById('navbar').offsetHeight + 16;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

/* ══════════════════════════════════════════
   LAZY IMAGE LOADING (native + fallback)
   ══════════════════════════════════════════ */
if ('loading' in HTMLImageElement.prototype) {
  // Native lazy loading supported — nothing extra needed
} else {
  // Fallback: IntersectionObserver for images
  const imgObserver = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const img = e.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          imgObserver.unobserve(img);
        }
      }
    });
  });
  document.querySelectorAll('img[loading="lazy"]').forEach(img => imgObserver.observe(img));
}
