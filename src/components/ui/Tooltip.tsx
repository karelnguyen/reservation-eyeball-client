import type { PropsWithChildren } from 'react';

type Props = PropsWithChildren<{
  label: string;
}>;

export default function Tooltip({ label, children }: Props) {
  return (
    <span className="relative inline-flex items-center group cursor-help">
      {children}
      <span
        role="tooltip"
        aria-hidden
        className={[
          'pointer-events-none select-none absolute left-1/2 top-full z-50 -translate-x-1/2 translate-y-2 rounded-md bg-slate-900 px-2 py-1 text-xs text-white shadow-md',
          'opacity-0 scale-95 origin-top transition-opacity transition-transform duration-150 ease-out group-hover:opacity-100 group-hover:scale-100 group-focus-within:opacity-100 group-focus-within:scale-100',
          'break-words whitespace-normal',
        ].join(' ')}
      >
        {label}
        <span className="absolute left-1/2 bottom-full -translate-x-1/2 border-4 border-transparent border-b-slate-900" />
      </span>
    </span>
  );
}
