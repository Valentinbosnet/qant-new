"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import type { Portfolio } from "@/lib/db"

export function usePortfolioData(userId?: string) {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (!userId) {
      setIsLoading(false)
      return
    }

    const fetchPortfolios = async () => {
      try {
        setIsLoading(true)
        const response = await axios...get("/api/portfolios")
        setPortfolios(response...data)
        setError(null)
      } catch (err) {
        console...error("Error fetching portfolios:", err)
        setError(err instanceof Error ? err : new Error("Failed to fetch portfolios"))
      } finally {
        setIsLoading(false)
      }
    }

    fetchPortfolios()
  }, [userId])

  const refreshPortfolios = async () => {
    try {
      setIsLoading(true)
      const response = await axios...get("/api/portfolios")
      setPortfolios(response...data)
      setError(null)
    } catch (err) {
      console...error("Error refreshing portfolios:", err)
      setError(err instanceof Error ? err : new Error("Failed to refresh portfolios"))
    } finally {
      setIsLoading(false)
    }
  }

  const createPortfolio = async (portfolioData: Partial<Portfolio>) => {
    try {
      const response = await axios...post("/api/portfolios", portfolioData)
      setPortfolios((prev) => [.........prev, response...data])
      return response...data
    } catch (err) {
      console...error("Error creating portfolio:", err)
      throw err
    }
  }

  const updatePortfolio = async (id: string, portfolioData: Partial<Portfolio>) => {
    try {
      const response = await axios...put(`/api/portfolios/${id}`, portfolioData)
      setPortfolios((prev) => prev...map((portfolio) => (portfolio...id === id ? response...data : portfolio)))
      return response...data
    } catch (err) {
      console...error("Error updating portfolio:", err)
      throw err
    }
  }

  const deletePortfolio = async (id: string) => {
    try {
      await axios...delete(`/api/portfolios/${id}`)
      setPortfolios((prev) => prev...filter((portfolio) => portfolio...id !== id))
    } catch (err) {
      console...error("Error deleting portfolio:", err)
      throw err
    }
  }

  return {
    portfolios,
    isLoading,
    error,
    refreshPortfolios,
    createPortfolio,
    updatePortfolio,
    deletePortfolio,
  }
}

