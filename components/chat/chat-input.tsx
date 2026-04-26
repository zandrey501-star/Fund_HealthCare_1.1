"use client"

import { useState } from "react"
import { Paperclip, Send, Link2, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface ChatInputProps {
  onSend: (message: string) => void
  onGenerateReport: () => void
  onConnectDevice: () => void
  isLoading?: boolean
}

export function ChatInput({
  onSend,
  onGenerateReport,
  onConnectDevice,
  isLoading,
}: ChatInputProps) {
  const [input, setInput] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim() && !isLoading) {
      onSend(input.trim())
      setInput("")
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  return (
    <div className="border-t bg-card p-4">
      <div className="mx-auto max-w-3xl">
        {/* Action Buttons */}
        <div className="mb-3 flex flex-wrap gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-1.5">
                <Paperclip className="h-4 w-4" />
                Attach File
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem>Photo</DropdownMenuItem>
              <DropdownMenuItem>PDF</DropdownMenuItem>
              <DropdownMenuItem>Test Results</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            variant="outline"
            size="sm"
            className="gap-1.5"
            onClick={onConnectDevice}
          >
            <Link2 className="h-4 w-4" />
            Connect Device
          </Button>

          <Button
            variant="outline"
            size="sm"
            className="gap-1.5"
            onClick={onGenerateReport}
          >
            <FileText className="h-4 w-4" />
            Generate Report
          </Button>
        </div>

        {/* Input Area */}
        <form onSubmit={handleSubmit} className="flex gap-3">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about your health..."
            className="min-h-[52px] max-h-32 resize-none bg-input"
            rows={1}
          />
          <Button
            type="submit"
            size="icon"
            disabled={!input.trim() || isLoading}
            className="h-[52px] w-[52px] shrink-0"
          >
            <Send className="h-5 w-5" />
          </Button>
        </form>
      </div>
    </div>
  )
}
