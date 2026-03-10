import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { projects, members } from '@/data/mockData';
import { events } from '@/data/events';
import { Button } from './ui/button';
import { useToast } from '@/hooks/use-toast';

export function SupabaseDatabaseSeeder() {
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();

    const seedData = async () => {
        setLoading(true);
        try {
            // Seed Projects
            for (const project of projects) {
                const { error } = await supabase
                    .from('projects')
                    .upsert({
                        id: project.id,
                        title: project.title,
                        goal: project.goal,
                        contributors: project.contributors,
                        tools: project.tools,
                        progress: project.progress,
                        status: project.status,
                        field: project.field
                    });
                
                if (error) {
                    console.error('Error seeding project:', project.id, error);
                }
            }

            // Seed Events
            for (const event of events) {
                const { error } = await supabase
                    .from('events')
                    .upsert({
                        id: event.id,
                        title: event.title,
                        type: event.type,
                        date: new Date(event.date).toISOString().split('T')[0],
                        time: event.time,
                        location: event.location,
                        description: event.description,
                        long_description: event.longDescription,
                        image: event.image,
                        status: event.status,
                        rsvp_link: event.rsvpLink
                    });
                
                if (error) {
                    console.error('Error seeding event:', event.id, error);
                }
            }

            // Seed Mock Members (as users)
            for (const member of members) {
                const { error } = await supabase
                    .from('users')
                    .upsert({
                        id: member.id,
                        name: member.name,
                        email: `mock_${member.id}@example.com`,
                        avatar: member.avatar,
                        bio: member.bio,
                        skills: member.skills,
                        interests: member.interests,
                        region: member.region,
                        region_flag: member.regionFlag,
                        role: 'member'
                    });
                
                if (error) {
                    console.error('Error seeding member:', member.id, error);
                }
            }

            toast({ title: 'Success', description: 'Database seeded with mock data!' });
        } catch (error: any) {
            console.error(error);
            toast({ title: 'Error', description: error.message, variant: 'destructive' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed bottom-4 left-4 z-50">
            <Button
                variant="destructive"
                size="sm"
                onClick={seedData}
                disabled={loading}
                className="opacity-50 hover:opacity-100 transition-opacity"
            >
                {loading ? 'Seeding...' : 'Seed DB (Supabase)'}
            </Button>
        </div>
    );
}