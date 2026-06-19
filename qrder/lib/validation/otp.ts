export const OTP_LENGTH = 6;

export function sanitizeOtpInput(value: string): string {
  return value.replace(/\D/g, "").slice(0, OTP_LENGTH);
}

export function validateOtp(otp: string): string | null {
  if (!otp) {
    return "OTP is required";
  }

  if (!/^\d+$/.test(otp)) {
    return "OTP must contain only digits";
  }

  if (otp.length !== OTP_LENGTH) {
    return `OTP must be ${OTP_LENGTH} digits`;
  }

  return null;
}
