"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import { Bell, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { useNotifications } from "@/hooks/use-notifications"

export function NotificationBell() {
  const router = useRouter()
  const { notifications, markAsRead, unreadCount } = useNotifications()
  const [isOpen, setIsOpen] = useState(false)

  // Show toast for new notifications
  useEffect(() => {
    const handleNewNotification = (notification: any) => {
      toast(notification.title, {
        description: notification.message,
        action: {
          label: "View",
          onClick: () => router.push(notification.link),
        },
        duration: 5000,
      })
    }

    // Subscribe to new notifications
    const unsubscribe = useNotifications.subscribe(handleNewNotification)

    return () => {
      unsubscribe()
    }
  }, [router])

  return (
    <div className="relative">
      <Button variant="ghost" size="icon" className="relative" onClick={() => setIsOpen(!isOpen)}>
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </Button>

      {isOpen && (
        <div className="absolute  left-0 mt-2 w-80 bg-white rounded-md shadow-lg z-[9999]"> 
          <div className="p-3 border-b flex justify-between items-center ">
            <h3 className="font-medium text-gray-500">Notifications</h3>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => setIsOpen(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="max-h-[400px] overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-4 text-center text-gray-500">No notifications</div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-3 border-b hover:bg-gray-50 cursor-pointer ${notification.read ? "" : "bg-blue-50"}`}
                  onClick={() => {
                    markAsRead(notification.id)
                    setIsOpen(false)
                    router.push(notification.link)
                  }}
                >
                  <div className="flex items-start">
                    <div
                      className={`w-2 h-2 rounded-full mt-2 mr-2 ${notification.read ? "bg-gray-300" : "bg-red-600"}`}
                    ></div>
                    <div>
                      <h4 className="font-medium text-sm">{notification.title}</h4>
                      <p className="text-xs text-gray-500">{notification.message}</p>
                      <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {notifications.length > 0 && (
            <div className="p-2 border-t text-center">
              <Button variant="ghost" size="sm" className="text-xs" onClick={() => markAsRead("all")}>
                Mark all as read
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

