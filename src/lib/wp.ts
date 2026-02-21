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

const WP_API_URL = process.env.NEXT_PUBLIC_WP_URL || "https://example.com/cms/wp-json/wp/v2";

/**
 * Helper function to fetch data from WordPress REST API.
 * Uses standard fetch with Next.js revalidation settings.
 */
async function fetchWPAPI(endpoint: string, options = { next: { revalidate: 3600 } }) {
    try {
        const res = await fetch(`${WP_API_URL}${endpoint}`, options);
        if (!res.ok) {
            console.error(`Error fetching WP API: ${res.statusText}`);
            return null;
        }
        return res.json();
    } catch (error) {
        console.error("Fetch WP API Error:", error);
        return null;
    }
}

export async function getPosts(): Promise<Post[]> {
    const data = await fetchWPAPI("/posts?_embed&per_page=10");
    return data || [];
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
    const data = await fetchWPAPI(`/posts?slug=${slug}&_embed`);
    return data && data.length > 0 ? data[0] : null;
}

export async function getPublications(): Promise<Publication[]> {
    const data = await fetchWPAPI("/publications?_embed&per_page=20");
    return data || [];
}

export async function getFeaturedPublication(): Promise<Publication | null> {
    const data = await fetchWPAPI("/publications?_embed&per_page=1&featured=1"); // Example logic
    return data && data.length > 0 ? data[0] : null;
}
