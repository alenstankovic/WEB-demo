// Prijevodi. Bosanski tekst je u samom HTML-u (data-i18n atributi),
// ovdje su samo engleski prijevodi i poruke koje koristi JavaScript.
(() => {
const LANGS = ['bs', 'en'];
const DEFAULT_LANG = 'bs';

const translations = {
  en: {
    'meta.title': 'Sun Square Apartments',
    'meta.desc': 'Sun Square Apartments in Tuzla – comfortable apartments for your stay. Book directly with the owner.',

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
    'hero.lead': 'Comfortable, modern apartments in a quiet location in Tuzla, 100 m from the town centre and 300 m from the Pannonian Lakes.',
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
    'apts.3.name': 'Apartment 3',
    'apts.3.meta': 'Bedroom · living room · kitchen · bathroom',
    'apts.3.desc': 'A bright apartment with a large window, a separate bedroom with a double bed, an equipped kitchen and a bathroom with a walk-in shower and a washing machine.',
    'apts.1.name': 'Apartment 1',
    'apts.1.meta': 'Studio · kitchen with breakfast bar · bathroom',
    'apts.1.desc': 'A modern studio with a double bed, TV, a kitchen with a breakfast bar and bar stools, a bathroom with a walk-in shower and a washing machine, and a smart home system.',
    'apts.2.name': 'Apartment 2',
    'apts.2.meta': 'Bedroom · living room · kitchen · balcony',
    'apts.2.desc': 'A spacious living room with a corner sofa and balcony access, an equipped kitchen and a bathroom with a washing machine.',
    'apts.4.name': 'Apartment 4',
    'apts.4.meta': 'Bedroom · living room · kitchen · bathroom',
    'apts.4.desc': 'A modern apartment with a living room, a bedroom with a double bed, an equipped kitchen, a marble bathroom with a washing machine and a smart home system with video intercom.',

    'photo.about': 'Living room and bedroom',
    'photo.apt1-room': 'Studio with a double bed and TV – Apartment 1',
    'photo.apt1-kitchen': 'View of the kitchen with a breakfast bar – Apartment 1',
    'photo.apt1-hall': 'Hallway with bathroom entrance and smart home panel – Apartment 1',
    'photo.apt1-tv': 'Bed and TV corner – Apartment 1',
    'photo.apt1-room-2': 'Sleeping area and breakfast bar – Apartment 1',
    'photo.apt1-bed': 'Double bed – Apartment 1',
    'photo.apt1-bathroom': 'Bathroom entrance and view of the room – Apartment 1',
    'photo.apt3-living': 'Living room with kitchen – Apartment 3',
    'photo.apt3-living-2': 'Living room with a window view – Apartment 3',
    'photo.apt3-living-3': 'Living room – Apartment 3',
    'photo.apt3-sofa': 'Sofa and floor lamp – Apartment 3',
    'photo.apt3-tv': 'TV corner – Apartment 3',
    'photo.apt3-bedroom': 'Bedroom with a double bed – Apartment 3',
    'photo.apt3-bed': 'Bed with fresh linen – Apartment 3',
    'photo.apt3-view': 'View from the bedroom into the living room – Apartment 3',
    'photo.apt3-kitchen': 'Equipped kitchen – Apartment 3',
    'photo.apt3-bathroom': 'Bathroom with walk-in shower – Apartment 3',
    'photo.apt3-sink': 'Bathroom detail – Apartment 3',
    'photo.apt3-living-4': 'Living room with a view of the kitchen – Apartment 3',
    'photo.apt3-kitchen-2': 'Kitchen – Apartment 3',
    'photo.apt3-hall': 'Entrance with built-in wardrobes – Apartment 3',
    'photo.apt3-wardrobe': 'Entrance and wardrobe with shelves – Apartment 3',
    'photo.apt3-bathroom-door': 'Hallway and bathroom entrance – Apartment 3',
    'photo.apt3-bathroom-2': 'Bathroom with walk-in shower and washbasin – Apartment 3',
    'photo.apt3-washer': 'Washing machine – Apartment 3',
    'photo.apt2-living': 'Living room with corner sofa and balcony door – Apartment 2',
    'photo.apt2-living-2': 'Living room and kitchen – Apartment 2',
    'photo.apt2-living-3': 'Living room with TV – Apartment 2',
    'photo.apt2-hall': 'View of the kitchen and entrance – Apartment 2',
    'photo.apt2-kitchen': 'Kitchen with oven – Apartment 2',
    'photo.apt2-bedroom': 'Bedroom – Apartment 2',
    'photo.apt2-bedroom-2': 'Bedroom with a window – Apartment 2',
    'photo.apt2-bathroom': 'Bathroom with shower and washing machine – Apartment 2',
    'photo.apt2-bathroom-2': 'Bathroom – Apartment 2',
    'photo.apt2-living-4': 'Living room looking towards the hallway – Apartment 2',
    'photo.apt2-living-5': 'Living room, TV and kitchen – Apartment 2',
    'photo.apt2-kitchen-view': 'View from the kitchen into the living room – Apartment 2',
    'photo.apt2-hall-2': 'Entrance with wardrobe – Apartment 2',
    'photo.apt2-bathroom-3': 'Bathroom with water heater and washing machine – Apartment 2',
    'photo.apt2-sink': 'Washbasin and towel rail – Apartment 2',
    'photo.apt4-living': 'Living room – Apartment 4',
    'photo.apt4-living-2': 'Living room with sofa and armchair – Apartment 4',
    'photo.apt4-living-3': 'Living room and kitchen – Apartment 4',
    'photo.apt4-sofa': 'Sofa – Apartment 4',
    'photo.apt4-tv': 'TV corner – Apartment 4',
    'photo.apt4-kitchen': 'Kitchen – Apartment 4',
    'photo.apt4-kitchen-2': 'Kitchen with oven – Apartment 4',
    'photo.apt4-kitchen-view': 'View from the kitchen into the living room – Apartment 4',
    'photo.apt4-bedroom': 'Bedroom with a double bed – Apartment 4',
    'photo.apt4-bedroom-view': 'Bedroom and living room – Apartment 4',
    'photo.apt4-hall': 'Hallway with built-in wardrobes – Apartment 4',
    'photo.apt4-bathroom': 'Bathroom with walk-in shower – Apartment 4',
    'photo.apt4-bathroom-2': 'Walk-in shower – Apartment 4',
    'photo.apt4-intercom': 'Video intercom and bathroom entrance – Apartment 4',

    'amen.eyebrow': 'Amenities',
    'amen.title': 'Everything you need for your holiday',
    'amen.wifi': 'Free Wi-Fi',
    'amen.ac': 'Air conditioning',
    'amen.parking': 'Paid parking',
    'amen.kitchen': 'Equipped kitchen',
    'amen.terrace': 'Terrace / balcony',
    'amen.washer': 'Washing machine',
    'amen.linen': 'Bed linen and towels',
    'amen.pets': 'Pets on request',

    'gallery.eyebrow': 'Gallery',
    'gallery.title': 'A look inside',
    'gallery.all': 'View all photos',

    'lightbox.prev': 'Previous',
    'lightbox.next': 'Next',
    'lightbox.close': 'Close',

    'loc.eyebrow': 'Location',
    'loc.title': 'How to find us',
    'loc.address': 'Atik mahala 2<br>75000 Tuzla, Bosnia and Herzegovina',
    'loc.open': 'Open in Google Maps ↗',
    'loc.mapTitle': 'Map – Sun Square Apartments, Atik mahala 2, Tuzla',
    'loc.center': 'Town centre',
    'loc.lakes': 'Pannonian Lakes',
    'loc.shop': 'Shop',
    'loc.airport': 'Airport',

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
})();
