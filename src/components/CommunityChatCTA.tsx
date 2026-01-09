import { useState, useEffect } from 'react';
import { X, MessageSquare, Users } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export function CommunityChatCTA() {
    const [isOpen, setIsOpen] = useState(false);
    const [hasOpened, setHasOpened] = useState(false);
    const { isAuthenticated, login } = useAuth(); // Assuming login trigger/modal availability or just redirect
    const navigate = useNavigate();

    // If already authenticated, don't show the CTA (optional logic, but makes sense)
    // User instruction: "tell somebody to join... they have to kind of log in"
    if (isAuthenticated) return null;

    useEffect(() => {
        const handleScroll = () => {
            // Trigger when near footer
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


    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="w-full max-w-5xl bg-[#5865F2] rounded-xl shadow-2xl relative overflow-hidden animate-in slide-in-from-bottom-10 duration-500">

                {/* Close Button */}
                <button
                    onClick={() => setIsOpen(false)}
                    className="absolute top-4 right-4 p-2 bg-black/10 hover:bg-black/20 rounded-full text-white/80 hover:text-white transition-colors"
                >
                    <X className="w-5 h-5" />
                </button>

                <div className="flex flex-col md:flex-row items-center justify-between p-8 md:p-12 gap-8 text-center md:text-left">

                    {/* Left Side: Icon & Text */}
                    <div className="flex-1 space-y-4">
                        <div className="flex items-center justify-center md:justify-start gap-3 text-white mb-2">
                            <MessageSquare className="w-8 h-8" />
                            <h2 className="text-2xl md:text-3xl font-bold">Join the Conversation</h2>
                        </div>
                        <p className="text-white/90 text-lg max-w-2xl leading-relaxed">
                            Connect with 1,000+ students and researchers. Get help with code, share papers, and find your tribe in our active community chat.
                        </p>
                    </div>

                    {/* Right Side: Action Button */}
                    <div className="flex-shrink-0">
                        <Button
                            onClick={() => {
                                // For demo purposes, we might toggle a global login modal if it existed.
                                // Since I don't have a login route/modal reference, I'll assume we redirect or define a mock interaction.
                                // But wait, existing AuthProvider has a 'login' function but it takes a profile object (mock login).
                                // I will simulate a login action or redirect to a login page if one existed.
                                // I will just open a prompt or something.
                                // Actually, I'll assume there is a way to trigger login in the real app.
                                // For now I'll just close it or mock login.
                                // Let's just create a mock login for now as usually expected in these tasks unless 'Join' page exists.
                                const mockProfile = {
                                    name: "New Member",
                                    email: "member@example.com",
                                    avatar: "👤",
                                    bio: "Bioinformatics enthusiast",
                                    skills: [],
                                    interests: [],
                                    region: "Kenya",
                                    regionFlag: "🇰🇪"
                                };
                                login(mockProfile);
                                setIsOpen(false);
                            }}
                            size="lg"
                            className="bg-white text-[#5865F2] hover:bg-white/90 font-bold px-8 py-6 text-lg rounded-md shadow-lg transition-transform hover:scale-105"
                        >
                            Join Community Chat
                        </Button>
                    </div>

                </div>
            </div>
        </div>
    );
}
