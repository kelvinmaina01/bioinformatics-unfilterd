import { useState, useRef, useEffect } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Card } from './ui/card'
import { ScrollArea } from './ui/scroll-area'
import { Badge } from './ui/badge'
import { useToast } from '@/hooks/use-toast'
import { 
  MessageSquare, 
  Send, 
  Bot, 
  Brain, 
  X, 
  Loader2,
  Calendar,
  Users,
  Database,
  FileText,
  Link,
  ExternalLink
} from 'lucide-react'
import { supabase } from '@/lib/supabase'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

interface Event {
  id: string
  title: string
  date: string
  time: string
  location: string
  status: 'upcoming' | 'past'
  description: string
}

interface User {
  id: string
  name: string
  email: string
  role: string
  region: string
}

interface Project {
  id: string
  title: string
  field: string
  progress: number
  status: string
}

export function KelvinAIAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hello! I\'m Kelvin, your AI assistant for Bioinformatics Unfiltered. I can help you with events, community members, projects, and answer questions about our platform. How can I assist you today?',
      timestamp: new Date()
    }
  ])
  const [input, setInput] = useState('')
  const [isExpanded, setIsExpanded] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [events, setEvents] = useState<Event[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [projects, setProjects] = useState<Project[]>([])
  const scrollRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()

  useEffect(() => {
    if (isExpanded) {
      fetchData()
    }
  }, [isExpanded])

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const fetchData = async () => {
    try {
      // Fetch events
      const { data: eventsData } = await supabase
        .from('events')
        .select('*')
        .order('date', { ascending: false })

      // Fetch users
      const { data: usersData } = await supabase
        .from('users')
        .select('*')
        .order('joined_at', { ascending: false })
        .limit(20)

      // Fetch projects
      const { data: projectsData } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false })

      setEvents(eventsData || [])
      setUsers(usersData || [])
      setProjects(projectsData || [])
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  const callGeminiAPI = async (userMessage: string): Promise<string> => {
    // Get context from our database
    const upcomingEvents = events.filter(e => e.status === 'upcoming')
    const pastEvents = events.filter(e => e.status === 'past')
    const totalMembers = users.length
    const activeProjects = projects.filter(p => p.status === 'active').length

    // Create context for Gemini
    const context = `
      You are Kelvin, the AI assistant for Bioinformatics Unfiltered community platform.
      
      Current Platform Status:
      - Total Community Members: ${totalMembers}
      - Upcoming Events: ${upcomingEvents.length}
      - Past Events: ${pastEvents.length}
      - Active Research Projects: ${activeProjects}
      
      Upcoming Events:
      ${upcomingEvents.map(e => `- ${e.title} on ${new Date(e.date).toLocaleDateString()} at ${e.time} (${e.location})`).join('\n')}
      
      Recent Community Members (first 5):
      ${users.slice(0, 5).map(u => `- ${u.name} (${u.region}) - ${u.role}`).join('\n')}
      
      Active Projects:
      ${projects.filter(p => p.status === 'active').map(p => `- ${p.title} (${p.field}) - ${p.progress}% complete`).join('\n')}
      
      Platform Features:
      1. Community Directory - Connect with researchers and students
      2. Events Calendar - Hackathons, workshops, webinars
      3. Research Projects - Collaborative bioinformatics projects
      4. Blog/Publications - Share insights and research
      5. Resource Library - Tools, datasets, tutorials
      
      User Question: "${userMessage}"
      
      Guidelines for response:
      - Be helpful, friendly, and professional
      - Focus only on Bioinformatics Unfiltered platform
      - Provide accurate information from the context above
      - If asking about events, mention specific upcoming events
      - If asking about registration, mention users can register through the platform
      - If asking about community, mention we have members from various Kenyan universities
      - Keep responses concise but informative
      - Use emojis sparingly to make it friendly
      - Always end with an offer to help with something else
    `

    try {
      // Using Gemini API
      const GEMINI_API_KEY = 'AIzaSyAcKgraGGjPdlLlyJ5tiU8CjvdIbS7NFzI'
      const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`

      const response = await fetch(GEMINI_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: context
            }]
          }]
        })
      })

      if (!response.ok) {
        throw new Error(`Gemini API error: ${response.status}`)
      }

      const data = await response.json()
      
      if (data.candidates && data.candidates[0] && data.candidates[0].content) {
        return data.candidates[0].content.parts[0].text
      } else {
        return "I apologize, but I couldn't generate a response at the moment. Please try again or ask a different question about Bioinformatics Unfiltered."
      }
    } catch (error) {
      console.error('Gemini API error:', error)
      // Fallback response if Gemini fails
      return getFallbackResponse(userMessage, upcomingEvents, totalMembers, activeProjects)
    }
  }

  const getFallbackResponse = (userMessage: string, upcomingEvents: Event[], totalMembers: number, activeProjects: number): string => {
    const lowerMessage = userMessage.toLowerCase()
    
    if (lowerMessage.includes('event') || lowerMessage.includes('hackathon') || lowerMessage.includes('workshop')) {
      if (upcomingEvents.length > 0) {
        const eventList = upcomingEvents.slice(0, 3).map(e => 
          `• ${e.title} - ${new Date(e.date).toLocaleDateString()} at ${e.time}`
        ).join('\n')
        
        return `We have ${upcomingEvents.length} upcoming events! Here are the next few:\n\n${eventList}\n\nYou can register for any event through our platform. Would you like details about a specific event?`
      } else {
        return 'We currently don\'t have upcoming events scheduled. Check back soon for new events!'
      }
    }
    
    if (lowerMessage.includes('member') || lowerMessage.includes('community') || lowerMessage.includes('user')) {
      return `Our community has ${totalMembers} members from various Kenyan universities including JKUAT, University of Nairobi, Kenyatta University, and more. You can connect with them through our community directory.`
    }
    
    if (lowerMessage.includes('project') || lowerMessage.includes('research')) {
      return `We have ${activeProjects} active research projects in areas like genomics, drug discovery, and bioinformatics tools. You can join ongoing projects or start your own through our platform.`
    }
    
    if (lowerMessage.includes('register') || lowerMessage.includes('sign up') || lowerMessage.includes('join')) {
      return 'You can register for Bioinformatics Unfiltered by:\n1. Visiting our website\n2. Clicking "Join Community"\n3. Creating an account with your email\n4. Completing your profile\n\nOnce registered, you can access all community features!'
    }
    
    if (lowerMessage.includes('bioinformatics') || lowerMessage.includes('what is')) {
      return 'Bioinformatics Unfiltered is Kenya\'s premier hub connecting biomedical talent, fostering research, and driving healthcare innovation. We prepare the next generation of scientists and developers for TechBio through community events, research projects, and educational resources.'
    }
    
    return 'I can help you with:\n• Upcoming events and registration\n• Community members and connections\n• Research projects and collaborations\n• Platform features and usage\n• Bioinformatics resources\n\nWhat would you like to know about?'
  }

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage = input.trim()
    setInput('')

    // Add user message
    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: userMessage,
      timestamp: new Date()
    }
    setMessages(prev => [...prev, userMsg])

    // Show loading
    setIsLoading(true)

    try {
      // Get response from Gemini
      const response = await callGeminiAPI(userMessage)

      // Add assistant response
      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, assistantMsg])
    } catch (error) {
      console.error('Error getting response:', error)
      
      // Add error message
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'I apologize, but I\'m having trouble responding right now. Please try again in a moment or ask about our events, community, or projects.',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMsg])
      
      toast({
        title: 'Connection Error',
        description: 'Unable to connect to AI service',
        variant: 'destructive'
      })
    } finally {
      setIsLoading(false)
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  const suggestedQuestions = [
    'What events are coming up?',
    'How many members are in the community?',
    'Tell me about active research projects',
    'How do I register for an event?',
    'What is Bioinformatics Unfiltered?'
  ]

  if (!isExpanded) {
    return (
      <Button
        onClick={() => setIsExpanded(true)}
        className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg shadow-blue-500/30"
      >
        <Brain className="w-6 h-6" />
      </Button>
    )
  }

  return (
    <Card className="fixed bottom-6 right-6 z-50 w-80 sm:w-96 bg-card border-border shadow-2xl rounded-xl overflow-hidden animate-fade-in-up">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="font-bold text-white">Kelvin AI Assistant</div>
            <div className="text-xs text-white/80">Bioinformatics Unfiltered</div>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(false)}
          className="h-8 w-8 p-0 text-white hover:bg-white/20"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>

      {/* Messages */}
      <ScrollArea className="h-80 p-4" ref={scrollRef}>
        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  msg.role === 'user'
                    ? 'bg-blue-100 text-blue-600'
                    : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                }`}
              >
                {msg.role === 'user' ? '👤' : <Brain className="w-4 h-4" />}
              </div>
              <div className={`max-w-[70%] ${msg.role === 'user' ? 'text-right' : ''}`}>
                <div
                  className={`rounded-2xl px-4 py-2 ${
                    msg.role === 'user'
                      ? 'bg-blue-100 text-gray-900'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <div className="whitespace-pre-wrap text-sm">{msg.content}</div>
                </div>
                <div className={`text-xs text-gray-500 mt-1 ${msg.role === 'user' ? 'text-right' : ''}`}>
                  {formatTime(msg.timestamp)}
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                <Brain className="w-4 h-4 text-white" />
              </div>
              <div className="bg-gray-100 rounded-2xl px-4 py-2">
                <div className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span className="text-sm">Thinking...</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Suggested Questions */}
      <div className="px-4 pb-3">
        <div className="flex flex-wrap gap-2">
          {suggestedQuestions.map((question, index) => (
            <Button
              key={index}
              size="sm"
              variant="outline"
              className="text-xs h-7"
              onClick={() => {
                setInput(question)
                setTimeout(() => {
                  const sendBtn = document.querySelector('button[type="submit"]') as HTMLButtonElement
                  if (sendBtn) sendBtn.click()
                }, 100)
              }}
            >
              {question}
            </Button>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="p-4 border-t border-border">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleSend()
          }}
          className="flex gap-2"
        >
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about events, community, projects..."
            className="flex-1 bg-background border-border"
            disabled={isLoading}
          />
          <Button
            type="submit"
            size="icon"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            disabled={isLoading || !input.trim()}
          >
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </div>
    </Card>
  )
}