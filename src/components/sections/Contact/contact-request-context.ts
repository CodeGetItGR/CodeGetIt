import { createContext } from 'react';
import type { ContactFormData } from './contact.types';
import type { DetailedRequestFormState } from './useUIReducer';

export interface ContactRequestPreset {
    formData?: Partial<ContactFormData>;
    detailedRequest?: Partial<DetailedRequestFormState>;
    useDetailedRequest?: boolean;
}

export interface ContactRequestContextValue {
    currentRequest: ContactRequestPreset | null;
    openContactRequest: (preset: ContactRequestPreset) => void;
    clearContactRequest: () => void;
}

export const ContactRequestContext = createContext<ContactRequestContextValue | undefined>(undefined);
