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

    runtimeConfig: {
        public: {
            webinyApiKey: process.env.WEBINY_API_KEY ?? "",
            webinyApiHost: process.env.WEBINY_API_HOST ?? "",
            webinyApiTenant: process.env.WEBINY_API_TENANT ?? "root",
            webinyAdminHost: process.env.WEBINY_ADMIN_HOST ?? ""
        }
    },

    vite: {
        plugins: [
            tailwindcss(),
            await injectThemeCss(r("app/theme/theme.css"))
        ]
    },

    // Allow the Webiny editor to embed this site in an iframe.
    routeRules: {
        "/**": {
            headers: {
                "Content-Security-Policy": [
                    "frame-ancestors",
                    process.env.WEBINY_ADMIN_HOST ?? "http://localhost:3001",
                    ...(process.env.WEBINY_ADDITIONAL_FRAME_ANCESTORS ?? "").split(",").filter(Boolean)
                ].join(" ")
            }
        }
    }
});
