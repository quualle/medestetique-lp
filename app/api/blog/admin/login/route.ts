import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json()

    if (!password) {
      return NextResponse.json({ error: 'Passwort erforderlich' }, { status: 400 })
    }

    const adminPassword = process.env.ADMIN_PASSWORD
    const adminSessionToken = process.env.ADMIN_SESSION_TOKEN

    if (!adminPassword || !adminSessionToken) {
      console.error('Admin credentials not configured')
      return NextResponse.json({ error: 'Server-Konfigurationsfehler' }, { status: 500 })
    }

    if (password !== adminPassword) {
      return NextResponse.json({ error: 'Ungültiges Passwort' }, { status: 401 })
    }

    // Generate a session token
    const sessionToken = crypto.randomBytes(32).toString('hex')

    return NextResponse.json({ 
      success: true, 
      sessionToken: adminSessionToken // Use configured token for simplicity
    })
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json({ error: 'Interner Serverfehler' }, { status: 500 })
  }
}