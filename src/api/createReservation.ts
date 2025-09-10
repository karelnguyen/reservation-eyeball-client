import { API_BASE_URL } from '../config';
import { readErrorMessage } from '../utils';

export type CreateReservationInput = {
  firstName: string;
  lastName: string;
  phone: string;
  scheduledAt: string; // ISO string
};

export type CreateReservationResult = {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  pin: string;
  activeFrom: string;
  nominalExpiry: string;
  status: string;
};

export type CreateState = {
  ok: boolean | null;
  data?: CreateReservationResult;
  message?: string;
};

export async function postReservation(
  input: CreateReservationInput
): Promise<CreateReservationResult> {
  const res = await fetch(`${API_BASE_URL}/api/reservations`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });
  if (!res.ok) {
    const msg = await readErrorMessage(
      res,
      `Failed to create reservation (${res.status})`
    );
    throw new Error(msg);
  }
  return res.json();
}

export async function createReservationAction(
  _prev: CreateState,
  formData: FormData
) {
  const firstName = String(formData.get('firstName') || '').trim();
  const lastName = String(formData.get('lastName') || '').trim();
  const phone = String(formData.get('phone') || '').trim();
  const when = String(formData.get('scheduledAt') || '').trim();
  if (!firstName || !lastName || !phone || !when) {
    return { ok: false, message: 'Please fill all fields.' };
  }
  // datetime-local returns local time; convert to ISO
  const scheduledAt = new Date(when).toISOString();

  try {
    const data = await postReservation({
      firstName,
      lastName,
      phone,
      scheduledAt,
    });
    // Ensure scheduledAt is present for UI calculations even if backend omits it
    return { ok: true, data: { ...data, scheduledAt } };
  } catch (e: unknown) {
    const message =
      e instanceof Error ? e.message : 'Failed to create reservation';
    return { ok: false, message };
  }
}
