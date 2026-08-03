/**
 * Form Validation Rules for Nexus Academy
 */

/**
 * Validates Ugandan Mobile Formats for MTN and Airtel
 * Accepts:
 * - Local 10-digit format starting with 077, 078, 076 (MTN) or 070, 075, 074 (Airtel)
 * - International format starting with +2567... (e.g., +25677..., +25670...)
 */
export function isValidUgandanPhone(phone: string): boolean {
  if (!phone) return false;
  const clean = phone.replace(/[\s-]/g, '').trim();

  // Local 10 digits starting with 077, 078, 076 (MTN) or 070, 075, 074 (Airtel)
  const localRegex = /^(077|078|076|070|075|074)\d{7}$/;

  // International format starting with +2567...
  const intlRegex = /^\+?2567(7|8|6|0|5|4)\d{7}$/;
  const intlGeneral = /^\+2567\d{8}$/;

  return localRegex.test(clean) || intlRegex.test(clean) || intlGeneral.test(clean);
}

/**
 * Validates Gmail Email Format
 * Requires input string to match standard email schema that explicitly terminates with "@gmail.com"
 */
export function isValidGmail(email: string): boolean {
  if (!email) return false;
  const clean = email.trim().toLowerCase();
  return /^[a-zA-Z0-9._%+-]+@gmail\.com$/i.test(clean);
}
