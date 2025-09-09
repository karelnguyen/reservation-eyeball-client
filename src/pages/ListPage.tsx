import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Badge from '../components/ui/Badge';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Table, Tbody, Td, Th, Thead, Tr } from '../components/ui/Table';

type Reservation = {
  id: string;
  guest: string;
  date: string; // ISO date string
  status: 'confirmed' | 'pending' | 'canceled';
};

const sample: Reservation[] = [
  { id: 'R-1001', guest: 'Jane Doe', date: '2025-09-10', status: 'confirmed' },
  { id: 'R-1002', guest: 'John Smith', date: '2025-09-12', status: 'pending' },
  { id: 'R-1003', guest: 'Alice Johnson', date: '2025-09-15', status: 'canceled' },
];

function initials(name: string) {
  return name
    .split(' ')
    .map((p) => p[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

export default function ListPage() {
  return (
    <Card>
      <CardHeader className="flex items-center gap-3">
        <div className="mr-auto">
          <CardTitle>Reservations</CardTitle>
          <p className="text-sm text-slate-600 dark:text-slate-400">Manage upcoming bookings and status</p>
        </div>
        <div className="flex items-center gap-2 w-80 max-w-full">
          <Input placeholder="Search by guest or id…" />
          <Button variant="outline">Filter</Button>
          <Button>New</Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Guest</Th>
              <Th>Date</Th>
              <Th>Status</Th>
              <Th className="text-right">Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {sample.map((r) => (
              <Tr key={r.id}>
                <Td className="font-medium">{r.id}</Td>
                <Td>
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-sky-500 to-indigo-600 text-white text-xs">
                      {initials(r.guest)}
                    </span>
                    <span>{r.guest}</span>
                  </div>
                </Td>
                <Td>{new Date(r.date).toLocaleDateString()}</Td>
                <Td>
                  <Badge
                    variant={
                      r.status === 'confirmed'
                        ? 'success'
                        : r.status === 'pending'
                        ? 'warning'
                        : 'danger'
                    }
                  >
                    {r.status}
                  </Badge>
                </Td>
                <Td className="text-right">
                  <Button variant="ghost" size="sm" className="mr-1">View</Button>
                  <Button variant="outline" size="sm">Edit</Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </CardContent>
    </Card>
  );
}
