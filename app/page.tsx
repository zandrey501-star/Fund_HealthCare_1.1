"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { AppShell } from "@/components/app-shell"
import { AppHeader } from "@/components/app-header"
import { ChatSidebar } from "@/components/chat/chat-sidebar"
import { ChatMessages, type Message } from "@/components/chat/chat-messages"
import { ChatInput } from "@/components/chat/chat-input"
import { RiskAlert } from "@/components/chat/risk-alert"
import { GenerateReportModal } from "@/components/chat/generate-report-modal"

const initialMessages: Message[] = [
  {
    id: "1",
    role: "assistant",
    content: "Hello! I'm your AI Health Assistant. I'm here to help you understand your health better and provide guidance. How can I assist you today?",
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
  },
  {
    id: "2",
    role: "user",
    content: "I've been feeling more tired than usual lately. My fitness tracker shows my sleep has been irregular.",
    timestamp: new Date(Date.now() - 1000 * 60 * 4),
  },
  {
    id: "3",
    role: "assistant",
    content: "I understand you're experiencing fatigue and irregular sleep patterns. This is a common concern and there could be several factors at play.\n\nBased on your connected devices, I can see some patterns:\n\n1. Your average sleep duration has decreased by about 1.5 hours over the past two weeks\n2. Your sleep quality score has dropped from 78 to 62\n3. Your resting heart rate has been slightly elevated\n\nLet me ask you a few questions to better understand your situation:\n- Have you experienced any major stress or life changes recently?\n- Have you changed your evening routine or caffeine intake?\n- Are you experiencing any other symptoms like mood changes or difficulty concentrating?",
    timestamp: new Date(Date.now() - 1000 * 60 * 3),
  },
  {
    id: "4",
    role: "user",
    content: "I have been more stressed at work lately, and I've been drinking more coffee to stay alert during the day.",
    timestamp: new Date(Date.now() - 1000 * 60 * 2),
  },
  {
    id: "5",
    role: "assistant",
    content: "Thank you for sharing that. The combination of increased work stress and higher caffeine intake is very likely contributing to your fatigue and sleep issues. Here's what I recommend:\n\n**Immediate Steps:**\n- Try to limit caffeine intake after 2 PM\n- Consider a brief walk during lunch to help manage stress\n- Aim for a consistent bedtime routine\n\n**Monitoring:**\n- I'll track your sleep patterns over the next week\n- Keep an eye on your stress indicators through your connected devices\n\nWould you like me to generate a detailed sleep improvement plan, or would you prefer to discuss stress management techniques first?",
    timestamp: new Date(Date.now() - 1000 * 60 * 1),
  },
]

export default function ChatPage() {
  const router = useRouter()
  const [selectedChat, setSelectedChat] = useState("1")
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [showRiskAlert, setShowRiskAlert] = useState(true)
  const [showReportModal, setShowReportModal] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSendMessage = (content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content,
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, newMessage])
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "I'm processing your health query. Based on the information you've shared and your connected health data, I'm analyzing patterns to provide you with personalized insights. Is there anything specific you'd like me to focus on?",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiResponse])
      setIsLoading(false)
    }, 1500)
  }

  const handleNewChat = () => {
    setMessages([
      {
        id: Date.now().toString(),
        role: "assistant",
        content: "Hello! I'm your AI Health Assistant. What would you like to discuss today?",
        timestamp: new Date(),
      },
    ])
  }

  const handleGenerateReport = (type: string, topic: string) => {
    router.push(`/reports?new=true&type=${type}&topic=${topic}`)
  }

  return (
    <AppShell>
      <div className="flex h-screen flex-col">
        <AppHeader title="AI Chat" />
        
        <div className="flex flex-1 overflow-hidden">
          {/* Chat Sidebar - 30% width */}
          <div className="w-[320px] shrink-0">
            <ChatSidebar
              selectedId={selectedChat}
              onSelect={setSelectedChat}
              onNewChat={handleNewChat}
            />
          </div>

          {/* Chat Main Area - 70% width */}
          <div className="flex flex-1 flex-col bg-background">
            {showRiskAlert && (
              <RiskAlert
                title="Possible Health Signal"
                description="Your sleep patterns combined with elevated stress markers suggest you may benefit from a rest day. Consider reducing intense activities."
                onDetails={() => router.push("/dashboard")}
                onContactDoctor={() => router.push("/reports?new=true")}
                onDismiss={() => setShowRiskAlert(false)}
              />
            )}
            
            <ChatMessages messages={messages} />
            
            <ChatInput
              onSend={handleSendMessage}
              onGenerateReport={() => setShowReportModal(true)}
              onConnectDevice={() => router.push("/integrations")}
              isLoading={isLoading}
            />
          </div>
        </div>
      </div>

      <GenerateReportModal
        open={showReportModal}
        onOpenChange={setShowReportModal}
        onGenerate={handleGenerateReport}
      />
    </AppShell>
  )
}
