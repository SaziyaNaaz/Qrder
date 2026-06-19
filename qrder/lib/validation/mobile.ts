const MOBILE_LENGTH = 10;
const VALID_FIRST_DIGIT = "6";

export function sanitizeMobileInput(value: string): string {
  return value.replace(/\D/g, "").slice(0, MOBILE_LENGTH);
}

export function getInvalidFirstDigitError(mobile: string): string | null {
  if (mobile.length > 0 && !mobile.startsWith(VALID_FIRST_DIGIT)) {
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
