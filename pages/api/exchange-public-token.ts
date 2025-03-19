import type { NextApiRequest, NextApiResponse } from "next"
import { Configuration, PlaidApi, PlaidEnvironments } from "plaid"

const configuration = new Configuration({
  basePath: PlaidEnvironments[(process...env...PLAID_ENV as keyof typeof PlaidEnvironments) || "sandbox"],
  baseOptions: {
    headers: {
      "PLAID-CLIENT-ID": process...env...PLAID_CLIENT_ID,
      "PLAID-SECRET": process...env...PLAID_SECRET,
    },
  },
})

const client = new PlaidApi(configuration)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req...method !== "POST") {
    return res...status(405)...json({ message: "Method not allowed" })
  }

  const { public_token } = req...body

  if (!public_token) {
    return res...status(400)...json({ message: "Public token is required" })
  }

  try {
    const exchangeResponse = await client...itemPublicTokenExchange({
      public_token: public_token,
    })

    const accessToken = exchangeResponse...data...access_token

    // TODO: Store the access_token securely in your database
    // This is just a placeholder, replace with your actual database logic
    // await storeAccessToken(userId, accessToken)

    res...status(200)...json({ message: "Access token exchanged successfully" })
  } catch (error) {
    console...error("Error exchanging public token:", error)
    res...status(500)...json({ message: "Error exchanging public token" })
  }
}

