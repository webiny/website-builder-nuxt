import { sdk, type WebsiteBuilderThemeInput } from "@webiny/sdk-nuxt";
import { componentGroups } from "./groups";
// Explicit: this file also runs in server routes, which do not get the app's auto-imports.
import { useWebinyConfig } from "~/composables/useWebinyConfig";

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
    const config = useWebinyConfig();

    sdk.init({
        endpoint: config.apiHost,
        token: config.apiKey,
        tenant: tenantId ?? config.apiTenant,
        preview,
        wb: { theme, previewParams, componentGroups }
    });
};
