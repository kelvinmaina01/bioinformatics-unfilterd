import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckCircle2, CreditCard, Heart, Smartphone } from 'lucide-react';
import { toast } from 'sonner';
import { db } from '@/lib/firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

interface DonationModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

const AMOUNTS = [10, 25, 50, 100];

export function DonationModal({ open, onOpenChange }: DonationModalProps) {
    const [step, setStep] = useState(1);
    const [amount, setAmount] = useState<number>(25);
    const [customAmount, setCustomAmount] = useState<string>('');
    const [frequency, setFrequency] = useState<'once' | 'monthly'>('once');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [paymentMethod, setPaymentMethod] = useState<'stripe' | 'mpesa'>('stripe');
    const [loading, setLoading] = useState(false);

    const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCustomAmount(e.target.value);
        if (e.target.value) {
            setAmount(Number(e.target.value));
        }
    };

    const handleNext = () => {
        if (step === 1 && amount <= 0) {
            toast.error("Please enter a valid amount");
            return;
        }
        setStep(step + 1);
    };

    const handleSubmit = async () => {
        if (!name || !email) {
            toast.error("Please fill in your details");
            return;
        }

        setLoading(true);
        try {
            // Record donation attempt in Firestore
            await addDoc(collection(db, 'donations'), {
                amount,
                currency: 'USD',
                frequency,
                donorName: name,
                donorEmail: email,
                method: paymentMethod,
                status: 'pending', // In a real app, this would update after payment
                date: serverTimestamp(),
            });

            // Simulate payment processing
            await new Promise(resolve => setTimeout(resolve, 1500));

            toast.success("Thank you for your generous donation!", {
                description: "We will reach out to confirm your payment."
            });
            onOpenChange(false);
            setStep(1); // Reset
        } catch (error) {
            console.error("Error submitting donation:", error);
            toast.error("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px] bg-card/95 backdrop-blur-sm">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-2xl">
                        <Heart className="h-6 w-6 text-red-500 fill-red-500" />
                        Support Our Community
                    </DialogTitle>
                    <DialogDescription>
                        Your contribution helps us grow the bioinformatics ecosystem in Kenya.
                    </DialogDescription>
                </DialogHeader>

                <div className="py-4">
                    {/* Progress Steps */}
                    <div className="flex items-center justify-between mb-8 px-2 relative">
                        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-muted -z-10" />
                        {[1, 2, 3].map((s) => (
                            <div
                                key={s}
                                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${step >= s ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                                    }`}
                            >
                                {step > s ? <CheckCircle2 className="h-5 w-5" /> : s}
                            </div>
                        ))}
                    </div>

                    {step === 1 && (
                        <div className="space-y-6 animate-in slide-in-from-right-4">
                            <div className="grid grid-cols-4 gap-3">
                                {AMOUNTS.map((amt) => (
                                    <Button
                                        key={amt}
                                        variant={amount === amt && !customAmount ? "default" : "outline"}
                                        onClick={() => { setAmount(amt); setCustomAmount(''); }}
                                        className="h-12"
                                    >
                                        ${amt}
                                    </Button>
                                ))}
                            </div>
                            <div className="space-y-2">
                                <Label>Custom Amount ($)</Label>
                                <Input
                                    type="number"
                                    placeholder="Enter amount"
                                    value={customAmount}
                                    onChange={handleCustomAmountChange}
                                    className="text-lg"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Frequency</Label>
                                <RadioGroup value={frequency} onValueChange={(v: "once" | "monthly") => setFrequency(v)} className="grid grid-cols-2 gap-4">
                                    <div>
                                        <RadioGroupItem value="once" id="once" className="peer sr-only" />
                                        <Label
                                            htmlFor="once"
                                            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                                        >
                                            One-time
                                        </Label>
                                    </div>
                                    <div>
                                        <RadioGroupItem value="monthly" id="monthly" className="peer sr-only" />
                                        <Label
                                            htmlFor="monthly"
                                            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                                        >
                                            Monthly
                                        </Label>
                                    </div>
                                </RadioGroup>
                            </div>
                            <Button className="w-full" onClick={handleNext}>Next Step</Button>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="space-y-4 animate-in slide-in-from-right-4">
                            <div className="space-y-2">
                                <Label>Full Name</Label>
                                <Input placeholder="Jane Doe" value={name} onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <Label>Email Address</Label>
                                <Input type="email" placeholder="jane@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <Button className="w-full" onClick={handleNext}>Continue to Payment</Button>
                            <Button variant="ghost" className="w-full" onClick={() => setStep(1)}>Back</Button>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="space-y-6 animate-in slide-in-from-right-4">
                            <Tabs value={paymentMethod} onValueChange={(v) => setPaymentMethod(v as 'stripe' | 'mpesa')} className="w-full">
                                <TabsList className="grid w-full grid-cols-2">
                                    <TabsTrigger value="stripe" className="flex items-center gap-2">
                                        <CreditCard className="h-4 w-4" /> Card (Stripe)
                                    </TabsTrigger>
                                    <TabsTrigger value="mpesa" className="flex items-center gap-2">
                                        <Smartphone className="h-4 w-4" /> M-Pesa
                                    </TabsTrigger>
                                </TabsList>
                                <TabsContent value="stripe" className="p-4 border rounded-md mt-4 space-y-4 bg-muted/20">
                                    <div className="space-y-2">
                                        <Label>Card Information</Label>
                                        <div className="h-10 border rounded px-3 flex items-center bg-background text-muted-foreground text-sm cursor-not-allowed">
                                            **** **** **** 4242 (Mock)
                                        </div>
                                    </div>
                                </TabsContent>
                                <TabsContent value="mpesa" className="p-4 border rounded-md mt-4 space-y-4 bg-muted/20">
                                    <div className="space-y-2">
                                        <Label>M-Pesa Phone Number</Label>
                                        <Input placeholder="07xx xxx xxx" />
                                    </div>
                                </TabsContent>
                            </Tabs>

                            <div className="pt-4">
                                <Button className="w-full" onClick={handleSubmit} disabled={loading}>
                                    {loading ? "Processing..." : `Donate $${amount} ${frequency === 'monthly' ? '/ month' : ''}`}
                                </Button>
                                <Button variant="ghost" className="w-full mt-2" onClick={() => setStep(2)}>Back</Button>
                            </div>
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}
