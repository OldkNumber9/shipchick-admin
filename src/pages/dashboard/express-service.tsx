"use client"

import { useState, useRef, useEffect } from "react"
import Layout from '../../components/Layout';
import { Input } from "@/components/ui/input"
import { Bell, MoreVertical, Send, ImageIcon, UserCircle2 } from "lucide-react"
import Image from "next/image"

export default function ExpressService() {
  const [activeChat, setActiveChat] = useState(3)
  const [message, setMessage] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Sample data for chats
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

  // Sample data for messages - now using state so we can update it
  const [messages, setMessages] = useState([
    { id: 1, text: "สวัสดีค่ะ", sender: "admin" },
    {
      id: 2,
      text: "สินค้าส่งถึงที่ไหน ไปรับ กรุงเอง พัสดุหนัก 1 กก. วันนี้ค่ะ",
      sender: "sender",
      avatar: "/ellipse-60.png",
    },
    {
      id: 3,
      text: "เป็นสติกเกอร์ 22.30น วันนี้ค่ะ ค่าส่ง 21,000 บาท",
      sender: "admin",
      avatar: "/ellipse-60.png",
    },
    { id: 4, text: "โอนค่ะ", sender: "sender",       avatar: "/ellipse-60.png",    },
    {
      id: 5,
      text: "โอนผ่าน QR นี้ ถ่ายหน้าจอรูปแบบสลิปโอนแนบกลับมาด้วยนะคะ",
      sender: "admin",
      avatar: "/ellipse-60.png",
      image: "/Qr-dummy.png",
    },
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
      avatar: "/ellipse-60.png"
    }

    setMessages([...messages, newMessage])
    setMessage("")
  }

  return (
    <Layout title="EXPRESS SERVICE">
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
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 bg-red-50">
            {messages.map((msg) => (
              <div key={msg.id} className="mb-4">
                <div className={`flex ${msg.sender === "sender" ? "justify-end" : "justify-start"}`}>
                  {msg.sender === "admin" && (
                    <div className="mr-3">
                      <div className="w-10 h-10 overflow-hidden">
                        <UserCircle2 className="text-red-700 w-10 h-10" />
                      </div>
                    </div>
                  )}

                  <div
                    className={`max-w-[70%] ${msg.sender === "admin" ? "bg-white" : "bg-white"} p-3 rounded-lg shadow-sm`}
                  >
                    <div className="font-medium text-sm mb-1">{msg.sender === "admin" ? "Admin" : "Sender"}</div>
                    <div className="text-sm">{msg.text}</div>
                    {msg.image && (
                      <div className="mt-2">
                        <Image
                          src={msg.image || "/placeholder.svg"}
                          alt="Attachment"
                          width={150}
                          height={150}
                          className="rounded-md"
                        />
                      </div>
                    )}
                  </div>

                  {msg.sender === "sender" && (
                    <div className="ml-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden">
                        <Image src={msg.avatar || "/placeholder.svg"} alt="Avatar" width={40} height={40} />
                      </div>
                    </div>
                  )}
                </div>
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