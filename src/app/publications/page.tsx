import { FadeInBlock } from "@/components/GsapAnimations";
import { getPublications } from "@/lib/wp";

export const revalidate = 3600; // revalidate every hour

export const metadata = {
    title: "Publications",
    description: "Academic papers, books, and articles by Dr. Jane Doe.",
};

export default async function PublicationsPage() {
    const publications = await getPublications();

    return (
        <div className="pt-24 lg:pt-32 pb-24">
            <FadeInBlock>
                <h1 className="text-4xl sm:text-6xl font-serif mb-16 border-b border-primary/10 pb-8">
                    Selected Publications
                </h1>
            </FadeInBlock>

            <div className="space-y-16">
                {publications.length > 0 ? (
                    publications.map((pub, index) => (
                        <FadeInBlock key={pub.id} delay={index * 0.1}>
                            <article className="group flex flex-col md:flex-row md:items-baseline gap-4 md:gap-8">
                                <div className="md:w-32 flex-shrink-0 text-secondary font-serif text-xl">
                                    {pub.acf?.publication_year || "N/A"}
                                </div>
                                <div className="flex-grow">
                                    <h2 className="text-2xl font-serif mb-2 leading-snug">
                                        <span
                                            dangerouslySetInnerHTML={{ __html: pub.title.rendered }}
                                        />
                                    </h2>
                                    <p className="text-primary/70 italic mb-4">
                                        {pub.acf?.journal_name || "Independent Publication"}
                                    </p>
                                    {pub.acf?.external_link && (
                                        <a
                                            href={pub.acf.external_link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-block text-sm uppercase tracking-widest font-semibold text-secondary hover:text-primary transition-colors border-b border-primary/30 hover:border-primary pb-1"
                                        >
                                            Read Publication
                                        </a>
                                    )}
                                </div>
                            </article>
                        </FadeInBlock>
                    ))
                ) : (
                    <FadeInBlock delay={0.2}>
                        <p className="text-lg text-primary/60 italic">No publications found. Ensure WordPress API is connected.</p>
                    </FadeInBlock>
                )}
            </div>
        </div>
    );
}
