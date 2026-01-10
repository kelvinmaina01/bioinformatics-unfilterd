import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import {
    GraduationCap,
    Microscope,
    Code,
    Heart,
    Briefcase
} from 'lucide-react';
import { cn } from '@/lib/utils';

const roles = [
    { id: 'student', label: 'Student', icon: GraduationCap, description: 'Undergrad/Postgrad' },
    { id: 'researcher', label: 'Researcher', icon: Microscope, description: 'Academic/Industry' },
    { id: 'developer', label: 'Developer', icon: Code, description: 'TechBio Builder' },
    { id: 'enthusiast', label: 'Bio Nerd', icon: Heart, description: 'Just Curious' },
];

export function CompleteProfileModal() {
    const { user, updateProfile } = useAuth();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();

    const [formData, setFormData] = useState({
        role: '',
        institution: '',
        bio: '',
        twitter: '',
        github: '',
    });

    useEffect(() => {
        // Open if user is logged in BUT missing a role
        if (user && !user.role) {
            setOpen(true);
        } else {
            setOpen(false);
        }
    }, [user]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.role) {
            toast({ title: 'Role Required', description: 'Please select a primary role.', variant: 'destructive' });
            return;
        }

        setLoading(true);
        try {
            await updateProfile({
                role: formData.role,
                institution: formData.institution,
                bio: formData.bio,
                twitter: formData.twitter,
                github: formData.github,
            });
            toast({ title: 'Profile Updated', description: 'You are all set! Welcome to the hub.' });
            setOpen(false);
        } catch (error: any) {
            toast({ title: 'Error', description: error.message, variant: 'destructive' });
        } finally {
            setLoading(false);
        }
    };

    if (!open) return null;

    return (
        <Dialog open={open} onOpenChange={(val) => !val && setOpen(val)}>
            {/* Prevent closing by clicking outside if we want to force it, but let's allow close for UX friendliness? 
          Actually, checking 'open' in useEffect implies it will reopen if they don't complete. 
          Let's make it persistent-ish. */}
            <DialogContent className="sm:max-w-[600px] bg-background/95 backdrop-blur-xl border-white/10" onPointerDownOutside={(e) => e.preventDefault()}>
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
                        Complete Your Profile
                    </DialogTitle>
                    <DialogDescription>
                        Tell us a bit about yourself to get the most out of the community.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6 mt-4">

                    {/* Role Selection */}
                    <div className="space-y-3">
                        <Label>Which describes you best?</Label>
                        <div className="grid grid-cols-2 gap-3">
                            {roles.map((role) => {
                                const Icon = role.icon;
                                const isSelected = formData.role === role.id;
                                return (
                                    <div
                                        key={role.id}
                                        onClick={() => setFormData(p => ({ ...p, role: role.id }))}
                                        className={cn(
                                            "cursor-pointer relative flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all duration-200 hover:scale-[1.02]",
                                            isSelected
                                                ? "border-blue-500 bg-blue-500/10 shadow-lg shadow-blue-500/20"
                                                : "border-muted bg-muted/30 hover:border-blue-500/50 hover:bg-muted/50"
                                        )}
                                    >
                                        <Icon className={cn("w-8 h-8 mb-2", isSelected ? "text-blue-500" : "text-muted-foreground")} />
                                        <div className="font-semibold text-sm">{role.label}</div>
                                        <div className="text-xs text-muted-foreground text-center mt-1">{role.description}</div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="institution">Institution / Company</Label>
                            <Input
                                id="institution"
                                placeholder="Where do you work/study?"
                                value={formData.institution}
                                onChange={(e) => setFormData(p => ({ ...p, institution: e.target.value }))}
                                className="bg-muted/50"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="twitter">Twitter / X (Optional)</Label>
                            <Input
                                id="twitter"
                                placeholder="@username"
                                value={formData.twitter}
                                onChange={(e) => setFormData(p => ({ ...p, twitter: e.target.value }))}
                                className="bg-muted/50"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea
                            id="bio"
                            placeholder="A short intro..."
                            className="max-h-24 bg-muted/50"
                            value={formData.bio}
                            onChange={(e) => setFormData(p => ({ ...p, bio: e.target.value }))}
                        />
                    </div>

                    <DialogDescription className="text-xs text-muted-foreground">
                        * You can edit these details later in your profile.
                    </DialogDescription>

                    <Button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold h-11">
                        {loading ? 'Saving...' : 'Complete Profile'}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}
