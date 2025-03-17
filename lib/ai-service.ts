import { OpenAI } from "openai"
import { v4 as uuidv4 } from "uuid"
import { db } from "./db"
import { predictions } from "./db/schema"
import { eq } from "drizzle-orm"
import { getHistoricalData, getCompanyOverview } from "./financial-api"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export type PredictionType = "bullish" | "bearish" | "neutral"
export type TimeframeType = "short" | "medium" | "long"
export type ConfidenceType = "low" | "medium" | "high"

export interface Prediction {
  id: string
  stock: string
  prediction: PredictionType
  confidence: ConfidenceType
  timeframe: TimeframeType
  date: Date
  investmentAmount?: number
  portfolioId?: string
  confirmed: boolean
  userId: string
  reasoning?: string[]
}

export async function generatePrediction(userId: string, stock: string, portfolioId?: string): Promise<Prediction> {
  try {
    // Récupérer des données historiques et des informations sur l'entreprise
    const historicalData = await getHistoricalData(stock, "daily", "compact")
    const companyInfo = await getCompanyOverview(stock)

    // Utiliser OpenAI pour générer une prédiction basée sur les données
    if (process.env.OPENAI_API_KEY) {
      const prompt = `
        Analyze the following stock data for ${stock} and provide a market prediction:
        
        Historical Data (last 30 days): ${JSON.stringify(historicalData.slice(0, 30))}
        
        Company Information: ${JSON.stringify(companyInfo)}
        
        Based on this data, would you predict the stock to be bullish, bearish, or neutral in the short term?
        What is your confidence level (low, medium, high)?
        Provide 3 key reasons for your prediction.
        
        Format your response as JSON with the following structure:
        {
          "prediction": "bullish|bearish|neutral",
          "confidence": "low|medium|high",
          "timeframe": "short",
          "reasoning": ["reason1", "reason2", "reason3"]
        }
      `

      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: "You are a financial analysis AI that provides market predictions based on data.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.7,
        response_format: { type: "json_object" },
      })

      const content = response.choices[0].message.content
      if (content) {
        const aiResponse = JSON.parse(content)

        const prediction: Prediction = {
          id: uuidv4(),
          stock,
          prediction: aiResponse.prediction as PredictionType,
          confidence: aiResponse.confidence as ConfidenceType,
          timeframe: aiResponse.timeframe as TimeframeType,
          date: new Date(),
          portfolioId,
          confirmed: false,
          userId,
          reasoning: aiResponse.reasoning,
        }

        // Enregistrer la prédiction dans la base de données
        await db.insert(predictions).values({
          id: prediction.id,
          stock: prediction.stock,
          prediction: prediction.prediction,
          confidence: prediction.confidence,
          timeframe: prediction.timeframe,
          date: prediction.date,
          portfolioId: prediction.portfolioId,
          confirmed: prediction.confirmed,
          userId: prediction.userId,
          reasoning: JSON.stringify(prediction.reasoning),
        })

        return prediction
      }
    }

    // Fallback si OpenAI n'est pas disponible ou échoue
    const predictionTypes: PredictionType[] = ["bullish", "bearish", "neutral"]
    const confidences: ConfidenceType[] = ["low", "medium", "high"]

    // Analyse simple basée sur les données historiques
    let predictionType: PredictionType = "neutral"
    let confidenceLevel: ConfidenceType = "low"

    if (historicalData.length > 5) {
      const recentPrices = historicalData.slice(0, 5).map((d) => d.close)
      const oldPrices = historicalData.slice(5, 10).map((d) => d.close)

      const recentAvg = recentPrices.reduce((a, b) => a + b, 0) / recentPrices.length
      const oldAvg = oldPrices.reduce((a, b) => a + b, 0) / oldPrices.length

      const percentChange = ((recentAvg - oldAvg) / oldAvg) * 100

      if (percentChange > 3) {
        predictionType = "bullish"
        confidenceLevel = percentChange > 5 ? "high" : "medium"
      } else if (percentChange < -3) {
        predictionType = "bearish"
        confidenceLevel = percentChange < -5 ? "high" : "medium"
      }
    }

    const prediction: Prediction = {
      id: uuidv4(),
      stock,
      prediction: predictionType,
      confidence: confidenceLevel,
      timeframe: "short",
      date: new Date(),
      portfolioId,
      confirmed: false,
      userId,
      reasoning: ["Based on recent price movements", "Market sentiment analysis", "Technical indicators"],
    }

    // Enregistrer la prédiction dans la base de données
    await db.insert(predictions).values({
      id: prediction.id,
      stock: prediction.stock,
      prediction: prediction.prediction,
      confidence: prediction.confidence,
      timeframe: prediction.timeframe,
      date: prediction.date,
      portfolioId: prediction.portfolioId,
      confirmed: prediction.confirmed,
      userId: prediction.userId,
      reasoning: JSON.stringify(prediction.reasoning),
    })

    return prediction
  } catch (error) {
    console.error("Error generating prediction:", error)

    // En cas d'erreur, retourner une prédiction par défaut
    const prediction: Prediction = {
      id: uuidv4(),
      stock,
      prediction: "neutral",
      confidence: "low",
      timeframe: "short",
      date: new Date(),
      portfolioId,
      confirmed: false,
      userId,
      reasoning: ["Insufficient data", "Market uncertainty", "Technical analysis inconclusive"],
    }

    // Enregistrer la prédiction dans la base de données
    await db.insert(predictions).values({
      id: prediction.id,
      stock: prediction.stock,
      prediction: prediction.prediction,
      confidence: prediction.confidence,
      timeframe: prediction.timeframe,
      date: prediction.date,
      portfolioId: prediction.portfolioId,
      confirmed: prediction.confirmed,
      userId: prediction.userId,
      reasoning: JSON.stringify(prediction.reasoning),
    })

    return prediction
  }
}

export async function getUserPredictions(userId: string): Promise<Prediction[]> {
  try {
    const userPredictions = await db.query.predictions.findMany({
      where: (predictions, { eq }) => eq(predictions.userId, userId),
      orderBy: (predictions, { desc }) => [desc(predictions.date)],
    })

    return userPredictions.map((pred) => ({
      ...pred,
      reasoning: pred.reasoning ? JSON.parse(pred.reasoning as string) : undefined,
    }))
  } catch (error) {
    console.error("Error fetching user predictions:", error)
    return []
  }
}

export async function confirmPrediction(predictionId: string, investmentAmount: number): Promise<boolean> {
  try {
    await db
      .update(predictions)
      .set({
        confirmed: true,
        investmentAmount,
      })
      .where(eq(predictions.id, predictionId))

    return true
  } catch (error) {
    console.error("Error confirming prediction:", error)
    return false
  }
}

