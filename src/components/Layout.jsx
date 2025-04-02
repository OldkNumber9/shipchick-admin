// import type { ReactNode } from "react"
import Head from "next/head"
import { Sidebar } from "@/components/ui/sidebar"

// interface LayoutProps {
//   children: ReactNode
//   title: string
// }

export default function Layout({ children, title }) {
  return (
    <div className="flex min-h-screen bg-gray-100"
    >
      <Head>
        <title>{title} | Ship Chick Admin</title>
      </Head>

      <Sidebar 
      className="sticky top-0 h-screen z-50 "
        style={{
          backgroundImage: "url(/Sidebar-A-bg.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
    />

      <main className="flex-1 p-6">
        <h1 className="text-3xl font-bold text-red-600 mb-6">{title}</h1> 
        {children}
      </main>
    </div>
  )
}

