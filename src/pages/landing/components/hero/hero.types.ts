import type { Translations } from '@/i18n/types';

export type HeroMockupIndex = 0 | 1 | 2;

// Pull the full hero copy shape from translations
type HeroTranslations = Translations['landing']['hero'];

// Extend mobile with the new selector fields
export type HeroCopy = Omit<HeroTranslations, 'mobile'> & {
    mobile: HeroTranslations['mobile'] & {
        question: string;
        prompt: string;
        chips: Array<{ label: string }>;
        headlines: [string, string, string];
        highlights: [string, string, string];
        subtitles: [string, string, string];
    };
};

export interface HeroConversationOption {
    id: string;
    label: string;
    helper: string;
    headline: string;
    highlight: string;
    description: string;
}

export interface HeroConversationCopy {
    intro: string;
    options: HeroConversationOption[];
}
