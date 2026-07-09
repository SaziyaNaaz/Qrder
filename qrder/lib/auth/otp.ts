"use client";

import { api, type VerifyResponse } from "@/lib/api/client";

export async function sendOtp(phoneNumber: string): Promise<{ success: boolean; message: string }> {
  return api.sendOtp(phoneNumber);
}

export async function resendOtp(phoneNumber: string): Promise<{ success: boolean; message: string }> {
  // Same endpoint for resend
  return api.sendOtp(phoneNumber);
}

export async function verifyOtp(phoneNumber: string, otp: string): Promise<VerifyResponse> {
  return api.verifyOtp(phoneNumber, otp);
}