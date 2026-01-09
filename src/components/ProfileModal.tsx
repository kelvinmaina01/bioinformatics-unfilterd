import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { useToast } from '@/hooks/use-toast';
import { User, LogOut, Save } from 'lucide-react';

interface ProfileModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const avatarOptions = ['🧬', '🔬', '🧪', '💻', '🧠', '🌍', '⚗️', '📊'];
const skillOptions = ['Python', 'R', 'Machine Learning', 'Genomics', 'Proteomics', 'Single-cell', 'Cloud', 'Data Viz', 'Wet Lab'];
const interestOptions = ['Cancer Research', 'Drug Discovery', 'AI/ML', 'Ethics', 'Open Science', 'Microbiome', 'Aging', 'Neuroscience'];

export function ProfileModal({ open, onOpenChange }: ProfileModalProps) {
  const { user, updateProfile, logout } = useAuth();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    avatar: '🧬',
    bio: '',
    skills: [] as string[],
    interests: [] as string[],
    discord: '',
    twitter: '',
    github: '',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        avatar: user.avatar,
        bio: user.bio,
        skills: user.skills,
        interests: user.interests,
        discord: user.discord || '',
        twitter: user.twitter || '',
        github: user.github || '',
      });
    }
  }, [user]);

  const handleSave = () => {
    updateProfile(formData);
    toast({ title: 'Profile updated!', description: 'Your changes have been saved.' });
    onOpenChange(false);
  };

  const handleLogout = () => {
    logout();
    toast({ title: 'Signed out', description: 'See you next time!' });
    onOpenChange(false);
  };

  const toggleSkill = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.includes(skill) 
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }));
  };

  const toggleInterest = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  if (!user) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card border-border max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-foreground flex items-center gap-2">
            <User className="w-5 h-5 text-primary" />
            Edit Profile
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-3xl">
              {formData.avatar}
            </div>
            <div>
              <p className="text-foreground font-medium">{user.email}</p>
              <p className="text-xs text-muted-foreground">
                Member since {new Date(user.joinedAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Avatar</Label>
            <div className="flex flex-wrap gap-2">
              {avatarOptions.map((avatar) => (
                <button
                  key={avatar}
                  onClick={() => setFormData(prev => ({ ...prev, avatar }))}
                  className={`w-10 h-10 rounded-lg text-xl flex items-center justify-center transition-all ${
                    formData.avatar === avatar 
                      ? 'bg-primary/20 ring-2 ring-primary' 
                      : 'bg-muted hover:bg-muted/80'
                  }`}
                >
                  {avatar}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">Display Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="bg-background border-border"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              value={formData.bio}
              onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
              className="bg-background border-border resize-none"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label>Skills</Label>
            <div className="flex flex-wrap gap-2">
              {skillOptions.map((skill) => (
                <Badge
                  key={skill}
                  variant="outline"
                  onClick={() => toggleSkill(skill)}
                  className={`cursor-pointer transition-all ${
                    formData.skills.includes(skill)
                      ? 'bg-primary/20 text-primary border-primary/30'
                      : 'border-border text-muted-foreground hover:border-primary/50'
                  }`}
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Interests</Label>
            <div className="flex flex-wrap gap-2">
              {interestOptions.map((interest) => (
                <Badge
                  key={interest}
                  variant="outline"
                  onClick={() => toggleInterest(interest)}
                  className={`cursor-pointer transition-all ${
                    formData.interests.includes(interest)
                      ? 'bg-accent/20 text-accent border-accent/30'
                      : 'border-border text-muted-foreground hover:border-accent/50'
                  }`}
                >
                  {interest}
                </Badge>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="space-y-1">
              <Label htmlFor="discord" className="text-xs">Discord</Label>
              <Input
                id="discord"
                value={formData.discord}
                onChange={(e) => setFormData(prev => ({ ...prev, discord: e.target.value }))}
                className="bg-background border-border text-sm"
                placeholder="username"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="twitter" className="text-xs">Twitter</Label>
              <Input
                id="twitter"
                value={formData.twitter}
                onChange={(e) => setFormData(prev => ({ ...prev, twitter: e.target.value }))}
                className="bg-background border-border text-sm"
                placeholder="@handle"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="github" className="text-xs">GitHub</Label>
              <Input
                id="github"
                value={formData.github}
                onChange={(e) => setFormData(prev => ({ ...prev, github: e.target.value }))}
                className="bg-background border-border text-sm"
                placeholder="username"
              />
            </div>
          </div>
        </div>

        <div className="flex gap-3 pt-4">
          <Button variant="outline" onClick={handleLogout} className="text-destructive hover:text-destructive">
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
          <Button onClick={handleSave} className="flex-1 bg-primary hover:bg-primary/90">
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
