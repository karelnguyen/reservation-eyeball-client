import { API_BASE_URL } from '../config';
import { readErrorMessage } from '../utils';

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

export async function getReservations(): Promise<Reservation[]> {
  const res = await fetch(`${API_BASE_URL}/api/reservations`);

  if (!res.ok) {
    const msg = await readErrorMessage(
      res,
      `Error fetching reservations (${res.status})`
    );
    throw new Error(msg);
  }

  return res.json();
}
