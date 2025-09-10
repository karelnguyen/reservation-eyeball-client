import { useActionState, useMemo } from 'react';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import {
  createReservationAction,
  type CreateState,
} from '../api/createReservation';

export default function FormPage() {
  const [state, formAction, pending] = useActionState<CreateState, FormData>(
    createReservationAction,
    { ok: null, message: '' }
  );

  const activationDate = useMemo(
    () =>
      state.data
        ? new Date(new Date(state.data.activeFrom).getTime() - 15 * 60 * 1000)
        : null,
    [state.data]
  );

  return (
    <section className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-4 shadow-sm">
      <h2 className="text-xl font-semibold">Make a Reservation</h2>
      <p className="text-sm text-slate-600 dark:text-slate-300">
        Submit your details. Your PIN activates 15 minutes before your time.
      </p>
      <form action={formAction} className="mt-4 grid gap-3 sm:grid-cols-2">
        <div className="grid gap-1">
          <label className="text-sm" htmlFor="firstName">
            First Name
          </label>
          <Input id="firstName" name="firstName" placeholder="Jane" required />
        </div>
        <div className="grid gap-1">
          <label className="text-sm" htmlFor="lastName">
            Last Name
          </label>
          <Input id="lastName" name="lastName" placeholder="Doe" required />
        </div>
        <div className="grid gap-1 sm:col-span-2">
          <label className="text-sm" htmlFor="phone">
            Phone Number
          </label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            placeholder="555-123-4567"
            required
          />
        </div>
        <div className="grid gap-1 sm:col-span-2">
          <label className="text-sm" htmlFor="scheduledAt">
            Time of Reservation
          </label>
          <Input
            id="scheduledAt"
            name="scheduledAt"
            type="datetime-local"
            required
          />
        </div>
        <div className="sm:col-span-2">
          <Button type="submit" disabled={pending}>
            {pending ? 'Submitting…' : 'Get PIN'}
          </Button>
          {state.ok === false && state.message && (
            <span className="ml-3 text-sm text-rose-600">{state.message}</span>
          )}
        </div>
      </form>

      {state.ok && state.data && !pending && (
        <div className="mt-6 rounded-md border border-slate-200 dark:border-slate-700 p-4 bg-white/80 dark:bg-slate-900/60">
          <h3 className="text-lg font-medium">Reservation Created</h3>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
            Your PIN is{' '}
            <span className="font-mono text-base text-green-600">
              {state.data.pin}
            </span>
            .
          </p>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            It activates at <strong>{activationDate?.toLocaleString()}</strong>{' '}
            and remains valid during your window.
          </p>
        </div>
      )}
    </section>
  );
}
