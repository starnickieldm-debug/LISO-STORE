import { CountryCode } from '../types/market';
import { DEFAULT_COUNTRY_CODE } from '../config/markets';

export function getSavedMarket(): CountryCode {
  return DEFAULT_COUNTRY_CODE;
}

export function saveMarket(_code: CountryCode): void {
  // No-op: Single market reality (Colombia)
}

export function detectBrowserMarket(): CountryCode {
  return DEFAULT_COUNTRY_CODE;
}
