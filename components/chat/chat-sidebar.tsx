"use client"

import { Plus, Heart, Moon, Brain, Activity } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ChatConversation {
  id: string
  title: string
  icon: React.ElementType
  lastMessage: string
  isActive?: boolean
}

const conversations: ChatConversation[] = [
  {
    id: "1",
    title: "General Health",
    icon: Activity,
    lastMessage: "How can I improve my energy levels?",
    isActive: true,
  },
  {
    id: "2",
    title: "Heart Health",
    icon: Heart,
    lastMessage: "My heart rate was elevated yesterday...",
  },
  {
    id: "3",
    title: "Sleep Quality",
    icon: Moon,
    lastMessage: "Tips for better sleep hygiene",
  },
  {
    id: "4",
    title: "Mental Wellness",
    icon: Brain,
    lastMessage: "Managing stress at work",
  },
]

interface ChatSidebarProps {
  selectedId: string
  onSelect: (id: string) => void
  onNewChat: () => void
}

export function ChatSidebar({ selectedId, onSelect, onNewChat }: ChatSidebarProps) {
  return (
    <div className="flex h-full flex-col border-r bg-card">
      {/* Header */}
      <div className="flex items-center justify-between border-b p-4">
        <h2 className="font-semibold text-card-foreground">Conversations</h2>
        <Button size="sm" onClick={onNewChat} className="gap-1.5">
          <Plus className="h-4 w-4" />
          New Chat
        </Button>
      </div>

      {/* Conversation List */}
      <div className="flex-1 overflow-y-auto p-2">
        <div className="space-y-1">
          {conversations.map((conv) => (
            <button
              key={conv.id}
              onClick={() => onSelect(conv.id)}
              className={cn(
                "flex w-full items-start gap-3 rounded-lg p-3 text-left transition-colors",
                selectedId === conv.id
                  ? "bg-primary/10 text-primary"
                  : "hover:bg-muted text-card-foreground"
              )}
            >
              <div className={cn(
                "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg",
                selectedId === conv.id ? "bg-primary text-primary-foreground" : "bg-muted"
              )}>
                <conv.icon className="h-4 w-4" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-medium truncate">{conv.title}</p>
                <p className="text-xs text-muted-foreground truncate">
                  {conv.lastMessage}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
