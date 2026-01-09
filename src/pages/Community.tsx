import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Search, Trophy, Medal, Linkedin, Twitter, MapPin, GraduationCap } from 'lucide-react';

interface Member {
  id: string;
  name: string;
  initials: string;
  flag: string;
  role: string;
  skills: string[];
  interests: string;
  contributionScore: number;
  socials: {
    linkedin?: string;
    twitter?: string;
  };
  rank?: number;
}

const members: Member[] = [
  {
    id: '1',
    name: 'Brian Kimani',
    initials: 'BK',
    flag: '🇰🇪',
    role: 'Biomedical Science',
    skills: ['Python', 'Data Analysis'],
    interests: 'Infectious diseases • Public health',
    contributionScore: 1250,
    socials: { twitter: '#' }
  },
  {
    id: '2',
    name: 'Faith Wanjiku',
    initials: 'FW',
    flag: '🇰🇪',
    role: 'Medical Lab Sciences',
    skills: ['R', 'Statistics'],
    interests: 'Clinical diagnostics • Hematology',
    contributionScore: 980,
    socials: { linkedin: '#' }
  },
  {
    id: '3',
    name: 'Kevin Ochieng',
    initials: 'KO',
    flag: '🇰🇪',
    role: 'Biotechnology',
    skills: ['Bioinformatics', 'Linux'],
    interests: 'Genomics • Agricultural biotech',
    contributionScore: 890,
    socials: { twitter: '#', linkedin: '#' }
  },
  {
    id: '4',
    name: 'Dr. Amina Hassan',
    initials: 'AH',
    flag: '🇰🇪',
    role: 'Public Health',
    skills: ['Epidemiology', 'SPSS'],
    interests: 'Disease surveillance • Health policy',
    contributionScore: 850,
    socials: { linkedin: '#' }
  },
  {
    id: '5',
    name: 'Peter Mutua',
    initials: 'PM',
    flag: '🇰🇪',
    role: 'Biochemistry',
    skills: ['Lab Techniques', 'Research'],
    interests: 'Drug development • Molecular biology',
    contributionScore: 720,
    socials: {}
  },
  {
    id: '6',
    name: 'Grace Akinyi',
    initials: 'GA',
    flag: '🇰🇪',
    role: 'Nursing',
    skills: ['Community Health', 'Data Collection'],
    interests: 'Maternal health • Rural healthcare',
    contributionScore: 640,
    socials: {}
  },
  {
    id: '7',
    name: 'Samuel Kariuki',
    initials: 'SK',
    flag: '🇰🇪',
    role: 'Biomedical Engineering',
    skills: ['MATLAB', 'CAD'],
    interests: 'Medical devices • Prosthetics',
    contributionScore: 590,
    socials: { twitter: '#' }
  },
  {
    id: '8',
    name: 'Mary Njeri',
    initials: 'MN',
    flag: '🇰🇪',
    role: 'Pharmacy',
    skills: ['Pharmacology', 'Clinical Trials'],
    interests: 'Drug interactions • Pharmaceutical research',
    contributionScore: 430,
    socials: { linkedin: '#' }
  }
].sort((a, b) => b.contributionScore - a.contributionScore);

