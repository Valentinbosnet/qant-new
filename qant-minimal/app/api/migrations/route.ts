import { NextResponse } from 'next/server'
import { runMigrations } from '@/lib/migrations'

export async function GET() {
  try {
    await runMigrations()
    return NextResponse.json({ success: true, message: 'Migrations completed successfully' })
  } catch (error) {
    console.error('Error running migrations:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to run migrations', error: String(error) },
      { status: 500 }
    )
  }
}