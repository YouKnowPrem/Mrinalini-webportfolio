"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export function FadeInBlock({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) {
    const el = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.fromTo(el.current,
            { opacity: 0, y: 15 },
            { opacity: 1, y: 0, duration: 1.2, ease: "power2.out", delay }
        );
    }, [delay]);

    return <div ref={el} className="opacity-0">{children}</div>;
}
