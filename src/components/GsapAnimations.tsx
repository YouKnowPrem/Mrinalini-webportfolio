"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export function FadeInBlock({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) {
    const el = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Utilize gsap.context for React cleanup and to prevent double-firering during dev strict mode
        const ctx = gsap.context(() => {
            gsap.fromTo(el.current,
                { opacity: 0, y: 15 },
                { opacity: 1, y: 0, duration: 1.2, ease: "power2.out", delay }
            );
        });

        return () => ctx.revert();
    }, [delay]);

    return <div ref={el} className="opacity-0">{children}</div>;
}
