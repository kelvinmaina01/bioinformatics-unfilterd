import { useState } from 'react';
import { MapPin, GraduationCap } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface University {
  id: number;
  name: string;
  shortName: string;
  location: string;
  x: number;
  y: number;
  hasBiomedical: boolean;
  programs: string[];
}

const kenyanUniversities: University[] = [
  {
    id: 1,
    name: 'Jomo Kenyatta University of Agriculture and Technology',
    shortName: 'JKUAT',
    location: 'Juja, Kiambu',
    x: 52,
    y: 42,
    hasBiomedical: true,
    programs: ['Biomedical Science', 'Biotechnology', 'Medical Laboratory Sciences']
  },
  {
    id: 2,
    name: 'University of Nairobi',
    shortName: 'UoN',
    location: 'Nairobi',
    x: 50,
    y: 45,
    hasBiomedical: true,
    programs: ['Medicine', 'Biomedical Science', 'Pharmacy', 'Nursing']
  },
  {
    id: 3,
    name: 'Kenyatta University',
    shortName: 'KU',
    location: 'Nairobi',
    x: 53,
    y: 44,
    hasBiomedical: true,
    programs: ['Biomedical Sciences', 'Pharmacy', 'Public Health']
  },
  {
    id: 4,
    name: 'Moi University',
    shortName: 'MU',
    location: 'Eldoret, Uasin Gishu',
    x: 38,
    y: 35,
    hasBiomedical: true,
    programs: ['Medicine', 'Biomedical Engineering', 'Public Health']
  },
  {
    id: 5,
    name: 'Maseno University',
    shortName: 'Maseno',
    location: 'Maseno, Kisumu',
    x: 32,
    y: 40,
    hasBiomedical: true,
    programs: ['Biomedical Science', 'Medical Laboratory Sciences']
  },
  {
    id: 6,
    name: 'Egerton University',
    shortName: 'Egerton',
    location: 'Njoro, Nakuru',
    x: 40,
    y: 40,
    hasBiomedical: true,
    programs: ['Biochemistry', 'Biotechnology']
  },
  {
    id: 7,
    name: 'Technical University of Kenya',
    shortName: 'TUK',
    location: 'Nairobi',
    x: 51,
    y: 46,
    hasBiomedical: true,
    programs: ['Biomedical Engineering', 'Medical Laboratory Sciences']
  },
  {
    id: 8,
    name: 'Mount Kenya University',
    shortName: 'MKU',
    location: 'Thika, Kiambu',
    x: 55,
    y: 41,
    hasBiomedical: true,
    programs: ['Nursing', 'Public Health', 'Medical Laboratory Sciences']
  },
  {
    id: 9,
    name: 'Pwani University',
    shortName: 'PU',
    location: 'Kilifi',
    x: 68,
    y: 52,
    hasBiomedical: false,
    programs: ['Biology', 'Chemistry']
  },
  {
    id: 10,
    name: 'Strathmore University',
    shortName: 'Strathmore',
    location: 'Nairobi',
    x: 49,
    y: 47,
    hasBiomedical: false,
    programs: ['Data Science', 'Computer Science']
  },
  {
    id: 11,
    name: 'KEMRI',
    shortName: 'KEMRI',
    location: 'Nairobi',
    x: 48,
    y: 44,
    hasBiomedical: true,
    programs: ['Research Institute - Infectious Diseases', 'Public Health Research']
  }
];

