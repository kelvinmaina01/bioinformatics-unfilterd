import { useState } from 'react';
import { Link } from 'react-router-dom';
import { DNALogo } from '@/components/DNALogo';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { JoinModal } from '@/components/JoinModal';
import { UniversityMap } from '@/components/UniversityMap';
import { EventsSection } from '@/components/EventsSection';
import { CommunityUmbrella } from '@/components/CommunityUmbrella';
import { LeadershipTeam } from '@/components/LeadershipTeam';
import { HonorCircle } from '@/components/HonorCircle';
import { NewsletterSignup } from '@/components/NewsletterSignup';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Microscope, Terminal, Brain, Scale, Sprout, Target, Lightbulb, Users, MessageCircle, Unlock, Globe2 } from 'lucide-react';
import { CommunityConnect } from '@/components/CommunityConnect';

const pillars = [
  { icon: Microscope, label: 'Research', description: 'Scientific inquiry' },
  { icon: Terminal, label: 'Code', description: 'Open source tools' },
  { icon: Brain, label: 'AI', description: 'Applied intelligence' },
  { icon: Scale, label: 'Ethics', description: 'Responsible science' },
  { icon: Sprout, label: 'Startups', description: 'intersection of technology and  biology and ai' }
];

const differentiators = [
  { title: 'Student-Centered', description: 'Built by students, for students' },
  { title: 'Real Discussions', description: 'Honest discourse, practical learning' },
  { title: 'Open Resources', description: 'Free access to learning materials' },
  { title: 'Kenya-Wide Network', description: 'Connecting universities across the nation' }
];

import { DonationBanner } from '@/components/DonationBanner';

