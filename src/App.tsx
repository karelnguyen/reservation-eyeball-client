import { useMemo, useState } from 'react';
import { Link, Outlet, useRouterState } from '@tanstack/react-router';
import { getHealth } from './api/getHealth';

import { HealthStatus } from './components/HealthStatus';

function App() {
  const [healthVersion] = useState(0);
  const location = useRouterState({ select: (s) => s.location });
  const healthPromise = useMemo(getHealth, [healthVersion]);

  const activeIndex = location.pathname === '/form' ? 1 : 0;

  return (
    <div className="min-h-screen relative bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(40rem_20rem_at_50%_-4rem,rgba(56,189,248,0.15),transparent)] dark:bg-[radial-gradient(40rem_20rem_at_50%_-4rem,rgba(125,211,252,0.08),transparent)]" />
      <header className="sticky top-0 z-10 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-slate-900/60 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-5xl mx-auto px-6 py-3 flex items-center gap-3">
          <h1 className="text-lg font-semibold text-slate-50">
            Reservation Eyeball
          </h1>
          <nav className="ml-6 relative inline-flex items-center">
            <div className="relative inline-flex items-center rounded-lg bg-slate-200/60 dark:bg-slate-800/60 p-1">
              <span
                className="absolute left-1 top-1 bottom-1 w-24 rounded-md bg-white dark:bg-slate-700 shadow-sm transition-transform duration-200"
                style={{ transform: `translateX(${activeIndex * 100}%)` }}
                aria-hidden
              />
              <Link
                to="/"
                className="relative z-10 w-24 text-center px-3 py-1.5 rounded-md text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white"
              >
                List
              </Link>
              <Link
                to="/form"
                className="relative z-10 w-24 text-center px-3 py-1.5 rounded-md text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white"
              >
                Form
              </Link>
            </div>
          </nav>
          <div className="ml-auto flex items-center gap-2">
            <HealthStatus promise={healthPromise} />
          </div>
        </div>
      </header>

      <main className="relative z-0 max-w-5xl mx-auto p-6">
        <section>
          <div key={location.href} className="animate-[fade-in_200ms_ease-out]">
            <Outlet />
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
