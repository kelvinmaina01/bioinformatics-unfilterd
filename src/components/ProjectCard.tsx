import { Project } from '@/data/mockData';
import { Card, CardContent, CardHeader } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Users } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProjectCardProps {
  project: Project;
}

const statusStyles = {
  active: 'bg-accent/20 text-accent border-accent/30',
  completed: 'bg-primary/20 text-primary border-primary/30',
  planning: 'bg-muted text-muted-foreground border-border'
};

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="bg-card hover:bg-card/80 border-border transition-all duration-300 hover:border-primary/50">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-semibold text-foreground mb-1">{project.title}</h3>
            <Badge variant="outline" className="text-xs">
              {project.field}
            </Badge>
          </div>
          <Badge 
            className={cn('text-xs capitalize border', statusStyles[project.status])}
          >
            {project.status}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {project.goal}
        </p>
        
        {/* Contributors */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Users className="w-4 h-4" />
          <span>{project.contributors} contributors</span>
        </div>
        
        {/* Tools */}
        <div className="flex flex-wrap gap-1.5">
          {project.tools.slice(0, 4).map((tool) => (
            <Badge 
              key={tool} 
              variant="secondary"
              className="text-xs bg-secondary text-secondary-foreground"
            >
              {tool}
            </Badge>
          ))}
        </div>
        
        {/* Progress */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">Progress</span>
            <span className="text-foreground font-medium">{project.progress}%</span>
          </div>
          <Progress value={project.progress} className="h-1.5" />
        </div>
      </CardContent>
    </Card>
  );
}
