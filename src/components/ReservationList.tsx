import { use } from 'react';
import Badge from './ui/Badge';
import { Card, CardHeader, CardTitle, CardContent } from './ui/Card';
import { Table, Thead, Tr, Th, Tbody, Td } from './ui/Table';
import type { Reservation } from '../api/getReservations';
import { initials, badgeVariant } from '../utils';

export default function ReservationList({
  promise,
}: {
  promise: Promise<Reservation[]>;
}) {
  const data = use(promise);

  return (
    <Card>
      <CardHeader className="flex items-center gap-3">
        <div className="mr-auto">
          <CardTitle>Reservations</CardTitle>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Manage upcoming bookings and status
          </p>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Guest</Th>
              <Th>Phone</Th>
              <Th>Scheduled</Th>
              <Th>Status</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map((r) => (
              <Tr key={r.id ?? `${r.firstName}-${r.lastName}-${r.createdAt}`}>
                <Td className="font-medium">{r.id ?? '—'}</Td>
                <Td>
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-sky-500 to-indigo-600 text-white text-xs">
                      {initials(r.firstName, r.lastName)}
                    </span>
                    <div className="leading-tight">
                      <div>
                        {r.firstName || r.lastName
                          ? `${r.firstName ?? ''} ${r.lastName ?? ''}`.trim()
                          : '—'}
                      </div>
                      {r.pinLast4 && (
                        <div className="text-xs text-slate-500 dark:text-slate-400">
                          PIN ••••{r.pinLast4}
                        </div>
                      )}
                    </div>
                  </div>
                </Td>
                <Td>{r.phone ?? '—'}</Td>
                <Td>
                  {r.scheduledAt
                    ? new Date(r.scheduledAt).toLocaleString()
                    : '—'}
                </Td>
                <Td>
                  <Badge variant={badgeVariant(r.status)}>
                    {r.status ?? '—'}
                  </Badge>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </CardContent>
    </Card>
  );
}
