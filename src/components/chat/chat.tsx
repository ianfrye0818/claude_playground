import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { PlusCircle, Send, Settings } from "lucide-react"

export default function ChatbotInterface() {
  const [isSettingsOpen, setIsSettingsOpen] = React.useState(false)
  const [chats, setChats] = React.useState([
    { id: 1, title: "Chat 1" },
    { id: 2, title: "Chat 2" },
    { id: 3, title: "Chat 3" },
  ])
  const [messages, setMessages] = React.useState([
    { id: 1, content: "Hello! How can I assist you today?", sender: "bot" },
  ])
  const [inputMessage, setInputMessage] = React.useState("")

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      setMessages([...messages, { id: messages.length + 1, content: inputMessage, sender: "user" }])
      setInputMessage("")
    }
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Left Sidebar */}
      <div className="w-64 border-r border-border flex flex-col">
        <div className="p-4 border-b border-border">
          <h1 className="text-xl font-bold">AI Chatbot</h1>
        </div>
        <ScrollArea className="flex-grow">
          {chats.map((chat) => (
            <div key={chat.id} className="p-2 hover:bg-accent cursor-pointer">
              {chat.title}
            </div>
          ))}
        </ScrollArea>
        <div className="p-4 border-t border-border">
          <Button className="w-full" variant="outline">
            <PlusCircle className="mr-2 h-4 w-4" />
            New Chat
          </Button>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-grow flex flex-col">
        <div className="p-4 border-b border-border flex justify-between items-center">
          <h2 className="text-lg font-semibold">Current Chat</h2>
          <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon">
                <Settings className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Settings</DialogTitle>
                <DialogDescription>
                  Adjust your AI chatbot settings here.
                </DialogDescription>
              </DialogHeader>
              {/* Add your settings options here */}
            </DialogContent>
          </Dialog>
        </div>
        <ScrollArea className="flex-grow p-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`mb-4 p-2 rounded-lg ${
                message.sender === "user" ? "bg-primary text-primary-foreground ml-auto" : "bg-muted"
              } max-w-[80%]`}
            >
              {message.content}
            </div>
          ))}
        </ScrollArea>
        <div className="p-4 border-t border-border flex">
          <Input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type your message here..."
            className="flex-grow mr-2"
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
          />
          <Button onClick={handleSendMessage}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}