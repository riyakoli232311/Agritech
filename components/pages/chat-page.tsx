"use client"

import { useState, useRef, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { LanguageSelector } from "@/components/language-selector"
import { chatMessages, suggestedPrompts } from "@/data/mock-data"
import { Send, Mic, Sparkles, User, Bot } from "lucide-react"
import { cn } from "@/lib/utils"

interface ChatPageProps {
  onNavigate: (page: string) => void
}

type Message = {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: string
}

const mockResponses: Record<string, string> = {
  "what schemes am i eligible for?":
    "Based on your profile analysis, you are eligible for 5 government schemes:\n\n1. **PM-KISAN Samman Nidhi** (98% match) - Rs. 6,000/year direct income support\n2. **Pradhan Mantri Fasal Bima Yojana** (92% match) - Crop insurance up to Rs. 2,00,000\n3. **Soil Health Card Scheme** (95% match) - Free soil testing and recommendations\n4. **PMKSY Irrigation Subsidy** (88% match) - Up to 55% subsidy on micro-irrigation\n5. **Kisan Credit Card** (85% match) - Credit up to Rs. 3,00,000\n\nWould you like me to explain any specific scheme in detail?",
  "how to apply for pm-kisan?":
    "Here are the steps to apply for PM-KISAN Samman Nidhi:\n\n**Step 1:** Go to the Scheme Recommendations page and click 'Apply Now' on PM-KISAN\n\n**Step 2:** Upload required documents:\n- Aadhaar Card (already verified)\n- Land Records (already verified)\n- Bank Passbook (pending verification)\n\n**Step 3:** Submit the application for district-level review\n\n**Step 4:** Once approved, Rs. 2,000 will be credited to your bank account every 4 months\n\nYour Aadhaar and Land Records are already verified. You just need to update your Bank Passbook and you can apply immediately!",
  default:
    "Thank you for your question. Based on your farmer profile in Indore, Madhya Pradesh, I can help you with scheme eligibility, application guidance, document requirements, and more. Could you please be more specific about what you would like to know? You can ask about specific schemes, eligibility criteria, or application processes.",
}

export function ChatPage({ onNavigate: _onNavigate }: ChatPageProps) {
  const [messages, setMessages] = useState<Message[]>(
    chatMessages as Message[]
  )
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, isTyping])

  const sendMessage = (text: string) => {
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

    setTimeout(() => {
      const lower = text.toLowerCase()
      const responseText =
        mockResponses[lower] || mockResponses["default"]

      const aiMsg: Message = {
        id: `msg-${Date.now()}-ai`,
        role: "assistant",
        content: responseText,
        timestamp: new Date().toISOString(),
      }
      setMessages((prev) => [...prev, aiMsg])
      setIsTyping(false)
    }, 1500)
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
              Ask me anything about government schemes
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <LanguageSelector />
          <Button variant="outline" size="sm" className="gap-1.5">
            <Mic className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Voice</span>
          </Button>
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
                  {msg.content.split(/(\*\*[^*]+\*\*)/).map((part, i) => {
                    if (part.startsWith("**") && part.endsWith("**")) {
                      return (
                        <strong key={i}>{part.slice(2, -2)}</strong>
                      )
                    }
                    return part
                  })}
                </div>
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
            Suggested questions
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
            variant="ghost"
            size="icon"
            className="shrink-0"
          >
            <Mic className="h-4 w-4" />
            <span className="sr-only">Voice input</span>
          </Button>
          <Input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your question..."
            className="flex-1"
            disabled={isTyping}
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
