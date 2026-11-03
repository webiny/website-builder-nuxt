import { sdk, type WebsiteBuilderThemeInput } from "@webiny/sdk-nuxt";
import { componentGroups } from "./groups";

interface Options {
    tenantId?: string;
    preview?: boolean;
    previewParams?: string;
    theme?: WebsiteBuilderThemeInput;
}

/**
 * Initialises the Webiny SDK.
 * Must be called before any sdk methods are used (typically in useAsyncData).
 */
export const initializeContentSdk = ({ tenantId, preview, previewParams, theme }: Options = {}) => {
    const config = useRuntimeConfig();

    sdk.init({
        endpoint: String(config.public.webinyApiHost),
        token: String(config.public.webinyApiKey),
        tenant: tenantId ?? String(config.public.webinyApiTenant),
        preview,
        wb: { theme, previewParams, componentGroups }
    });
};
