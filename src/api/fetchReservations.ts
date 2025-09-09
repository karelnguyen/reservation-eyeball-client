import { API_BASE_URL } from '../config';

export type Reservation = {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  scheduledAt: string;
  status: string;
  confirmedAt: string;
  pinLast4: string;
  createdAt: string;
};

export async function fetchReservations(
  signal?: AbortSignal
): Promise<Reservation[]> {
  const url = `${API_BASE_URL}/api/reservations`;
  const res = await fetch(url, { signal });
  if (!res.ok) {
    throw new Error(`Error fetching reservations`);
  }
  return res.json();
}
