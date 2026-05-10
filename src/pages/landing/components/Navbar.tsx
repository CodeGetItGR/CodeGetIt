import { useEffect, useState } from "react";
import {cn} from "@/lib/utils.ts";

const links = [
    { label: "Services", href: "#services" },
    { label: "Compare", href: "#compare" },
    { label: "Process", href: "#process" },
    { label: "Work", href: "#projects" },
    { label: "FAQ", href: "#faq" },
];

export function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <header
            className={cn("fixed inset-x-0 top-0 z-50 transition-all duration-500", scrolled ? "border-b border-white/6 bg-[#0a0f1e]/80 backdrop-blur-xl" : "bg-transparent")}>
            <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">

                {/* Logo */}
                <a href="/" className="flex items-center gap-2.5 shrink-0">
                    <div className="flex h-8 w-8 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/10 text-xs font-bold text-cyan-300">
                        CG
                    </div>
                    <span className="text-sm font-semibold tracking-tight text-white">
            CodeGetIt
          </span>
                </a>

                {/* Desktop links */}
                <nav className="hidden md:flex items-center gap-1">
                    {links.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            className="rounded-xl px-3.5 py-2 text-sm text-slate-400 transition-colors duration-200 hover:bg-white/5 hover:text-white"
                        >
                            {link.label}
                        </a>
                    ))}
                </nav>

                {/* Desktop CTA */}
                <div className="hidden md:flex items-center gap-3">
                    <a
                        href="#contact"
                        className="text-sm text-slate-400 transition-colors hover:text-white"
                    >
                        Contact
                    </a>
                    <a
                        href="#contact"
                        className="rounded-xl bg-cyan-400 px-4 py-2 text-sm font-semibold text-[#0a0f1e] transition-colors duration-200 hover:bg-cyan-300"
                    >
                        Get a Quote
                    </a>
                </div>

                {/* Mobile hamburger */}
                <button
                    className="flex md:hidden flex-col items-center justify-center gap-1.5 p-2"
                    onClick={() => setMobileOpen((v) => !v)}
                    aria-label="Toggle menu"
                >
                    <span className={["block h-px w-5 bg-white transition-all duration-300", mobileOpen ? "translate-y-[3.5px] rotate-45" : ""].join(" ")} />
                    <span className={["block h-px w-5 bg-white transition-all duration-300", mobileOpen ? "opacity-0" : ""].join(" ")} />
                    <span className={["block h-px w-5 bg-white transition-all duration-300", mobileOpen ? "translate-y-[-3.5px] -rotate-45" : ""].join(" ")} />
                </button>
            </div>

            {/* Mobile menu */}
            <div
                className={[
                    "md:hidden overflow-hidden transition-all duration-300 border-t border-white/6 bg-[#0a0f1e]/95 backdrop-blur-xl",
                    mobileOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0",
                ].join(" ")}
            >
                <nav className="flex flex-col px-6 py-4 gap-1">
                    {links.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            onClick={() => setMobileOpen(false)}
                            className="rounded-xl px-3.5 py-2.5 text-sm text-slate-400 transition-colors hover:bg-white/5 hover:text-white"
                        >
                            {link.label}
                        </a>
                    ))}
                    <div className="mt-3 pt-3 border-t border-white/6 flex flex-col gap-2">
                        <a href="#contact" className="rounded-xl px-3.5 py-2.5 text-sm text-slate-400 transition-colors hover:bg-white/5 hover:text-white">
                            Contact
                        </a>
                        <a href="#quote" className="rounded-xl bg-cyan-400 px-4 py-2.5 text-sm font-semibold text-[#0a0f1e] text-center">
                            Get a Quote
                        </a>
                    </div>
                </nav>
            </div>
        </header>
    );
}