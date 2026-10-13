// Prijevodi. Bosanski tekst je u samom HTML-u (data-i18n atributi),
// ovdje su samo engleski prijevodi i poruke koje koristi JavaScript.
const LANGS = ['bs', 'en'];
const DEFAULT_LANG = 'bs';

const translations = {
  en: {
    'meta.title': 'Sun Square Apartments',
    'meta.desc': 'Sun Square Apartments – comfortable apartments for your holiday. Book directly with the owner.',

    'header.home': 'Sun Square Apartments – home',
    'header.apartments': 'Apartments',
    'header.language': 'Language',

    'nav.about': 'About us',
    'nav.apartments': 'Apartments',
    'nav.amenities': 'Amenities',
    'nav.gallery': 'Gallery',
    'nav.location': 'Location',
    'nav.book': 'Book now',
    'nav.open': 'Open menu',
    'nav.close': 'Close menu',

    'hero.eyebrow': 'Welcome',
    'hero.title': 'Your place in the sun',
    'hero.lead': 'Comfortable, modern apartments in a quiet location, just steps from the beach and the town centre.',
    'hero.cta': 'Check availability',
    'hero.cta2': 'View apartments',

    'about.eyebrow': 'About us',
    'about.title': 'Family-run accommodation with a personal touch',
    'about.p1': 'Sun Square Apartments offer a calm and pleasant stay for couples, families and friends. Every apartment is furnished with care so you feel at home – from quality beds to a fully equipped kitchen.',
    'about.p2': 'Book directly with us for the best price and a quick answer to all your questions.',
    'about.stat1': 'apartments',
    'about.stat2': 'to the beach',
    'about.stat3': 'guest rating',
    'about.photo': 'Photo of the property (placeholder)',

    'apts.eyebrow': 'Accommodation',
    'apts.title': 'Our apartments',
    'apts.1.photo': 'Studio apartment (placeholder)',
    'apts.1.name': 'Studio Sunce',
    'apts.1.meta': '2 guests · 28 m² · balcony',
    'apts.1.desc': 'Ideal for couples. Double bed, kitchenette and a balcony with a view.',
    'apts.1.price': 'from <strong>€55</strong> / night',
    'apts.2.photo': 'Apartment for 4 guests (placeholder)',
    'apts.2.name': 'Apartment Trg',
    'apts.2.meta': '4 guests · 45 m² · terrace',
    'apts.2.desc': 'Bedroom, living room with a sofa bed and a large terrace.',
    'apts.2.price': 'from <strong>€80</strong> / night',
    'apts.3.photo': 'Family apartment (placeholder)',
    'apts.3.name': 'Family apartment',
    'apts.3.meta': '6 guests · 70 m² · 2 bathrooms',
    'apts.3.desc': 'Two bedrooms, a spacious living room and two bathrooms.',
    'apts.3.price': 'from <strong>€110</strong> / night',

    'amen.eyebrow': 'Amenities',
    'amen.title': 'Everything you need for your holiday',
    'amen.wifi': 'Free Wi-Fi',
    'amen.ac': 'Air conditioning',
    'amen.parking': 'Free parking',
    'amen.kitchen': 'Equipped kitchen',
    'amen.terrace': 'Terrace / balcony',
    'amen.beach': 'Close to the beach',
    'amen.linen': 'Bed linen and towels',
    'amen.pets': 'Pets on request',

    'gallery.eyebrow': 'Gallery',
    'gallery.title': 'A look inside',
    'gallery.photo1': 'Gallery photo 1 (placeholder)',
    'gallery.photo2': 'Gallery photo 2 (placeholder)',
    'gallery.photo3': 'Gallery photo 3 (placeholder)',
    'gallery.photo4': 'Gallery photo 4 (placeholder)',
    'gallery.photo5': 'Gallery photo 5 (placeholder)',

    'loc.eyebrow': 'Location',
    'loc.title': 'How to find us',
    'loc.address': 'Street and number<br>10000 City, Country',
    'loc.beach': 'Beach',
    'loc.center': 'Town centre',
    'loc.shop': 'Shop',
    'loc.airport': 'Airport',
    'loc.map': 'Map',
    'loc.mapLabel': 'Map placeholder (replace with a Google Maps embed)',

    'contact.eyebrow': 'Booking',
    'contact.title': 'Send an inquiry',
    'contact.lead': 'Tell us your dates and number of guests – we reply within 24 hours.',
    'contact.messaging': 'WhatsApp / Viber on the same number',

    'form.name': 'Full name',
    'form.email': 'Email',
    'form.checkin': 'Check-in',
    'form.checkout': 'Check-out',
    'form.guests': 'Guests',
    'form.apartment': 'Apartment',
    'form.any': 'No preference',
    'form.message': 'Message',
    'form.submit': 'Send inquiry',
    'form.error': 'Please correct the highlighted fields.',
    'form.ok': 'Thank you! Your email app is opening so you can send the inquiry.',
    'form.subject': 'Accommodation inquiry',

    'footer.top': 'Back to top ↑',
  },
  bs: {
    'nav.open': 'Otvori meni',
    'nav.close': 'Zatvori meni',
    'form.error': 'Molimo ispravno popunite označena polja.',
    'form.ok': 'Hvala! Otvara se vaš e-mail program za slanje upita.',
    'form.subject': 'Upit za smještaj',
  },
};

