import { useEffect, useState } from 'react';

function getSystemPrefersDark() {
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
}

function applyTheme(dark: boolean) {
  const root = document.documentElement;
  if (dark) root.classList.add('dark');
  else root.classList.remove('dark');
}

export default function ThemeToggle() {
  const [dark, setDark] = useState<boolean>(() => {
    const saved = localStorage.getItem('theme');
    return saved ? saved === 'dark' : getSystemPrefersDark();
  });

  useEffect(() => {
    applyTheme(dark);
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  }, [dark]);

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
      onClick={() => setDark((v) => !v)}
    >
      {dark ? (
        // Sun icon
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
          <path d="M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z" />
          <path fillRule="evenodd" d="M12 2.25a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0V3A.75.75 0 0 1 12 2.25Zm0 16.5a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5a.75.75 0 0 1 .75-.75Zm9-7.5a.75.75 0 0 1-.75.75h-1.5a.75.75 0 0 1 0-1.5H20.25a.75.75 0 0 1 .75.75ZM6 12a.75.75 0 0 1-.75.75H3.75a.75.75 0 0 1 0-1.5H5.25A.75.75 0 0 1 6 12Zm11.78 6.03a.75.75 0 0 1-1.06 1.06l-1.06-1.06a.75.75 0 0 1 1.06-1.06l1.06 1.06Zm-9.48-9.48a.75.75 0 1 1-1.06-1.06L7.24 6.42a.75.75 0 1 1 1.06 1.06L8.3 8.55Zm9.48-1.06a.75.75 0 0 1-1.06-1.06l1.06-1.06a.75.75 0 1 1 1.06 1.06l-1.06 1.06ZM8.3 15.45a.75.75 0 1 1-1.06 1.06L6.18 15.45a.75.75 0 1 1 1.06-1.06l1.06 1.06Z" clipRule="evenodd" />
        </svg>
      ) : (
        // Moon icon
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
          <path d="M21.752 15.002a9 9 0 1 1-12.75-12.75 9.75 9.75 0 1 0 12.75 12.75Z" />
        </svg>
      )}
    </button>
  );
}

