import { AnimatePresence, motion } from 'framer-motion';
import { AnalyticsScreen, BookingScreen, PadoLivingScreen } from './mockups';
import { HeroMockupFrame } from '@/pages/landing/components/hero/mockups/HeroMockupFrame.tsx';

interface HeroMockupStageProps {
    activeIndex: number;
}

export function HeroMockupStage({ activeIndex }: HeroMockupStageProps) {
    return (
        <HeroMockupFrame activeIndex={activeIndex}>
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -18 }}
                    transition={{ duration: 0.4 }}
                    className="h-full"
                >
                    {activeIndex === 0 && <PadoLivingScreen />}
                    {activeIndex === 1 && <AnalyticsScreen />}
                    {activeIndex === 2 && <BookingScreen />}
                </motion.div>
            </AnimatePresence>
        </HeroMockupFrame>
    );
}
