"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import type { Prediction } from "@/lib/db"

export function usePredictions(userId?: string) {
  const [predictions, setPredictions] = useState<Prediction[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (!userId) {
      setIsLoading(false)
      return
    }

    const fetchPredictions = async () => {
      try {
        setIsLoading(true)
        const response = await axios.get("/api/predictions")
        setPredictions(response.data)
        setError(null)
      } catch (err) {
        console.error("Error fetching predictions:", err)
        setError(err instanceof Error ? err : new Error("Failed to fetch predictions"))
      } finally {
        setIsLoading(false)
      }
    }

    fetchPredictions()
  }, [userId])

  const refreshPredictions = async () => {
    try {
      setIsLoading(true)
      const response = await axios.get("/api/predictions")
      setPredictions(response.data)
      setError(null)
    } catch (err) {
      console.error("Error refreshing predictions:", err)
      setError(err instanceof Error ? err : new Error("Failed to refresh predictions"))
    } finally {
      setIsLoading(false)
    }
  }

  const createPrediction = async (predictionData: Partial<Prediction>) => {
    try {
      const response = await axios.post("/api/predictions", predictionData)
      setPredictions((prev) => [...prev, response.data])
      return response.data
    } catch (err) {
      console.error("Error creating prediction:", err)
      throw err
    }
  }

  const updatePrediction = async (id: string, predictionData: Partial<Prediction>) => {
    try {
      const response = await axios.put(`/api/predictions/${id}`, predictionData)
      setPredictions((prev) => prev.map((prediction) => (prediction.id === id ? response.data : prediction)))
      return response.data
    } catch (err) {
      console.error("Error updating prediction:", err)
      throw err
    }
  }

  const deletePrediction = async (id: string) => {
    try {
      await axios.delete(`/api/predictions/${id}`)
      setPredictions((prev) => prev.filter((prediction) => prediction.id !== id))
    } catch (err) {
      console.error("Error deleting prediction:", err)
      throw err
    }
  }

  return {
    predictions,
    isLoading,
    error,
    refreshPredictions,
    createPrediction,
    updatePrediction,
    deletePrediction,
  }
}

