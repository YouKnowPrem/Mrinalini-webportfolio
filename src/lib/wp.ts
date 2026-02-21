export type Post = {
    id: number;
    title: { rendered: string };
    excerpt: { rendered: string };
    content: { rendered: string };
    slug: string;
    date: string;
};

export type Publication = {
    id: number;
    title: { rendered: string };
    acf: {
        journal_name: string;
        publication_year: string;
        external_link: string;
    };
};

// Safe fallback for undefined environment variables during Vercel build
const API_URL = process.env.NEXT_PUBLIC_WP_URL || "https://example.com/cms/wp-json";

/**
 * Bulletproof helper function to fetch data from WordPress REST API.
 * Safely handles missing endpoints, CORS issues, and unresolvable domains.
 */
async function fetchWPAPI(endpoint: string) {
    try {
        // Basic formatting safety
        const safeBaseUrl = API_URL.endsWith("/") ? API_URL.slice(0, -1) : API_URL;
        const safeEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;

        const res = await fetch(`${safeBaseUrl}${safeEndpoint}`, {
            next: { revalidate: 3600 },
        });

        if (!res.ok) {
            console.warn(`[WP API] Fetch failed: ${res.statusText} (${res.status}) for ${endpoint}`);
            return null;
        }

        // Safely parse JSON to prevent crashes on unexpectedly formatted responses (e.g. 404 HTML pages)
        const text = await res.text();
        try {
            return JSON.parse(text);
        } catch (parseError) {
            console.warn(`[WP API] JSON parse error for ${endpoint}`, parseError);
            return null;
        }
    } catch (error) {
        console.warn(`[WP API] Network/Build Fetch Error for ${endpoint}:`, error);
        return null; // Always return null to prevent Next.js from panicking during build
    }
}

export async function getPosts(): Promise<Post[]> {
    const data = await fetchWPAPI("/wp/v2/posts?_embed&per_page=10");
    return Array.isArray(data) ? data : []; // Safe array fallback
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
    const data = await fetchWPAPI(`/wp/v2/posts?slug=${slug}&_embed`);
    return Array.isArray(data) && data.length > 0 ? data[0] : null;
}

export async function getPublications(): Promise<Publication[]> {
    const data = await fetchWPAPI("/wp/v2/publications?_embed&per_page=20");
    return Array.isArray(data) ? data : []; // Safe array fallback 
}

export async function getFeaturedPublication(): Promise<Publication | null> {
    const data = await fetchWPAPI("/wp/v2/publications?_embed&per_page=1&featured=1");
    return Array.isArray(data) && data.length > 0 ? data[0] : null;
}
