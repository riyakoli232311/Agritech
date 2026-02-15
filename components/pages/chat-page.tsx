"use client"

import { useState, useRef, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { LanguageSelector } from "@/components/language-selector"
import { farmerProfile, schemes, suggestedPrompts } from "@/data/mock-data"
import { Send, Mic, MicOff, Sparkles, User, Bot, Volume2 } from "lucide-react"
import { cn } from "@/lib/utils"
import Groq from "groq-sdk"

interface ChatPageProps {
  onNavigate: (page: string) => void
}

type Message = {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: string
}

export function ChatPage({ onNavigate: _onNavigate }: ChatPageProps) {
  const [selectedLanguage, setSelectedLanguage] = useState("en")
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Namaste! I am your KisanMitra AI assistant. I can help you discover government schemes, check your eligibility, and guide you through the application process. How can I help you today?",
      timestamp: new Date().toISOString(),
    }
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const recognitionRef = useRef<any>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, isTyping])

  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition()
        recognitionRef.current.continuous = false
        recognitionRef.current.interimResults = false
        
        // Map language codes to speech recognition codes
        const langMap: Record<string, string> = {
          'en': 'en-IN',
          'hi': 'hi-IN',
          'mr': 'mr-IN',
          'ta': 'ta-IN',
          'te': 'te-IN',
          'kn': 'kn-IN',
          'ml': 'ml-IN',
          'gu': 'gu-IN',
          'pa': 'pa-IN',
          'bn': 'bn-IN'
        }
        recognitionRef.current.lang = langMap[selectedLanguage] || 'hi-IN'
        
        recognitionRef.current.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript
          setInput(transcript)
          setIsListening(false)
        }

        recognitionRef.current.onerror = (event: any) => {
          console.error('Speech recognition error:', event.error)
          setIsListening(false)
        }

        recognitionRef.current.onend = () => {
          setIsListening(false)
        }
      }
    }
  }, [selectedLanguage])

  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert('Voice input is not supported in your browser. Please use Chrome or Edge.')
      return
    }

    if (isListening) {
      recognitionRef.current.stop()
      setIsListening(false)
    } else {
      recognitionRef.current.start()
      setIsListening(true)
    }
  }

  const speakResponse = (text: string) => {
    if ('speechSynthesis' in window) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel()
      
      const utterance = new SpeechSynthesisUtterance(text)
      
      // Map language codes to speech synthesis codes
      const langMap: Record<string, string> = {
        'en': 'en-IN',
        'hi': 'hi-IN',
        'mr': 'mr-IN',
        'ta': 'ta-IN',
        'te': 'te-IN',
        'kn': 'kn-IN',
        'ml': 'ml-IN',
        'gu': 'gu-IN',
        'pa': 'pa-IN',
        'bn': 'bn-IN'
      }
      utterance.lang = langMap[selectedLanguage] || 'hi-IN'
      utterance.rate = 0.9 // Slightly slower for clarity
      utterance.pitch = 1
      
      utterance.onstart = () => setIsSpeaking(true)
      utterance.onend = () => setIsSpeaking(false)
      utterance.onerror = () => setIsSpeaking(false)
      
      window.speechSynthesis.speak(utterance)
    }
  }

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      setIsSpeaking(false)
    }
  }

  const sendMessage = async (text: string) => {
    if (!text.trim()) return

    const userMsg: Message = {
      id: `msg-${Date.now()}`,
      role: "user",
      content: text,
      timestamp: new Date().toISOString(),
    }
    setMessages((prev) => [...prev, userMsg])
    setInput("")
    setIsTyping(true)

    try {
      // Initialize Groq client
      const groq = new Groq({
        apiKey: process.env.NEXT_PUBLIC_GROQ_API_KEY,
        dangerouslyAllowBrowser: true
      })

      // Create system prompt with farmer context
      const languageInstructions: Record<string, string> = {
        'en': 'Respond in English',
        'hi': 'Respond in Hindi (हिन्दी)',
        'mr': 'Respond in Marathi (मराठी)',
        'ta': 'Respond in Tamil (தமிழ்)',
        'te': 'Respond in Telugu (తెలుగు)',
        'kn': 'Respond in Kannada (ಕನ್ನಡ)',
        'ml': 'Respond in Malayalam (മലയാളം)',
        'gu': 'Respond in Gujarati (ગુજરાતી)',
        'pa': 'Respond in Punjabi (ਪੰਜਾਬੀ)',
        'bn': 'Respond in Bengali (বাংলা)',
        'or': 'Respond in Odia (ଓଡ଼ିଆ)',
        'as': 'Respond in Assamese (অসমীয়া)',
        'ur': 'Respond in Urdu (اردو)',
        'sd': 'Respond in Sindhi',
        'ks': 'Respond in Kashmiri',
        'ne': 'Respond in Nepali (नेपाली)'
      }
      
      const systemPrompt = `You are KisanMitra AI assistant helping Indian farmers discover and apply for government schemes.

LANGUAGE INSTRUCTION: ${languageInstructions[selectedLanguage] || 'Respond in Hindi-English mix (Hinglish)'}. Use simple language that farmers can easily understand.

FARMER PROFILE:
- Name: ${farmerProfile.name}
- Location: ${farmerProfile.village}, ${farmerProfile.district}, ${farmerProfile.state}
- Land: ${farmerProfile.landSize} ${farmerProfile.landUnit} (${farmerProfile.landOwnership})
- Crops: ${farmerProfile.cropTypes.join(", ")}
- Income: Rs. ${farmerProfile.annualIncome}/year
- Category: ${farmerProfile.farmerCategory}
- Family Size: ${farmerProfile.familySize}

AVAILABLE SCHEMES:
${schemes.map(s => `- ${s.name}: ${s.description} (Benefit: ${s.benefitAmount})`).join('\n')}

Keep responses concise (under 200 words) and actionable. Use bullet points for lists when appropriate.`

      // Call Groq API
      const completion = await groq.chat.completions.create({
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: text }
        ],
        model: "llama-3.3-70b-versatile",
        temperature: 0.7,
        max_tokens: 500,
      })

      const aiResponse = completion.choices[0]?.message?.content || "Sorry, I couldn't process that. Please try again."

      const aiMsg: Message = {
        id: `msg-${Date.now()}-ai`,
        role: "assistant",
        content: aiResponse,
        timestamp: new Date().toISOString(),
      }
      setMessages((prev) => [...prev, aiMsg])
      
      // Auto-speak the response
      speakResponse(aiResponse)
      
    } catch (error) {
      console.error("Groq API error:", error)
      const errorMsg: Message = {
        id: `msg-${Date.now()}-error`,
        role: "assistant",
        content: "Sorry, I'm having trouble connecting. Please check your internet connection and try again.",
        timestamp: new Date().toISOString(),
      }
      setMessages((prev) => [...prev, errorMsg])
    } finally {
      setIsTyping(false)
    }
  }

  return (
    <div className="flex h-[calc(100svh-3.5rem)] flex-col">
      {/* Chat Header */}
      <div className="flex items-center justify-between border-b border-border bg-card px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10">
            <Sparkles className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-card-foreground">
              KisanMitra AI Assistant
            </h3>
            <p className="text-xs text-muted-foreground">
              {isListening ? "🎤 Listening..." : "Ask me anything about government schemes"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <LanguageSelector 
            value={selectedLanguage}
            onValueChange={setSelectedLanguage}
          />
          {isSpeaking && (
            <Button 
              variant="outline" 
              size="sm" 
              className="gap-1.5 text-red-600"
              onClick={stopSpeaking}
            >
              <Volume2 className="h-3.5 w-3.5 animate-pulse" />
              <span className="hidden sm:inline">Stop</span>
            </Button>
          )}
        </div>
      </div>

      {/* Messages Area */}
      <ScrollArea className="flex-1 p-4" ref={scrollRef}>
        <div className="mx-auto flex max-w-3xl flex-col gap-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={cn(
                "flex items-start gap-3",
                msg.role === "user" && "flex-row-reverse"
              )}
            >
              <div
                className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg",
                  msg.role === "assistant"
                    ? "bg-primary/10"
                    : "bg-muted"
                )}
              >
                {msg.role === "assistant" ? (
                  <Bot className="h-4 w-4 text-primary" />
                ) : (
                  <User className="h-4 w-4 text-muted-foreground" />
                )}
              </div>
              <div
                className={cn(
                  "max-w-[80%] rounded-2xl px-4 py-3",
                  msg.role === "assistant"
                    ? "rounded-tl-md bg-card border border-border text-card-foreground"
                    : "rounded-tr-md bg-primary text-primary-foreground"
                )}
              >
                <div className="whitespace-pre-wrap text-sm leading-relaxed">
                  {msg.content}
                </div>
                {msg.role === "assistant" && (
                  <button
                    onClick={() => speakResponse(msg.content)}
                    className="mt-2 flex items-center gap-1 text-xs text-muted-foreground hover:text-primary"
                    title="Read aloud"
                  >
                    <Volume2 className="h-3 w-3" />
                    Listen
                  </button>
                )}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                <Bot className="h-4 w-4 text-primary" />
              </div>
              <div className="rounded-2xl rounded-tl-md border border-border bg-card px-4 py-3">
                <div className="flex gap-1">
                  <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/40 [animation-delay:0ms]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/40 [animation-delay:150ms]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/40 [animation-delay:300ms]" />
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Suggested Prompts */}
      {messages.length <= 1 && (
        <div className="border-t border-border bg-card/50 px-4 py-3">
          <p className="mb-2 text-xs font-medium text-muted-foreground">
            Suggested questions (or click mic to speak)
          </p>
          <div className="flex flex-wrap gap-2">
            {suggestedPrompts.map((prompt) => (
              <button
                key={prompt}
                className="rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-card-foreground transition-colors hover:bg-muted"
                onClick={() => sendMessage(prompt)}
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="border-t border-border bg-card p-4">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            sendMessage(input)
          }}
          className="mx-auto flex max-w-3xl items-center gap-2"
        >
          <Button
            type="button"
            variant={isListening ? "default" : "ghost"}
            size="icon"
            className={cn(
              "shrink-0",
              isListening && "animate-pulse bg-red-500 hover:bg-red-600"
            )}
            onClick={toggleListening}
          >
            {isListening ? (
              <MicOff className="h-4 w-4" />
            ) : (
              <Mic className="h-4 w-4" />
            )}
            <span className="sr-only">Voice input</span>
          </Button>
          <Input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={isListening ? "Listening..." : "Type or speak your question..."}
            className="flex-1"
            disabled={isTyping || isListening}
          />
          <Button
            type="submit"
            size="icon"
            disabled={!input.trim() || isTyping}
          >
            <Send className="h-4 w-4" />
            <span className="sr-only">Send message</span>
          </Button>
        </form>
      </div>
    </div>
  )
}