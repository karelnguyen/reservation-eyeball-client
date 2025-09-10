export async function readErrorMessage(res: Response, fallback: string) {
  const ct = res.headers.get('content-type') || '';
  try {
    if (ct.includes('application/json')) {
      const body = await res.json();
      return body?.message || body?.error || body?.detail || fallback;
    }
    const text = await res.text();
    return text || fallback;
  } catch {
    return fallback;
  }
}

export function initials(first?: string, last?: string) {
  const name = `${first ?? ''} ${last ?? ''}`.trim();
  if (!name) return '–';
  return name
    .split(/\s+/)
    .map((p) => p[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}
export function badgeVariant(status?: string) {
  switch ((status ?? '').toLowerCase()) {
    case 'confirmed':
      return 'success';
    case 'booked':
      return 'warning';
    default:
      return 'warning';
  }
}
