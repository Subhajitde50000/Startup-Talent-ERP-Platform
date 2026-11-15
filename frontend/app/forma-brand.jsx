const STAGE_NODES = [
  [20, 88],
  [120, 64],
  [220, 40],
  [320, 16]
];
const STAGE_LABELS = ['Idea', 'Prototype', 'Early revenue', 'Mature'];

function stagePath(index) {
  let d = `M${STAGE_NODES[0][0]} ${STAGE_NODES[0][1]}`;
  for (let i = 1; i <= index; i += 1) {
    d += ` H${STAGE_NODES[i][0]} V${STAGE_NODES[i][1]}`;
  }
  return d;
}

export function FormaMark({ className = '' }) {
  return (
    <span className={`forma-mark ${className}`} aria-hidden="true">
      f
    </span>
  );
}

export function FormaWordmark({ className = '', label = 'forma' }) {
  return (
    <span className={`forma-wordmark ${className}`} role="img" aria-label={label}>
      <span aria-hidden="true">f</span>
      <span className="forma-wordmark-dot" aria-hidden="true" />
      <span aria-hidden="true">rma</span>
    </span>
  );
}

export function FormaSteps({
  active = 3,
  labels = true,
  tone = 'light',
  animated = false,
  className = ''
}) {
  const current = Math.max(0, Math.min(active, STAGE_NODES.length - 1));
  return (
    <svg
      className={`forma-steps ${tone === 'deep' ? 'on-deep' : ''} ${animated ? 'is-animated' : ''} ${className}`}
      viewBox="0 0 360 118"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
      focusable="false"
    >
      <path className="forma-steps-base" d={stagePath(3)} pathLength="1" />
      <path className="forma-steps-fill" d={stagePath(current)} pathLength="1" />
      {STAGE_NODES.map(([x, y], i) => (
        <g key={STAGE_LABELS[i]}>
          {i === current && <circle className="forma-steps-halo" cx={x} cy={y} r="12" />}
          <circle
            className={`forma-steps-node ${i <= current ? 'is-done' : ''} ${i === current ? 'is-current' : ''}`}
            cx={x}
            cy={y}
            r={i === current ? 5.5 : 4.5}
          />
          {labels && (
            <text
              className={`forma-steps-label ${i === current ? 'is-current' : ''}`}
              x={x}
              y="112"
              textAnchor={i === 0 ? 'start' : i === STAGE_NODES.length - 1 ? 'end' : 'middle'}
            >
              {STAGE_LABELS[i]}
            </text>
          )}
        </g>
      ))}
    </svg>
  );
}
