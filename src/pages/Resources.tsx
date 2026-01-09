import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { BookOpen, Link as LinkIcon, Plus, ExternalLink, Search } from 'lucide-react';

interface Resource {
  id: string;
  title: string;
  description: string;
  url: string;
  category: string;
  addedBy: string;
}

const STORAGE_KEY = 'biounfiltered_resources';

const initialResources: Resource[] = [
  { id: '1', title: 'Bioconductor', description: 'Open source software for bioinformatics', url: 'https://bioconductor.org', category: 'Tools', addedBy: 'Community' },
  { id: '2', title: 'Galaxy Project', description: 'Web-based platform for accessible genomic research', url: 'https://galaxyproject.org', category: 'Platforms', addedBy: 'Community' },
  { id: '3', title: 'NCBI Tutorials', description: 'Learning resources for NCBI databases', url: 'https://www.ncbi.nlm.nih.gov/guide/training-tutorials/', category: 'Learning', addedBy: 'Community' },
  { id: '4', title: 'Rosalind', description: 'Platform for learning bioinformatics through problem solving', url: 'https://rosalind.info', category: 'Learning', addedBy: 'Community' },
  { id: '5', title: 'Nextflow', description: 'Workflow management for scalable pipelines', url: 'https://nextflow.io', category: 'Tools', addedBy: 'Community' },
  { id: '6', title: 'Seurat', description: 'R toolkit for single cell genomics', url: 'https://satijalab.org/seurat/', category: 'Tools', addedBy: 'Community' },
];

const categories = ['All', 'Tools', 'Platforms', 'Learning', 'Databases', 'Papers'];

export default function Resources() {
  const { isAuthenticated, user } = useAuth();
  const { toast } = useToast();
  const [resources, setResources] = useState<Resource[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : initialResources;
  });
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newResource, setNewResource] = useState({ title: '', description: '', url: '', category: 'Tools' });

  const filtered = resources.filter(r => 
    (filter === 'All' || r.category === filter) &&
    (r.title.toLowerCase().includes(search.toLowerCase()) || r.description.toLowerCase().includes(search.toLowerCase()))
  );

  const handleAdd = () => {
    if (!newResource.title || !newResource.url) {
      toast({ title: 'Please fill in required fields', variant: 'destructive' });
      return;
    }
    const resource: Resource = {
      id: crypto.randomUUID(),
      ...newResource,
      addedBy: user?.name || 'Anonymous',
    };
    const updated = [resource, ...resources];
    setResources(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setNewResource({ title: '', description: '', url: '', category: 'Tools' });
    setDialogOpen(false);
    toast({ title: 'Resource added!', description: 'Thanks for contributing.' });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12 animate-fade-in-up">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 flex items-center justify-center gap-3">
              <BookOpen className="w-8 h-8 text-primary" />
              Resources
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Curated tools, tutorials, and materials shared by the community.
            </p>
          </div>

          {/* Search & Filter */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search resources..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 bg-card border-border"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {categories.map((cat) => (
                <Badge
                  key={cat}
                  variant="outline"
                  onClick={() => setFilter(cat)}
                  className={`cursor-pointer transition-all px-3 py-1 ${
                    filter === cat
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'border-border text-muted-foreground hover:border-primary/50'
                  }`}
                >
                  {cat}
                </Badge>
              ))}
            </div>
            {isAuthenticated && (
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-primary hover:bg-primary/90">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Resource
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-card border-border">
                  <DialogHeader>
                    <DialogTitle className="text-foreground">Add a Resource</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Title *</Label>
                      <Input
                        id="title"
                        value={newResource.title}
                        onChange={(e) => setNewResource(prev => ({ ...prev, title: e.target.value }))}
                        className="bg-background border-border"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="url">URL *</Label>
                      <Input
                        id="url"
                        value={newResource.url}
                        onChange={(e) => setNewResource(prev => ({ ...prev, url: e.target.value }))}
                        className="bg-background border-border"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="desc">Description</Label>
                      <Textarea
                        id="desc"
                        value={newResource.description}
                        onChange={(e) => setNewResource(prev => ({ ...prev, description: e.target.value }))}
                        className="bg-background border-border resize-none"
                        rows={2}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Category</Label>
                      <div className="flex flex-wrap gap-2">
                        {categories.filter(c => c !== 'All').map((cat) => (
                          <Badge
                            key={cat}
                            variant="outline"
                            onClick={() => setNewResource(prev => ({ ...prev, category: cat }))}
                            className={`cursor-pointer ${
                              newResource.category === cat ? 'bg-primary/20 border-primary text-primary' : 'border-border'
                            }`}
                          >
                            {cat}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <Button onClick={handleAdd} className="w-full bg-primary hover:bg-primary/90">
                      Add Resource
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </div>

          {/* Resources Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((resource, index) => (
              <Card
                key={resource.id}
                className="bg-card border-border hover:border-primary/30 transition-all animate-fade-in-up group"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-foreground text-lg">{resource.title}</CardTitle>
                    <Badge variant="secondary" className="bg-secondary text-secondary-foreground text-xs">
                      {resource.category}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{resource.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Added by {resource.addedBy}</span>
                    <a
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-primary/80 flex items-center gap-1 text-sm"
                    >
                      <LinkIcon className="w-3 h-3" />
                      Visit
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="text-muted-foreground">No resources found.</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
