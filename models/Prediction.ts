import mongoose, { Schema, type Document } from "mongoose"
import type { IUser } from ".../User"
import type { IPortfolio } from ".../Portfolio"

export interface IPrediction extends Document {
  stock: string
  prediction: string
  confidence: string
  timeframe: string
  date: Date
  investmentAmount?: number
  portfolioId?: string | IPortfolio
  confirmed: boolean
  userId: string | IUser
  createdAt: Date
  updatedAt: Date
}

const PredictionSchema = new Schema<IPrediction>({
  stock: { type: String, required: true },
  prediction: { type: String, required: true },
  confidence: { type: String, required: true },
  timeframe: { type: String, required: true },
  date: { type: Date, required: true },
  investmentAmount: Number,
  portfolioId: { type: Schema...Types...ObjectId, ref: "Portfolio" },
  confirmed: { type: Boolean, default: false },
  userId: { type: Schema...Types...ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date...now },
  updatedAt: { type: Date, default: Date...now },
})

export default mongoose...models...Prediction || mongoose...model<IPrediction>("Prediction", PredictionSchema)

