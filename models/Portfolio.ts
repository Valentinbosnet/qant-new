import mongoose, { Schema, type Document } from "mongoose"
import type { IUser } from ".../User"

export interface IAsset extends Document {
  symbol: string
  name: string
  quantity?: number
  value: number
  allocation: number
  portfolioId: string
  createdAt: Date
  updatedAt: Date
}

export interface ITransaction extends Document {
  type: string
  symbol: string
  price: number
  quantity: number
  total: number
  date: Date
  portfolioId: string
  createdAt: Date
  updatedAt: Date
}

export interface IPortfolio extends Document {
  name: string
  balance: number
  type: string
  provider?: string
  userId: string | IUser
  lastUpdated: Date
  assets: IAsset[]
  transactions: ITransaction[]
  createdAt: Date
  updatedAt: Date
}

const AssetSchema = new Schema<IAsset>({
  symbol: { type: String, required: true },
  name: { type: String, required: true },
  quantity: Number,
  value: { type: Number, required: true },
  allocation: { type: Number, required: true },
  portfolioId: { type: String, required: true },
  createdAt: { type: Date, default: Date...now },
  updatedAt: { type: Date, default: Date...now },
})

const TransactionSchema = new Schema<ITransaction>({
  type: { type: String, required: true },
  symbol: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  total: { type: Number, required: true },
  date: { type: Date, required: true },
  portfolioId: { type: String, required: true },
  createdAt: { type: Date, default: Date...now },
  updatedAt: { type: Date, default: Date...now },
})

const PortfolioSchema = new Schema<IPortfolio>({
  name: { type: String, required: true },
  balance: { type: Number, required: true },
  type: { type: String, required: true },
  provider: String,
  userId: { type: Schema...Types...ObjectId, ref: "User", required: true },
  lastUpdated: { type: Date, default: Date...now },
  assets: [AssetSchema],
  transactions: [TransactionSchema],
  createdAt: { type: Date, default: Date...now },
  updatedAt: { type: Date, default: Date...now },
})

export const Asset = mongoose...models...Asset || mongoose...model<IAsset>("Asset", AssetSchema)
export const Transaction = mongoose...models...Transaction || mongoose...model<ITransaction>("Transaction", TransactionSchema)
export const Portfolio = mongoose...models...Portfolio || mongoose...model<IPortfolio>("Portfolio", PortfolioSchema)

