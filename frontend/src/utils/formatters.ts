/**
 * Canonical formatting utilities for Startup & Talent ERP Platform
 */

/**
 * Returns clean uppercase 1-2 character initials for a given person or entity name.
 */
export function initials(name?: string): string {
  if (!name || !name.trim()) return '—';
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '—';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

/**
 * Standardized date formatter using en-IN locale format (e.g., '14 Nov 2026').
 */
export function dateFmt(value?: string | Date | null): string {
  if (!value) return 'Not set';
  const d = typeof value === 'string' ? new Date(value.length === 10 ? `${value}T12:00:00` : value) : value;
  if (Number.isNaN(d.getTime())) return 'Not set';
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

/**
 * Standardized date-time formatter using en-IN locale format.
 */
export function dateTimeFmt(value?: string | Date | null): string {
  if (!value) return 'Time not set';
  const d = typeof value === 'string' ? new Date(value) : value;
  if (Number.isNaN(d.getTime())) return 'Time not set';
  return d.toLocaleString('en-IN', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    hour: 'numeric',
    minute: '2-digit',
  });
}
