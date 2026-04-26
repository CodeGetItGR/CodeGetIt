import type {ReactNode} from "react";
import {AiChatProvider} from "@/admin/providers/AiChatProvider";

export function AppProviders({ children }: { children: ReactNode }) {
    return (
        <AiChatProvider>
            {children}
        </AiChatProvider>
    );
}