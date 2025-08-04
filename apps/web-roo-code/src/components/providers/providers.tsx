"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ThemeProvider } from "next-themes"

// Lazily load PostHog on the client only so its ~40-60 KB bundle is
// split into a separate chunk that is fetched *after* the critical UI.
// This keeps the main bundle lean and improves First Contentful Paint.
import dynamic from "next/dynamic"

const PostHogProvider = dynamic(() => import("./posthog-provider").then((m) => m.PostHogProvider), {
    // Disable SSR – analytics only runs in the browser.
    ssr: false,
})

const queryClient = new QueryClient()

export const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        <QueryClientProvider client={queryClient}>
            {/* PostHog loads on demand in a separate chunk */}
            <PostHogProvider>
                <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
                    {children}
                </ThemeProvider>
            </PostHogProvider>
        </QueryClientProvider>
    )
}
