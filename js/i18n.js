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
    'hero.lead': 'Comfortable, modern apartments in a quiet location, just steps from the town centre.',
    'hero.cta': 'Check availability',
    'hero.cta2': 'View apartments',

    'about.eyebrow': 'About us',
    'about.title': 'Family-run accommodation with a personal touch',
    'about.p1': 'Sun Square Apartments offer a calm and pleasant stay for couples, families and friends. Every apartment is furnished with care so you feel at home – from quality beds to a fully equipped kitchen.',
    'about.p2': 'Book directly with us for the best price and a quick answer to all your questions.',
    'about.stat1': 'apartments',
    'about.stat2': 'to the centre',
    'about.stat3': 'guest rating',

    'apts.eyebrow': 'Accommodation',
    'apts.title': 'Our apartments',
    'apts.photos': '📷 Photos',
    'apts.price': 'Price on request',
    'apts.1.name': 'Apartment 1',
    'apts.1.meta': 'Bedroom · living room · kitchen · bathroom',
    'apts.1.desc': 'A bright apartment with an equipped kitchen, marble bathroom, air conditioning and a smart home system with video intercom.',
    'apts.2.name': 'Apartment 2',
    'apts.2.meta': 'Bedroom · living room · kitchen · balcony',
    'apts.2.desc': 'A spacious living room with a corner sofa and balcony access, an equipped kitchen and a bathroom with a washing machine.',

    'photo.about': 'Living room and bedroom',
    'photo.apt1-living': 'Living room with kitchen – Apartment 1',
    'photo.apt1-living-2': 'Living room with sofa and TV – Apartment 1',
    'photo.apt1-living-3': 'Living room and kitchen – Apartment 1',
    'photo.apt1-bedroom': 'Bedroom with a double bed – Apartment 1',
    'photo.apt1-bedroom-2': 'Bedroom with a view – Apartment 1',
    'photo.apt1-bed': 'Bed with fresh linen and towels – Apartment 1',
    'photo.apt1-view': 'View from the bedroom into the living room – Apartment 1',
    'photo.apt1-tv': 'TV corner – Apartment 1',
    'photo.apt1-kitchen': 'Equipped kitchen with oven – Apartment 1',
    'photo.apt1-bathroom': 'Bathroom with walk-in shower – Apartment 1',
    'photo.apt2-living': 'Living room with corner sofa – Apartment 2',
    'photo.apt2-living-2': 'Living room and kitchen – Apartment 2',
    'photo.apt2-living-3': 'Living room with TV – Apartment 2',
    'photo.apt2-hall': 'View of the kitchen and entrance – Apartment 2',
    'photo.apt2-kitchen': 'Kitchen with oven – Apartment 2',
    'photo.apt2-bedroom': 'Bedroom – Apartment 2',
    'photo.apt2-bathroom': 'Bathroom with shower and washing machine – Apartment 2',
    'photo.apt2-sink': 'Bathroom detail – Apartment 2',

    'amen.eyebrow': 'Amenities',
    'amen.title': 'Everything you need for your holiday',
    'amen.wifi': 'Free Wi-Fi',
    'amen.ac': 'Air conditioning',
    'amen.parking': 'Free parking',
    'amen.kitchen': 'Equipped kitchen',
    'amen.terrace': 'Terrace / balcony',
    'amen.washer': 'Washing machine',
    'amen.linen': 'Bed linen and towels',
    'amen.pets': 'Pets on request',

    'gallery.eyebrow': 'Gallery',
    'gallery.title': 'A look inside',
    'gallery.all': 'View all photos (18)',

    'lightbox.prev': 'Previous',
    'lightbox.next': 'Next',
    'lightbox.close': 'Close',

    'loc.eyebrow': 'Location',
    'loc.title': 'How to find us',
    'loc.address': 'Street and number<br>10000 City, Country',
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
