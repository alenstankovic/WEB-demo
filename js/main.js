const { t } = window.i18n;

// Mobilni meni
const toggle = document.querySelector('.nav-toggle');
const nav = document.getElementById('nav');

function setMenu(open) {
  nav.classList.toggle('open', open);
  toggle.setAttribute('aria-expanded', open);
  toggle.setAttribute('aria-label', t(open ? 'nav.close' : 'nav.open'));
}

toggle.addEventListener('click', () => setMenu(!nav.classList.contains('open')));

nav.addEventListener('click', (e) => {
  if (e.target.tagName === 'A') setMenu(false);
});

// Godina u podnožju
document.getElementById('year').textContent = new Date().getFullYear();

// Obrazac za upit
const form = document.getElementById('inquiry-form');
const status = form.querySelector('.form-status');
const checkin = form.elements.checkin;
const checkout = form.elements.checkout;

const today = new Date().toISOString().split('T')[0];
checkin.min = today;
checkout.min = today;

checkin.addEventListener('change', () => {
  checkout.min = checkin.value || today;
  if (checkout.value && checkout.value <= checkin.value) checkout.value = '';
});

document.addEventListener('langchange', () => {
  setMenu(nav.classList.contains('open'));
  status.textContent = '';
});

const label = (id) => form.querySelector(`label[for="${id}"]`).textContent;

form.addEventListener('submit', (e) => {
  e.preventDefault();

  let valid = true;
  for (const el of form.elements) {
    if (!el.willValidate) continue;
    const ok = el.checkValidity();
    el.classList.toggle('invalid', !ok);
    if (!ok) valid = false;
  }
  if (checkin.value && checkout.value && checkout.value <= checkin.value) {
    checkout.classList.add('invalid');
    valid = false;
  }

  if (!valid) {
    status.className = 'form-status error';
    status.textContent = t('form.error');
    return;
  }

  // Nema servera: upit se šalje putem e-mail programa posjetioca.
  const d = Object.fromEntries(new FormData(form));
  const body = [
    ...['name', 'email', 'checkin', 'checkout', 'guests', 'apartment'].map((id) => `${label(id)}: ${d[id]}`),
    '',
    d.message,
  ].join('\n');

  window.location.href =
    'mailto:info@sunsquare.example' +
    `?subject=${encodeURIComponent(`${t('form.subject')} – ${d.name}`)}` +
    `&body=${encodeURIComponent(body)}`;

  status.className = 'form-status ok';
  status.textContent = t('form.ok');
});

// Galerija: uvećani prikaz fotografija
const lightbox = document.getElementById('lightbox');
const lbImg = lightbox.querySelector('img');
const lbCaption = lightbox.querySelector('.lb-caption');
const lbCount = lightbox.querySelector('.lb-count');
const galleryLinks = [...document.querySelectorAll('#gallery a')];
let lbItems = [];
let lbIndex = 0;

function showPhoto(i) {
  lbIndex = (i + lbItems.length) % lbItems.length;
  const link = lbItems[lbIndex];
  const alt = link.querySelector('img').alt;
  lbImg.src = link.href;
  lbImg.alt = alt;
  lbCaption.textContent = alt;
  lbCount.textContent = `${lbIndex + 1} / ${lbItems.length}`;
}

function openLightbox(items, start = 0) {
  lbItems = items;
  showPhoto(start);
  lightbox.showModal();
}

galleryLinks.forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    openLightbox(galleryLinks, galleryLinks.indexOf(link));
  });
});

document.getElementById('gallery-count').textContent = galleryLinks.length;
document.getElementById('gallery-all').addEventListener('click', () => openLightbox(galleryLinks));

document.querySelectorAll('[data-open-apt]').forEach((btn) => {
  btn.addEventListener('click', () => {
    openLightbox(galleryLinks.filter((a) => a.dataset.apt === btn.dataset.openApt));
  });
});

lightbox.querySelector('.lb-prev').addEventListener('click', () => showPhoto(lbIndex - 1));
lightbox.querySelector('.lb-next').addEventListener('click', () => showPhoto(lbIndex + 1));
lightbox.querySelector('.lb-close').addEventListener('click', () => lightbox.close());

// Klik na tamnu pozadinu zatvara prikaz
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) lightbox.close();
});

lightbox.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') showPhoto(lbIndex - 1);
  if (e.key === 'ArrowRight') showPhoto(lbIndex + 1);
});

// Prevlačenje prstom na mobitelu
let touchX = null;
lightbox.addEventListener('touchstart', (e) => { touchX = e.touches[0].clientX; }, { passive: true });
lightbox.addEventListener('touchend', (e) => {
  if (touchX === null) return;
  const dx = e.changedTouches[0].clientX - touchX;
  if (Math.abs(dx) > 50) showPhoto(lbIndex + (dx < 0 ? 1 : -1));
  touchX = null;
});

document.addEventListener('langchange', () => {
  if (lightbox.open) showPhoto(lbIndex);
});
