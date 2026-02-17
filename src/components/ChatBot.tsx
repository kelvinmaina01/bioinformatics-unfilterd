import { useState } from 'react';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageCircle, Send, Maximize2, Minimize2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

export function ChatBot() {
    const [isOpen, setIsOpen] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'bot', text: 'how can i help u' }
    ]);
    const [input, setInput] = useState('');

    const handleSend = () => {
        if (!input.trim()) return;
        const newMessages = [...messages, { role: 'user', text: input }];
        setMessages(newMessages);
        setInput('');

        // Mock response from Kelvin
        setTimeout(() => {
            setMessages(prev => [...prev, {
                role: 'bot',
                text: "I'm Kelvin! I'm here to help you navigate Bioinformatics Unfiltered. Feel free to ask me anything about our community, events, or resources!"
            }]);
        }, 1000);
    };

    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
                <Button
                    variant="default"
                    size="icon"
                    className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-2xl bg-primary hover:bg-primary/90 z-50 transition-all hover:scale-110 border-4 border-background animate-in fade-in slide-in-from-bottom-4 duration-500"
                >
                    <MessageCircle className="h-7 w-7" />
                </Button>
            </SheetTrigger>
            <SheetContent
                side="right"
                className={cn(
                    "p-0 flex flex-col transition-all duration-300 border-l border-border shadow-2xl",
                    isExpanded ? "w-full sm:max-w-2xl" : "w-full sm:max-w-md"
                )}
            >
                {/* Custom Header */}
                <div className="p-4 border-b flex items-center justify-between bg-primary/5">
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <Avatar className="h-12 w-12 border-2 border-primary/20 shadow-sm">
                                <AvatarImage src="/assets/kelvin_bot.png" alt="Kelvin" />
                                <AvatarFallback className="bg-primary text-primary-foreground font-bold">K</AvatarFallback>
                            </Avatar>
                            <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-background animate-pulse" />
                        </div>
                        <div>
                            <h3 className="font-bold text-lg leading-none">Kelvin</h3>
                            <p className="text-xs text-muted-foreground mt-1">AI Community Assistant</p>
                        </div>
                    </div>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="hidden sm:flex text-muted-foreground hover:text-primary transition-colors"
                        title={isExpanded ? "Minimize" : "Expand"}
                    >
                        {isExpanded ? <Minimize2 className="h-5 w-5" /> : <Maximize2 className="h-5 w-5" />}
                    </Button>
                </div>

                {/* Chat History */}
                <ScrollArea className="flex-1 px-4 py-6">
                    <div className="flex flex-col gap-4">
                        {messages.map((msg, idx) => (
                            <div
                                key={idx}
                                className={cn(
                                    "flex flex-col max-w-[85%] animate-in fade-in slide-in-from-bottom-2 duration-300",
                                    msg.role === 'user' ? "ml-auto items-end" : "items-start"
                                )}
                            >
                                <div
                                    className={cn(
                                        "p-3 rounded-2xl text-sm leading-relaxed shadow-sm",
                                        msg.role === 'user'
                                            ? "bg-primary text-primary-foreground rounded-tr-none"
                                            : "bg-muted text-foreground rounded-tl-none border border-border"
                                    )}
                                >
                                    {msg.text}
                                </div>
                                <span className="text-[10px] text-muted-foreground mt-1 px-1">
                                    {msg.role === 'user' ? 'You' : 'Kelvin'}
                                </span>
                            </div>
                        ))}
                    </div>
                </ScrollArea>

                {/* Message Input */}
                <div className="p-4 border-t bg-background/50 backdrop-blur-sm">
                    <form
                        onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                        className="flex gap-2 items-center"
                    >
                        <Input
                            placeholder="Ask me anything..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            className="flex-1 bg-background border-border/50 focus:border-primary transition-all"
                        />
                        <Button
                            type="submit"
                            size="icon"
                            disabled={!input.trim()}
                            className="shrink-0 rounded-full h-10 w-10 shadow-md transition-all active:scale-95"
                        >
                            <Send className="h-4 w-4" />
                        </Button>
                    </form>
                    <p className="text-[10px] text-center text-muted-foreground mt-3 uppercase tracking-widest opacity-50 font-medium">
                        Powered by Bioinformatics Unfiltered AI
                    </p>
                </div>
            </SheetContent>
        </Sheet>
    );
}

export default ChatBot;
