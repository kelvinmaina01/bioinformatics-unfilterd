import { Button } from "@/components/ui/button";
import { Mail, Calendar, Linkedin, Instagram, MessageCircle, Twitter, Gamepad2, Hash, Users, ExternalLink } from "lucide-react";

export function CommunityConnect() {
    const socialLinks = [
        {
            label: "WhatsApp Channel",
            desc: "Stay Updated",
            icon: MessageCircle,
            href: "https://whatsapp.com/channel/0029Vb6eutq7j6g1OqojYB30",
            className: "bg-[#25D366] hover:bg-[#20bd5a] text-white border-transparent shadow-[#25D366]/50"
        },
        {
            label: "WhatsApp Community",
            desc: "Join the Family",
            icon: MessageCircle, // Using MessageCircle for consistency as requested
            href: "https://chat.whatsapp.com/JCFjFwdRUkKD7tFtu1ktzC",
            className: "bg-[#128C7E] hover:bg-[#075e54] text-white border-transparent shadow-[#128C7E]/50"
        },
        {
            label: "Instagram",
            desc: "Visual Stories",
            icon: Instagram,
            href: "#",
            className: "bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] hover:opacity-90 text-white border-transparent shadow-purple-500/50"
        },
        {
            label: "LinkedIn",
            desc: "Professional Network",
            icon: Linkedin,
            href: "#",
            className: "bg-[#0077b5] hover:bg-[#006396] text-white border-transparent shadow-[#0077b5]/50"
        },
        {
            label: "Gmail",
            desc: "Send us an email",
            icon: Mail,
            href: "mailto:bioinformaticsunfiltered@gmail.com",
            className: "bg-[#EA4335] hover:bg-[#d93025] text-white border-transparent shadow-[#EA4335]/50"
        },
    ];

    return (
        <section className="py-20 px-4 bg-background border-t border-border/50 relative overflow-hidden">
            {/* Background decorations */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10 animate-pulse" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl -z-10 animate-pulse delay-1000" />

            <div className="container mx-auto text-center">
                <h2 className="text-4xl font-bold text-foreground mb-4 tracking-tight">
                    Connect with the <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Community</span>
                </h2>
                <p className="text-muted-foreground mb-12 text-lg max-w-2xl mx-auto">
                    Join our vibrant ecosystem across multiple platforms. Whether you want to chat, learn, or collaborate, we're just a click away.
                </p>

                <div className="flex flex-wrap justify-center gap-6">
                    {socialLinks.map((link, index) => (
                        <a
                            key={link.label}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group"
                        >
                            <Button
                                size="lg"
                                className={`
                                    relative overflow-hidden rounded-full px-8 py-2 h-auto min-h-[3.5rem] text-left
                                    transition-all duration-300 transform group-hover:-translate-y-1 group-hover:scale-105 active:scale-95
                                    shadow-lg hover:shadow-2xl flex items-center gap-3
                                    ${link.className}
                                `}
                            >
                                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                <link.icon className="w-6 h-6 relative z-10 flex-shrink-0" />
                                <div className="flex flex-col justify-center relative z-10">
                                    <span className="font-bold text-sm leading-none mb-0.5">{link.label}</span>
                                    <span className="text-[10px] opacity-90 font-medium leading-none">{link.desc}</span>
                                </div>
                            </Button>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
}