export default function Index() {
  const [joinOpen, setJoinOpen] = useState(false);
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <DonationBanner />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto text-center">
          <div className="animate-fade-in-up">
            <DNALogo size="xl" animate className="mx-auto mb-8" />

            {/* Tag line */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card/50 mb-6">
              <span className="text-sm text-muted-foreground">Building Africa's largest network of Bioinformatics, Health Informatics, and TechBio talent</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4">
              Bioinformatics <span className="text-gradient">Unfiltered</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-in delay-100">
              Pioneering the intersection of Biology and Technology across Kenyan Universities. We are the ecosystem for the next generation of scientists and innovators.
            </p>



            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">

              <Button
                onClick={() => setJoinOpen(true)}
                size="lg"
                className="bg-primary hover:bg-primary/90 text-lg px-8 transition-transform hover:scale-105 animate-pulse shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:animate-none"
              >
                Join Us
              </Button>
              <Button asChild variant="ghost" size="lg" className="text-muted-foreground hover:text-foreground hover:bg-secondary/20 transition-all border border-transparent hover:border-border">
                <Link to="/about">About Us</Link>
              </Button>
            </div>

            {/* Excellence badges */}
            <div className="flex flex-wrap justify-center gap-4">
              <span className="px-4 py-2 rounded-full border border-border bg-card/30 text-sm text-muted-foreground">
                ✨ Excellence
              </span>
              <span className="px-4 py-2 rounded-full border border-border bg-card/30 text-sm text-muted-foreground">
                🤝 Community
              </span>
              <span className="px-4 py-2 rounded-full border border-border bg-card/30 text-sm text-muted-foreground">
                💡 Innovation
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Discord CTA - Huge Pop-up Style */}
      <section className="container mx-auto px-4 -mt-10 relative z-10 mb-20 animate-fade-in-up delay-200">
        <div className="bg-[#5865F2] rounded-3xl p-8 md:p-12 shadow-[0_20px_50px_rgba(88,101,242,0.3)] transform hover:scale-[1.01] transition-transform duration-300">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex-1 text-center md:text-left text-white">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
                <svg className="w-10 h-10" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.317 4.3698a19.7913 19.7913 0 0 0-4.8851-1.5152.0741.0741 0 0 0-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 0 0-.0785-.037 19.7363 19.7363 0 0 0-4.8852 1.515.0699.0699 0 0 0-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 0 0 .0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 0 0 .0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 0 0-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 0 1-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 0 1 .0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 0 1 .0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 0 1-.0066.1276 12.2986 12.2986 0 0 1-1.873.8914.0766.0766 0 0 0-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 0 0 .0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 0 0 .0313-.0552c.5004-5.177-1.327-9.4001-3.6687-13.654a.0691.0691 0 0 0-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.419-2.1569 2.419zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.419-2.1568 2.419z" />
                </svg>
                <h2 className="text-3xl font-bold">Join the Conversation</h2>
              </div>
              <p className="text-white/90 text-lg mb-0 max-w-xl">
                Connect with 1,000+ students and researchers. Get help with code, share papers, and find your tribe in our active Discord community.
              </p>
            </div>
            <div className="flex-shrink-0">
              <a href="https://discord.gg/xtnPrCyE" target="_blank" rel="noreferrer">
                <Button size="lg" className="bg-white text-[#5865F2] hover:bg-white/90 text-lg px-8 py-6 h-auto font-bold shadow-lg transition-all hover:scale-105">
                  Join Discord Server
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section className="py-24 px-4 bg-background relative overflow-hidden">
        {/* Decorative background blobs */}
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/10 rounded-full blur-[100px] -translate-y-1/2 -z-10" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-[100px] -z-10" />

        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-24">
            <Card className="group relative overflow-hidden border-border bg-card/40 backdrop-blur-sm hover:border-primary/50 transition-all duration-500 hover:shadow-[0_0_30px_rgba(37,99,235,0.15)]">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <CardContent className="p-8 md:p-10 relative z-10">
                <div className="flex items-start gap-6">
                  <div className="p-4 rounded-2xl bg-primary/10 text-primary group-hover:scale-110 transition-transform duration-500 shadow-sm">
                    <Target className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                      Our Vision
                      <span className="w-12 h-1 bg-primary/50 rounded-full ml-2 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-4 group-hover:translate-x-0" />
                    </h3>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                      To become Kenya's leading hub where <span className="text-foreground font-medium">biomedical talent</span> is nurtured, connected, and empowered to drive healthcare innovation across the continent.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="group relative overflow-hidden border-border bg-card/40 backdrop-blur-sm hover:border-accent/50 transition-all duration-500 hover:shadow-[0_0_30px_rgba(16,185,129,0.15)]">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <CardContent className="p-8 md:p-10 relative z-10">
                <div className="flex items-start gap-6">
                  <div className="p-4 rounded-2xl bg-accent/10 text-accent group-hover:scale-110 transition-transform duration-500 shadow-sm">
                    <Lightbulb className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                      Our Mission
                      <span className="w-12 h-1 bg-accent/50 rounded-full ml-2 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-4 group-hover:translate-x-0" />
                    </h3>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                      To prepare Kenyan students for the future of healthcare by developing <span className="text-foreground font-medium">world-class skills</span>, fostering collaborative research, and building a connected ecosystem.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Differentiators */}
          <div className="relative">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">What Makes Us Different</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                We're not just another club. We are a movement redefining how students learn and innovate in the life sciences.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {differentiators.map((item, idx) => (
                <Card
                  key={item.title}
                  className="group hover:-translate-y-2 transition-all duration-300 border-border/50 bg-gradient-to-b from-card to-background hover:border-primary/30 hover:shadow-xl"
                >
                  <CardContent className="p-8 text-center h-full flex flex-col items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-secondary/50 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary/10 transition-all duration-300">
                      {idx === 0 && <Users className="w-8 h-8 text-muted-foreground group-hover:text-primary transition-colors" />}
                      {idx === 1 && <MessageCircle className="w-8 h-8 text-muted-foreground group-hover:text-primary transition-colors" />}
                      {idx === 2 && <Unlock className="w-8 h-8 text-muted-foreground group-hover:text-primary transition-colors" />}
                      {idx === 3 && <Globe2 className="w-8 h-8 text-muted-foreground group-hover:text-primary transition-colors" />}
                    </div>

                    <h3 className="text-xl font-bold text-foreground mb-3">{item.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Community Pillars */}
      <section className="py-20 px-4 bg-card/30">
        <div className="container mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-12">Community Pillars</h2>
          <div className="flex flex-wrap justify-center gap-6">
            {pillars.map((pillar) => (
              <div key={pillar.label} className="flex flex-col items-center gap-3 p-6 rounded-xl bg-card border border-border hover:border-accent/50 transition-all">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                  <pillar.icon className="w-7 h-7 text-accent" />
                </div>
                <h3 className="font-semibold text-foreground">{pillar.label}</h3>
                <p className="text-xs text-muted-foreground">{pillar.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Umbrella */}
      <CommunityUmbrella />

      {/* Kenya Universities Map */}
      <section className="py-20 px-4 border-t border-border">
        <div className="container mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-4">
            Universities Across Kenya
          </h2>
          <p className="text-muted-foreground text-center max-w-xl mx-auto mb-12">
            Connecting Biomedical Sciences students from universities across the nation. Click on a marker to learn more.
          </p>
          <UniversityMap />
        </div>
      </section>

      <EventsSection />

      <LeadershipTeam />

      <HonorCircle />

      <NewsletterSignup />

      <CommunityConnect />

      <Footer />
      <JoinModal open={joinOpen} onOpenChange={setJoinOpen} />
    </div>
  );
}
