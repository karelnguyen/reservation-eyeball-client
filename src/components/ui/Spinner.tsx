import classNames from 'classnames';
import type { HTMLAttributes } from 'react';

type Props = HTMLAttributes<HTMLDivElement> & {
  size?: 'sm' | 'md' | 'lg';
};

export default function Spinner({ className, size = 'md', ...props }: Props) {
  const sizes = {
    sm: 'h-4 w-4 border-2',
    md: 'h-6 w-6 border-2',
    lg: 'h-10 w-10 border-[3px]',
  } as const;
  return (
    <div
      className={classNames(
        'inline-block rounded-full border-current border-t-transparent animate-spin text-slate-600 dark:text-slate-300',
        sizes[size],
        className
      )}
      role="status"
      aria-label="Loading"
      {...props}
    />
  );
}
