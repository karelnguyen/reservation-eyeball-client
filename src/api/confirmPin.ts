import { API_BASE_URL } from '../config';
import { readErrorMessage } from '../utils';
import type { Reservation } from './getReservations';

export type ConfirmPinResult = {
  ok: boolean;
  message: string;
  reservation?: Reservation | null;
};

export type ConfirmState = {
  ok: boolean | null;
  data?: ConfirmPinResult;
  message?: string;
};

export async function confirmPin(pin: string): Promise<ConfirmPinResult> {
  const res = await fetch(`${API_BASE_URL}/api/reservations/confirm`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ pin }),
  });
  if (!res.ok) {
    const msg = await readErrorMessage(
      res,
      `Failed to confirm pin (${res.status})`
    );
    throw new Error(msg);
  }
  return res.json();
}

export const confirmPinAction =
  (onSuccess?: () => void) =>
  async (_prev: ConfirmState, formData: FormData) => {
    const pin = String(formData.get('pin') || '').trim();

    try {
      if (!pin) return { ok: false, message: 'Enter your PIN.' };

      const result = await confirmPin(pin);
      if (result.ok) onSuccess?.();

      return { ok: !!result.ok, message: result.message };
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : 'Failed to confirm pin';
      return { ok: false, message };
    }
  };
