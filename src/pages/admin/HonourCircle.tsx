import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Loader2, Trophy, Star } from 'lucide-react';
import { UserProfile } from '@/contexts/AuthContext';

export default function HonourCircle() {
    const [members, setMembers] = useState<UserProfile[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Assuming there will be a field 'status' or 'honourCircle' for these members
        // For now, let's fetch users and simulate the 'Honour Circle' logic 
        // by filtering those with high 'contributionScore' if that was implemented,
        // but user says "connect that later", so we'll show a mocked list for now or empty Firestore query
        const q = query(collection(db, 'users'), where('honourCircle', '==', true));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const memberData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as UserProfile[];
            setMembers(memberData);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    if (loading) {
        return <div className="flex justify-center p-8"><Loader2 className="animate-spin" /></div>;
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold flex items-center gap-2">
                    <Trophy className="w-8 h-8 text-yellow-500" />
                    Honour Circle
                </h1>
                <div className="flex items-center gap-2 bg-yellow-500/10 text-yellow-600 px-4 py-2 rounded-full border border-yellow-500/20">
                    <Star className="w-4 h-4 fill-yellow-500" />
                    <span className="font-bold text-sm">Join the Honour Circle</span>
                </div>
            </div>

            <p className="text-muted-foreground max-w-2xl">
                Become part of a community that values innovation, integrity, and the future of science.
                These are the elite contributors and researchers of Bioinformatics Unfiltered.
            </p>

            <div className="border rounded-xl overflow-hidden bg-gradient-to-b from-card to-background border-yellow-500/10 shadow-lg shadow-yellow-500/5">
                <Table>
                    <TableHeader className="bg-yellow-500/5">
                        <TableRow>
                            <TableHead className="text-yellow-700">Distinguished Member</TableHead>
                            <TableHead className="text-yellow-700">Specialization</TableHead>
                            <TableHead className="text-yellow-700">Impact Score</TableHead>
                            <TableHead className="text-yellow-700">Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {members.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center py-20">
                                    <div className="flex flex-col items-center gap-3">
                                        <Trophy className="w-12 h-12 text-muted-foreground/30" />
                                        <p className="text-muted-foreground">The Honour Circle is currently empty.</p>
                                        <p className="text-xs text-muted-foreground/60">Members will appear here once connected to the Firestore backend.</p>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : (
                            members.map((member) => (
                                <TableRow key={member.id} className="hover:bg-yellow-500/5 transition-colors">
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <Avatar className="h-12 w-12 border-2 border-yellow-500/30">
                                                <AvatarImage src={member.avatar} />
                                                <AvatarFallback className="bg-yellow-500/10 text-yellow-600">
                                                    {member.name.charAt(0)}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <div className="font-bold text-foreground">{member.name}</div>
                                                <div className="text-xs text-muted-foreground">{member.email}</div>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex flex-wrap gap-1">
                                            {member.interests?.map(interest => (
                                                <Badge key={interest} variant="outline" className="text-[10px] border-yellow-500/20 text-yellow-600">
                                                    {interest}
                                                </Badge>
                                            ))}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="font-mono font-bold text-yellow-600">
                                            850/1000
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge className="bg-yellow-500 hover:bg-yellow-600 text-white border-0">
                                            Elite Contributor
                                        </Badge>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
