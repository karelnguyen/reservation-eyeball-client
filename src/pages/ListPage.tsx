import { Suspense, useMemo, useState } from 'react';
import { fetchReservations } from '../api/fetchReservations';
import ReservationList from '../components/ReservationList';
import ErrorBoundary from '../components/ErrorBoundary';
import Button from '../components/ui/Button';
import ReservationsSkeleton from '../components/ui/ReservationsSkeleton';

function ListError({ error, onReset }: { error: Error; onReset(): void }) {
  return (
    <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/60 p-4">
      <h2 className="text-lg font-semibold text-red-600 dark:text-red-400">
        Failed to load reservations
      </h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
        {String(error.message ?? error)}
      </p>
      <div className="mt-3 flex gap-2">
        <Button variant="outline" onClick={onReset}>
          Try again
        </Button>
      </div>
    </div>
  );
}

export default function ListPage() {
  const [version, setVersion] = useState(0);
  const listPromise = useMemo(fetchReservations, [version]);

  function onReset() {
    setVersion((v) => v + 1);
  }

  return (
    <ErrorBoundary
      resetKeys={[version]}
      onReset={onReset}
      fallback={({ error, reset }) => (
        <ListError error={error} onReset={reset} />
      )}
    >
      <Suspense fallback={<ReservationsSkeleton />}>
        <ReservationList promise={listPromise} />
      </Suspense>
    </ErrorBoundary>
  );
}
