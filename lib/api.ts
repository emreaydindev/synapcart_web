/** POST JSON to the backend through the /api rewrite and return `message`, or throw with `detail`. */
export async function postJson<T extends { message?: string }>(path: string, body: unknown): Promise<T> {
  let res: Response;
  try {
    res = await fetch(path, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  } catch {
    throw new Error("Sunucuya ulaşılamadı. İnternet bağlantını kontrol edip tekrar dene.");
  }

  const text = await res.text();
  let data: unknown = null;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    // Non-JSON body (proxy error page, cold-starting backend, …).
  }

  if (!res.ok) {
    const detail = (data as { detail?: unknown } | null)?.detail;
    if (typeof detail === "string" && detail) throw new Error(detail);
    if (res.status === 429) throw new Error("Çok fazla deneme yaptın. Lütfen biraz bekleyip tekrar dene.");
    if (res.status >= 500) throw new Error("Sunucu şu anda yanıt vermiyor. Lütfen birkaç dakika sonra tekrar dene.");
    throw new Error("Bir hata oluştu. Lütfen tekrar dene.");
  }
  return (data ?? {}) as T;
}
