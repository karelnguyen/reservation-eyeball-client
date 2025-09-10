import { API_BASE_URL } from '../config';
import { readErrorMessage } from '../utils';

export async function getHealth(): Promise<{ ok: boolean }> {
  const res = await fetch(`${API_BASE_URL}/api/health`);

  if (!res.ok) {
    const msg = await readErrorMessage(
      res,
      `Health check failed (${res.status})`
    );
    throw new Error(msg);
  }

  return res.json();
}
