import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Mail, GraduationCap } from "lucide-react";

export function HonorCircle() {
    return (
        <section className="py-20 px-4 bg-background relative overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2"></div>
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl translate-y-1/3"></div>
            </div>

            <div className="container mx-auto relative z-10">
                <div className="text-center mb-16 animate-fade-in-up">
                    <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                        Join the <span className="text-gradient">Honour Circle</span>
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Become part of a community that values innovation, integrity, and the future of science.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start max-w-6xl mx-auto">

                    {/* Left Column: Get Started Form */}
                    <Card className="bg-card border-border shadow-lg animate-fade-in-up">
                        <CardContent className="p-8">
                            <h3 className="text-2xl font-bold text-foreground mb-6">Get Started</h3>
                            <form className="space-y-4">
                                <div className="space-y-2">
                                    <Input
                                        placeholder="Your Name"
                                        className="bg-background/50 border-border h-12"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Input
                                        type="email"
                                        placeholder="Email Address"
                                        className="bg-background/50 border-border h-12"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Input
                                        placeholder="Your Niche (e.g., AI, Genomics, Blockchain)"
                                        className="bg-background/50 border-border h-12"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Textarea
                                        placeholder="Tell us about your innovation spark..."
                                        className="bg-background/50 border-border min-h-[120px] resize-none"
                                    />
                                </div>
                                <Button className="w-full h-12 text-lg bg-primary hover:bg-primary/90 text-primary-foreground mt-2">
                                    Submit Application
                                </Button>
                            </form>
                        </CardContent>
                    </Card>

                    {/* Right Column: Actions & Resources */}
                    <div className="space-y-6 animate-fade-in-up delay-100">

                        {/* Quick Actions */}
                        <Card className="bg-card border-border shadow-lg overflow-hidden">
                            <CardContent className="p-8">
                                <h3 className="text-2xl font-bold text-foreground mb-6">Quick Actions</h3>
                                <div className="space-y-4">
                                    <Button variant="outline" className="w-full h-12 justify-center gap-2 border-accent/30 hover:bg-accent/10 hover:text-accent hover:border-accent text-foreground transition-all">
                                        <Calendar className="w-5 h-5 text-accent" />
                                        Book an Appointment
                                    </Button>
                                    <Button variant="outline" className="w-full h-12 justify-center gap-2 border-border hover:bg-muted text-foreground transition-all">
                                        <Mail className="w-5 h-5 text-muted-foreground" />
                                        Email Us Directly
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Bridge / Connector Line (Visual) */}
                        <div className="flex justify-center py-2 opacity-30">
                            <div className="w-0.5 h-8 bg-gradient-to-b from-border to-primary"></div>
                        </div>

                        {/* Free Learning Resources */}
                        <Card className="bg-card border-primary/20 shadow-lg relative overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <CardContent className="p-8 relative z-10">
                                <div className="flex items-start justify-between mb-4">
                                    <h3 className="text-2xl font-bold text-foreground">Free Learning Resources</h3>
                                    <div className="p-2 rounded-lg bg-primary/10">
                                        <GraduationCap className="w-6 h-6 text-primary" />
                                    </div>
                                </div>
                                <p className="text-muted-foreground mb-6">
                                    Access our comprehensive academic platform with courses designed to elevate your skills in TechBio and Informatics.
                                </p>
                                <Button variant="ghost" className="p-0 h-auto text-primary hover:text-accent hover:bg-transparent transition-colors group-hover:translate-x-1 duration-300">
                                    Access Courses →
                                </Button>
                            </CardContent>
                        </Card>

                    </div>
                </div>
            </div>
        </section>
    );
}
