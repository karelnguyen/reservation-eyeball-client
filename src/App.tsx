import { useEffect, useState } from 'react';
import { Link, Outlet } from '@tanstack/react-router';
import { API_BASE_URL } from './config';
import { fetchHealth } from './api/fetchHealth';
import ThemeToggle from './components/ThemeToggle';

function App() {
  const [count, setCount] = useState(0);
  const [health, setHealth] = useState<unknown>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(null);
    fetchHealth(controller.signal)
      .then((data) => setHealth(data))
      .catch((err: unknown) => {
        const message = err instanceof Error ? err.message : String(err);
        setError(message);
      })
      .finally(() => setLoading(false));
    return () => controller.abort();
  }, []);

  return (
    <div className="min-h-screen relative bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(40rem_20rem_at_50%_-4rem,rgba(56,189,248,0.15),transparent)] dark:bg-[radial-gradient(40rem_20rem_at_50%_-4rem,rgba(125,211,252,0.08),transparent)]" />
      <header className="sticky top-0 z-10 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-slate-900/60 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-5xl mx-auto px-6 py-3 flex items-center gap-3">
          <h1 className="text-lg font-semibold">Reservation Eyeball</h1>
          <nav className="ml-6 flex items-center gap-1 text-sm">
            <Link
              to="/"
              className="px-3 py-1.5 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800"
              activeProps={{
                className:
                  'bg-slate-200 text-slate-900 dark:bg-slate-700 dark:text-white',
              }}
            >
              List
            </Link>
            <Link
              to="/form"
              className="px-3 py-1.5 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800"
              activeProps={{
                className:
                  'bg-slate-200 text-slate-900 dark:bg-slate-700 dark:text-white',
              }}
            >
              Form
            </Link>
          </nav>
          <div className="ml-auto flex items-center gap-2">
            <button
              className="inline-flex items-center rounded-md border border-slate-300 dark:border-slate-700 px-3 py-1.5 text-sm hover:bg-slate-100 dark:hover:bg-slate-800"
              onClick={() => setCount((n) => n + 1)}
            >
              Count {count}
            </button>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="relative z-0 max-w-5xl mx-auto p-6">
        <section>
          <Outlet />
        </section>

        <section className="mt-6 rounded-lg border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/60 backdrop-blur p-4 shadow-sm">
          <h2 className="text-lg font-medium">API Health</h2>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            <strong>Endpoint:</strong> {API_BASE_URL}/api/health
          </p>
          {loading && <p className="mt-2 text-sm">Loading…</p>}
          {error && <p className="mt-2 text-sm text-red-500">Error: {error}</p>}
          {!loading && !error && (
            <pre className="mt-2 text-xs overflow-x-auto">
              {JSON.stringify(health, null, 2)}
            </pre>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