export function KenyaMap() {
  const [selectedUniversity, setSelectedUniversity] = useState<University | null>(null);

  return (
    <TooltipProvider>
      <div className="relative w-full max-w-4xl mx-auto">
        <div className="relative aspect-[4/5] md:aspect-[3/4]">
          {/* Kenya map SVG outline */}
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full"
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Background */}
            <defs>
              <linearGradient id="kenyaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.1" />
                <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0.05" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="1" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>

            {/* Simplified Kenya shape */}
            <path
              d="M 30 10 
                 L 70 10 
                 L 75 20 
                 L 80 30 
                 L 78 40 
                 L 75 50 
                 L 70 60 
                 L 65 70 
                 L 55 75 
                 L 50 80 
                 L 45 75 
                 L 40 65 
                 L 35 55 
                 L 30 45 
                 L 25 35 
                 L 28 20 
                 Z"
              fill="url(#kenyaGradient)"
              stroke="hsl(var(--primary))"
              strokeWidth="0.5"
              strokeOpacity="0.5"
              className="transition-all duration-300"
            />

            {/* Lake Victoria */}
            <ellipse
              cx="28"
              cy="42"
              rx="8"
              ry="10"
              fill="hsl(var(--accent))"
              fillOpacity="0.2"
              stroke="hsl(var(--accent))"
              strokeWidth="0.3"
              strokeOpacity="0.5"
            />

            {/* Indian Ocean coastline */}
            <path
              d="M 70 55 Q 80 60 75 75"
              fill="none"
              stroke="hsl(var(--accent))"
              strokeWidth="0.5"
              strokeOpacity="0.5"
            />

            {/* University markers */}
            {kenyanUniversities.map((uni) => (
              <Tooltip key={uni.id}>
                <TooltipTrigger asChild>
                  <g
                    className="cursor-pointer transition-transform hover:scale-125"
                    onClick={() => setSelectedUniversity(uni)}
                  >
                    {/* Outer glow for biomedical universities */}
                    {uni.hasBiomedical && (
                      <circle
                        cx={uni.x}
                        cy={uni.y}
                        r="3"
                        fill="hsl(var(--accent))"
                        opacity="0.3"
                        filter="url(#glow)"
                      >
                        <animate
                          attributeName="r"
                          values="2;4;2"
                          dur="2s"
                          repeatCount="indefinite"
                          begin={`${uni.id * 0.15}s`}
                        />
                      </circle>
                    )}
                    {/* Core dot */}
                    <circle
                      cx={uni.x}
                      cy={uni.y}
                      r={uni.hasBiomedical ? 2 : 1.5}
                      fill={uni.hasBiomedical ? 'hsl(var(--accent))' : 'hsl(var(--muted-foreground))'}
                      className="transition-all duration-200"
                    />
                  </g>
                </TooltipTrigger>
                <TooltipContent side="top" className="bg-card border-border">
                  <div className="text-sm">
                    <p className="font-semibold text-foreground">{uni.shortName}</p>
                    <p className="text-xs text-muted-foreground">{uni.location}</p>
                  </div>
                </TooltipContent>
              </Tooltip>
            ))}
          </svg>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap justify-center gap-4 mt-6">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="w-3 h-3 rounded-full bg-accent animate-pulse" />
            <span>Biomedical Sciences</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="w-2.5 h-2.5 rounded-full bg-muted-foreground" />
            <span>Other Universities</span>
          </div>
        </div>

        {/* Selected University Info */}
        {selectedUniversity && (
          <div className="mt-8 p-6 bg-card border border-border rounded-xl animate-fade-in">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center flex-shrink-0">
                <GraduationCap className="w-6 h-6 text-accent" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg text-foreground">{selectedUniversity.name}</h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                  <MapPin className="w-4 h-4" />
                  <span>{selectedUniversity.location}</span>
                </div>
                <div className="mt-3">
                  <p className="text-sm font-medium text-foreground mb-2">Programs:</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedUniversity.programs.map((program) => (
                      <span
                        key={program}
                        className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary border border-primary/20"
                      >
                        {program}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <button
                onClick={() => setSelectedUniversity(null)}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                ✕
              </button>
            </div>
          </div>
        )}

        {/* Universities count */}
        <div className="text-center mt-6">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-accent">{kenyanUniversities.filter(u => u.hasBiomedical).length}</span> universities with Biomedical Sciences programs
          </p>
        </div>
      </div>
    </TooltipProvider>
  );
}
