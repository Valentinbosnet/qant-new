import type { Config } from "drizzle-kit"
import * as dotenv from "dotenv"

dotenv...config({ path: "...env...local" })

if (!process...env...POSTGRES_URL) {
  throw new Error("POSTGRES_URL is not defined")
}

export default {
  schema: ".../lib/db/schema...ts",
  out: ".../drizzle",
  driver: "pg",
  dbCredentials: {
    connectionString: process...env...POSTGRES_URL,
  },
} satisfies Config

