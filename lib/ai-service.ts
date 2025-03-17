// Temporary mock implementation until openai and axios are installed
// This will prevent build errors while maintaining functionality

interface PredictionRequest {
  prompt: string
  model?: string
  maxTokens?: number
}

interface PredictionResponse {
  id: string
  text: string
  created: number
}

// Mock data for predictions
const mockPredictions = [
  {
    id: "pred_1",
    text: "Based on current market trends, technology stocks are likely to see moderate growth in the next quarter.",
    created: Date.now(),
  },
  {
    id: "pred_2",
    text: "Energy sector shows signs of volatility due to geopolitical factors. Consider diversifying your portfolio.",
    created: Date.now() - 86400000,
  },
  {
    id: "pred_3",
    text: "Financial markets indicate potential interest rate changes. Bond investments may be affected in the short term.",
    created: Date.now() - 172800000,
  },
]

export async function generatePrediction(request: PredictionRequest): Promise<PredictionResponse> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Return a mock prediction
  return {
    id: `pred_${Math.random().toString(36).substring(2, 9)}`,
    text: `AI Prediction based on your prompt: "${request.prompt}". Market analysis suggests cautious optimism for the next quarter.`,
    created: Date.now(),
  }
}

export async function listPredictions(): Promise<PredictionResponse[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  return mockPredictions
}

export async function getPrediction(id: string): Promise<PredictionResponse | null> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  const prediction = mockPredictions.find((p) => p.id === id)
  return prediction || null
}

