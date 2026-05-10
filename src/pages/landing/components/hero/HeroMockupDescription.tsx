import { motion } from 'framer-motion';

interface HeroMockupDescriptionProps {
    description: string;
}

export function HeroMockupDescription({ description }: HeroMockupDescriptionProps) {
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="mt-4 text-center sm:mt-6">
            <p className="text-xs text-slate-400 sm:text-sm">{description}</p>
        </motion.div>
    );
}
