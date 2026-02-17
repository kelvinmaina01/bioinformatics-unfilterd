import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
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
import { Loader2, Users } from 'lucide-react';
import { UserProfile } from '@/contexts/AuthContext';

export default function UsersList() {
    const [users, setUsers] = useState<UserProfile[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const q = query(collection(db, 'users'), orderBy('joinedAt', 'desc'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const userData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as UserProfile[];
            setUsers(userData);
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
                    <Users className="w-8 h-8 text-primary" />
                    Community Members
                </h1>
                <Badge variant="outline" className="text-lg px-4 py-1">
                    {users.length} Total
                </Badge>
            </div>

            <div className="border rounded-xl overflow-hidden bg-card">
                <Table>
                    <TableHeader className="bg-muted/50">
                        <TableRow>
                            <TableHead>Member</TableHead>
                            <TableHead>Region</TableHead>
                            <TableHead>Skills</TableHead>
                            <TableHead>Joined</TableHead>
                            <TableHead>Role</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center py-12 text-muted-foreground">
                                    No members found in the database.
                                </TableCell>
                            </TableRow>
                        ) : (
                            users.map((member) => (
                                <TableRow key={member.id} className="hover:bg-muted/30 transition-colors">
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <Avatar className="h-10 w-10 border-2 border-primary/20">
                                                <AvatarImage src={member.avatar} />
                                                <AvatarFallback className="bg-primary/10 text-primary">
                                                    {member.name.charAt(0)}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <div className="font-bold">{member.name}</div>
                                                <div className="text-xs text-muted-foreground">{member.email}</div>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <span>{member.regionFlag}</span>
                                            <span className="text-sm">{member.region}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex flex-wrap gap-1 max-w-[200px]">
                                            {member.skills?.slice(0, 2).map(skill => (
                                                <Badge key={skill} variant="secondary" className="text-[10px] px-1.5 py-0">
                                                    {skill}
                                                </Badge>
                                            ))}
                                            {member.skills?.length > 2 && (
                                                <span className="text-[10px] text-muted-foreground">+{member.skills.length - 2}</span>
                                            )}
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-sm text-muted-foreground">
                                        {new Date(member.joinedAt).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant={member.role === 'admin' ? 'default' : 'outline'} className="capitalize">
                                            {member.role || 'Member'}
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
