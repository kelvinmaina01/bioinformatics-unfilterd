import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { useToast } from '@/hooks/use-toast';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  GraduationCap,
  Microscope,
  Code,
  Heart,
  Twitter,
  Linkedin,
  LogIn
} from 'lucide-react';

interface JoinModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const roles = [
  { id: 'student', label: 'Student', icon: GraduationCap, description: 'Undergrad/Postgrad' },
  { id: 'researcher', label: 'Researcher', icon: Microscope, description: 'Academic/Industry' },
  { id: 'developer', label: 'Developer', icon: Code, description: 'TechBio Builder' },
  { id: 'enthusiast', label: 'Enthusiast', icon: Heart, description: 'Bio-Curious' },
];

export function JoinModal({ open, onOpenChange }: JoinModalProps) {
  const { login } = useAuth();
  const { toast } = useToast();
  const [isLogin, setIsLogin] = useState(false);
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: '',
    institution: '',
    avatar: '🧬',
    bio: '',
    interests: '', // Simplified to string for text input
    twitter: '',
    linkedin: '',
  });

  const handleGoogleLogin = () => {
    // Simulate
    const googleProfile = {
      name: 'Alex Johnson',
      email: 'alex.j@gmail.com',
      avatar: '👨‍🔬',
    };
    if (isLogin) {
      login({ ...googleProfile, bio: '', skills: [], interests: [], role: 'student', institution: 'UoN', discord: '', twitter: '', github: '' } as any);
      toast({ title: 'Welcome back!', description: 'Successfully logged in.' });
      onOpenChange(false);
    } else {
      setFormData(prev => ({ ...prev, ...googleProfile }));
      setStep(2);
    }
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.role) {
      toast({ title: 'Missing Info', description: 'Name and Role are required.', variant: 'destructive' });
      return;
    }

    // Map simplified form data to user profile
    login({
      name: formData.name,
      email: formData.email,
      avatar: formData.avatar,
      bio: formData.bio,
      role: formData.role,
      institution: formData.institution,
      interests: formData.interests.split(',').map(s => s.trim()).filter(Boolean),
      skills: [], // Removed as requested
      twitter: formData.twitter,
      // Mapping linkedin to github field or just ignoring if interface doesn't match perfectly yet
      // For now we'll put linkedin in github field just to save it easily or omit
      github: formData.linkedin,
    } as any);

    toast({
      title: 'Welcome to the Community! 🚀',
      description: `Glad to have you with us, ${formData.name.split(' ')[0]}!`
    });
    onOpenChange(false);
    setStep(1);
    setFormData({
      name: '', email: '', password: '', role: '', institution: '',
      avatar: '🧬', bio: '', interests: '', twitter: '', linkedin: ''
    });
  };

  if (isLogin) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="bg-background/95 backdrop-blur-xl border-border max-w-md p-8 rounded-2xl shadow-2xl [&::-webkit-scrollbar]:hidden">
          <DialogHeader className="mb-6">
            <DialogTitle className="text-2xl font-bold">Welcome Back</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Button
              variant="outline"
              className="w-full h-12 relative font-medium border-border hover:bg-muted/50"
              onClick={handleGoogleLogin}
            >
              <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              Continue with Google
            </Button>
            <div className="relative">
              <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-border"></span></div>
              <div className="relative flex justify-center text-xs uppercase"><span className="bg-background px-2 text-muted-foreground">Or</span></div>
            </div>
            <Input placeholder="Email" type="email" className="h-11" />
            <Input placeholder="Password" type="password" className="h-11" />
            <Button className="w-full h-11 bg-primary hover:bg-primary/90">Log In</Button>
          </div>
          <div className="mt-6 text-center text-sm text-muted-foreground">
            New here? <button onClick={() => setIsLogin(false)} className="text-primary hover:underline">Create an account</button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOnOpenChange={onOpenChange}>
      <DialogContent className="bg-background/95 backdrop-blur-xl border-border max-w-2xl max-h-[90vh] overflow-y-auto p-0 gap-0 rounded-2xl shadow-2xl [&::-webkit-scrollbar]:hidden">
        {/* Header Progress Bar */}
        <div className="h-1.5 w-full bg-muted/50">
          <div
            className="h-full bg-primary transition-all duration-500 ease-out"
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>

        <div className="p-8 md:p-10">
          <DialogHeader className="mb-8">
            <DialogTitle className="text-3xl font-bold font-sans tracking-tight">
              {step === 1 && 'Join the Hub'}
              {step === 2 && 'Your Profile'}
              {step === 3 && 'Final Touches'}
            </DialogTitle>
            <p className="text-muted-foreground mt-2 text-lg">
              {step === 1 && 'Join the largest community of bioinformatics pioneers in Africa.'}
              {step === 2 && 'Help us personalize your experience and connect you with peers.'}
              {step === 3 && 'Tell us what you\'re passionate about and where to find you.'}
            </p>
          </DialogHeader>

          {/* STEP 1: IDENTITY */}
          {step === 1 && (
            <div className="space-y-6 animate-in slide-in-from-right-4 fade-in duration-300">
              <Button
                variant="outline"
                size="lg"
                className="w-full relative h-14 text-base font-medium border-border hover:bg-muted/50 transition-all"
                onClick={handleGoogleLogin}
              >
                <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                Continue with Google
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-border"></span>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">Or with email</span>
                </div>
              </div>

              <div className="space-y-4">
                <Input
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="bg-muted/50 border-transparent focus:border-primary h-12"
                />
                <Input
                  type="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="bg-muted/50 border-transparent focus:border-primary h-12"
                />
                <Input
                  type="password"
                  placeholder="Password"
                  className="bg-muted/50 border-transparent focus:border-primary h-12"
                />
              </div>

              <div className="text-center text-sm text-muted-foreground mt-4">
                Already have an account? <button onClick={() => setIsLogin(true)} className="text-primary hover:underline">Log in</button>
              </div>
            </div>
          )}

          {/* STEP 2: PROFILE */}
          {step === 2 && (
            <div className="space-y-8 animate-in slide-in-from-right-4 fade-in duration-300">
              {/* Role Selection */}
              <div className="space-y-3">
                <Label>What best describes you?</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {roles.map((role) => {
                    const Icon = role.icon;
                    return (
                      <div
                        key={role.id}
                        onClick={() => setFormData(prev => ({ ...prev, role: role.id }))}
                        className={`cursor-pointer p-3 rounded-xl border transition-all duration-200 flex items-center gap-3 ${formData.role === role.id
                            ? 'border-primary bg-primary/5 shadow-sm'
                            : 'border-border bg-muted/20 hover:border-primary/50'
                          }`}
                      >
                        <div className={`p-2 rounded-full ${formData.role === role.id ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="font-semibold text-sm">{role.label}</div>
                          <div className="text-xs text-muted-foreground">{role.description}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Institution / University</Label>
                  <Input
                    placeholder="e.g. JKUAT, UoN (Type to search...)"
                    value={formData.institution}
                    onChange={(e) => setFormData(prev => ({ ...prev, institution: e.target.value }))}
                    className="bg-muted/50 border-transparent focus:border-primary h-11"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Bio <span className="text-muted-foreground text-xs font-normal ml-2">Short & authentic</span></Label>
                  <Textarea
                    value={formData.bio}
                    onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                    placeholder="I am a researcher interested in..."
                    className="bg-muted/50 border-transparent focus:border-primary min-h-[80px] resize-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: INTERESTS & SOCIALS */}
          {step === 3 && (
            <div className="space-y-8 animate-in slide-in-from-right-4 fade-in duration-300">
              <div className="space-y-4">
                <Label className="text-base">What area interests you? <span className="text-muted-foreground text-xs font-normal ml-2">(Comma-separated)</span></Label>
                <Input
                  placeholder="e.g. Genomics, Public Health, AI..."
                  value={formData.interests}
                  onChange={(e) => setFormData(prev => ({ ...prev, interests: e.target.value }))}
                  className="bg-muted/50 border-transparent focus:border-primary h-12"
                />
              </div>

              <div className="p-5 bg-muted/30 rounded-xl border border-dashed border-border">
                <Label className="mb-4 block">Find me on (Optional)</Label>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Twitter className="w-5 h-5 text-muted-foreground" />
                    <Input
                      placeholder="X / Twitter Handle"
                      className="bg-background border-border h-10"
                      value={formData.twitter}
                      onChange={(e) => setFormData(prev => ({ ...prev, twitter: e.target.value }))}
                    />
                  </div>
                  <div className="flex items-center gap-3">
                    <Linkedin className="w-5 h-5 text-muted-foreground" />
                    <Input
                      placeholder="LinkedIn Username"
                      className="bg-background border-border h-10"
                      value={formData.linkedin}
                      onChange={(e) => setFormData(prev => ({ ...prev, linkedin: e.target.value }))}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Footer Navigation */}
          <div className="flex gap-4 pt-8 mt-4">
            {step > 1 && (
              <Button
                variant="ghost"
                onClick={() => setStep(step - 1)}
                className="text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            )}

            <Button
              onClick={() => step < 3 ? setStep(step + 1) : handleSubmit()}
              className="ml-auto bg-primary hover:bg-primary/90 text-lg px-8 h-12 rounded-full shadow-lg shadow-primary/20"
            >
              {step < 3 ? (
                <>Next <ArrowRight className="w-4 h-4 ml-2" /></>
              ) : (
                <>Join Community <Sparkles className="w-4 h-4 ml-2" /></>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
