import { useState, useRef, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { ScrollArea } from './ui/scroll-area';
import { MessageSquare, Send, Users } from 'lucide-react';

interface Message {
  id: string;
  author: string;
  avatar: string;
  content: string;
  timestamp: Date;
}

const STORAGE_KEY = 'biounfiltered_chat';

const initialMessages: Message[] = [
  {
    id: '1',
    author: 'Dr. Elena Vasquez',
    avatar: '🧬',
    content: 'Welcome to the community chat! Feel free to introduce yourself.',
    timestamp: new Date(Date.now() - 3600000 * 2),
  },
  {
    id: '2',
    author: 'James Chen',
    avatar: '🔬',
    content: 'Just published our new protein folding results. Check out the Papers section!',
    timestamp: new Date(Date.now() - 3600000),
  },
  {
    id: '3',
    author: 'Amara Okonkwo',
    avatar: '💻',
    content: 'Anyone working on metagenomics pipelines? Looking for collaborators.',
    timestamp: new Date(Date.now() - 1800000),
  },
];

export function CommunityChat() {
  const { user, isAuthenticated } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setMessages(parsed.map((m: Message) => ({ ...m, timestamp: new Date(m.timestamp) })));
      } catch {
        setMessages(initialMessages);
      }
    } else {
      setMessages(initialMessages);
    }
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isExpanded]);

  const handleSend = () => {
    if (!newMessage.trim() || !user) return;
    
    const message: Message = {
      id: crypto.randomUUID(),
      author: user.name,
      avatar: user.avatar,
      content: newMessage.trim(),
      timestamp: new Date(),
    };
    
    const updatedMessages = [...messages, message];
    setMessages(updatedMessages);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedMessages));
    setNewMessage('');
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (!isExpanded) {
    return (
      <Button
        onClick={() => setIsExpanded(true)}
        className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20"
      >
        <MessageSquare className="w-6 h-6" />
      </Button>
    );
  }

  return (
    <Card className="fixed bottom-6 right-6 z-50 w-80 sm:w-96 bg-card border-border shadow-2xl rounded-xl overflow-hidden animate-fade-in-up">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/20 to-accent/20 p-3 flex items-center justify-between border-b border-border">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-primary" />
          <span className="font-medium text-foreground">Community Chat</span>
          <span className="text-xs text-muted-foreground">({messages.length})</span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(false)}
          className="h-8 w-8 p-0"
        >
          ✕
        </Button>
      </div>

      {/* Messages */}
      <ScrollArea className="h-72 p-3" ref={scrollRef}>
        <div className="space-y-3">
          {messages.map((msg) => (
            <div key={msg.id} className="flex gap-2">
              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-sm flex-shrink-0">
                {msg.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2">
                  <span className="text-sm font-medium text-foreground truncate">{msg.author}</span>
                  <span className="text-xs text-muted-foreground">{formatTime(msg.timestamp)}</span>
                </div>
                <p className="text-sm text-muted-foreground break-words">{msg.content}</p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="p-3 border-t border-border">
        {isAuthenticated ? (
          <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex gap-2">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 bg-background border-border text-sm"
            />
            <Button type="submit" size="icon" className="bg-primary hover:bg-primary/90" disabled={!newMessage.trim()}>
              <Send className="w-4 h-4" />
            </Button>
          </form>
        ) : (
          <p className="text-sm text-muted-foreground text-center">
            Join the community to chat
          </p>
        )}
      </div>
    </Card>
  );
}
