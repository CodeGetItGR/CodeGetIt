import { motion } from 'framer-motion';
import { useCallback, useState, useEffect, useRef } from 'react';
import { ArrowLeft, Code2, Database, Globe } from 'lucide-react';
import { useLocale } from '@/i18n/UseLocale';
import { SectionHeading } from '@/pages/landing';
import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/admin/api/queryKeys.ts';
import { settingsApi } from '@/admin/api/settings.ts';
import { useContactRequest } from '@/components/sections/Contact/useContactRequest';
import { getServiceContactPreset } from './service-contact-presets';

const serviceIcons = [Globe, Code2, Database];

const featureMatrix = [
    ['Responsive Design', 'SEO Optimization', 'Fast Loading', 'Basic Integrations'],
    ['Responsive Design', 'SEO Optimization', 'Fast Loading', 'User Authentication', 'API Integrations', 'Dashboard UI'],
    [
        'Responsive Design',
        'SEO Optimization',
        'Fast Loading',
        'User Authentication',
        'API Integrations',
        'Dashboard UI',
        'Backend Architecture',
        'Database Design',
        'Admin Panel',
    ],
];

export function ServicesSection() {
    const { t } = useLocale();
    const { openContactRequest } = useContactRequest();

    const containerRef = useRef<HTMLDivElement | null>(null);

    const [hoverFeature, setHoverFeature] = useState<string | null>(null);
    const [lockedFeature, setLockedFeature] = useState<string | null>(null);

    const activeFeature = lockedFeature ?? hoverFeature;

    const settingsQuery = useQuery({
        queryKey: queryKeys.settings.list,
        queryFn: () => settingsApi.getPublic(),
    });

    const services = t.landing.services;

    const formatPrice = useCallback(
        (value: string) => services.from.replace('{price}', new Intl.NumberFormat('el-GR').format(Number.parseInt(value))),
        [services.from]
    );

    const toggleLock = useCallback((feature: string) => {
        setLockedFeature((prev) => (prev === feature ? null : feature));
    }, []);

    const handleGetStarted = useCallback(
        (index: number) => {
            openContactRequest(getServiceContactPreset(index));
        },
        [openContactRequest]
    );

    // ✅ close locked feature on outside click
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (!containerRef.current) return;

            if (!containerRef.current.contains(event.target as Node)) {
                setLockedFeature(null);
                setHoverFeature(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <section id="services" className="px-6 py-24">
            <div className="mx-auto max-w-6xl">
                <SectionHeading eyebrow={services.eyebrow} title={services.title} description={services.description} />

                <div ref={containerRef} className="mt-14 grid gap-6 md:grid-cols-3">
                    {services.items.map((service, index) => {
                        const Icon = serviceIcons[index] ?? serviceIcons[0];
                        const features = featureMatrix[index];

                        const price = settingsQuery.data?.[service.priceKey] ?? service.defaultPrice;

                        const isDimmed = activeFeature !== null && !features.includes(activeFeature);

                        return (
                            <motion.article
                                key={service.title}
                                whileHover={{ y: -6 }}
                                transition={{
                                    duration: 0.35,
                                    ease: 'easeOut',
                                }}
                                className={[
                                    'relative isolate flex h-full flex-col rounded-3xl border p-8',
                                    'transition-all duration-500 ease-out',
                                    'border-white/10 bg-slate-900/30 backdrop-blur-md',
                                    isDimmed ? 'opacity-40' : 'opacity-100',
                                ].join(' ')}
                            >
                                {/* ICON */}
                                <div className="mb-6 inline-flex w-fit rounded-2xl bg-white/10 p-3">
                                    <Icon className="h-6 w-6 text-cyan-300" />
                                </div>

                                {/* TITLE */}
                                <h3 className="text-2xl font-bold text-white">{service.title}</h3>

                                {/* DESCRIPTION */}
                                <p className="mt-3 text-sm leading-7 text-slate-300">{service.description}</p>

                                {/* FEATURES */}
                                <ul className="mt-6 flex-1 space-y-3">
                                    {features.map((feature) => {
                                        const isActive = activeFeature === feature;

                                        return (
                                            <li
                                                key={feature}
                                                onMouseEnter={() => !lockedFeature && setHoverFeature(feature)}
                                                onMouseLeave={() => !lockedFeature && setHoverFeature(null)}
                                                onClick={() => toggleLock(feature)}
                                                className={[
                                                    'flex cursor-pointer items-start gap-2 text-sm select-none',
                                                    'transition-colors duration-500 ease-out',
                                                    isActive ? 'text-cyan-200' : 'text-slate-300',
                                                ].join(' ')}
                                            >
                                                <div
                                                    className={[
                                                        'mt-1 h-1.5 w-1.5 rounded-full',
                                                        'transition-all duration-500 ease-out',
                                                        isActive ? 'scale-125 bg-cyan-300' : 'scale-100 bg-white/40',
                                                    ].join(' ')}
                                                />
                                                {feature}

                                                {lockedFeature === feature && (
                                                    <span className="ml-auto text-xs text-cyan-300">
                                                        <ArrowLeft width={15} height={15} />
                                                    </span>
                                                )}
                                            </li>
                                        );
                                    })}
                                </ul>

                                {/* PRICE */}
                                <div className="mt-auto">
                                    <div className="mt-8 text-2xl font-bold text-cyan-300">{formatPrice(price)}</div>

                                    <p className="mt-2 text-xs leading-relaxed text-slate-400"></p>

                                    <button
                                        type="button"
                                        onClick={() => handleGetStarted(index)}
                                        className="mt-6 w-full rounded-xl bg-white/10 px-4 py-3 font-semibold text-white transition-colors duration-300 ease-out hover:bg-cyan-300 hover:text-slate-950"
                                    >
                                        {services.getStarted}
                                    </button>
                                </div>
                            </motion.article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
