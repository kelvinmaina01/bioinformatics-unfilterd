import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { DNALogo } from '@/components/DNALogo';
import { Card, CardContent } from "@/components/ui/card";
import { Users, Target, Lightbulb, Globe, Heart } from 'lucide-react';

const values = [
    {
        icon: Users,
        title: 'Community First',
        description: 'We believe in the power of connection. We are built by students, for students, fostering a supportive environment where everyone can grow.'
    },
    {
        icon: Target,
        title: 'Precision & Excellence',
        description: 'We strive for accuracy and quality in everything we do, from our code to our research conversation.'
    },
    {
        icon: Lightbulb,
        title: 'Innovation',
        description: 'We push boundaries, exploring the intersection of biology and technology to find new solutions to old problems.'
    },
    {
        icon: Globe,
        title: 'Open Science',
        description: 'Knowledge should be free. We champion open access, open source, and transparent research practices.'
    },
    {
        icon: Heart,
        title: 'Inclusivity',
        description: 'Bioinformatics is for everyone. We welcome diverse perspectives and backgrounds to enrich our field.'
    }
];

export default function About() {
    return (
        <div className="min-h-screen bg-background text-foreground">
            <Navbar />

            <main className="pt-24 pb-20">
                {/* Header Section */}
                <section className="px-4 mb-20">
                    <div className="container mx-auto max-w-4xl text-center">
                        <div className="animate-fade-in-up">
                            <DNALogo size="xl" animate className="mx-auto mb-8" />
                            <h1 className="text-4xl md:text-6xl font-bold mb-6">
                                About <span className="text-primary">Us</span>
                            </h1>
                            <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                                We are building Africa's largest network of Bioinformatics, Health Informatics, and TechBio talent.
                                A place where the signal matters more than the noise.
                            </p>
                        </div>
                    </div>
                </section>

                {/* The Story / Manifesto Refined */}
                <section className="px-4 py-16 bg-muted/30 border-y border-border/50">
                    <div className="container mx-auto max-w-4xl">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div>
                                <h2 className="text-3xl font-bold mb-6">Our Story</h2>
                                <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">
                                    <p>
                                        The bioinformatics community has long been fragmented. Conversations happen in silos—Twitter threads that disappear, Slack channels you can't find, conferences that are inaccessible.
                                    </p>
                                    <p>
                                        Good ideas get lost. Junior researchers don't know what senior researchers actually think. We built this Hub as a counterweight.
                                    </p>
                                    <p>
                                        We stand for honest discourse over performative consensus. For open science as a default, not an afterthought. For rigor without gatekeeping.
                                    </p>
                                </div>
                            </div>
                            <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 blur-3xl rounded-full opacity-50"></div>
                                <div className="relative bg-card border border-border p-8 rounded-2xl shadow-xl">
                                    <h3 className="font-bold text-xl mb-4 italic">"If bioinformatics had a headquarters, this would be it."</h3>
                                    <p className="text-muted-foreground">— Not loud. Not flashy. Just confident, intelligent, and intentional.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Our Values */}
                <section className="px-4 py-20">
                    <div className="container mx-auto max-w-6xl">
                        <h2 className="text-3xl font-bold text-center mb-16">Our Core Values</h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {values.map((item, index) => (
                                <Card key={item.title} className="bg-card border-border hover:border-primary/50 transition-all hover:-translate-y-1">
                                    <CardContent className="p-8">
                                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6 text-primary">
                                            <item.icon className="w-6 h-6" />
                                        </div>
                                        <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                                        <p className="text-muted-foreground leading-relaxed">
                                            {item.description}
                                        </p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Call to Action */}
                <section className="px-4 py-20 bg-primary/5 border-t border-border">
                    <div className="container mx-auto text-center max-w-2xl">
                        <h2 className="text-3xl font-bold mb-6">Ready to Join the Movement?</h2>
                        <p className="text-lg text-muted-foreground mb-8">
                            Be part of the next generation of scientists and innovators.
                        </p>
                        {/* Note: In a real app we might reuse the JoinModal trigger here, but linking to home or a dedicated join page is fine */}
                        {/* Since we don't have global state for JoinModal, we'll direct them to the discord or home */}
                        <a href="/" className="inline-flex h-12 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
                            Get Started
                        </a>
                    </div>
                </section>

            </main>

            <Footer />
        </div>
    );
}
