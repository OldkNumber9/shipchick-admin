"use client"

import { useState, useRef, useEffect } from "react"
import Layout from "@/components/Layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Bell, MoreVertical, Send, ImageIcon, UserCircle2 } from "lucide-react"
import Image from "next/image"

export default function IncidentSupport() {
  const [activeChat, setActiveChat] = useState(3)
  const [message, setMessage] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const chats = [
    { id: 1, carrier: "Carrier Name", sender: "Sender name", subtitle: "", unread: true },
    { id: 2, carrier: "Carrier Name", sender: "Sender name", subtitle: "", unread: true },
    { id: 3, carrier: "Carrier Name", sender: "Sender name", subtitle: "Subtitle", unread: true, active: true },
    { id: 4, carrier: "Carrier Name", sender: "Sender name", subtitle: "", unread: false },
    { id: 5, carrier: "Carrier Name", sender: "Sender name", subtitle: "", unread: false },
    { id: 6, carrier: "Carrier Name", sender: "Sender name", subtitle: "", unread: false },
    { id: 7, carrier: "Carrier Name", sender: "Sender name", subtitle: "", unread: false },
    { id: 8, carrier: "Carrier Name", sender: "Sender name", subtitle: "", unread: false },
    { id: 9, carrier: "Carrier Name", sender: "Sender name", subtitle: "", unread: false },
    { id: 10, carrier: "Carrier Name", sender: "Sender name", subtitle: "", unread: false },
    { id: 11, carrier: "Carrier Name", sender: "Sender name", subtitle: "", unread: false },
    { id: 12, carrier: "Carrier Name", sender: "Sender name", subtitle: "", unread: false },
  ]

  const [messages, setMessages] = useState([
    { id: 1, text: "---Start conversation Carrier : Name Sender : Name---", type: "system" },
    { id: 2, text: "Sending parcel to Beijing flight TG416", type: "system" },
    { id: 3, text: "สวัสดีค่ะ", sender: "carrier", avatar: "https://fakeimg.pl/50x50/ff9999/fff" },
    {
      id: 4,
      text: "สวัสดีค่ะ รบกวนสอบถามข้อมูลในการจัดส่งสินค้า",
      sender: "sender",
      avatar: "https://fakeimg.pl/50x50/9999ff/fff",
    },
    { id: 5, text: "สะดวกส่งที่สุวรรณภูมิยังคะ", sender: "carrier", avatar: "https://fakeimg.pl/50x50/ff9999/fff" },
    { id: 6, text: "ดีค่ะ", sender: "sender", avatar: "https://fakeimg.pl/50x50/9999ff/fff" },
    {
      id: 7,
      text: "วันเสาร์ ที่ 12 เดือ4 เท่าเดอร์ H นะคะ",
      sender: "carrier",
      avatar: "https://fakeimg.pl/50x50/ff9999/fff",
    },
    { id: 8, text: "---Admin Joined conversation---", type: "system" },
    { id: 9, text: "มีอะไรให้แอดมินช่วยเหลือมั้ยคะ?", sender: "admin", avatar: "https://fakeimg.pl/50x50/ff5555/fff" },
  ])

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSendMessage = () => {
    if (message.trim() === "") return

    const newMessage = {
      id: messages.length + 1,
      text: message.trim(),
      sender: "admin",
      avatar: "https://fakeimg.pl/50x50/ff5555/fff",
    }

    if (message.trim().toLowerCase() === "add") {
      const addedMsg = {
        id: messages.length + 2,
        text: "🆕 Added new item successfully!",
        type: "system",
      }
      setMessages((prev) => [...prev, newMessage, addedMsg])
    } else {
      setMessages((prev) => [...prev, newMessage])
    }

    setMessage("")
  }

  return (
    <Layout title="INCIDENT SUPPORT">
      <div className="flex h-[calc(100vh-160px)] bg-white rounded-md shadow overflow-hidden">
        {/* Chat List */}
        <div className="w-[320px] border-r flex flex-col">
          <div className="p-4 border-b flex justify-between items-center">
            <h2 className="font-medium">Chat</h2>
            <button className="text-gray-500 hover:text-gray-700">
              <MoreVertical size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto">
            {chats.map((chat) => (
              <div
                key={chat.id}
                className={`flex items-center p-3 cursor-pointer hover:bg-gray-50 ${chat.id === activeChat ? "bg-red-50" : ""}`}
                onClick={() => setActiveChat(chat.id)}
              >
                <div className="w-10 h-10 rounded-md overflow-hidden mr-3 flex-shrink-0">
                  <Image src="https://fakeimg.pl/100x100/ffcccc/ff6666" alt="Avatar" width={40} height={40} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm">{chat.carrier}</div>
                  <div className="text-xs text-gray-500 truncate">{chat.sender}</div>
                  {chat.subtitle && <div className="text-xs text-gray-500">{chat.subtitle}</div>}
                </div>
                {chat.unread && (
                  <div className="ml-2">
                    <Bell size={18} className="text-red-500" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Chat Content */}
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="p-4 border-b flex justify-end gap-2">
            <Button variant="destructive" className="bg-red-600 hover:bg-red-700">
              Cancel Order
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">Close case</Button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
            {messages.map((msg) => (
              <div key={msg.id} className="mb-4">
                {msg.type === "system" ? (
                  <div className="text-center text-sm text-gray-500 my-4">{msg.text}</div>
                ) : (
                  <div className={`flex ${msg.sender === "sender" ? "justify-end" : "justify-start"}`}>
                    {msg.sender === "carrier" && (
                      <div className="mr-3">
                        <div className="w-10 h-10 rounded-full overflow-hidden">
                          <Image src={msg.avatar || "/placeholder.svg"} alt="Avatar" width={40} height={40} />
                        </div>
                      </div>
                    )}
                    {msg.sender === "admin" && (
                     <div className="mr-3">
                        <div className="    overflow-hidden">
                          <UserCircle2 className="text-red-700 w-[40px] h-[40px]"  />
                        </div>
                      </div>
                    )}

                    <div
                      className={`max-w-[70%] ${
                        msg.sender === "admin"
                          ? "bg-red-100"
                          : msg.sender === "carrier"
                          ? "bg-white"
                          : "bg-blue-100"
                      } p-3 rounded-lg shadow-sm`}
                    >
                      <div className="font-medium text-sm mb-1">
                        {msg.sender === "carrier"
                          ? "Carrier"
                          : msg.sender === "sender"
                          ? "Sender"
                          : "Admin"}
                      </div>
                      <div className="text-sm">{msg.text}</div>
                    </div>

                    {msg.sender === "sender" && (
                      <div className="ml-3">
                        <div className="w-10 h-10 rounded-full overflow-hidden">
                          <Image src={msg.avatar || "/placeholder.svg"} alt="Avatar" width={40} height={40} />
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-3 border-t flex items-center">
            <button className="text-gray-400 hover:text-gray-600 mr-3">
              <ImageIcon size={24} />
            </button>
            <Input
              placeholder="พิมพ์ข้อความ ตรงนี้"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1"
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            />
            <button className="ml-3 text-blue-500 hover:text-blue-700" onClick={handleSendMessage}>
              <Send size={24} />
            </button>
          </div>
        </div>
      </div>
    </Layout>
  )
}