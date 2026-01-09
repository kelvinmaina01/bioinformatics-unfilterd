import { Paper } from '@/data/mockData';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';

interface PaperModalProps {
  paper: Paper | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PaperModal({ paper, open, onOpenChange }: PaperModalProps) {
  if (!paper) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card border-border max-w-2xl max-h-[85vh]">
        <DialogHeader>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Badge variant="outline">{paper.field}</Badge>
              <span className="text-xs text-muted-foreground">{paper.date}</span>
            </div>
            <DialogTitle className="text-foreground text-xl leading-tight">
              {paper.title}
            </DialogTitle>
            <p className="text-sm text-muted-foreground">By {paper.author}</p>
          </div>
        </DialogHeader>

        <ScrollArea className="max-h-[50vh]">
          <div className="space-y-6 pr-4">
            {/* Unfiltered Take */}
            <div className="border-l-2 border-accent pl-4 py-2 bg-accent/5 rounded-r-lg">
              <h4 className="text-xs font-medium text-accent uppercase tracking-wide mb-2">
                The Unfiltered Take
              </h4>
              <p className="text-foreground italic">
                "{paper.unfilteredTake}"
              </p>
            </div>

            {/* Full Content */}
            <div>
              <h4 className="text-xs font-medium text-foreground uppercase tracking-wide mb-3">
                Discussion
              </h4>
              <p className="text-muted-foreground leading-relaxed">
                {paper.fullContent}
              </p>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
