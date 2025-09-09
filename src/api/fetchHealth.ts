import { API_BASE_URL } from '../config';

export async function fetchHealth(
  signal?: AbortSignal
): Promise<{ ok: boolean }> {
  const url = `${API_BASE_URL}/api/health`;
  const res = await fetch(url, { signal });
  if (!res.ok) {
    throw new Error(`Health check failed: ${res.status} ${res.statusText}`);
  }
  return res.json();
}
