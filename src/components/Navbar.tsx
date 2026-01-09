import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { DNALogo } from './DNALogo';
import { Button } from './ui/button';
import { SocialIcons } from './SocialIcons';
import { JoinModal } from './JoinModal';
import { ProfileModal } from './ProfileModal';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/community', label: 'Community' },


  { href: '/#events', label: 'Events' },
  { href: '/blogs', label: 'Blogs' },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [joinOpen, setJoinOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated, user } = useAuth();

  const allLinks = navLinks;

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <DNALogo size="sm" />
              <span className="font-semibold text-foreground hidden sm:block">Bioinformatics Unfiltered</span>
            </Link>

            <div className="hidden lg:flex items-center gap-1">
              {allLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={cn(
                    'px-3 py-2 text-sm font-medium rounded-lg transition-colors',
                    location.pathname === link.href
                      ? 'text-primary bg-primary/10'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="hidden md:flex items-center gap-4">
              <SocialIcons size="sm" />
              {isAuthenticated ? (
                <button
                  onClick={() => setProfileOpen(true)}
                  className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-lg hover:scale-105 transition-transform"
                >
                  {user?.avatar}
                </button>
              ) : (
                <Button onClick={() => setJoinOpen(true)} className="bg-primary hover:bg-primary/90 animate-pulse shadow-[0_0_15px_rgba(37,99,235,0.5)] transition-all hover:animate-none hover:scale-105">
                  Get Started
                </Button>
              )}
            </div>

            <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {isOpen && (
          <div className="lg:hidden border-t border-border bg-background/95 backdrop-blur-lg">
            <div className="container mx-auto px-4 py-4 flex flex-col gap-2">
              {allLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    'px-4 py-3 text-sm font-medium rounded-lg transition-colors',
                    location.pathname === link.href
                      ? 'text-primary bg-primary/10'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-4 border-t border-border mt-2">
                <SocialIcons size="md" className="justify-center mb-4" />
                {isAuthenticated ? (
                  <Button onClick={() => { setProfileOpen(true); setIsOpen(false); }} className="w-full">
                    My Profile
                  </Button>
                ) : (
                  <Button onClick={() => { setJoinOpen(true); setIsOpen(false); }} className="w-full bg-primary hover:bg-primary/90">
                    Get Started
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>

      <JoinModal open={joinOpen} onOpenChange={setJoinOpen} />
      <ProfileModal open={profileOpen} onOpenChange={setProfileOpen} />
    </>
  );
}
