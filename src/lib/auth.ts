export type VerifyResult = { success: boolean; error?: string };

// Determine dev mode: prefer React Native's __DEV__ when available,
// otherwise fall back to NODE_ENV !== 'production'.
const isDev = typeof __DEV__ !== "undefined" ? __DEV__ : process.env.NODE_ENV !== "production";

async function isRouteMissing(res: Response) {
  return res.status === 404;
}

export async function requestCode(email: string, password?: string): Promise<VerifyResult> {
  try {
    const body: Record<string, any> = { email };
    if (password) body.password = password;

    const res = await fetch("/api/auth/request-code", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (await isRouteMissing(res)) {
      if (isDev) return { success: true };
      return { success: false, error: "Auth endpoint not available" };
    }

    if (!res.ok) {
      const json = await res.json().catch(() => ({}));
      return { success: false, error: json?.error || "Failed to send code" };
    }

    const json = await res.json().catch(() => ({}));
    return { success: json?.success ?? true };
  } catch (e) {
    if (isDev) {
      // In development allow offline/mock behavior
      return { success: true };
    }
    return { success: false, error: (e as Error)?.message ?? "Network error" };
  }
}

export async function verifyCode(email: string, code: string): Promise<VerifyResult> {
  // Try server endpoint if present, otherwise fall back to a simple mock
  try {
    const res = await fetch("/api/auth/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, code }),
    });

    if (await isRouteMissing(res)) {
      if (isDev) {
        if (code === "123456") return { success: true };
        return { success: false, error: "Invalid verification code" };
      }
      return { success: false, error: "Auth endpoint not available" };
    }

    if (!res.ok) {
      const json = await res.json().catch(() => ({}));
      return { success: false, error: json?.error || "Verification failed" };
    }

    const json = await res.json().catch(() => ({}));
    return { success: json?.success ?? true };
  } catch (e) {
    if (isDev) {
      if (code === "123456") return { success: true };
      return { success: false, error: "Invalid verification code" };
    }
    return { success: false, error: (e as Error)?.message ?? "Network error" };
  }
}

export async function resendCode(email: string): Promise<VerifyResult> {
  try {
    const res = await fetch("/api/auth/resend", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    if (await isRouteMissing(res)) {
      if (isDev) return { success: true };
      return { success: false, error: "Auth endpoint not available" };
    }

    if (!res.ok) {
      const json = await res.json().catch(() => ({}));
      return { success: false, error: json?.error || "Resend failed" };
    }

    const json = await res.json().catch(() => ({}));
    return { success: json?.success ?? true };
  } catch (e) {
    if (isDev) return { success: true };
    return { success: false, error: (e as Error)?.message ?? "Network error" };
  }
}
