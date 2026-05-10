import { useState } from 'react';
import { HeroConversation } from './hero';

export function HeroSection() {
    const [activeMockup, setActiveMockup] = useState<number | null>(0);

    return (
        <section
            id="top"
            className="relative flex items-center justify-center overflow-hidden px-4 py-8 text-slate-100 sm:px-6 sm:py-12 lg:px-8 lg:py-26"
        >
            <HeroConversation activeIndex={activeMockup} onSelect={setActiveMockup} />
        </section>
    );
}
