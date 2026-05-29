import { contentSdk, type WebsiteBuilderThemeInput } from "@webiny/website-builder-nuxt";
import { registerComponentGroups } from "./groups";

interface Options {
    tenantId?: string;
    preview?: boolean;
    previewParams?: string;
    theme?: WebsiteBuilderThemeInput;
}

/**
 * Initialises the Webiny content SDK.
 * Must be called before any contentSdk methods are used (typically in useAsyncData).
 */
export const initializeContentSdk = ({ tenantId, preview, previewParams, theme }: Options = {}) => {
    const config = useRuntimeConfig();

    contentSdk.init(
        {
            apiKey: String(config.public.webinyApiKey),
            apiHost: String(config.public.webinyApiHost),
            apiTenant: tenantId ?? String(config.public.webinyApiTenant),
            preview,
            previewParams,
            theme
        },
        registerComponentGroups
    );
};
