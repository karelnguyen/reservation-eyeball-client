export async function readErrorMessage(res: Response, fallback: string) {
  const ct = res.headers.get('content-type') || '';
  try {
    if (ct.includes('application/json')) {
      const body = await res.json();
      return body?.message || body?.error || body?.detail || fallback;
    }
    const text = await res.text();
    return text || fallback;
  } catch {
    return fallback;
  }
}
