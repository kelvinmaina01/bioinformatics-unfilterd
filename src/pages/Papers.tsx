import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export default function Papers() {
    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <main className="pt-24 pb-20 px-4 container mx-auto">
                <h1 className="text-4xl font-bold mb-4">Research Papers</h1>
                <p className="text-muted-foreground">Coming soon...</p>
            </main>
            <Footer />
        </div>
    );
}
