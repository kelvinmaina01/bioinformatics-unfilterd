import { useState } from 'react';
import { db, auth } from '@/lib/firebase';
import { collection, doc, setDoc, writeBatch, updateDoc } from 'firebase/firestore';
import { projects, members } from '@/data/mockData';
import { events } from '@/data/events';
import { Button } from './ui/button';
import { useToast } from '@/hooks/use-toast';

export function DatabaseSeeder() {
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();

    const seedData = async () => {
        setLoading(true);
        try {
            const batch = writeBatch(db);

            // Seed Projects
            projects.forEach(p => {
                const ref = doc(collection(db, 'projects'), p.id);
                batch.set(ref, p);
            });

            // Seed Events
            events.forEach(e => {
                const ref = doc(collection(db, 'events'), e.id);
                batch.set(ref, e);
            });

            // Seed Mock Members (into 'users' collection with manual IDs?)
            // We might want to separate 'users' (real auth) from 'mock_members' if we want to preserve them
            // OR we just upload them to 'users'. Let's upload to 'users' for simplicity, assuming no auth conflict with these IDs.
            // Note: Auth uses UID. These IDs are '1', '2'. It's fine to mix them in Firestore users collection.
            members.forEach(m => {
                const ref = doc(collection(db, 'users'), m.id);
                batch.set(ref, {
                    ...m,
                    // Ensure fields match what AuthContext expects
                    regionFlag: m.regionFlag,
                    skills: m.skills,
                    role: 'Member', // Default role for mock data
                    email: `mock_${m.id}@example.com`,
                    joinedAt: new Date().toISOString()
                });
            });

            await batch.commit();

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
                {loading ? 'Seeding...' : 'Seed DB'}
            </Button>
        </div>
    );
}
