import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ProjectCard } from '@/components/ProjectCard';
import { Badge } from '@/components/ui/badge';
// import { projects } from '@/data/mockData';
import { useCollection } from '@/hooks/useCollection';
import { Project } from '@/data/mockData'; // Import interface only
import { cn } from '@/lib/utils';

const fields = ['All', 'Genomics', 'AI/ML', 'Ethics', 'Single-cell', 'Drug Discovery'];
const statuses = ['All', 'Active', 'Completed', 'Planning'];

export default function Projects() {
  const [fieldFilter, setFieldFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  const { data: projects, loading } = useCollection<Project>('projects');

  const filteredProjects = projects.filter(p => {
    const matchesField = fieldFilter === 'All' || p.field === fieldFilter;
    const matchesStatus = statusFilter === 'All' || p.status === statusFilter.toLowerCase();
    return matchesField && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-20 px-4">
        <div className="container mx-auto">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in-up">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Community Projects
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Open-source tools, databases, and frameworks built by the community,
              for the community. Real work that moves the field forward.
            </p>
          </div>

          {/* Filters */}
          <div className="space-y-4 mb-10">
            {/* Field Filter */}
            <div className="flex flex-wrap justify-center gap-2">
              {fields.map((field) => (
                <Badge
                  key={field}
                  variant="outline"
                  onClick={() => setFieldFilter(field)}
                  className={cn(
                    'cursor-pointer transition-all px-3 py-1.5',
                    fieldFilter === field
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'border-border text-muted-foreground hover:border-primary/50 hover:text-foreground'
                  )}
                >
                  {field}
                </Badge>
              ))}
            </div>

            {/* Status Filter */}
            <div className="flex flex-wrap justify-center gap-2">
              {statuses.map((status) => (
                <Badge
                  key={status}
                  variant="outline"
                  onClick={() => setStatusFilter(status)}
                  className={cn(
                    'cursor-pointer transition-all px-3 py-1.5',
                    statusFilter === status
                      ? 'bg-accent text-accent-foreground border-accent'
                      : 'border-border text-muted-foreground hover:border-accent/50 hover:text-foreground'
                  )}
                >
                  {status}
                </Badge>
              ))}
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, index) => (
              <div
                key={project.id}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <ProjectCard project={project} />
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredProjects.length === 0 && (
            <div className="text-center py-20">
              <p className="text-muted-foreground">No projects match your filters.</p>
            </div>
          )}

          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-6 bg-card rounded-xl border border-border">
              <div className="text-3xl font-bold text-primary mb-1">
                {projects.length}
              </div>
              <div className="text-sm text-muted-foreground">Active Projects</div>
            </div>
            <div className="p-6 bg-card rounded-xl border border-border">
              <div className="text-3xl font-bold text-accent mb-1">
                {projects.reduce((sum, p) => sum + p.contributors, 0)}
              </div>
              <div className="text-sm text-muted-foreground">Contributors</div>
            </div>
            <div className="p-6 bg-card rounded-xl border border-border">
              <div className="text-3xl font-bold text-primary mb-1">
                {new Set(projects.flatMap(p => p.tools)).size}
              </div>
              <div className="text-sm text-muted-foreground">Technologies</div>
            </div>
            <div className="p-6 bg-card rounded-xl border border-border">
              <div className="text-3xl font-bold text-accent mb-1">
                {projects.filter(p => p.status === 'completed').length}
              </div>
              <div className="text-sm text-muted-foreground">Completed</div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
