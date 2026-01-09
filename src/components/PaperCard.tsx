import { Paper } from '@/data/mockData';
import { Card, CardContent, CardHeader } from './ui/card';
import { Badge } from './ui/badge';
import { cn } from '@/lib/utils';

interface PaperCardProps {
  paper: Paper;
  onClick?: () => void;
}

export function PaperCard({ paper, onClick }: PaperCardProps) {
  return (
    <Card 
      onClick={onClick}
      className={cn(
        'bg-card hover:bg-card/80 border-border cursor-pointer transition-all duration-300',
        'hover:border-primary/50'
      )}
    >
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-semibold text-foreground leading-tight line-clamp-2">
            {paper.title}
          </h3>
        </div>
        <div className="flex items-center gap-2 mt-2">
          <Badge variant="outline" className="text-xs">
            {paper.field}
          </Badge>
          <span className="text-xs text-muted-foreground">{paper.date}</span>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-3">
          <div className="border-l-2 border-accent pl-3 py-1">
            <p className="text-sm text-accent italic">
              "{paper.unfilteredTake}"
            </p>
          </div>
          <p className="text-xs text-muted-foreground">
            By {paper.author}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
