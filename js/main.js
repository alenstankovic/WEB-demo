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
