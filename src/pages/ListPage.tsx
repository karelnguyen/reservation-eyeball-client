import { Suspense, useMemo, useState } from 'react';
import { getReservations } from '../api/getReservations';
import ReservationList from '../components/ReservationList';
import ErrorBoundary from '../components/ErrorBoundary';
import ReservationsSkeleton from '../components/ui/ReservationsSkeleton';
import ConfirmPinForm from '../components/ConfirmPinForm';
import { ListError } from '../components/ui/ListError';

export default function ListPage() {
  const [version, setVersion] = useState(0);
  const listPromise = useMemo(getReservations, [version]);

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
      <div className="mb-4">
        <ConfirmPinForm onSuccess={onReset} />
      </div>
      <Suspense fallback={<ReservationsSkeleton />}>
        <ReservationList promise={listPromise} />
      </Suspense>
    </ErrorBoundary>
  );
}
