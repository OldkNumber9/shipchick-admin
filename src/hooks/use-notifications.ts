"use client"

import { useState, useEffect, useCallback } from "react"

// Type definitions
export interface Notification {
  id: string
  title: string
  message: string
  time: string
  read: boolean
  type: "express" | "incident" | "system"
  link: string
}

// Subscribers for new notifications
const subscribers: ((notification: Notification) => void)[] = []

// Real SSE connection instead of mock
const connectSSE = () => {
  console.log("Connecting to real SSE server...")

  const eventSource = new EventSource("http://localhost:3001/notifications")

  eventSource.onmessage = (event) => {
    try {
      const newNotification: Notification = JSON.parse(event.data)

      // Notify subscribers
      subscribers.forEach((callback) => callback(newNotification))

      // Store in localStorage
      const stored = JSON.parse(localStorage.getItem("notifications") || "[]")
      localStorage.setItem("notifications", JSON.stringify([newNotification, ...stored]))
    } catch (err) {
      console.error("Invalid SSE message format", err)
    }
  }

  eventSource.onerror = (err) => {
    console.error("SSE error:", err)
    eventSource.close()
  }

  return () => {
    eventSource.close()
    console.log("SSE connection closed.")
  }
}

// Mock SSE connection
const mockSSEConnection = () => {
  console.log("Establishing mock SSE connection...")

  // Generate random notifications periodically
  const interval = setInterval(() => {
    // 20% chance to generate a notification
    if (Math.random() > 0.8) {
      const isExpress = Math.random() > 0.5
      const newNotification: Notification = {
        id: `notif-${Date.now()}`,
        title: isExpress ? "New Express Service Message" : "New Incident Support Message",
        message: isExpress ? "You have a new message in Express Service" : "You have a new message in Incident Support",
        time: new Date().toLocaleTimeString(),
        read: false,
        type: isExpress ? "express" : "incident",
        link: isExpress ? "/dashboard/express-service" : "/dashboard/incident-support",
      }

      // Notify all subscribers
      subscribers.forEach((callback) => callback(newNotification))

      // Add to localStorage
      const storedNotifications = JSON.parse(localStorage.getItem("notifications") || "[]")
      localStorage.setItem("notifications", JSON.stringify([newNotification, ...storedNotifications]))
    }
  }, 15000) // Check every 15 seconds

  return () => clearInterval(interval)
}

// Hook for managing notifications
export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [unreadCount, setUnreadCount] = useState(0)

  // Load notifications from localStorage on mount
  // useEffect(() => {
  //   const storedNotifications = JSON.parse(localStorage.getItem("notifications") || "[]")
  //   setNotifications(storedNotifications)
  //   setUnreadCount(storedNotifications.filter((n: Notification) => !n.read).length)

  //   // Set up mock SSE connection
  //   const cleanup = mockSSEConnection()

  //   // Check for new notifications in localStorage every second
  //   const interval = setInterval(() => {
  //     const storedNotifications = JSON.parse(localStorage.getItem("notifications") || "[]")
  //     setNotifications(storedNotifications)
  //     setUnreadCount(storedNotifications.filter((n: Notification) => !n.read).length)
  //   }, 1000)

  //   return () => {
  //     cleanup()
  //     clearInterval(interval)
  //   }
  // }, [])
  useEffect(() => {
    const storedNotifications = JSON.parse(localStorage.getItem("notifications") || "[]")
    setNotifications(storedNotifications)
    setUnreadCount(storedNotifications.filter((n: Notification) => !n.read).length)
  
    const cleanup = connectSSE()
  
    const interval = setInterval(() => {
      const storedNotifications = JSON.parse(localStorage.getItem("notifications") || "[]")
      setNotifications(storedNotifications)
      setUnreadCount(storedNotifications.filter((n: { read: any }) => !n.read).length)
    }, 1000)
  
    return () => {
      cleanup()
      clearInterval(interval)
    }
  }, [])
  
  // Mark notification as read
  const markAsRead = useCallback(
    (id: string) => {
      if (id === "all") {
        // Mark all as read
        const updatedNotifications = notifications.map((n) => ({ ...n, read: true }))
        localStorage.setItem("notifications", JSON.stringify(updatedNotifications))
        setNotifications(updatedNotifications)
        setUnreadCount(0)
      } else {
        // Mark specific notification as read
        const updatedNotifications = notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
        localStorage.setItem("notifications", JSON.stringify(updatedNotifications))
        setNotifications(updatedNotifications)
        setUnreadCount(updatedNotifications.filter((n) => !n.read).length)
      }
    },
    [notifications],
  )

  return {
    notifications,
    unreadCount,
    markAsRead,
  }
}

// Function to subscribe to new notifications
useNotifications.subscribe = (callback: (notification: Notification) => void) => {
  subscribers.push(callback)
  return () => {
    const index = subscribers.indexOf(callback)
    if (index > -1) {
      subscribers.splice(index, 1)
    }
  }
}

