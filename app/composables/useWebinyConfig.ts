export interface WebinyConfig {
    apiKey: string;
    apiHost: string;
    apiTenant: string;
    adminHost: string;
}

// Nitro leaves a `{{WEBINY_*}}` placeholder as-is when its environment variable is not set.
const read = (value: unknown, fallback = "") => {
    const text = String(value ?? "");
    return text === "" || text.startsWith("{{") ? fallback : text;
};

/**
 * The Webiny connection settings, from the `WEBINY_*` environment variables (see `nuxt.config.ts`).
 */
export const useWebinyConfig = (): WebinyConfig => {
    const config = useRuntimeConfig().public;

    return {
        apiKey: read(config.webinyApiKey),
        apiHost: read(config.webinyApiHost),
        apiTenant: read(config.webinyApiTenant, "root"),
        adminHost: read(config.webinyAdminHost)
    };
};
