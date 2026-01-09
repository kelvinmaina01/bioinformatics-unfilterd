import { useRef, useEffect, useState } from 'react';
import { Briefcase, Rocket, Terminal, Video, Users, GraduationCap, Calendar, MessageCircle, BookOpen, Globe } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const umbrellaItems = [
  {
    icon: MessageCircle,
    title: 'Community WhatsApp',
    description: 'Join our WhatsApp community for real-time discussions and support',
    link: '#',
    linkText: 'Join WhatsApp',
    color: 'text-green-500' // consistent 500/400
  },
  {
    icon: BookOpen,
    title: 'Learning Hub',
    description: 'Access curated resources, tutorials, and courses',
    link: '/resources',
    linkText: 'Explore Resources',
    color: 'text-blue-500'
  },
  {
    icon: Users,
    title: 'Campus Chapters',
    description: 'Connect with chapters across Kenyan universities',
    link: '/community',
    linkText: 'Find Your Chapter',
    color: 'text-primary'
  },
  {
    icon: GraduationCap,
    title: 'Mentorship Program',
    description: 'Get guidance from experienced professionals',
    link: '/community',
    linkText: 'Find a Mentor',
    color: 'text-yellow-500'
  },
  {
    icon: Globe,
    title: 'Events & Meetups',
    description: 'Attend hackathons, workshops, and networking events',
    link: '/events',
    linkText: 'View Events',
    color: 'text-pink-500'
  },
  {
    icon: Briefcase,
    title: 'Hiring Hub',
    description: 'Connecting top biomedical talent with leading opportunities.',
    link: '#',
    linkText: 'Find Jobs',
    color: 'text-indigo-500'
  },
  {
    icon: Rocket,
    title: 'Solution Showcase',
    description: 'Highlighting student innovations and research projects.',
    link: '#',
    linkText: 'View Projects',
    color: 'text-purple-500'
  },
  {
    icon: Terminal,
    title: 'Bootcamps',
    description: 'Intensive skill-building sessions in bioinformatics and coding.',
    link: '#',
    linkText: 'Join Bootcamp',
    color: 'text-orange-500'
  },
  {
    icon: Video,
    title: 'Webinars',
    description: 'Expert-led virtual sessions on cutting-edge topics.',
    link: '#',
    linkText: 'Watch Recordings',
    color: 'text-red-500'
  }
];

function CountUp({ end, duration = 2000, suffix = '' }: { end: number, duration?: number, suffix?: string }) {
  const [count, setCount] = useState(0);
  const countRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let start = 0;
          const increment = end / (duration / 16);
          const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(Math.ceil(start));
            }
          }, 16);
        }
      },
      { threshold: 0.5 }
    );

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => observer.disconnect();
  }, [end, duration, hasAnimated]);

  return (
    <div ref={countRef} className="text-3xl md:text-4xl font-bold text-gradient">
      {count}{suffix}
    </div>
  );
}

export function CommunityUmbrella() {
  return (
    <section className="py-20 px-4 bg-card/30 border-t border-border">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Community Umbrella
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Your gateway to resources, connections, and opportunities in bioinformatics across Kenya
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {umbrellaItems.map((item) => (
            <Card
              key={item.title}
              className="bg-card border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 group"
            >
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center flex-shrink-0 group-hover:from-primary/20 group-hover:to-accent/20 transition-colors">
                    <item.icon className={`w-6 h-6 ${item.color}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{item.description}</p>
                    <Button
                      asChild
                      variant="ghost"
                      size="sm"
                      className="text-primary hover:text-primary/80 p-0 h-auto font-medium"
                    >
                      <a href={item.link}>{item.linkText} →</a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto divide-y md:divide-y-0 md:divide-x divide-border">
          <div className="text-center p-4">
            <CountUp end={100} suffix="+" />
            <p className="text-sm text-muted-foreground mt-2 font-medium uppercase tracking-wider">Community Members</p>
          </div>
          <div className="text-center p-4">
            <CountUp end={10} suffix="+" />
            <p className="text-sm text-muted-foreground mt-2 font-medium uppercase tracking-wider">Universities</p>
          </div>
          <div className="text-center p-4">
            <CountUp end={50} suffix="+" />
            <p className="text-sm text-muted-foreground mt-2 font-medium uppercase tracking-wider">Events Hosted</p>
          </div>
        </div>
      </div>
    </section>
  );
}
