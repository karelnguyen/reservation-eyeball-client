import { Suspense } from 'react';
import { API_BASE_URL } from '../config';
import ApiStatus from './ApiStatus';
import ErrorBoundary from './ErrorBoundary';
import Tooltip from './ui/Tooltip';

export function HealthStatus({
  promise,
}: {
  promise: Promise<{ ok: boolean }>;
}) {
  return (
    <ErrorBoundary
      fallback={({ error }) => (
        <Tooltip
          label={`API: unreachable — ${API_BASE_URL}/api/health\n${String(
            error?.message ?? error
          )}`}
        >
          <span
            aria-label="API error"
            className="inline-block h-2.5 w-2.5 rounded-full bg-rose-500 shadow-[0_0_0_2px] shadow-rose-500/20"
          />
        </Tooltip>
      )}
    >
      <Suspense
        fallback={
          <Tooltip label={`API: loading — ${API_BASE_URL}/api/health`}>
            <span
              aria-label="API loading"
              className="inline-block h-2.5 w-2.5 rounded-full bg-slate-400 animate-pulse"
            />
          </Tooltip>
        }
      >
        <ApiStatus promise={promise} endpoint={`${API_BASE_URL}/api/health`} />
      </Suspense>
    </ErrorBoundary>
  );
}
