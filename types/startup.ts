export interface YCFounder {
    name: string;
    title: string;
    bio: string;
    linkedin?: string;
    twitter?: string;
    avatar?: string;
}

export interface YCCompany {
    id: number;
    name: string;
    slug: string;
    website: string;
    small_logo_thumb_url: string;
    one_liner: string;
    long_description: string;
    team_size: number;
    industry: string;
    subindustry: string;
    launched_at: number;
    tags: string[];
    batch: string;
    status: string;
    all_locations: string;
    founders_enriched: YCFounder[];
    linkedin_url?: string;
    twitter_url?: string;
    crunchbase_url?: string;
}
