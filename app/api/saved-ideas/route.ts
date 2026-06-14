import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

// Saved startup ideas are stored on the authenticated user's metadata
// (mirrors /api/saved-deals). Each entry is a stable idea id/slug.

// GET - Fetch the user's saved ideas
export async function GET() {
  try {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    const savedIdeas = user.user_metadata?.saved_ideas || []
    return NextResponse.json({ success: true, savedIdeas, count: savedIdeas.length })
  } catch (error) {
    console.error('Error fetching saved ideas:', error)
    return NextResponse.json({ success: false, error: 'Failed to fetch saved ideas' }, { status: 500 })
  }
}

// POST - Save an idea
export async function POST(request: NextRequest) {
  try {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    const { ideaId } = await request.json()
    if (!ideaId || typeof ideaId !== 'string') {
      return NextResponse.json({ success: false, error: 'Idea id is required' }, { status: 400 })
    }

    const savedIdeas: string[] = user.user_metadata?.saved_ideas || []
    if (savedIdeas.includes(ideaId)) {
      return NextResponse.json({ success: true, message: 'Idea already saved', savedIdeas })
    }

    const updated = [...savedIdeas, ideaId]
    const { error } = await supabase.auth.updateUser({ data: { saved_ideas: updated } })
    if (error) throw error

    return NextResponse.json({ success: true, message: 'Idea saved', savedIdeas: updated })
  } catch (error) {
    console.error('Error saving idea:', error)
    return NextResponse.json({ success: false, error: 'Failed to save idea' }, { status: 500 })
  }
}

// DELETE - Unsave an idea (id passed as ?ideaId=)
export async function DELETE(request: NextRequest) {
  try {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    const ideaId = new URL(request.url).searchParams.get('ideaId')
    if (!ideaId) {
      return NextResponse.json({ success: false, error: 'Idea id is required' }, { status: 400 })
    }

    const savedIdeas: string[] = user.user_metadata?.saved_ideas || []
    const updated = savedIdeas.filter((id) => id !== ideaId)
    const { error } = await supabase.auth.updateUser({ data: { saved_ideas: updated } })
    if (error) throw error

    return NextResponse.json({ success: true, message: 'Idea removed', savedIdeas: updated })
  } catch (error) {
    console.error('Error removing saved idea:', error)
    return NextResponse.json({ success: false, error: 'Failed to remove saved idea' }, { status: 500 })
  }
}
