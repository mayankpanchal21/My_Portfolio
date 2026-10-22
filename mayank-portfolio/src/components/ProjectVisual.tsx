import type { ProjectVisual as VisualKind } from '../types';

/**
 * Abstract, data-free illustrations used until real screenshots are supplied,
 * and permanently for confidential work where screenshots aren't appropriate.
 */
export function ProjectVisual({ kind }: { kind: VisualKind }) {
  return (
    <svg
      viewBox="0 0 400 220"
      className="h-full w-full"
      role="img"
      aria-label={labels[kind]}
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <pattern id={`dots-${kind}`} width="16" height="16" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="1" fill="#34343c" />
        </pattern>
      </defs>
      <rect width="400" height="220" fill="#0e0e11" />
      <rect width="400" height="220" fill={`url(#dots-${kind})`} />
      {kind === 'application' && <Application />}
      {kind === 'website' && <Website />}
      {kind === 'geospatial' && <Geospatial />}
    </svg>
  );
}

const labels: Record<VisualKind, string> = {
  application: 'Abstract diagram of a client, API and database architecture',
  website: 'Abstract wireframe of a responsive website layout',
  geospatial: 'Abstract contour map with plotted points',
};

const stroke = { stroke: '#3a3a44', strokeWidth: 1, fill: '#131317' };

function Application() {
  return (
    <g fontFamily="ui-monospace, monospace" fontSize="10" fill="#a1a1aa">
      <rect x="40" y="80" width="90" height="60" rx="8" {...stroke} />
      <rect x="155" y="80" width="90" height="60" rx="8" {...stroke} stroke="#7c86ff" />
      <rect x="270" y="80" width="90" height="60" rx="8" {...stroke} />
      <text x="85" y="114" textAnchor="middle">client</text>
      <text x="200" y="114" textAnchor="middle" fill="#a5abff">api</text>
      <text x="315" y="114" textAnchor="middle">data</text>
      <path d="M130 110 H155 M245 110 H270" stroke="#7c86ff" strokeWidth="1.25" strokeDasharray="3 3" />
      <rect x="155" y="160" width="90" height="22" rx="6" {...stroke} />
      <text x="200" y="175" textAnchor="middle" fontSize="9">auth</text>
      <path d="M200 140 V160" stroke="#3a3a44" />
    </g>
  );
}

function Website() {
  return (
    <g>
      <rect x="60" y="30" width="280" height="170" rx="10" {...stroke} />
      <path d="M60 52 H340" stroke="#3a3a44" />
      <rect x="76" y="68" width="120" height="10" rx="3" fill="#ececef" opacity="0.8" />
      <rect x="76" y="86" width="90" height="10" rx="3" fill="#a5abff" opacity="0.8" />
      <rect x="76" y="108" width="150" height="5" rx="2.5" fill="#3a3a44" />
      <rect x="76" y="118" width="130" height="5" rx="2.5" fill="#3a3a44" />
      <rect x="76" y="138" width="54" height="16" rx="4" fill="#ececef" opacity="0.85" />
      <rect x="240" y="68" width="84" height="86" rx="6" fill="#18181d" stroke="#3a3a44" />
      <rect x="76" y="170" width="76" height="16" rx="4" fill="#18181d" stroke="#3a3a44" />
      <rect x="162" y="170" width="76" height="16" rx="4" fill="#18181d" stroke="#3a3a44" />
      <rect x="248" y="170" width="76" height="16" rx="4" fill="#18181d" stroke="#3a3a44" />
    </g>
  );
}

function Geospatial() {
  return (
    <g fill="none">
      <path d="M-10 160 C80 120 140 190 230 140 S360 90 420 120" stroke="#2a2a31" />
      <path d="M-10 130 C70 95 150 160 230 112 S350 60 420 90" stroke="#34343c" />
      <path d="M-10 100 C60 70 160 130 230 84 S340 35 420 60" stroke="#3a3a44" />
      <path d="M-10 70 C60 45 160 100 230 56 S330 10 420 30" stroke="#2a2a31" />
      <circle cx="120" cy="120" r="30" stroke="#7c86ff" strokeOpacity="0.35" />
      <circle cx="120" cy="120" r="55" stroke="#7c86ff" strokeOpacity="0.18" />
      <circle cx="120" cy="120" r="3.5" fill="#a5abff" />
      <circle cx="260" cy="92" r="3" fill="#ececef" fillOpacity="0.7" />
      <circle cx="310" cy="150" r="3" fill="#ececef" fillOpacity="0.7" />
      <path d="M120 120 L260 92 L310 150" stroke="#a5abff" strokeOpacity="0.5" strokeDasharray="3 4" />
    </g>
  );
}
