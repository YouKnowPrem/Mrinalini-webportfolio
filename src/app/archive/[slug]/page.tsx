import { getPostBySlug, getPosts } from "@/lib/wp";
import { format } from "date-fns";
import { notFound } from "next/navigation";
import { Metadata } from "next";

type Props = {
    params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const post = await getPostBySlug(params.slug);
    if (!post) return { title: "Not Found" };
    return {
        title: post.title.rendered,
        description: post.excerpt.rendered.replace(/<[^>]+>/g, "").slice(0, 160),
    };
}

export async function generateStaticParams() {
    const posts = await getPosts();
    return posts.map((post) => ({
        slug: post.slug,
    }));
}

export default async function SinglePostPage({ params }: Props) {
    const post = await getPostBySlug(params.slug);

    if (!post) {
        notFound();
    }

    return (
        <article className="pt-24 lg:pt-32 pb-24 max-w-3xl mx-auto">
            <header className="mb-12 text-center">
                <time className="text-sm font-semibold tracking-widest text-secondary uppercase mb-6 block">
                    {format(new Date(post.date), "MMMM d, yyyy")}
                </time>
                <h1
                    className="text-4xl sm:text-5xl lg:text-6xl font-serif text-primary mb-8 leading-tight"
                    dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                />
                <div className="w-24 h-[1px] bg-primary/20 mx-auto"></div>
            </header>

            <div
                className="prose prose-lg prose-amber mx-auto text-primary/80 
                   prose-headings:font-serif prose-headings:text-primary 
                   prose-a:text-secondary hover:prose-a:text-primary prose-a:transition-colors
                   prose-blockquote:border-secondary prose-blockquote:font-serif prose-blockquote:text-xl
                   prose-blockquote:italic"
                dangerouslySetInnerHTML={{ __html: post.content.rendered }}
            />
        </article>
    );
}
