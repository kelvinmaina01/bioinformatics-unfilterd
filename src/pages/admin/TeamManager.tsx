import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Plus, Trash2, UserPlus, Shield } from 'lucide-react';

interface TeamMember {
    id: string;
    name: string;
    role: string;
    bio: string;
    image: string;
}

const initialTeam: TeamMember[] = [
    {
        id: '1',
        name: 'Kelvin Maina',
        role: 'Founder',
        bio: 'Visionary leader driving the mission to connect biomedical talent across Kenya.',
        image: ''
    },
    {
        id: '2',
        name: 'Sarah Wanjiku',
        role: 'Co-Founder',
        bio: 'Strategic thinker ensuring our initiatives align with student and industry needs.',
        image: ''
    },
    {
        id: '3',
        name: 'David Ochieng',
        role: 'Technical Lead',
        bio: 'Architecting the digital infrastructure that powers our community connections.',
        image: ''
    },
    {
        id: '4',
        name: 'Mercy Njeri',
        role: 'Relationship & Community Lead',
        bio: 'Building bridges between students, universities, and partners.',
        image: ''
    },
    {
        id: '5',
        name: 'Brian Kipkorir',
        role: 'Social Media Manager',
        bio: 'Amplifying our voice and engaging our community across digital platforms.',
        image: ''
    },
    {
        id: '6',
        name: 'Joy Muthoni',
        role: 'Events and Outreach',
        bio: 'Orchestrating impactful events that bring the community together.',
    }
];

export default function TeamManager() {
    const [team, setTeam] = useState<TeamMember[]>(initialTeam);
    const [isAdding, setIsAdding] = useState(false);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold flex items-center gap-2">
                    <Shield className="w-8 h-8 text-primary" />
                    Leadership Team
                </h1>
                <Button onClick={() => setIsAdding(true)} className="gap-2">
                    <UserPlus className="w-4 h-4" />
                    Add Leader
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {team.map((member) => (
                    <Card key={member.id} className="bg-card border-border hover:border-primary/30 transition-all overflow-hidden group">
                        <CardContent className="p-6">
                            <div className="flex gap-4 items-start">
                                <Avatar className="h-16 w-16 border-2 border-primary/20 shadow-lg">
                                    <AvatarImage src={member.image} />
                                    <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white font-bold text-xl">
                                        {member.name.split(' ').map(n => n[0]).join('')}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="flex-1 space-y-1">
                                    <div className="flex items-center justify-between">
                                        <h3 className="font-bold text-lg">{member.name}</h3>
                                        <Button variant="ghost" size="icon" className="text-destructive opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                    <p className="text-sm font-semibold text-primary">{member.role}</p>
                                    <p className="text-xs text-muted-foreground line-clamp-2">{member.bio}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {isAdding && (
                <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <Card className="w-full max-w-md">
                        <CardContent className="p-6 space-y-4">
                            <h2 className="text-xl font-bold">Add New Leader</h2>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Full Name</label>
                                <Input placeholder="e.g. John Doe" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Role</label>
                                <Input placeholder="e.g. Community Lead" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Bio</label>
                                <Textarea placeholder="Short description..." className="resize-none" />
                            </div>
                            <div className="flex gap-3 pt-4">
                                <Button variant="outline" onClick={() => setIsAdding(false)} className="flex-1">Cancel</Button>
                                <Button className="flex-1">Save Leader</Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    );
}
