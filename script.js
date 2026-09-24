const WHATSAPP = '9779848460294';
const $ = id => document.getElementById(id);
const canHover = matchMedia('(hover:hover) and (pointer:fine)').matches && !matchMedia('(prefers-reduced-motion: reduce)').matches;

/* Footer year */
if ($('year')) $('year').textContent = new Date().getFullYear();

/* Mobile menu */
const menuToggle = $('menuToggle'), navLinks = $('navLinks');
if (menuToggle && navLinks) {
  const setMenu = open => {
    navLinks.classList.toggle('open', open);
    menuToggle.classList.toggle('active', open);
    menuToggle.setAttribute('aria-expanded', String(open));
  };
  menuToggle.addEventListener('click', () => setMenu(!navLinks.classList.contains('open')));
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });
}

/* Scroll reveal (falls back to visible if unsupported) */
const revealEls = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver(entries => entries.forEach(en => {
    if (en.isIntersecting) { en.target.classList.add('visible'); io.unobserve(en.target); }
  }), { threshold: 0.08 });
  revealEls.forEach(el => io.observe(el));
} else revealEls.forEach(el => el.classList.add('visible'));

/* Order modal */
const modal = $('orderModal');
if (modal) {
  const title = $('modalTitle'), nameInput = $('customerName'), noteInput = $('customerNote'), toast = $('toast');
  let plan = '', lastBtn = null;
  const closeModal = () => {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
    if (lastBtn) lastBtn.focus();
  };
  document.querySelectorAll('.order-btn').forEach(btn => btn.addEventListener('click', () => {
    plan = btn.dataset.plan; lastBtn = btn;
    title.textContent = plan;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
    setTimeout(() => nameInput.focus(), 80);
  }));
  $('modalClose').addEventListener('click', closeModal);
  modal.querySelector('.modal-backdrop').addEventListener('click', closeModal);
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && modal.classList.contains('open')) closeModal(); });
  $('modalSend').addEventListener('click', () => {
    const name = nameInput.value.trim() || 'A customer';
    const note = noteInput.value.trim() || 'I would like to discuss this package.';
    const text = `Hello Quantrex Solutions!\n\nName: ${name}\nPackage: ${plan}\nProject details: ${note}\n\nI'd like to get started.`;
    closeModal();
    toast.classList.add('show');
    setTimeout(() => window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`, '_blank', 'noopener'), 250);
    setTimeout(() => toast.classList.remove('show'), 2600);
  });
}

/* Premium loader (index page only) */
(() => {
  const loader = $('premium-loader');
  if (!loader) return;
  const bar = $('loaderProgress'), pct = $('loaderPercent'), status = $('loaderStatus');
  let value = 0, finished = false;
  document.body.style.overflow = 'hidden';
  const finish = () => {
    if (finished) return; finished = true;
    loader.classList.add('loader-hidden');
    document.body.style.overflow = '';
    setTimeout(() => loader.remove(), 700);
  };
  const timer = setInterval(() => {
    value = Math.min(100, value + Math.floor(Math.random() * 12) + 8);
    bar.style.width = value + '%';
    pct.textContent = value + '%';
    status.textContent = value < 30 ? 'INITIALIZING SYSTEM' : value < 55 ? 'LOADING QUANTREX'
      : value < 80 ? 'PREPARING EXPERIENCE' : value < 100 ? 'ALMOST READY' : 'WELCOME TO QUANTREX';
    if (value >= 100) { clearInterval(timer); setTimeout(finish, 250); }
  }, 90);
  setTimeout(finish, 4000); // failsafe: never trap the visitor behind the loader
})();

/* 3D tilt + cursor glow (mouse devices only) */
if (canHover) {
  document.querySelectorAll('.svc-card, .price-card, .team-card, .visual-card, .founder-card, .wc-card').forEach(card => {
    let raf;
    card.addEventListener('pointermove', e => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        card.classList.add('is-tilting');
        card.style.setProperty('--rx', ((.5 - y) * 10).toFixed(2) + 'deg');
        card.style.setProperty('--ry', ((x - .5) * 12).toFixed(2) + 'deg');
        card.style.setProperty('--mx', (x * 100).toFixed(1) + '%');
        card.style.setProperty('--my', (y * 100).toFixed(1) + '%');
      });
    });
    card.addEventListener('pointerleave', () => { cancelAnimationFrame(raf); card.classList.remove('is-tilting'); });
  });
}
