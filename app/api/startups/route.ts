import { NextRequest } from 'next/server';
import startupsData from '@/public/data/verified-startups.json';

// Force this route to be dynamic
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get('category');
    const minRevenue = searchParams.get('minRevenue');
    const maxRevenue = searchParams.get('maxRevenue');
    const country = searchParams.get('country');
    const search = searchParams.get('search');
    const source = searchParams.get('source');
    const featured = searchParams.get('featured');
    const forSale = searchParams.get('forSale');
    
    let filtered = [...startupsData];
    
    // Apply filters
    if (category && category !== 'all') {
      const categoryLower = category.toLowerCase();
      filtered = filtered.filter(s => s.category.toLowerCase() === categoryLower);
    }
    
    if (minRevenue) {
      filtered = filtered.filter(s => s.revenue >= parseInt(minRevenue));
    }
    
    if (maxRevenue) {
      filtered = filtered.filter(s => s.revenue <= parseInt(maxRevenue));
    }
    
    if (country && country !== 'all') {
      const countryLower = country.toLowerCase();
      filtered = filtered.filter(s => s.country.toLowerCase() === countryLower);
    }
    
    if (source && source !== 'all') {
      const sourceLower = source.toLowerCase();
      filtered = filtered.filter(s => s.source.toLowerCase() === sourceLower);
    }
    
    if (featured === 'true') {
      filtered = filtered.filter(s => s.featured);
    }
    
    if (forSale && forSale !== 'all') {
      filtered = filtered.filter(s => s.forSale === (forSale === 'true'));
    }
    
    if (search) {
      const query = search.toLowerCase();
      filtered = filtered.filter(s =>
        s.name.toLowerCase().includes(query) ||
        s.description.toLowerCase().includes(query) ||
        s.category.toLowerCase().includes(query)
      );
    }
    
    return Response.json({
      success: true,
      startups: filtered,
      total: filtered.length
    });
  } catch (error) {
    console.error('Error fetching startups:', error);
    return Response.json({
      success: false,
      error: 'Failed to fetch startups',
      startups: [],
      total: 0
    }, { status: 500 });
  }
}
