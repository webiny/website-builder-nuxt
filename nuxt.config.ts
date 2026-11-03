import path from "path";
import tailwindcss from "@tailwindcss/vite";
import { injectThemeCss } from "@webiny/website-builder-nuxt/vite";

const r = (p: string) => path.resolve(__dirname, p);

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: "2025-07-15",
    devtools: { enabled: true },

    // Nuxt 4: all app code lives inside the app/ directory.
    srcDir: "app",

    // Global CSS (theme variables + Tailwind)
    css: ["~/assets/main.css"],

    // Read at runtime, not at build time, so one build can run against any Webiny project.
    // Use them in code through `useWebinyConfig()`.
    runtimeConfig: {
        public: {
            webinyApiKey: "{{WEBINY_API_KEY}}",
            webinyApiHost: "{{WEBINY_API_HOST}}",
            webinyApiTenant: "{{WEBINY_API_TENANT}}",
            webinyAdminHost: "{{WEBINY_ADMIN_HOST}}"
        }
    },

    nitro: {
        // Replaces the `{{WEBINY_*}}` placeholders above with environment variables at runtime.
        experimental: { envExpansion: true }
    },

    vite: {
        plugins: [
            tailwindcss(),
            await injectThemeCss(r("app/theme/theme.css"))
        ]
    }
});
