import Cookies from 'js-cookie';
import { FormStep } from '../types';

const FORM_DATA_COOKIE = 'form_data';
const COOKIE_EXPIRY = 7; // Days

export function saveFormData(data: FormStep) {
  Cookies.set(FORM_DATA_COOKIE, JSON.stringify(data), { expires: COOKIE_EXPIRY });
}

export function getFormData(): FormStep | null {
  const data = Cookies.get(FORM_DATA_COOKIE);
  if (data) {
    try {
      return JSON.parse(data);
    } catch {
      return null;
    }
  }
  return null;
}

export function clearFormData() {
  Cookies.remove(FORM_DATA_COOKIE);
}