export default function MetricStatStrip({ stats = [], className = '' }) {
  if (!stats || stats.length === 0) return null;

  return (
    <section className={`mb-5 overflow-hidden rounded-xl border border-[#E5E1D8] bg-white ${className}`}>
      <div className={`grid grid-cols-2 sm:grid-cols-${Math.min(stats.length, 5)} divide-y sm:divide-y-0 sm:divide-x divide-[#E5E1D8]`}>
        {stats.map(([label, value, variant, onClick], i) => {
          const isError = variant === 'error';
          const isWarn = variant === 'warn';
          const isSuccess = variant === 'success';

          const content = (
            <div className="p-4 sm:px-6">
              <span className="text-xs text-[#4A5568]">{label}</span>
              <b
                className={`serif mt-1 block text-2xl ${
                  isError
                    ? 'text-[#B42318]'
                    : isWarn
                    ? 'text-[#8A5700]'
                    : isSuccess
                    ? 'text-[#2E7D5B]'
                    : 'text-[#0F1B2D]'
                }`}
              >
                {value}
              </b>
            </div>
          );

          if (onClick) {
            return (
              <button
                type="button"
                key={label || i}
                onClick={onClick}
                className="text-left transition hover:bg-[#FAF8F4] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#B8955A]"
              >
                {content}
              </button>
            );
          }

          return (
            <div key={label || i}>
              {content}
            </div>
          );
        })}
      </div>
    </section>
  );
}
