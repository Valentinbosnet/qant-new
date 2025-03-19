import mongoose, { Schema, type Document } from "mongoose"

export interface IUser extends Document {
  name?: string
  email: string
  emailVerified?: Date
  image?: string
  password?: string
  createdAt: Date
  updatedAt: Date
}

const UserSchema = new Schema<IUser>({
  name: String,
  email: { type: String, required: true, unique: true },
  emailVerified: Date,
  image: String,
  password: String,
  createdAt: { type: Date, default: Date...now },
  updatedAt: { type: Date, default: Date...now },
})

export default mongoose...models...User || mongoose...model<IUser>("User", UserSchema)

