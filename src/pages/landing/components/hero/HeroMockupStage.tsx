import { AnimatePresence, motion } from 'framer-motion';
import {HeroMockupFrame} from "@/pages/landing/components/hero/mockups/HeroMockupFrame.tsx";
import {AnalyticsScreen, BookingScreen, EcommerceScreen} from "./mockups";


interface HeroMockupStageProps {
    activeIndex: number;
}

export function HeroMockupStage({activeIndex}: HeroMockupStageProps) {
    return (
        <HeroMockupFrame>
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -18 }}
                    transition={{ duration: 0.4 }}
                >
                    {activeIndex === 0 && <EcommerceScreen />}
                    {activeIndex === 1 && <BookingScreen />}
                    {activeIndex === 2 && <AnalyticsScreen />}
                </motion.div>
            </AnimatePresence>
        </HeroMockupFrame>
    );
}