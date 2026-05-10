import { useState } from 'react';
import {HeroConversation,} from './hero';

export function HeroSection() {
  const [activeMockup, setActiveMockup] = useState<number | null>(0);

  return (
      <section id="top" className="relative min-h-screen overflow-hidden text-slate-100 flex items-center">
          <div className="mx-auto w-full max-w-400 px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-20">
            <HeroConversation activeIndex={activeMockup} onSelect={setActiveMockup}/>
          </div>
      </section>
  );
}