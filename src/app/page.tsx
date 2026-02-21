import { FadeInBlock } from "@/components/GsapAnimations";

export default function Home() {
    const milestones = [
        { year: "2023", desc: "Published 'The Modern Archive' in Oxford University Press." },
        { year: "2018", desc: "Awarded the National Research Fellowship for European History." },
        { year: "2012", desc: "Joined the Faculty of History at State University." },
        { year: "2010", desc: "Ph.D. in History, Cambridge University." },
    ];

    return (
        <div className="space-y-32 pb-24">
            {/* Hero Section */}
            <section className="pt-24 lg:pt-32">
                <FadeInBlock delay={0.2}>
                    <h1 className="text-5xl sm:text-7xl lg:text-8xl font-serif text-primary mb-6 leading-tight">
                        Jane Doe, Ph.D.
                    </h1>
                </FadeInBlock>
                <FadeInBlock delay={0.4}>
                    <p className="text-xl sm:text-2xl text-secondary font-medium tracking-wide pb-8 border-b border-primary/20 inline-block">
                        Historian | Researcher | Writer
                    </p>
                </FadeInBlock>
                <FadeInBlock delay={0.6}>
                    <p className="mt-8 text-lg sm:text-xl text-primary/80 max-w-2xl leading-relaxed">
                        Exploring the intersections of culture, politics, and memory in the 20th century.
                        Dedicated to archival preservation and historical narrative.
                    </p>
                </FadeInBlock>
            </section>

            {/* About Section */}
            <section className="grid grid-cols-1 md:grid-cols-12 gap-12">
                <div className="md:col-span-4">
                    <FadeInBlock>
                        <h2 className="text-3xl font-serif mb-6 sticky top-32">Biography</h2>
                    </FadeInBlock>
                </div>
                <div className="md:col-span-8 space-y-6 text-lg text-primary/80">
                    <FadeInBlock delay={0.2}>
                        <p>
                            Dr. Jane Doe is a senior historian specializing in mid-century European political movements.
                            Her work examines how archival records shape our modern understanding of historical truths
                            and state-sponsored narratives.
                        </p>
                    </FadeInBlock>
                    <FadeInBlock delay={0.3}>
                        <p>
                            With over two decades of academic research, she has contributed extensively to peer-reviewed
                            journals and led international symposiums on historical preservation. She currently serves
                            as a tenured professor, advising doctoral candidates and overseeing the University’s
                            Digital Archive Initiative.
                        </p>
                    </FadeInBlock>
                </div>
            </section>

            {/* Academic Timeline */}
            <section className="grid grid-cols-1 md:grid-cols-12 gap-12">
                <div className="md:col-span-4">
                    <FadeInBlock>
                        <h2 className="text-3xl font-serif mb-6 sticky top-32">Academic Timeline</h2>
                    </FadeInBlock>
                </div>
                <div className="md:col-span-8">
                    <div className="border-l border-primary/20 pl-8 space-y-12">
                        {milestones.map((item, index) => (
                            <FadeInBlock key={index} delay={index * 0.1}>
                                <div className="relative">
                                    <span className="absolute -left-[41px] top-1.5 w-3 h-3 bg-parchment border-2 border-primary rounded-full"></span>
                                    <span className="font-serif text-xl font-bold text-secondary mb-2 block">{item.year}</span>
                                    <p className="text-primary/80 leading-relaxed text-lg">{item.desc}</p>
                                </div>
                            </FadeInBlock>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
