import type { ButtonHTMLAttributes } from 'react';
import classNames from 'classnames';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg' | 'xl';
};

export default function Button({
  className,
  variant = 'primary',
  size = 'md',
  ...props
}: Props) {
  const base =
    'cursor-pointer inline-flex items-center justify-center rounded-md font-medium transition focus:outline-none focus:ring-2 focus:ring-slate-400/60 disabled:opacity-50 disabled:pointer-events-none';
  const sizes = {
    sm: 'px-2.5 py-1.5 text-sm',
    md: 'px-3 py-2 text-sm',
    lg: 'px-4 py-2.5 text-base',
    xl: 'px-5 py-3 text-base',
  } as const;
  const variants = {
    primary: 'bg-blue-900 text-white hover:opacity-90',
    ghost: 'bg-transparent hover:bg-slate-800',
    outline: 'border border-slate-700 bg-transparent hover:bg-slate-800',
  } as const;

  return (
    <button
      className={classNames(base, sizes[size], variants[variant], className)}
      {...props}
    />
  );
}
