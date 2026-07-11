import { NextResponse } from 'next/server'
import { fetchDealBySlugFromDB } from '@/lib/deals-server'

export const dynamic = 'force-dynamic'

interface Params {
  params: {
    slug: string
  }
}

export async function GET(request: Request, { params }: Params) {
  try {
    const { slug } = params
    if (!slug) {
      return NextResponse.json({ error: 'Missing deal slug parameter' }, { status: 400 })
    }

    const deal = await fetchDealBySlugFromDB(slug)
    if (!deal) {
      return NextResponse.json({ error: `Deal not found for slug: ${slug}` }, { status: 404 })
    }

    const isDofollow = deal.tags?.includes('dofollow') || false
    const targetUrl = deal.providerWebsite || `https://www.${(deal.provider || 'unknown').toLowerCase().replace(/\s+/g, '')}.com`
    
    return NextResponse.json({
      success: true,
      dealSlug: slug,
      provider: deal.provider,
      websiteUrl: targetUrl,
      dofollow: isDofollow,
      relAttribute: isDofollow ? 'noopener' : 'nofollow noopener noreferrer',
      htmlVerificationElement: `<a href="${targetUrl}" target="_blank" rel="${isDofollow ? 'noopener' : 'nofollow noopener noreferrer'}">About ${deal.provider}</a>`,
      verifiedAt: new Date().toISOString(),
      certificationAuthority: 'FoundersPrime Automated SEO Engine'
    })
  } catch (error: any) {
    console.error('Error verifying dofollow status:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
