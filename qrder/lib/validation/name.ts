export function validateFullName(name: string): string | null {
  const trimmed = name.trim();

  if (!trimmed) {
    return "Full name is required";
  }

  if (trimmed.length < 2) {
    return "Full name must be at least 2 characters";
  }

  if (!/^[a-zA-Z\s.'-]+$/.test(trimmed)) {
    return "Full name contains invalid characters";
  }

  return null;
}
