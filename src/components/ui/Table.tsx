import classNames from 'classnames';
import type { HTMLAttributes, TableHTMLAttributes } from 'react';

export function Table({
  className,
  ...props
}: TableHTMLAttributes<HTMLTableElement>) {
  return (
    <table className={classNames('w-full text-sm', className)} {...props} />
  );
}

export function Thead({
  className,
  ...props
}: HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <thead
      className={classNames('text-left text-slate-500', className)}
      {...props}
    />
  );
}

export function Tbody({
  className,
  ...props
}: HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <tbody
      className={classNames(
        'divide-y divide-slate-200 dark:divide-slate-700',
        className
      )}
      {...props}
    />
  );
}

export function Tr({
  className,
  ...props
}: HTMLAttributes<HTMLTableRowElement>) {
  return (
    <tr
      className={classNames(
        'hover:bg-slate-50/60 dark:hover:bg-slate-800/50',
        className
      )}
      {...props}
    />
  );
}

export function Th({
  className,
  ...props
}: HTMLAttributes<HTMLTableCellElement>) {
  return (
    <th className={classNames('px-3 py-2 font-medium', className)} {...props} />
  );
}

export function Td({
  className,
  ...props
}: HTMLAttributes<HTMLTableCellElement>) {
  return <td className={classNames('px-3 py-2', className)} {...props} />;
}
