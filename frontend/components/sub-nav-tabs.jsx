import Link from 'next/link';

export default function SubNavTabs({ items = [], className = '' }) {
  if (!items || items.length === 0) return null;

  return (
    <div className={`mb-6 border-b border-[#E5E1D8] ${className}`}>
      <nav
        className="-mb-px flex gap-6 overflow-x-auto text-sm font-medium"
        aria-label="Secondary navigation"
      >
        {items.map(([label, href, active]) => (
          <Link
            key={label}
            href={href}
            className={`whitespace-nowrap border-b-2 pb-3 text-sm transition ${
              active
                ? 'border-[#B8955A] font-semibold text-ink'
                : 'border-transparent text-[#4A5568] hover:border-[#E5E1D8] hover:text-ink'
            }`}
          >
            {label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
