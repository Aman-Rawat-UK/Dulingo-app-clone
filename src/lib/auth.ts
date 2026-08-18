export type VerifyResult = { success: boolean; error?: string };

// No backend exists yet (Clerk integration lands in a later step), so a
// missing /api/auth/* route is the expected dev-mode state, not a failure.
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

    if (await isRouteMissing(res)) return { success: true };

    if (!res.ok) {
      const json = await res.json().catch(() => ({}));
      return { success: false, error: json?.error || "Failed to send code" };
    }

    const json = await res.json().catch(() => ({}));
    return { success: json?.success ?? true };
  } catch {
    // Fallback: pretend it succeeded in offline/dev mode
    return { success: true };
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
      if (code === "123456") return { success: true };
      return { success: false, error: "Invalid verification code" };
    }

    if (!res.ok) {
      const json = await res.json().catch(() => ({}));
      return { success: false, error: json?.error || "Verification failed" };
    }

    const json = await res.json().catch(() => ({}));
    return { success: json?.success ?? true };
  } catch {
    // Fallback: accept a development code for local testing
    if (code === "123456") return { success: true };
    return { success: false, error: "Network error" };
  }
}

export async function resendCode(email: string): Promise<VerifyResult> {
  try {
    const res = await fetch("/api/auth/resend", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    if (await isRouteMissing(res)) return { success: true };

    if (!res.ok) {
      const json = await res.json().catch(() => ({}));
      return { success: false, error: json?.error || "Resend failed" };
    }

    const json = await res.json().catch(() => ({}));
    return { success: json?.success ?? true };
  } catch {
    // Fallback: pretend it succeeded in offline/dev mode
    return { success: true };
  }
}
