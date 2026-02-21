"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
    const pathname = usePathname();

    const links = [
        { name: "About", path: "/" },
        { name: "Publications", path: "/publications" },
        { name: "Archive", path: "/archive" },
        { name: "Contact", path: "/#contact" },
    ];

    return (
        <header className="fixed top-0 left-0 w-full bg-parchment/90 backdrop-blur-sm z-50 py-6 border-b border-primary/10">
            <div className="max-w-5xl mx-auto flex justify-between items-center px-4 sm:px-8 md:px-16 lg:px-24">
                <Link href="/" className="font-serif text-xl sm:text-2xl font-semibold tracking-wide">
                    Dr. Jane Doe
                </Link>
                <nav className="hidden sm:flex space-x-8 text-sm uppercase tracking-widest text-primary/80">
                    {links.map((link) => (
                        <Link
                            key={link.name}
                            href={link.path}
                            className={`hover:text-primary transition-colors relative group ${pathname === link.path ? "text-primary font-medium" : ""
                                }`}
                        >
                            {link.name}
                            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-primary transition-all duration-300 group-hover:w-full"></span>
                        </Link>
                    ))}
                </nav>
            </div>
        </header>
    );
}
