import { globalPresence } from '@/data/mockData';

export function WorldMap() {
  return (
    <div className="relative w-full aspect-[2/1] max-w-4xl mx-auto">
      {/* Simplified world map outline */}
      <svg
        viewBox="0 0 100 50"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Background grid lines */}
        <defs>
          <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
            <path
              d="M 10 0 L 0 0 0 10"
              fill="none"
              stroke="hsl(230 30% 20%)"
              strokeWidth="0.1"
            />
          </pattern>
        </defs>
        <rect width="100" height="50" fill="url(#grid)" opacity="0.5" />

        {/* Simplified continent outlines */}
        {/* North America */}
        <ellipse cx="20" cy="20" rx="12" ry="10" fill="hsl(230 30% 15%)" opacity="0.6" />
        {/* South America */}
        <ellipse cx="25" cy="38" rx="6" ry="8" fill="hsl(230 30% 15%)" opacity="0.6" />
        {/* Europe */}
        <ellipse cx="50" cy="18" rx="8" ry="6" fill="hsl(230 30% 15%)" opacity="0.6" />
        {/* Africa */}
        <ellipse cx="52" cy="32" rx="7" ry="10" fill="hsl(230 30% 15%)" opacity="0.6" />
        {/* Asia */}
        <ellipse cx="72" cy="22" rx="15" ry="12" fill="hsl(230 30% 15%)" opacity="0.6" />
        {/* Oceania */}
        <ellipse cx="85" cy="40" rx="6" ry="5" fill="hsl(230 30% 15%)" opacity="0.6" />

        {/* Glowing dots for community presence */}
        {globalPresence.map((point) => (
          <g key={point.id}>
            {/* Outer glow */}
            <circle
              cx={point.x}
              cy={point.y}
              r="2"
              fill="hsl(165 100% 62%)"
              opacity="0.3"
            >
              <animate
                attributeName="r"
                values="1.5;2.5;1.5"
                dur="3s"
                repeatCount="indefinite"
                begin={`${point.id * 0.2}s`}
              />
              <animate
                attributeName="opacity"
                values="0.3;0.5;0.3"
                dur="3s"
                repeatCount="indefinite"
                begin={`${point.id * 0.2}s`}
              />
            </circle>
            {/* Core dot */}
            <circle
              cx={point.x}
              cy={point.y}
              r="0.8"
              fill="hsl(165 100% 62%)"
            />
          </g>
        ))}
      </svg>
    </div>
  );
}
