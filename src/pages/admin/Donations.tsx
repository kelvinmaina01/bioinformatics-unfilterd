import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, query, orderBy, onSnapshot, Timestamp } from 'firebase/firestore';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Loader2, DollarSign } from 'lucide-react';

interface Donation {
    id: string;
    amount: number;
    donorName: string;
    donorEmail: string;
    method: 'stripe' | 'mpesa';
    frequency: 'once' | 'monthly';
    status: string;
    date: Timestamp;
}

export default function AdminDonations() {
    const [donations, setDonations] = useState<Donation[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const q = query(collection(db, 'donations'), orderBy('date', 'desc'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const donationData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as Donation[];
            setDonations(donationData);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const totalRaised = donations.reduce((acc, curr) => acc + curr.amount, 0);

    if (loading) {
        return <div className="flex justify-center p-8"><Loader2 className="animate-spin" /></div>;
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">Donations</h1>
                <Card className="w-fit">
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="bg-primary/10 p-3 rounded-full">
                            <DollarSign className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Total Raised</p>
                            <p className="text-2xl font-bold">${totalRaised.toLocaleString()}</p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="border rounded-md">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead>Donor</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Frequency</TableHead>
                            <TableHead>Method</TableHead>
                            <TableHead>Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {donations.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                                    No donations yet.
                                </TableCell>
                            </TableRow>
                        ) : (
                            donations.map((donation) => (
                                <TableRow key={donation.id}>
                                    <TableCell>
                                        {donation.date?.toDate().toLocaleDateString()}
                                    </TableCell>
                                    <TableCell>
                                        <div className="font-medium">{donation.donorName}</div>
                                        <div className="text-xs text-muted-foreground">{donation.donorEmail}</div>
                                    </TableCell>
                                    <TableCell className="font-bold">
                                        ${donation.amount}
                                    </TableCell>
                                    <TableCell className="capitalize">{donation.frequency}</TableCell>
                                    <TableCell className="capitalize">
                                        <Badge variant="outline">{donation.method === 'stripe' ? 'Stripe' : 'M-Pesa'}</Badge>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant={donation.status === 'completed' ? 'default' : 'secondary'}>
                                            {donation.status}
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
