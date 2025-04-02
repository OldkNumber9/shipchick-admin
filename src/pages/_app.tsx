"use client"

import type { AppProps } from "next/app"
import { useRouter } from "next/router"
import { useEffect } from "react"
import "@/styles/globals.css"
import { Work_Sans, Kanit } from "next/font/google"
import { Toaster } from "sonner"

const workSans = Work_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-work-sans",
})

const kanit = Kanit({
  subsets: ["thai"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-kanit",
})

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()

  // Initialize notification system
  // useEffect(() => {
  //   // This would be where we'd initialize a real SSE or WebSocket connection
  //   // in a production environment
  //   console.log("Initializing notification system")

  //   // For demo purposes, let's add some initial notifications
  //   if (typeof window !== "undefined") {
  //     const existingNotifications = localStorage.getItem("notifications")

  //     if (!existingNotifications) {
  //       const initialNotifications = [
  //         {
  //           id: "notif-1",
  //           title: "New Express Service Message",
  //           message: "You have a new message from Jane Cooper",
  //           time: new Date().toLocaleTimeString(),
  //           read: false,
  //           type: "express",
  //           link: "/dashboard/express-service",
  //         },
  //         {
  //           id: "notif-2",
  //           title: "New Incident Support Message",
  //           message: "You have a new message from Floyd Miles",
  //           time: new Date(Date.now() - 30 * 60000).toLocaleTimeString(),
  //           read: true,
  //           type: "incident",
  //           link: "/dashboard/incident-support",
  //         },
  //       ]

  //       localStorage.setItem("notifications", JSON.stringify(initialNotifications))
  //     }
  //   }

  //   // Set up mock SSE connection for real-time notifications
  //   const setupMockSSE = () => {
  //     console.log("Establishing mock SSE connection...")

  //     // Generate random notifications periodically
  //     const interval = setInterval(() => {
  //       // 20% chance to generate a notification
  //       if (Math.random() > 0.8) {
  //         const isExpress = Math.random() > 0.5
  //         const newNotification = {
  //           id: `notif-${Date.now()}`,
  //           title: isExpress ? "New Express Service Message" : "New Incident Support Message",
  //           message: isExpress
  //             ? "You have a new message in Express Service"
  //             : "You have a new message in Incident Support",
  //           time: new Date().toLocaleTimeString(),
  //           read: false,
  //           type: isExpress ? "express" : "incident",
  //           link: isExpress ? "/dashboard/express-service" : "/dashboard/incident-support",
  //         }

  //         // Add to localStorage
  //         const storedNotifications = JSON.parse(localStorage.getItem("notifications") || "[]")
  //         localStorage.setItem("notifications", JSON.stringify([newNotification, ...storedNotifications]))

  //         // Dispatch custom event for notification
  //         const event = new CustomEvent("new-notification", { detail: newNotification })
  //         window.dispatchEvent(event)
  //       }
  //     }, 15000) // Check every 15 seconds

  //     return () => clearInterval(interval)
  //   }

  //   const cleanup = setupMockSSE()
  //   return () => cleanup()
  // }, [])
  useEffect(() => {
    console.log("Connecting to SSE on localhost:3001")
  
    const eventSource = new EventSource("http://localhost:3001/notifications")
  
    eventSource.onmessage = (event) => {
      try {
        const newNotification = JSON.parse(event.data)
  
        // Add to localStorage
        const storedNotifications = JSON.parse(localStorage.getItem("notifications") || "[]")
        localStorage.setItem("notifications", JSON.stringify([newNotification, ...storedNotifications]))
  
        // Dispatch custom event
        const customEvent = new CustomEvent("new-notification", { detail: newNotification })
        window.dispatchEvent(customEvent)
      } catch (err) {
        console.error("Failed to parse SSE message", err)
      }
    }
  
    eventSource.onerror = (err) => {
      console.error("SSE connection error:", err)
      eventSource.close()
    }
  
    return () => {
      console.log("Closing SSE connection")
      eventSource.close()
    }
  }, [])
  
  // Skip rendering layout for login page
  const isLoginPage = router.pathname === "/login"

  return (
    <div className={`${workSans.className} ${kanit.className}`}>
      <Toaster position="top-center" richColors />
      <Component {...pageProps} />
    </div>
  )
}

