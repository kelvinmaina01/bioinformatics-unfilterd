import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Linkedin, Twitter, Instagram } from "lucide-react";

import { teamMembers } from "@/data/team";

export function LeadershipTeam() {
    return (
        <section className="py-20 px-4 bg-card/30">
            <div className="container mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-12 animate-fade-in-up">
                    Meet Our Leadership Team
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {teamMembers.map((member, index) => (
                        <div
                            key={member.name}
                            className="flex flex-col items-center text-center animate-fade-in-up"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            <div className="mb-4 p-1 rounded-full bg-gradient-to-br from-primary to-accent">
                                <Avatar className="w-32 h-32 border-4 border-background">
                                    <AvatarImage src={member.image} alt={member.name} className="object-cover" />
                                    <AvatarFallback className="bg-muted text-2xl font-bold text-muted-foreground">
                                        {member.name.split(' ').map(n => n[0]).join('')}
                                    </AvatarFallback>
                                </Avatar>
                            </div>

                            <h3 className="text-xl font-bold text-foreground mb-1">{member.name}</h3>
                            <p className="text-primary font-medium mb-3">{member.role}</p>

                            <p className="text-muted-foreground text-sm mb-4 max-w-xs">{member.description}</p>

                            <div className="flex gap-4">
                                <a href="#" className="p-2 rounded-full bg-card border border-border text-muted-foreground hover:text-primary hover:border-primary transition-colors">
                                    <Linkedin className="w-4 h-4" />
                                </a>
                                <a href="#" className="p-2 rounded-full bg-card border border-border text-muted-foreground hover:text-foreground hover:border-foreground transition-colors">
                                    <Twitter className="w-4 h-4" />
                                </a>
                                <a href="#" className="p-2 rounded-full bg-card border border-border text-muted-foreground hover:text-accent hover:border-accent transition-colors">
                                    <Instagram className="w-4 h-4" />
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
