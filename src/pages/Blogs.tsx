import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Calendar, Clock, Heart, ArrowRight, Sparkles } from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  authorAvatar: string;
  date: string;
  readTime: string;
  tags: string[];
  likes: number;
  url: string;
}

const STORAGE_KEY = 'biounfiltered_stories';

const initialBlogs: BlogPost[] = [
  {
    id: '1',
    title: 'The Future of Personalized Medicine in Africa',
    excerpt: 'How genomics and AI are revolutionizing healthcare delivery across the continent, promising treatments tailored to unique genetic profiles.',
    content: 'Personalized medicine is no longer a futuristic concept...',
    image: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&q=80&w=2000',
    author: 'Dr. Amina Abdi',
    authorAvatar: '👩🏾‍⚕️',
    date: '2026-01-05',
    readTime: '8 min',
    tags: ['Genomics', 'Healthcare', 'AI'],
    likes: 342,
    url: 'https://medium.com/tag/personalized-medicine'
  },
  {
    id: '2',
    title: 'Breaking into Bioinformatics: A Developer\'s Journey',
    excerpt: 'From web development to computational biology: My roadmap for mastering the tools of the trade.',
    content: 'Transitioning from software engineering...',
    image: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&q=80&w=1000',
    author: 'Kevin Mwangi',
    authorAvatar: '👨🏿‍💻',
    date: '2025-12-28',
    readTime: '6 min',
    tags: ['Career', 'Tutorial', 'coding'],
    likes: 189,
    url: 'https://medium.com/tag/bioinformatics'
  },
  {
    id: '3',
    title: 'Understanding CRISPR: Beyond the Hype',
    excerpt: 'A deep dive into the gene-editing tool that changed everything, and what it means for future research.',
    content: 'CRISPR-Cas9 has become a household name...',
    image: 'https://images.unsplash.com/photo-1530210124550-912dc1381cb8?auto=format&fit=crop&q=80&w=1000',
    author: 'Sarah Johnson',
    authorAvatar: '🔬',
    date: '2025-12-15',
    readTime: '10 min',
    tags: ['Research', 'Biotech', 'Deep Dive'],
    likes: 256,
    url: 'https://medium.com/tag/crispr'
  },
  {
    id: '4',
    title: 'Data Vis 101: Making Your Research Pop',
    excerpt: 'Stop using default Excel charts. Learn how to create publication-quality visualizations with Python and R.',
    content: 'The way you present your data is just as important...',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000',
    author: 'David Kim',
    authorAvatar: '📊',
    date: '2025-12-10',
    readTime: '5 min',
    tags: ['Data Science', 'Visualization', 'Tips'],
    likes: 145,
    url: 'https://medium.com/tag/data-visualization'
  },
];

const tagOptions = ['Research', 'Career', 'AI', 'Genomics', 'Tutorial', 'Opinion', 'Tech', 'Healthcare'];

export default function Blogs() {
  const { isAuthenticated, user } = useAuth();
  const { toast } = useToast();
  const [blogs, setBlogs] = useState<BlogPost[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : initialBlogs;
  });

  const [dialogOpen, setDialogOpen] = useState(false);
  const [newPost, setNewPost] = useState({
    title: '',
    excerpt: '',
    content: '',
    image: '',
    url: '',
    tags: [] as string[],
  });

  const handleAdd = () => {
    if (!newPost.title || !newPost.url) {
      toast({ title: 'Please fill in required fields (Title & URL)', variant: 'destructive' });
      return;
    }
    const post: BlogPost = {
      id: crypto.randomUUID(),
      ...newPost,
      content: newPost.excerpt,
      image: newPost.image || 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&q=80&w=1000',
      author: user?.name || 'Anonymous',
      authorAvatar: user?.avatar || '🧬',
      date: new Date().toISOString().split('T')[0],
      readTime: '5 min',
      likes: 0,
      url: newPost.url
    };
    const updated = [post, ...blogs];
    setBlogs(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setNewPost({ title: '', excerpt: '', content: '', image: '', url: '', tags: [] });
    setDialogOpen(false);
    toast({ title: 'Story published!', description: 'Your story is now live.' });
  };

  const toggleTag = (tag: string) => {
    setNewPost(prev => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag]
    }));
  };

  const goToStory = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-background font-sans">
      <Navbar />

      <main className="pt-24 pb-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16 animate-fade-in-up">
            <Badge variant="outline" className="mb-4 px-4 py-1 border-primary/50 text-primary uppercase tracking-widest text-xs">
              Insights & Perspectives
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 tracking-tight">
              Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Stories</span>
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              Explore the latest breakthroughs, tutorials, and unfiltered stories from the frontiers of bioinformatics.
            </p>
          </div>



          {/* Hero Story (First Item) */}
          {blogs.length > 0 && (
            <div
              className="mb-16 relative rounded-3xl overflow-hidden group cursor-pointer shadow-2xl"
              onClick={() => goToStory(blogs[0].url)}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent z-10" />
              <img
                src={blogs[0].image}
                alt={blogs[0].title}
                className="w-full h-[500px] object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 z-20">
                <Badge className="bg-primary hover:bg-primary text-primary-foreground mb-4">Featured</Badge>
                <div className="absolute top-8 right-8 bg-white/10 backdrop-blur-md p-2 rounded-full border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowRight className="w-6 h-6 text-white -rotate-45" />
                </div>
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight max-w-4xl">
                  {blogs[0].title}
                </h2>
                <p className="text-gray-300 text-lg md:text-xl mb-6 max-w-2xl line-clamp-2">
                  {blogs[0].excerpt}
                </p>
                <div className="flex items-center gap-6 text-white/80">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{blogs[0].authorAvatar}</span>
                    <span className="font-medium">{blogs[0].author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{blogs[0].readTime} read</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Stories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.slice(1).map((post, index) => (
              <Card
                key={post.id}
                className="bg-card border-border hover:border-primary/50 transition-all duration-300 hover:shadow-xl group cursor-pointer overflow-hidden flex flex-col h-full"
                onClick={() => goToStory(post.url)}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge variant="secondary" className="bg-background/80 backdrop-blur text-foreground font-medium">
                      {post.tags[0] || 'Story'}
                    </Badge>
                  </div>
                  <div className="absolute top-4 right-4 bg-background/80 backdrop-blur p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowRight className="w-4 h-4 text-foreground -rotate-45" />
                  </div>
                </div>

                <CardHeader className="pb-3 flex-grow">
                  <div className="flex items-center gap-2 mb-3 text-xs text-muted-foreground">
                    <span className="text-lg">{post.authorAvatar}</span>
                    <span className="font-medium text-foreground">{post.author}</span>
                    <span>•</span>
                    <span>{new Date(post.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</span>
                  </div>
                  <CardTitle className="text-xl font-bold text-foreground leading-tight group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="pb-4">
                  <p className="text-muted-foreground text-sm line-clamp-3">
                    {post.excerpt}
                  </p>
                </CardContent>

                <CardFooter className="pt-0 mt-auto border-t border-border/50 p-4">
                  <div className="w-full flex items-center justify-between text-sm">
                    <span className="text-muted-foreground flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {post.readTime}
                    </span>
                    <span className="flex items-center gap-1 text-primary font-medium group-hover:translate-x-1 transition-transform">
                      Read on Medium <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>

          {blogs.length === 0 && (
            <div className="text-center py-20 bg-muted/20 rounded-3xl border border-border mt-12">
              <Sparkles className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-bold text-foreground">No stories yet</h3>
              <p className="text-muted-foreground mt-2">Be the pioneer and share the first story!</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
