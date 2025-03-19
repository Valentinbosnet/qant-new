"use client"

import { useState } from "react"
import { Header } from "@/components/Header"
import Footer from "@/components/Footer"
import Dashboard from "@/components/Dashboard"
import LandingPage from "@/components/LandingPage"
import SignInPage from "@/components/SignInPage"
import SignUpPage from "@/components/SignUpPage"
import GetStartedGuide from "@/components/GetStartedGuide"
import AIPredictionsPage from "@/components/AIPredictionsPage"
import PreferencesPage from "@/components/PreferencesPage"
import { Toaster } from "@/components/ui/toaster"
import { ErrorBoundary } from "react-error-boundary"
import { useToast } from "@/components/ui/use-toast"

function ErrorFallback({ error }: { error: Error }) {
  return (
    <div className="text-red-500 p-4">
      <h2>Something went wrong:</h2>
      <pre>{error.message}</pre>
    </div>
  )
}

export default function App() {
  console.log("App component rendered")
  const [user, setUser] = useState(null)
  const [activeTab, setActiveTab] = useState("landing")
  const [followedUsers, setFollowedUsers] = useState([])
  const [users, setUsers] = useState([{ email: "demo@example.com", password: "password" }])
  const { toast } = useToast()

  const handleSignIn = async (email: string, password: string) => {
    console.log("handleSignIn called with:", email, password)
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        const foundUser = users.find((u) => u.email === email && u.password === password)
        if (foundUser) {
          setUser({ username: email.split("@")[0], email })
          setActiveTab("dashboard")
          resolve()
        } else {
          reject(new Error("Invalid credentials"))
        }
      }, 1000)
    })
  }

  const handleSignUp = async (username: string, email: string, password: string) => {
    return new Promise<{ email: string; password: string }>((resolve, reject) => {
      setTimeout(() => {
        if (users.some((u) => u.email === email)) {
          reject(new Error("User already exists"))
        } else {
          const newUser = { email, password }
          setUsers((prevUsers) => [...prevUsers, newUser])
          resolve(newUser)
        }
      }, 1500)
    })
  }

  const handleAutoLogin = async (email: string, password: string) => {
    try {
      await handleSignIn(email, password)
      setActiveTab("getStarted")
    } catch (error) {
      toast({
        title: "Auto-login failed",
        description: "Please try signing in manually.",
        variant: "destructive",
      })
      setActiveTab("signin")
    }
  }

  const handleSignOut = () => {
    setUser(null)
    setActiveTab("landing")
  }

  const renderContent = () => {
    console.log("Rendering content for activeTab:", activeTab)
    switch (activeTab) {
      case "dashboard":
        return <Dashboard user={user} setActiveTab={setActiveTab} followedUsers={followedUsers} />
      case "aiPredictions":
        return <AIPredictionsPage setActiveTab={setActiveTab} />
      case "preferences":
        return <PreferencesPage setActiveTab={setActiveTab} onSignOut={handleSignOut} user={user} />
      case "getStarted":
        return <GetStartedGuide setActiveTab={setActiveTab} />
      case "signin":
        console.log("Rendering SignInPage")
        return <SignInPage setActiveTab={setActiveTab} onSignIn={handleSignIn} />
      case "signup":
        return <SignUpPage setActiveTab={setActiveTab} onSignUp={handleSignUp} onAutoLogin={handleAutoLogin} />
      default:
        return <LandingPage setActiveTab={setActiveTab} />
    }
  }

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <div className="flex flex-col min-h-screen bg-[#1a1a1a]">
        {user && (
          <Header
            title={activeTab === "dashboard" ? "Qant Dashboard" : activeTab}
            showBackButton={activeTab !== "dashboard"}
            onBackClick={() => setActiveTab("dashboard")}
            username={user.username}
            followersCount={followedUsers.length}
          />
        )}
        <main className="flex-1 overflow-hidden pb-[72px]">{renderContent()}</main>
        {user && <Footer activeTab={activeTab} setActiveTab={setActiveTab} />}
        <Toaster />
      </div>
    </ErrorBoundary>
  )
}

