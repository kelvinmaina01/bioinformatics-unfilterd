import { Link } from 'react-router-dom';
import { DNALogo } from './DNALogo';
import { SocialIcons } from './SocialIcons';

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/50">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col items-center md:items-start gap-3">
            <Link to="/" className="flex items-center gap-2">
              <DNALogo size="sm" />
              <span className="font-semibold text-foreground">Bioinformatics Unfiltered</span>
            </Link>
            <p className="text-sm text-muted-foreground text-center md:text-left max-w-xs">
              A Kenyan community for people who actually do bioinformatics.
            </p>
            <SocialIcons size="md" className="mt-2" />
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <Link to="/community" className="text-muted-foreground hover:text-foreground transition-colors">
              Community
            </Link>
            <Link to="/projects" className="text-muted-foreground hover:text-foreground transition-colors">
              Projects
            </Link>
            <Link to="/resources" className="text-muted-foreground hover:text-foreground transition-colors">
              Resources
            </Link>
            <Link to="/events" className="text-muted-foreground hover:text-foreground transition-colors">
              Events
            </Link>
            <Link to="/blogs" className="text-muted-foreground hover:text-foreground transition-colors">
              Blogs
            </Link>
            <Link to="/manifesto" className="text-muted-foreground hover:text-foreground transition-colors">
              Manifesto
            </Link>
          </div>

          <div className="flex flex-col items-center md:items-end gap-3">
            <div className="bg-white p-2 rounded-xl shadow-lg transform hover:scale-110 transition-transform">
              <img
                src="/assets/discord_qr.png"
                alt="Discord QR"
                className="w-16 h-16 rounded-md"
              />
            </div>
            <div className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} Bioinformatics Unfiltered Kenya
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
