import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface JoinModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function JoinModal({ open, onOpenChange }: JoinModalProps) {
  const { loginWithGoogle, loginWithEmail, registerWithEmail } = useAuth();
  const { toast } = useToast();
  // State: 'login' | 'register'
  const [view, setView] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState(''); // Only for register
  const [loading, setLoading] = useState(false);

  // Clear form when switching views
  const switchView = (v: 'login' | 'register') => {
    setView(v);
    setEmail('');
    setPassword('');
    setName('');
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      toast({ title: 'Welcome!', description: 'Successfully logged in with Google.' });
      onOpenChange(false);
    } catch (error: any) {
      toast({ title: 'Login Failed', description: error.message, variant: 'destructive' });
    }
  };



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (view === 'login') {
        await loginWithEmail(email, password);
        toast({ title: 'Welcome back!', description: 'Successfully logged in.' });
      } else {
        if (!name) throw new Error("Name is required");
        await registerWithEmail(email, password, name);
        toast({ title: 'Welcome!', description: 'Account created successfully.' });
      }
      onOpenChange(false);
      setEmail(''); setPassword(''); setName('');
    } catch (error: any) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0 border-0 bg-transparent shadow-none max-w-4xl w-[95vw] overflow-hidden">
        <div className="flex flex-col md:flex-row min-h-[550px] bg-card/40 backdrop-blur-2xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl">

          {/* Left Column: Greeting/Switch (Interactive Side) */}
          <div className={cn(
            "w-full md:w-[40%] p-8 md:p-12 flex flex-col items-center justify-center text-center transition-all duration-500 relative overflow-hidden",
            "bg-gradient-to-br from-primary via-primary/80 to-accent"
          )}>
            {/* Animated Background blobs */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-accent/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

            <div className="relative z-10 space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                {view === 'login' ? 'Join the Hub!' : 'Welcome Back!'}
              </h2>
              <p className="text-white/80 text-sm md:text-base leading-relaxed">
                {view === 'login'
                  ? "Don't have an account? Start your journey with Africa's largest bioinformatics network today!"
                  : "To keep connected with us please login with your personal info."}
              </p>
              <Button
                variant="outline"
                onClick={() => switchView(view === 'login' ? 'register' : 'login')}
                className="rounded-full px-10 border-white text-white hover:bg-white hover:text-primary transition-all font-bold uppercase tracking-wider h-12"
              >
                {view === 'login' ? 'Sign Up' : 'Sign In'}
              </Button>
            </div>
          </div>

          {/* Right Column: Active Form */}
          <div className="w-full md:w-[60%] p-8 md:p-12 flex flex-col justify-center bg-background/20 backdrop-blur-md">
            <div className="max-w-sm mx-auto w-full space-y-8">
              <div className="text-center space-y-2">
                <h1 className="text-3xl font-bold tracking-tight text-foreground">
                  {view === 'login' ? 'Sign In' : 'Create Account'}
                </h1>

                {/* Social Buttons Area */}
                <div className="pt-4 pb-2">
                  <div className="flex justify-center flex-col items-center gap-4">
                    <Button
                      variant="outline"
                      onClick={handleGoogleLogin}
                      className="w-full h-12 rounded-xl bg-white/5 border-white/10 hover:bg-white/10 hover:text-white transition-all gap-3"
                    >
                      <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                      </svg>
                      Continue with Google
                    </Button>
                    <div className="flex items-center gap-2 w-full">
                      <div className="flex-1 h-[1px] bg-white/5" />
                      <span className="text-[10px] text-muted-foreground uppercase tracking-widest">or use email</span>
                      <div className="flex-1 h-[1px] bg-white/5" />
                    </div>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {view === 'register' && (
                  <div className="space-y-1">
                    <Input
                      placeholder="Name"
                      className="bg-muted/50 border-white/5 h-12 rounded-xl focus:bg-muted transition-all"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                )}
                <div className="space-y-1">
                  <Input
                    placeholder="Email"
                    type="email"
                    className="bg-muted/50 border-white/5 h-12 rounded-xl focus:bg-muted transition-all"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-1 relative">
                  <Input
                    placeholder="Password"
                    type="password"
                    className="bg-muted/50 border-white/5 h-12 rounded-xl focus:bg-muted transition-all"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                  />
                  {view === 'login' && (
                    <div className="pt-2 text-right">
                      <a href="#" className="text-xs text-muted-foreground hover:text-primary transition-colors">Forgot your password?</a>
                    </div>
                  )}
                </div>
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-12 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold shadow-lg shadow-primary/20 mt-4 h-12"
                >
                  {loading ? 'Processing...' : (view === 'login' ? 'SIGN IN' : 'SIGN UP')}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
