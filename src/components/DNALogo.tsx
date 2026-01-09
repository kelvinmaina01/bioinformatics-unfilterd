import { cn } from '@/lib/utils';

interface DNALogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  animate?: boolean;
  variant?: 'default' | 'light';
}

const sizeClasses = {
  sm: 'w-8 h-8',
  md: 'w-12 h-12',
  lg: 'w-16 h-16',
  xl: 'w-24 h-24'
};

export function DNALogo({ className, size = 'md', animate = false, variant = 'default' }: DNALogoProps) {
  const isLight = variant === 'light';
  const strokeColor = isLight ? "white" : "url(#dnaGradient)";
  const accentColor1 = isLight ? "white" : "hsl(165 100% 62%)";
  const accentColor2 = isLight ? "rgba(255,255,255,0.8)" : "hsl(255 100% 59%)";

  return (
    <div
      className={cn(
        sizeClasses[size],
        animate && 'animate-float',
        className
      )}
    >
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* DNA Double Helix - Simplified elegant design */}
        <defs>
          <linearGradient id="dnaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(255 100% 59%)" />
            <stop offset="100%" stopColor="hsl(165 100% 62%)" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Left strand */}
        <path
          d="M30 10 Q50 25 30 40 Q10 55 30 70 Q50 85 30 95"
          stroke={strokeColor}
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
          filter={isLight ? undefined : "url(#glow)"}
        />

        {/* Right strand */}
        <path
          d="M70 10 Q50 25 70 40 Q90 55 70 70 Q50 85 70 95"
          stroke={strokeColor}
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
          filter={isLight ? undefined : "url(#glow)"}
        />

        {/* Connecting rungs */}
        <line x1="35" y1="18" x2="65" y2="18" stroke={accentColor2} strokeWidth="2" opacity="0.6" />
        <line x1="25" y1="40" x2="75" y2="40" stroke={accentColor1} strokeWidth="2" opacity="0.8" />
        <line x1="35" y1="62" x2="65" y2="62" stroke={accentColor2} strokeWidth="2" opacity="0.6" />
        <line x1="25" y1="84" x2="75" y2="84" stroke={accentColor1} strokeWidth="2" opacity="0.8" />

        {/* Node accents */}
        <circle cx="30" cy="40" r="4" fill={accentColor1} />
        <circle cx="70" cy="40" r="4" fill={accentColor2} />
        <circle cx="30" cy="70" r="4" fill={accentColor2} />
        <circle cx="70" cy="70" r="4" fill={accentColor1} />
      </svg>
    </div>
  );
}