export default function Community() {
  const [search, setSearch] = useState('');

  const filteredMembers = members.filter(m =>
    m.name.toLowerCase().includes(search.toLowerCase()) ||
    m.role.toLowerCase().includes(search.toLowerCase()) ||
    m.skills.some(s => s.toLowerCase().includes(search.toLowerCase()))
  );

  const top3 = filteredMembers.slice(0, 3);
  const rest = filteredMembers.slice(3);

  return (
    <div className="min-h-screen bg-background font-sans">
      <Navbar />

      <main className="pt-24 pb-20 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Header */}
          <div className="text-center mb-16 animate-fade-in-up">
            <Badge variant="outline" className="mb-4 px-4 py-1 border-primary/50 text-primary uppercase tracking-widest text-xs">
              The Network
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 tracking-tight">
              Community <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Directory</span>
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              Researchers, students, and builders from universities across Kenya. United by curiosity and a commitment to open science.
            </p>
          </div>

          {/* Search */}
          <div className="max-w-md mx-auto mb-16 relative">
            <Search className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search by name, skill, or role..."
              className="pl-10 h-12 bg-card border-border shadow-sm focus:ring-primary/20"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Podium (Only show if no search filter or search finds top members) */}
          {filteredMembers.length > 0 && !search && (
            <div className="flex flex-col md:flex-row justify-center items-end gap-6 mb-20 px-4">
              {/* Silver (2nd) */}
              <div className="order-2 md:order-1 w-full md:w-72 animate-fade-in delay-100">
                <PodiumCard member={members[1]} rank={2} color="bg-gray-300" iconColor="text-gray-400" />
              </div>

              {/* Gold (1st) */}
              <div className="order-1 md:order-2 w-full md:w-80 -mt-12 z-10 animate-fade-in">
                <PodiumCard member={members[0]} rank={1} color="bg-yellow-400" iconColor="text-yellow-500" />
              </div>

              {/* Bronze (3rd) */}
              <div className="order-3 md:order-3 w-full md:w-72 animate-fade-in delay-200">
                <PodiumCard member={members[2]} rank={3} color="bg-amber-600" iconColor="text-amber-700" />
              </div>
            </div>
          )}

          {/* List View */}
          <div className="space-y-4 max-w-5xl mx-auto">
            <div className="flex items-center justify-between text-xs text-muted-foreground uppercase tracking-wider px-6 pb-2">
              <span className="w-12 text-center">Rank</span>
              <span className="flex-1">Member</span>
              <span className="hidden md:block w-1/4">Role</span>
              <span className="hidden lg:block w-1/4">Skills</span>
              <span className="w-24 text-right">Connect</span>
            </div>

            {rest.map((member, idx) => (
              <div
                key={member.id}
                className="group flex items-center bg-card hover:bg-muted/30 border border-border/50 hover:border-primary/20 rounded-xl p-4 transition-all duration-200"
              >
                <div className="w-12 text-center font-bold text-muted-foreground">
                  {idx + 4}
                </div>

                <div className="flex-1 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                    {member.initials}
                  </div>
                  <div>
                    <div className="font-semibold text-foreground flex items-center gap-2">
                      {member.name}
                      <span className="text-xs font-normal opacity-70" title="Kenya">{member.flag}</span>
                    </div>
                    <div className="text-xs text-muted-foreground md:hidden">{member.role}</div>
                  </div>
                </div>

                <div className="hidden md:flex w-1/4 text-sm text-muted-foreground items-center gap-2">
                  <GraduationCap className="w-4 h-4 opacity-50" />
                  {member.role}
                </div>

                <div className="hidden lg:flex w-1/4 items-center gap-2 flex-wrap">
                  {member.skills.slice(0, 2).map(skill => (
                    <Badge key={skill} variant="secondary" className="text-xs bg-muted/50 text-muted-foreground font-normal">
                      {skill}
                    </Badge>
                  ))}
                </div>

                <div className="w-24 flex justify-end gap-2">
                  {member.socials.twitter && (
                    <Button size="icon" variant="ghost" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                      <Twitter className="w-4 h-4" />
                    </Button>
                  )}
                  {member.socials.linkedin && (
                    <Button size="icon" variant="ghost" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                      <Linkedin className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function PodiumCard({ member, rank, color, iconColor }: { member: Member, rank: number, color: string, iconColor: string }) {
  return (
    <Card className="border-border shadow-lg relative overflow-hidden group hover:-translate-y-2 transition-transform duration-300">
      <div className={`absolute top-0 inset-x-0 h-1 ${color}`} />
      <CardContent className="pt-8 pb-6 px-6 text-center">
        <div className="relative mx-auto w-20 h-20 mb-4">
          <div className={`absolute -top-3 -right-3 w-8 h-8 rounded-full bg-background border border-border flex items-center justify-center shadow-sm z-10 font-bold ${iconColor}`}>
            {rank}
          </div>
          <div className="w-full h-full rounded-full bg-muted border-2 border-border flex items-center justify-center text-2xl font-bold text-muted-foreground overflow-hidden">
            {member.initials}
          </div>
        </div>

        <h3 className="font-bold text-lg mb-1 flex items-center justify-center gap-2">
          {member.name}
          <span className="text-sm">{member.flag}</span>
        </h3>
        <p className="text-primary text-sm font-medium mb-3">{member.role}</p>

        <div className="flex flex-wrap justify-center gap-1 mb-4">
          {member.skills.map(skill => (
            <span key={skill} className="text-[10px] px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground">
              {skill}
            </span>
          ))}
        </div>

        <div className="text-xs text-muted-foreground border-t border-border pt-3">
          {member.interests}
        </div>

        <div className="mt-4 flex justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          {member.socials.twitter && <Twitter className="w-4 h-4 text-muted-foreground hover:text-primary cursor-pointer" />}
          {member.socials.linkedin && <Linkedin className="w-4 h-4 text-muted-foreground hover:text-primary cursor-pointer" />}
        </div>
      </CardContent>
    </Card>
  );
}
