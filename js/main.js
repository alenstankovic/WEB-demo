// Mobilni izbornik
const toggle = document.querySelector('.nav-toggle');
const nav = document.getElementById('nav');

toggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', open);
  toggle.setAttribute('aria-label', open ? 'Zatvori izbornik' : 'Otvori izbornik');
});

nav.addEventListener('click', (e) => {
  if (e.target.tagName === 'A') {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }
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
    status.textContent = 'Molimo ispravno ispunite označena polja.';
    return;
  }

  // Nema poslužitelja: upit se šalje putem e-mail klijenta.
  const d = Object.fromEntries(new FormData(form));
  const body = [
    `Ime: ${d.name}`,
    `E-mail: ${d.email}`,
    `Dolazak: ${d.checkin}`,
    `Odlazak: ${d.checkout}`,
    `Broj osoba: ${d.guests}`,
    `Apartman: ${d.apartment}`,
    '',
    d.message,
  ].join('\n');

  window.location.href =
    'mailto:info@sunsquare.example' +
    `?subject=${encodeURIComponent('Upit za smještaj – ' + d.name)}` +
    `&body=${encodeURIComponent(body)}`;

  status.className = 'form-status ok';
  status.textContent = 'Hvala! Otvara se vaš e-mail program za slanje upita.';
});
