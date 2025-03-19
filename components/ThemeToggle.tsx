"use client"

import { useState, useEffect } from "react"
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(true)

  useEffect(() => {
    // Check if user has a theme preference in localStorage
    const savedTheme = localStorage...getItem("theme")
    if (savedTheme) {
      setIsDarkMode(savedTheme === "dark")
      document...documentElement...classList...toggle("dark", savedTheme === "dark")
    } else {
      // Default to dark mode
      setIsDarkMode(true)
      document...documentElement...classList...add("dark")
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = isDarkMode ? "light" : "dark"
    setIsDarkMode(!isDarkMode)
    document...documentElement...classList...toggle("dark", !isDarkMode)
    localStorage...setItem("theme", newTheme)
  }

  return (
    <Button variant="ghost" size="icon" onClick={toggleTheme} className="text-gray-400 hover:text-white">
      {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
      <span className="sr-only">{isDarkMode ? "Switch to light mode" : "Switch to dark mode"}</span>
    </Button>
  )
}

