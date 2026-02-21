import { FadeInBlock } from "@/components/GsapAnimations";
import { getPosts } from "@/lib/wp";
import Link from "next/link";
import { format } from "date-fns";

export const revalidate = 3600;

export const metadata = {
    title: "Writing Archive",
    description: "Essays, thoughts, and reflections on history.",
};

export default async function ArchivePage() {
    const posts = await getPosts();

    return (
        <div className="pt-24 lg:pt-32 pb-24">
            <FadeInBlock>
                <h1 className="text-4xl sm:text-6xl font-serif mb-16 border-b border-primary/10 pb-8">
                    Writing Archive
                </h1>
            </FadeInBlock>

            <div className="space-y-12">
                {posts.length > 0 ? (
                    posts.map((post, index) => (
                        <FadeInBlock key={post.id} delay={index * 0.1}>
                            <article className="border border-primary/10 bg-white/30 p-8 hover:bg-white/50 transition-colors duration-500">
                                <time className="text-sm font-semibold tracking-widest text-secondary uppercase mb-4 block">
                                    {format(new Date(post.date), "MMMM d, yyyy")}
                                </time>
                                <h2 className="text-3xl font-serif mb-4 leading-snug">
                                    <Link href={`/archive/${post.slug}`} className="hover:text-secondary transition-colors">
                                        <span dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
                                    </Link>
                                </h2>
                                <div
                                    className="text-primary/70 line-clamp-3 mb-6"
                                    dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                                />
                                <Link
                                    href={`/archive/${post.slug}`}
                                    className="inline-block text-sm uppercase tracking-widest font-semibold text-secondary hover:text-primary transition-colors border-b border-primary/30 hover:border-primary pb-1"
                                >
                                    Read Essay
                                </Link>
                            </article>
                        </FadeInBlock>
                    ))
                ) : (
                    <FadeInBlock delay={0.2}>
                        <p className="text-lg text-primary/60 italic">No archive entries found. Ensure WordPress API is connected.</p>
                    </FadeInBlock>
                )}
            </div>
        </div>
    );
}
