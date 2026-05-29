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

    // Bundle the Webiny packages into the output so Nitro doesn't need to
    // resolve them at runtime (they're symlinked to a monorepo source tree).
    build: {
        transpile: [
            "@webiny/website-builder-nuxt",
            "@webiny/website-builder-vue",
            "@webiny/website-builder-sdk"
        ]
    },

    vite: {
        plugins: [
            tailwindcss(),
            await injectThemeCss(r("app/theme/theme.css"))
        ],
        // Map every import of the Webiny packages to this app's node_modules
        // so Vite always resolves from one canonical location regardless of
        // which symlinked package tree the import originates from.
        resolve: {
            alias: {
                "@webiny/website-builder-vue": r("node_modules/@webiny/website-builder-vue"),
                "@webiny/website-builder-sdk": r("node_modules/@webiny/website-builder-sdk"),
                "@webiny/website-builder-nuxt": r("node_modules/@webiny/website-builder-nuxt")
            }
        },
        server: {
            fs: {
                // Allow Vite to serve files from the linked monorepo packages.
                allow: [r("../wby-next1/packages")]
            }
        }
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
