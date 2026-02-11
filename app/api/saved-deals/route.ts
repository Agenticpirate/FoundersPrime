import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

// GET - Fetch user's saved deals
export async function GET() {
  try {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    // Get saved deal IDs from user metadata or a separate storage
    const savedDeals = user.user_metadata?.saved_deals || []

    return NextResponse.json({
      success: true,
      savedDeals,
      count: savedDeals.length
    })
  } catch (error) {
    console.error('Error fetching saved deals:', error)
    return NextResponse.json({ success: false, error: 'Failed to fetch saved deals' }, { status: 500 })
  }
}

// POST - Save a deal
export async function POST(request: NextRequest) {
  try {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    const { dealSlug } = await request.json()

    if (!dealSlug) {
      return NextResponse.json({ success: false, error: 'Deal slug is required' }, { status: 400 })
    }

    // Get current saved deals
    const savedDeals = user.user_metadata?.saved_deals || []

    // Check if already saved
    if (savedDeals.includes(dealSlug)) {
      return NextResponse.json({ success: true, message: 'Deal already saved', savedDeals })
    }

    // Add to saved deals
    const updatedSavedDeals = [...savedDeals, dealSlug]

    // Update user metadata
    const { error } = await supabase.auth.updateUser({
      data: { saved_deals: updatedSavedDeals }
    })

    if (error) {
      throw error
    }

    return NextResponse.json({
      success: true,
      message: 'Deal saved successfully',
      savedDeals: updatedSavedDeals
    })
  } catch (error) {
    console.error('Error saving deal:', error)
    return NextResponse.json({ success: false, error: 'Failed to save deal' }, { status: 500 })
  }
}

// DELETE - Unsave a deal
export async function DELETE(request: NextRequest) {
  try {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const dealSlug = searchParams.get('dealSlug')

    if (!dealSlug) {
      return NextResponse.json({ success: false, error: 'Deal slug is required' }, { status: 400 })
    }

    // Get current saved deals
    const savedDeals = user.user_metadata?.saved_deals || []

    // Remove from saved deals
    const updatedSavedDeals = savedDeals.filter((slug: string) => slug !== dealSlug)

    // Update user metadata
    const { error } = await supabase.auth.updateUser({
      data: { saved_deals: updatedSavedDeals }
    })

    if (error) {
      throw error
    }

    return NextResponse.json({
      success: true,
      message: 'Deal removed from saved',
      savedDeals: updatedSavedDeals
    })
  } catch (error) {
    console.error('Error removing saved deal:', error)
    return NextResponse.json({ success: false, error: 'Failed to remove saved deal' }, { status: 500 })
  }
}
