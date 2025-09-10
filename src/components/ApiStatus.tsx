import { use } from 'react';
import Tooltip from './ui/Tooltip';

export default function ApiStatus({
  promise,
  endpoint,
}: {
  promise: Promise<{ ok: boolean }>;
  endpoint: string;
}) {
  const data = use(promise);
  const title = `API ok: ${data.ok} — ${endpoint}`;
  return (
    <Tooltip label={title}>
      <span
        aria-label={title}
        className="inline-block h-2.5 w-2.5 rounded-full bg-emerald-500 shadow-[0_0_0_2px] shadow-emerald-500/20"
      />
    </Tooltip>
  );
}
