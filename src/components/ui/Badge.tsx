import type { HTMLAttributes } from 'react';
import { cn } from '../../lib/cn';

type Props = HTMLAttributes<HTMLSpanElement> & {
  variant?: 'default' | 'success' | 'warning' | 'danger';
};

export default function Badge({ className, variant = 'default', ...props }: Props) {
  const variants = {
    default: 'bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-100',
    success: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-600/20 dark:text-emerald-300',
    warning: 'bg-amber-100 text-amber-900 dark:bg-amber-600/20 dark:text-amber-300',
    danger: 'bg-rose-100 text-rose-900 dark:bg-rose-600/20 dark:text-rose-300',
  } as const;
  return (
    <span
      className={cn('inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium', variants[variant], className)}
      {...props}
    />
  );
}

