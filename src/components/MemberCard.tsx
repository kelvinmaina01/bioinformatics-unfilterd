import { Member } from '@/data/mockData';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { cn } from '@/lib/utils';

interface MemberCardProps {
  member: Member;
  onClick?: () => void;
}

export function MemberCard({ member, onClick }: MemberCardProps) {
  return (
    <Card 
      onClick={onClick}
      className={cn(
        'bg-card hover:bg-card/80 border-border cursor-pointer transition-all duration-300',
        'hover:border-primary/50 hover:glow-primary'
      )}
    >
      <CardContent className="p-5">
        <div className="flex items-start gap-4">
          {/* Avatar */}
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-accent-foreground font-semibold text-sm flex-shrink-0">
            {member.avatar}
          </div>
          
          <div className="flex-1 min-w-0">
            {/* Name & Region */}
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-semibold text-foreground truncate">{member.name}</h3>
              <span className="text-lg flex-shrink-0">{member.regionFlag}</span>
            </div>
            
            {/* Skills */}
            <div className="flex flex-wrap gap-1.5 mb-3">
              {member.skills.slice(0, 3).map((skill) => (
                <Badge 
                  key={skill} 
                  variant="secondary" 
                  className="text-xs bg-secondary text-secondary-foreground"
                >
                  {skill}
                </Badge>
              ))}
            </div>
            
            {/* Interests */}
            <p className="text-xs text-muted-foreground line-clamp-2">
              {member.interests.join(' • ')}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
