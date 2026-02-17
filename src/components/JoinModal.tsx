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
      <DialogContent className="p-0 border-0 bg-transparent shadow-none max-w-[400px]">

        {/* Glass Card */}
        <div className="relative overflow-hidden rounded-2xl bg-black/40 backdrop-blur-2xl border border-white/10 shadow-2xl">

          {/* Header / Tabs */}
          <div className="flex items-center justify-between p-2 mx-6 mt-6 bg-white/5 rounded-xl border border-white/5">
            <button
              onClick={() => switchView('login')}
              className={cn(
                "flex-1 py-2 text-sm font-medium rounded-lg transition-all duration-200",
                view === 'login' ? "bg-primary text-primary-foreground shadow-md" : "text-muted-foreground hover:text-white"
              )}
            >
              Log In
            </button>
            <button
              onClick={() => switchView('register')}
              className={cn(
                "flex-1 py-2 text-sm font-medium rounded-lg transition-all duration-200",
                view === 'register' ? "bg-primary text-primary-foreground shadow-md" : "text-muted-foreground hover:text-white"
              )}
            >
              Sign Up
            </button>
          </div>

          <div className="p-8 pt-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                {view === 'login' ? 'Welcome Back!' : 'Join the Hub'}
              </h2>
              <p className="text-sm text-muted-foreground mt-2">
                {view === 'login' ? 'We are really happy to see you again' : 'Start your journey with us today'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name Field (Register Only) */}
              {view === 'register' && (
                <div className="space-y-1">
                  <Input
                    placeholder="Full Name"
                    className="bg-white/5 border-white/10 h-11 text-white placeholder:text-muted-foreground/50 focus:bg-white/10 transition-colors"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
              )}

              <div className="space-y-1">
                <Input
                  placeholder="Email Address"
                  type="email"
                  className="bg-white/5 border-white/10 h-11 text-white placeholder:text-muted-foreground/50 focus:bg-white/10 transition-colors"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-1">
                <Input
                  placeholder="Password"
                  type="password"
                  className="bg-white/5 border-white/10 h-11 text-white placeholder:text-muted-foreground/50 focus:bg-white/10 transition-colors"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                />
                {view === 'login' && <div className="text-right">
                  <a href="#" className="text-xs text-muted-foreground hover:text-primary transition-colors">Forgot Password?</a>
                </div>}
              </div>

              <Button type="submit" disabled={loading} className="w-full h-11 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold shadow-lg shadow-purple-500/20">
                {loading ? 'Processing...' : (view === 'login' ? 'Sign In' : 'Create Account')}
              </Button>
            </form>

            <div className="my-6 flex items-center gap-3">
              <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent to-white/10"></div>
              <span className="text-xs text-muted-foreground uppercase tracking-wider">Or continue with</span>
              <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent to-white/10"></div>
            </div>

            <div className="flex justify-center">
              <Button variant="outline" onClick={handleGoogleLogin} className="bg-white/5 border-white/10 hover:bg-white/10 hover:text-white h-11 w-full max-w-[200px]">
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                Google
              </Button>
            </div>
          </div>
        </div>

      </DialogContent>
    </Dialog>
  );
}
