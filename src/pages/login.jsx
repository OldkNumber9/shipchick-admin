"use client"

import { useState } from "react"
import { useRouter } from "next/router"
import Head from "next/head"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import AuthService from "@/services/auth.service"

export default function Login() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!email || !password) {
      setError("Please enter both email and password")
      return
    }

    try {
      await AuthService.login({ email, password })
      router.push("/dashboard")
    } catch (err) {
      setError("Invalid email or password")
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Head>
        <title>Login | ShipChic Admin</title>
        <meta name="description" content="ShipChic Admin Dashboard Login" />
        <link rel="icon" href="/favicon.ico" />
      </Head> 

      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
          <h1 className="text-2xl font-bold text-red-600 mb-6 text-center">LOGIN</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">{error}</div>}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@byewind.com"
                className="bg-gray-50"
              />
              <p className="text-sm text-gray-500">Enter your admin email</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="bg-gray-50"
              />
              <p className="text-sm text-gray-500">Enter your password</p>
            </div>

            <Button type="submit" className="w-full bg-red-600 hover:bg-red-700">
              Login
            </Button>

            {/* link to register */}
            <div className="text-center mt-4 text-sm text-gray-600">
              Don't have an account?{" "}
              <a href="/register" className="text-red-600 hover:underline">
                Register here
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}