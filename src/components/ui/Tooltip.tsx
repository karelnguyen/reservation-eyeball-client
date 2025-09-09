import type { PropsWithChildren } from 'react';

type Props = PropsWithChildren<{
  label: string;
}>;

export default function Tooltip({ label, children }: Props) {
  return (
    <span className="relative inline-flex group">
      {children}
      <span
        role="tooltip"
        className="pointer-events-none absolute -top-2 left-1/2 z-20 hidden w-max -translate-x-1/2 -translate-y-full rounded-md bg-slate-900 px-2 py-1 text-xs text-white shadow-md group-hover:block group-focus-within:block"
      >
        {label}
        <span className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-slate-900" />
      </span>
    </span>
  );
}

