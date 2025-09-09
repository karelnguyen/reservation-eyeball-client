import type { ButtonHTMLAttributes } from 'react';
import classNames from 'classnames';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'ghost' | 'outline';
  size?: 'sm' | 'md';
};

export default function Button({
  className,
  variant = 'primary',
  size = 'md',
  ...props
}: Props) {
  const base =
    'inline-flex items-center justify-center rounded-md font-medium transition focus:outline-none focus:ring-2 focus:ring-slate-400/60 disabled:opacity-50 disabled:pointer-events-none';
  const sizes = {
    sm: 'px-2.5 py-1.5 text-sm',
    md: 'px-3 py-2 text-sm',
  } as const;
  const variants = {
    primary:
      'bg-slate-900 text-white hover:opacity-90 dark:bg-slate-100 dark:text-slate-900',
    ghost: 'bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800',
    outline:
      'border border-slate-300 dark:border-slate-700 bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800',
  } as const;

  return (
    <button
      className={classNames(base, sizes[size], variants[variant], className)}
      {...props}
    />
  );
}
