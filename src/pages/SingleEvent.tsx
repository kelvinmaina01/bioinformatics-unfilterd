import { useParams, Link, Navigate } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, MapPin, Share2, Mail, Linkedin, Twitter, Users } from "lucide-react";
import { events } from '@/data/events';
import { teamMembers } from '@/data/team';
import { CommunityConnect } from '@/components/CommunityConnect';

export default function SingleEvent() {
    const { id } = useParams();
    const event = events.find(e => e.id === id);

    if (!event) {
        return (
            <div className="min-h-screen pt-32 px-4 text-center bg-background">
                <Navbar />
                <h1 className="text-4xl font-bold mb-4 text-foreground">Event Not Found</h1>
                <p className="text-muted-foreground mb-8">We couldn't find the event you're looking for.</p>
                <Button asChild>
                    <Link to="/#events" className="text-primary hover:underline">Back to Events</Link>
                </Button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background font-sans">
            <Navbar />

            <main className="pt-20"> {/* Offset for Fixed Navbar */}

                {/* 1. Top Banner Image */}
                {/* 1. Top Banner Image */}
                <div className="w-full h-64 md:h-96 relative overflow-hidden group">
                    <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                        style={{
                            backgroundImage: `url(${event.image && event.image !== '/placeholder.svg' ? event.image : '/community_collaboration.png'})`
                        }}
                    />
                    <div className="absolute inset-0 bg-black/50" />

                    <div className="absolute inset-0 flex items-center justify-center opacity-20">
                        <DNALogoLarge />
                    </div>
                </div>

                {/* 2. Main Title Section (White/Dark Background) */}
                <section className="bg-background pt-10 pb-8 px-4 border-b border-border/50">
                    <div className="container mx-auto max-w-6xl">
                        {/* Breadcrumb-ish / Differentiator */}
                        <div className="mb-4 flex items-center gap-2">
                            <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center bg-card">
                                {/* Community Logo Placeholder */}
                                <span className="text-xs font-bold text-primary">HUB</span>
                            </div>
                            <span className="text-muted-foreground text-lg">Bioinformatics Hub Kenya</span>
                        </div>

                        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 leading-tight">
                            {event.title}
                        </h1>

                        <div className="flex flex-col gap-2 text-muted-foreground mb-6">
                            <p className="text-sm uppercase tracking-wide opacity-80">{event.location}</p>
                            <a href="#" className="underline decoration-1 underline-offset-4 hover:text-primary transition-colors inline-block w-fit">
                                Bioinformatics Hub Kenya - Juja, Kenya
                            </a>
                        </div>

                        <p className="max-w-3xl text-muted-foreground mb-8">
                            {event.description}
                        </p>

                        {/* Social Share Icons */}
                        <div className="flex gap-4">
                            <SocialButton icon={<FacebookIcon />} />
                            <SocialButton icon={<Twitter className="w-5 h-5" />} />
                            <SocialButton icon={<Linkedin className="w-5 h-5" />} />
                            <SocialButton icon={<Mail className="w-5 h-5" />} />
                        </div>
                    </div>
                </section>

                {/* 3. Sticky RSVP Bar */}
                <div className="sticky top-16 z-40 bg-card/95 backdrop-blur-sm border-b border-border shadow-sm py-4 px-4 transition-all">
                    <div className="container mx-auto max-w-6xl flex flex-wrap items-center justify-between gap-4">
                        <div className="flex flex-col mx-auto sm:mx-0 text-center sm:text-left">
                            <span className="font-bold text-foreground">
                                {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}, {event.time}
                            </span>
                            <span className="text-sm text-muted-foreground hidden sm:inline-block">
                                59 RSVP'd
                            </span>
                        </div>
                        <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 rounded-md mx-auto sm:mx-0">
                            RSVP
                        </Button>
                    </div>
                </div>

                {/* 4. Main Content Grid (Contains Sidebar and About) */}
                <div className="container mx-auto max-w-6xl px-4 pt-12">
                    <div className="grid lg:grid-cols-[250px_1fr] gap-12 items-start">

                        {/* Left Sidebar: Key Themes */}
                        <aside className="space-y-8 hidden lg:block">
                            <div>
                                <h3 className="font-bold text-foreground mb-4">Key Themes</h3>
                                <div className="flex flex-col gap-3">
                                    <ThemePill label="AI" />
                                    <ThemePill label="Community Building" />
                                    <ThemePill label="Data" />
                                </div>
                            </div>
                        </aside>

                        {/* Main Center Content: About Only */}
                        <div>
                            {/* About Section */}
                            <section>
                                <h2 className="text-3xl font-bold text-foreground mb-6">About this event</h2>
                                <div className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground leading-relaxed">
                                    {event.longDescription ? (
                                        <p className="whitespace-pre-line">{event.longDescription}</p>
                                    ) : (
                                        <p>{event.description}</p>
                                    )}
                                </div>

                                {/* Mobile Key Themes (Visible only on smaller screens) */}
                                <div className="lg:hidden mt-8">
                                    <h3 className="font-bold text-foreground mb-4">Key Themes</h3>
                                    <div className="flex flex-wrap gap-2">
                                        <ThemePill label="AI" />
                                        <ThemePill label="Community Building" />
                                        <ThemePill label="Data" />
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>

                {/* 5. Discussions Section (Full Width Container) */}
                <div className="container mx-auto max-w-6xl px-4 py-8 mt-8">
                    <div className="flex flex-wrap items-center justify-between mb-8 gap-4">
                        <h2 className="text-2xl font-bold text-foreground">Discussions</h2>
                        <Button variant="outline" className="border-foreground/20 text-foreground hover:bg-muted font-medium">
                            Login to add discussion
                        </Button>
                    </div>
                    <div className="relative overflow-hidden rounded-2xl border border-white/10 shadow-2xl group min-h-[400px] flex items-center justify-center">
                        {/* Background Image with Zoom Effect */}
                        <div
                            className="absolute inset-0 bg-[url('/community_collaboration.png')] bg-cover bg-center transition-transform duration-1000 group-hover:scale-110"
                        />

                        {/* Dark Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/95 via-[#020617]/80 to-[#020617]/40 backdrop-blur-[2px]" />

                        {/* Content */}
                        <div className="relative z-10 text-center p-8 max-w-2xl mx-auto">
                            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                                <Users className="w-8 h-8 text-white/90" />
                            </div>

                            <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 tracking-tight">
                                Join the Discussion
                            </h3>

                            <p className="text-gray-300 mb-8 text-lg leading-relaxed font-light">
                                Connect with fellow researchers, share your insights, and ask questions about this event. Be part of the conversation!
                            </p>

                            <Button className="bg-[#1a73e8] hover:bg-[#1557b0] text-white font-bold text-lg px-8 py-6 h-auto rounded-full transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(26,115,232,0.4)] border border-white/10">
                                Login to Start Chatting
                            </Button>
                        </div>
                    </div>
                </div>

                {/* 6. Organizers Section (Full Width Container) */}
                <div className="container mx-auto max-w-6xl px-4 py-8 mb-16">
                    <h2 className="text-3xl font-bold text-foreground mb-12 text-center sm:text-left">Organizers</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {teamMembers.map((member, i) => (
                            <div key={i} className="flex flex-col items-center text-center group">
                                <div className="mb-4 p-1 rounded-full bg-gradient-to-br from-primary to-accent relative">
                                    <Avatar className="w-24 h-24 border-4 border-background">
                                        <AvatarImage src={member.image} alt={member.name} className="object-cover" />
                                        <AvatarFallback className="bg-muted text-xl font-bold text-muted-foreground">
                                            {member.name.split(' ').map(n => n[0]).join('')}
                                        </AvatarFallback>
                                    </Avatar>
                                </div>
                                <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">{member.name}</h3>
                                <p className="text-primary text-sm font-medium mb-2">{member.role}</p>

                                <div className="flex gap-3 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <a href="#" className="p-1.5 rounded-full border border-border hover:border-primary hover:text-primary transition-colors"><Linkedin className="w-3 h-3" /></a>
                                    <a href="#" className="p-1.5 rounded-full border border-border hover:border-foreground hover:text-foreground transition-colors"><Twitter className="w-3 h-3" /></a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 7. Bottom Details (When & Where) */}
                <section className="bg-card/30 border-t border-border py-12 px-4 mt-auto">
                    <div className="container mx-auto max-w-6xl grid md:grid-cols-2 gap-12">
                        {/* When */}
                        <div className="flex gap-6">
                            <div className="w-12 h-12 rounded-full bg-card border border-border flex items-center justify-center flex-shrink-0">
                                <Calendar className="w-6 h-6 text-foreground" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-foreground mb-1">When</h3>
                                <p className="text-muted-foreground">
                                    {new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                                </p>
                                <p className="text-muted-foreground">{event.time}</p>
                            </div>
                        </div>

                        {/* Where */}
                        <div className="flex gap-6">
                            <div className="w-12 h-12 rounded-full bg-card border border-border flex items-center justify-center flex-shrink-0">
                                <MapPin className="w-6 h-6 text-foreground" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-foreground mb-1">Where</h3>
                                <p className="font-medium text-foreground">{event.location.split(',')[0]}</p>
                                <p className="text-muted-foreground">{event.location}</p>
                            </div>
                        </div>
                    </div>
                </section>

            </main>

            <CommunityConnect />
            <Footer />
        </div>
    );
}

// Sub-components for cleaner code
function ThemePill({ label }: { label: string }) {
    return (
        <span className="px-4 py-2 rounded-full border border-foreground/20 text-foreground text-sm font-medium hover:bg-foreground/5 cursor-default transition-colors w-fit">
            {label}
        </span>
    );
}

function SocialButton({ icon }: { icon: React.ReactNode }) {
    return (
        <button className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-muted transition-colors">
            {icon}
        </button>
    );
}

function FacebookIcon() {
    return (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
        </svg>
    )
}

function DNALogoLarge() {
    return (
        <svg viewBox="0 0 100 100" fill="none" className="w-96 h-96 opacity-20" xmlns="http://www.w3.org/2000/svg">
            <path d="M30 10 Q50 25 30 40 Q10 55 30 70 Q50 85 30 95" stroke="currentColor" strokeWidth="2" fill="none" />
            <path d="M70 10 Q50 25 70 40 Q90 55 70 70 Q50 85 70 95" stroke="currentColor" strokeWidth="2" fill="none" />
        </svg>
    );
}
