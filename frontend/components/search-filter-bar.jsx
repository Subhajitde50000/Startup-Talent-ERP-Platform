import { Search } from 'lucide-react';

export default function SearchFilterBar({
  search = '',
  onSearchChange,
  placeholder = 'Search...',
  filter,
  onFilterChange,
  filterOptions = [],
  children,
  className = '',
}) {
  return (
    <div className={`mb-4 flex flex-wrap items-center gap-3 ${className}`}>
      {onSearchChange && (
        <div className="relative min-w-[200px] flex-1">
          <Search className="absolute left-3 top-2.5 text-[#A0A7B4]" size={16} />
          <input
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={placeholder}
            aria-label={placeholder}
            className="h-10 w-full rounded-lg border border-[#E5E1D8] bg-white pl-9 pr-3 text-sm focus:border-ink focus:outline-none"
          />
        </div>
      )}

      {onFilterChange && filterOptions.length > 0 && (
        <select
          value={filter}
          onChange={(e) => onFilterChange(e.target.value)}
          aria-label="Filter"
          className="h-10 rounded-lg border border-[#E5E1D8] bg-white px-3 text-xs font-medium focus:border-ink focus:outline-none"
        >
          {filterOptions.map((opt) => (
            <option key={typeof opt === 'string' ? opt : opt.value} value={typeof opt === 'string' ? opt : opt.value}>
              {typeof opt === 'string' ? opt : opt.label}
            </option>
          ))}
        </select>
      )}

      {children}
    </div>
  );
}
