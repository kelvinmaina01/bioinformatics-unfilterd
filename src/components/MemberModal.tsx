import { Member } from '@/data/mockData';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Badge } from './ui/badge';

interface MemberModalProps {
  member: Member | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MemberModal({ member, open, onOpenChange }: MemberModalProps) {
  if (!member) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card border-border max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-4 mb-2">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-accent-foreground font-bold text-lg">
              {member.avatar}
            </div>
            <div>
              <DialogTitle className="text-foreground">{member.name}</DialogTitle>
              <p className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                <span>{member.regionFlag}</span>
                <span>{member.region}</span>
              </p>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4">
          {/* Bio */}
          <p className="text-sm text-muted-foreground leading-relaxed">
            {member.bio}
          </p>

          {/* Skills */}
          <div>
            <h4 className="text-xs font-medium text-foreground uppercase tracking-wide mb-2">
              Skill DNA
            </h4>
            <div className="flex flex-wrap gap-2">
              {member.skills.map((skill) => (
                <Badge 
                  key={skill}
                  className="bg-primary/20 text-primary border-primary/30"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          {/* Interests */}
          <div>
            <h4 className="text-xs font-medium text-foreground uppercase tracking-wide mb-2">
              Research Interests
            </h4>
            <div className="flex flex-wrap gap-2">
              {member.interests.map((interest) => (
                <Badge 
                  key={interest}
                  variant="secondary"
                  className="bg-secondary text-secondary-foreground"
                >
                  {interest}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
