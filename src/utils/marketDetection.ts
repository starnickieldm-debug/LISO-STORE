import { CountryCode } from '../types/market';
import { DEFAULT_COUNTRY_CODE, MARKETS } from '../config/markets';

const STORAGE_KEY = 'liso_selected_market';

const TIMEZONE_TO_COUNTRY: Record<string, CountryCode> = {
  // Colombia
  'America/Bogota': 'CO',
  
  // México
  'America/Mexico_City': 'MX',
  'America/Cancun': 'MX',
  'America/Merida': 'MX',
  'America/Monterrey': 'MX',
  'America/Mazatlan': 'MX',
  'America/Chihuahua': 'MX',
  'America/Hermosillo': 'MX',
  'America/Tijuana': 'MX',
  'America/Bahia_Banderas': 'MX',
  'America/Ciudad_Juarez': 'MX',

  // Perú
  'America/Lima': 'PE',

  // Chile
  'America/Santiago': 'CL',
  'America/Punta_Arenas': 'CL',
  'Pacific/Easter': 'CL',

  // Argentina
  'America/Argentina/Buenos_Aires': 'AR',
  'America/Argentina/Cordoba': 'AR',
  'America/Argentina/Salta': 'AR',
  'America/Argentina/Jujuy': 'AR',
  'America/Argentina/Tucuman': 'AR',
  'America/Argentina/Catamarca': 'AR',
  'America/Argentina/La_Rioja': 'AR',
  'America/Argentina/San_Juan': 'AR',
  'America/Argentina/Mendoza': 'AR',
  'America/Argentina/San_Luis': 'AR',
  'America/Argentina/Rio_Gallegos': 'AR',
  'America/Argentina/Ushuaia': 'AR',
  'America/Buenos_Aires': 'AR',

  // Costa Rica
  'America/Costa_Rica': 'CR',

  // España
  'Europe/Madrid': 'ES',
  'Atlantic/Canary': 'ES',
  'Africa/Ceuta': 'ES',
};

function isValidCountryCode(code: unknown): code is CountryCode {
  return typeof code === 'string' && Object.prototype.hasOwnProperty.call(MARKETS, code);
}

export function getSavedMarket(): CountryCode | null {
  if (typeof window === 'undefined' || !window.localStorage) {
    return null;
  }
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && isValidCountryCode(saved)) {
      return saved;
    }
  } catch {
    // Ignore localStorage access errors
  }
  return null;
}

export function saveMarket(code: CountryCode): void {
  if (typeof window === 'undefined' || !window.localStorage) {
    return;
  }
  try {
    localStorage.setItem(STORAGE_KEY, code);
  } catch {
    // Ignore localStorage access errors
  }
}

export function detectBrowserMarket(): CountryCode {
  // 1. Check saved manual selection in localStorage
  const saved = getSavedMarket();
  if (saved) {
    return saved;
  }

  if (typeof window === 'undefined') {
    return DEFAULT_COUNTRY_CODE;
  }

  // 2. Try detection via timezone
  try {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (timeZone) {
      if (TIMEZONE_TO_COUNTRY[timeZone]) {
        return TIMEZONE_TO_COUNTRY[timeZone];
      }
      // Check prefix for Argentina
      if (timeZone.startsWith('America/Argentina/')) {
        return 'AR';
      }
    }
  } catch {
    // Ignore timezone resolution errors
  }

  // 3. Try detection via navigator.languages or navigator.language
  try {
    const languages = navigator.languages || [navigator.language];
    for (const lang of languages) {
      if (!lang) continue;
      const parts = lang.split('-');
      if (parts.length > 1) {
        const region = parts[parts.length - 1].toUpperCase();
        if (isValidCountryCode(region)) {
          return region;
        }
      }
    }
  } catch {
    // Ignore language detection errors
  }

  // 4. Default fallback: Colombia
  return DEFAULT_COUNTRY_CODE;
}