// Originalni (bosanski) sadržaj iz HTML-a, da se može vratiti bez ponovnog učitavanja.
const original = new Map();
const originalAttrs = new Map();
document.querySelectorAll('[data-i18n], [data-i18n-html]').forEach((el) => {
  original.set(el, el.innerHTML);
});
document.querySelectorAll('[data-i18n-attr]').forEach((el) => {
  const attrs = {};
  for (const [attr] of parseAttrs(el)) attrs[attr] = el.getAttribute(attr);
  originalAttrs.set(el, attrs);
});

function parseAttrs(el) {
  return el.dataset.i18nAttr.split(';').map((pair) => pair.split(':').map((s) => s.trim()));
}

let currentLang = DEFAULT_LANG;

function t(key) {
  return translations[currentLang]?.[key] ?? translations[DEFAULT_LANG]?.[key] ?? key;
}

function setLang(lang) {
  if (!LANGS.includes(lang)) lang = DEFAULT_LANG;
  currentLang = lang;
  const dict = translations[lang];
  const useOriginal = lang === DEFAULT_LANG;

  document.documentElement.lang = lang;

  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const value = useOriginal ? null : dict[el.dataset.i18n];
    if (value != null) el.textContent = value;
    else el.innerHTML = original.get(el);
  });

  document.querySelectorAll('[data-i18n-html]').forEach((el) => {
    const value = useOriginal ? null : dict[el.dataset.i18nHtml];
    el.innerHTML = value ?? original.get(el);
  });

  document.querySelectorAll('[data-i18n-attr]').forEach((el) => {
    for (const [attr, key] of parseAttrs(el)) {
      const value = useOriginal ? null : dict[key];
      el.setAttribute(attr, value ?? originalAttrs.get(el)[attr]);
    }
  });

  document.querySelectorAll('.lang-switch [data-lang]').forEach((btn) => {
    btn.setAttribute('aria-pressed', btn.dataset.lang === lang);
  });

  try { localStorage.setItem('lang', lang); } catch {}
  document.dispatchEvent(new CustomEvent('langchange', { detail: { lang } }));
}

function initialLang() {
  const fromUrl = new URLSearchParams(location.search).get('lang');
  if (LANGS.includes(fromUrl)) return fromUrl;
  try {
    const saved = localStorage.getItem('lang');
    if (LANGS.includes(saved)) return saved;
  } catch {}
  // Posjetioci čiji preglednik nije na nekom od jezika regije dobijaju engleski.
  const browser = (navigator.language || '').slice(0, 2).toLowerCase();
  return ['bs', 'hr', 'sr', 'sh', 'me'].includes(browser) ? 'bs' : 'en';
}

document.querySelectorAll('.lang-switch [data-lang]').forEach((btn) => {
  btn.addEventListener('click', () => setLang(btn.dataset.lang));
});

window.i18n = { t, setLang, get lang() { return currentLang; } };

setLang(initialLang());
