import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { DNALogo } from './DNALogo';

export function NewsletterSignup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const handleScroll = () => {
      // Trigger when user is near bottom
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;

      const isNearBottom = scrollTop + windowHeight >= docHeight - 100;

      if (isNearBottom && !hasOpened) {
        setIsOpen(true);
        setHasOpened(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasOpened]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email) {
      toast({
        title: "Welcome to the Community!",
        description: "You've successfully subscribed to our newsletter.",
      });
      setName('');
      setEmail('');
      setIsOpen(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-6 left-0 right-0 z-50 flex justify-center px-4 md:px-6 pointer-events-none animate-in slide-in-from-bottom-10 duration-500">
      <div className="w-full max-w-7xl bg-[#5865F2] rounded-[2rem] p-8 md:p-10 shadow-[0_20px_50px_rgba(88,101,242,0.3)] relative pointer-events-auto border border-white/10">
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-6 right-6 p-2 rounded-full bg-black/10 hover:bg-black/20 text-white/80 hover:text-white transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex flex-col md:flex-row items-center justify-between gap-8">

          {/* Left Side: Icon & Text */}
          <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-6 flex-1">
            <div className="flex-shrink-0 pt-1">
              <DNALogo size="lg" className="text-white" variant="light" />
            </div>
            <div className="space-y-3 max-w-2xl">
              <h2 className="text-3xl font-bold text-white tracking-tight leading-none">
                Stay in the Loop
              </h2>
              <p className="text-white/90 text-lg leading-relaxed">
                Get the latest insights on bioinformatics, events, and community news delivered to your inbox.
              </p>
            </div>
          </div>

          {/* Right Side: Form */}
          <form onSubmit={handleSubmit} className="w-full md:w-auto flex flex-col sm:flex-row gap-3">
            <Input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-14 w-full sm:w-64 bg-white text-black text-base border-transparent focus:border-white/50 placeholder:text-gray-500 rounded-xl px-5"
              required
            />
            <Input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-14 w-full sm:w-64 bg-white text-black text-base border-transparent focus:border-white/50 placeholder:text-gray-500 rounded-xl px-5"
              required
            />
            <Button
              type="submit"
              size="lg"
              className="h-14 bg-black hover:bg-black/80 text-white font-bold px-8 text-base rounded-xl transition-all hover:scale-105 whitespace-nowrap shadow-lg"
            >
              Subscribe Now
            </Button>
          </form>

        </div>
      </div>
    </div>
  );
}
