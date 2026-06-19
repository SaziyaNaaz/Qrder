"use client";

import { useCallback, useEffect, useState } from "react";
import { OTP_RESEND_COOLDOWN_SECONDS } from "@/lib/constants";

type UseOtpResendOptions = {
  cooldownSeconds?: number;
  onResend: () => Promise<void> | void;
};

export function useOtpResend({
  cooldownSeconds = OTP_RESEND_COOLDOWN_SECONDS,
  onResend,
}: UseOtpResendOptions) {
  const [secondsLeft, setSecondsLeft] = useState(cooldownSeconds);
  const [isResending, setIsResending] = useState(false);

  useEffect(() => {
    if (secondsLeft <= 0) {
      return;
    }

    const timer = window.setInterval(() => {
      setSecondsLeft((current) => current - 1);
    }, 1000);

    return () => window.clearInterval(timer);
  }, [secondsLeft]);

  const handleResend = useCallback(async () => {
    if (secondsLeft > 0 || isResending) {
      return;
    }

    setIsResending(true);

    try {
      await onResend();
      setSecondsLeft(cooldownSeconds);
    } finally {
      setIsResending(false);
    }
  }, [cooldownSeconds, isResending, onResend, secondsLeft]);

  const formattedTime = `${Math.floor(secondsLeft / 60)}:${String(
    secondsLeft % 60,
  ).padStart(2, "0")}`;

  return {
    secondsLeft,
    formattedTime,
    canResend: secondsLeft === 0 && !isResending,
    isResending,
    handleResend,
  };
}
