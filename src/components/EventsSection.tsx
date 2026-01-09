import { Link } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import { events } from '@/data/events';
import { DNALogo } from './DNALogo';

export function EventsSection() {
    const upcomingEvents = events.filter(e => e.status === 'upcoming');
    const pastEvents = events.filter(e => e.status === 'past');

    return (
        <section id="events" className="py-20 px-4 bg-background">
            <div className="container mx-auto">

                {/* Upcoming Events */}
                <div className="mb-20">
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12">Upcoming events</h2>
                    <div className="grid gap-6">
                        {upcomingEvents.map((event) => (
                            <Card key={event.id} className="bg-card border-border overflow-hidden hover:border-primary/50 transition-all group">
                                <div className="flex flex-col md:flex-row">
                                    {/* Event Thumbnail */}
                                    <div className="md:w-1/3 h-64 md:h-auto bg-gradient-to-br from-primary/10 to-accent/5 flex items-center justify-center p-8 relative">
                                        <div className="absolute inset-0 bg-[url('/placeholder.svg')] opacity-10 bg-center bg-cover mix-blend-overlay"></div>
                                        <DNALogo size="xl" animate className="relative z-10" />
                                    </div>

                                    {/* Event Details */}
                                    <div className="flex-1 p-8 flex flex-col justify-between">
                                        <div>
                                            <div className="flex items-center gap-3 text-sm text-muted-foreground mb-3">
                                                <span className="font-semibold text-primary">{event.date}</span>
                                                <span>•</span>
                                                <Badge variant="secondary" className="bg-secondary/50 text-secondary-foreground hover:bg-secondary/60">
                                                    {event.type}
                                                </Badge>
                                            </div>

                                            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                                                {event.title}
                                            </h3>

                                            <p className="text-muted-foreground mb-6 line-clamp-2">
                                                {event.description}
                                            </p>

                                            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-6">
                                                <span className="flex items-center gap-2">
                                                    <Calendar className="w-4 h-4" />
                                                    {event.time}
                                                </span>
                                                <span className="flex items-center gap-2">
                                                    <MapPin className="w-4 h-4" />
                                                    {event.location}
                                                </span>
                                            </div>
                                        </div>

                                        <div>
                                            <Button asChild variant="link" className="p-0 h-auto text-primary hover:text-accent group-hover:translate-x-2 transition-all">
                                                <Link to={`/events/${event.id}`} className="flex items-center gap-2 font-semibold">
                                                    View details <ArrowRight className="w-4 h-4" />
                                                </Link>
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Past Events */}
                {pastEvents.length > 0 && (
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12">Past events</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {pastEvents.map((event) => (
                                <div key={event.id} className="flex flex-col items-center text-center group cursor-default">
                                    {/* Circular Icon */}
                                    <div className="w-48 h-48 rounded-full bg-card border border-border group-hover:border-primary/50 transition-colors flex items-center justify-center mb-6 relative overflow-hidden shadow-lg">
                                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                        <DNALogo size="lg" className="text-muted-foreground group-hover:text-primary transition-colors" />
                                    </div>

                                    <div className="space-y-2 px-2">
                                        <p className="text-sm text-muted-foreground">{event.date}</p>
                                        <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors">
                                            {event.title}
                                        </h3>
                                        <p className="text-xs text-primary/80 uppercase tracking-wide">{event.type}</p>
                                        <p className="text-xs text-muted-foreground underline decoration-dotted decoration-muted-foreground/30 underline-offset-4">
                                            {event.location}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

            </div>
        </section>
    );
}
