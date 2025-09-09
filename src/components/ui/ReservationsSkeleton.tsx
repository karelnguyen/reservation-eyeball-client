import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';

function Row() {
  return (
    <div className="grid grid-cols-[140px_1fr_150px_200px_120px] gap-3 py-2 items-center">
      <div className="h-4 w-24 rounded bg-slate-200/80 dark:bg-slate-700/60 animate-pulse" />
      <div className="flex items-center gap-3">
        <div className="h-8 w-8 rounded-full bg-slate-200/80 dark:bg-slate-700/60 animate-pulse" />
        <div className="h-4 w-40 rounded bg-slate-200/80 dark:bg-slate-700/60 animate-pulse" />
      </div>
      <div className="h-4 w-28 rounded bg-slate-200/80 dark:bg-slate-700/60 animate-pulse" />
      <div className="h-4 w-44 rounded bg-slate-200/80 dark:bg-slate-700/60 animate-pulse" />
      <div className="ml-auto h-7 w-24 rounded bg-slate-200/80 dark:bg-slate-700/60 animate-pulse" />
    </div>
  );
}

export default function ReservationsSkeleton() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Reservations</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="divide-y divide-slate-200/80 dark:divide-slate-700/60">
          {Array.from({ length: 7 }).map((_, i) => (
            <Row key={i} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

