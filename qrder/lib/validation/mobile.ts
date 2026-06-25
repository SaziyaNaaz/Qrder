const MOBILE_LENGTH = 10;
const VALID_FIRST_DIGITS = new Set(["6", "7", "8", "9"]);

export function sanitizeMobileInput(value: string): string {
  return value.replace(/\D/g, "").slice(0, MOBILE_LENGTH);
}

export function getInvalidFirstDigitError(mobile: string): string | null {
  if (mobile.length > 0 && !VALID_FIRST_DIGITS.has(mobile[0])) {
    return "Enter valid Mobile number";
  }

  return null;
}

export function validateMobileNumber(mobile: string): string | null {
  const firstDigitError = getInvalidFirstDigitError(mobile);
  if (firstDigitError) {
    return firstDigitError;
  }

  if (mobile.length < MOBILE_LENGTH) {
    return "Mobile number must be valid 10 Digit number";
  }

  return null;
}
