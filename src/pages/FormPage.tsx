import { useState } from 'react';

export default function FormPage() {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');

  return (
    <section className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-4 shadow-sm">
      <h2 className="text-xl font-semibold">Form</h2>
      <p className="text-sm text-slate-600 dark:text-slate-300">This is the form page.</p>
      <form onSubmit={(e) => e.preventDefault()} className="mt-3 space-y-3">
        <div className="grid gap-1">
          <label className="text-sm" htmlFor="name">Name</label>
          <input
            id="name"
            className="rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-400/60"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Jane Doe"
          />
        </div>
        <div className="grid gap-1">
          <label className="text-sm" htmlFor="date">Date</label>
          <input
            id="date"
            type="date"
            className="rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-400/60"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="inline-flex items-center rounded-md bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 px-3 py-2 text-sm hover:opacity-90"
        >
          Submit
        </button>
      </form>
    </section>
  );
}
