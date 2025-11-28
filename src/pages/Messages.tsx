import { Navbar } from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { useState } from "react";

const dummyMessages = [
  {
    id: "1",
    sender: "Mike Rodriguez",
    initials: "MR",
    content: "Hi! Thanks for accepting my proposal. When would you like to start?",
    timestamp: "10:30 AM",
    isOwn: false,
  },
  {
    id: "2",
    sender: "You",
    initials: "ME",
    content: "Great! I'm free this weekend if that works for you.",
    timestamp: "10:35 AM",
    isOwn: true,
  },
  {
    id: "3",
    sender: "Mike Rodriguez",
    initials: "MR",
    content: "Perfect! Saturday afternoon works for me. Should we meet at the library?",
    timestamp: "10:37 AM",
    isOwn: false,
  },
  {
    id: "4",
    sender: "You",
    initials: "ME",
    content: "Sounds good! Let's meet at 2 PM. I'll bring my laptop.",
    timestamp: "10:40 AM",
    isOwn: true,
  },
];

const Messages = () => {
  const [message, setMessage] = useState("");

  return (
    <div className="min-h-screen pb-20 md:pt-20">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Card className="flex flex-col h-[calc(100vh-12rem)] card-shadow">
          {/* Chat Header */}
          <div className="flex items-center gap-3 p-4 border-b">
            <Avatar>
              <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                MR
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="font-semibold">Mike Rodriguez</h2>
              <p className="text-sm text-muted-foreground">Photography Swap</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {dummyMessages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${msg.isOwn ? "flex-row-reverse" : ""}`}
              >
                <Avatar className="w-8 h-8">
                  <AvatarFallback
                    className={`text-xs font-semibold ${
                      msg.isOwn
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {msg.initials}
                  </AvatarFallback>
                </Avatar>
                <div
                  className={`flex flex-col max-w-[70%] ${
                    msg.isOwn ? "items-end" : ""
                  }`}
                >
                  <div
                    className={`rounded-2xl px-4 py-2 ${
                      msg.isOwn
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}
                  >
                    <p className="text-sm">{msg.content}</p>
                  </div>
                  <span className="text-xs text-muted-foreground mt-1">
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <Input
                placeholder="Type a message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    // Handle send
                    setMessage("");
                  }
                }}
              />
              <Button size="icon">
                <Send className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Messages;
