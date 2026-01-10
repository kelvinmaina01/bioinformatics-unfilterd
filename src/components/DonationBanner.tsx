import { useState } from 'react';
import { Heart, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DonationModal } from './DonationModal';

export function DonationBanner() {
    const [isVisible, setIsVisible] = useState(true);
    const [showModal, setShowModal] = useState(false);

    if (!isVisible) return null;

    return (
        <>
            <div className="relative pt-20 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border-b backdrop-blur-xl">
                <div className="container mx-auto px-4 py-3 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div className="bg-primary/10 p-2 rounded-full hidden sm:block">
                            <Heart className="h-4 w-4 text-primary fill-primary animate-pulse" />
                        </div>
                        <p className="text-sm font-medium">
                            Support our community! Your donations help us organize events and maintain resources.
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <Button
                            size="sm"
                            onClick={() => setShowModal(true)}
                            className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20"
                        >
                            Donate Now
                        </Button>
                        <button
                            onClick={() => setIsVisible(false)}
                            className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                            <X className="h-4 w-4" />
                            <span className="sr-only">Dismiss</span>
                        </button>
                    </div>
                </div>
            </div>

            <DonationModal open={showModal} onOpenChange={setShowModal} />
        </>
    );
}
