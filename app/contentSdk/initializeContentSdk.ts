import { contentSdk, type WebsiteBuilderThemeInput } from "@webiny/website-builder-nuxt";
import { registerComponentGroups } from "./groups";
// Explicit: this file also runs in server routes, which do not get the app's auto-imports.
import { useWebinyConfig } from "~/composables/useWebinyConfig";

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
    const config = useWebinyConfig();

    contentSdk.init(
        {
            apiKey: config.apiKey,
            apiHost: config.apiHost,
            apiTenant: tenantId ?? config.apiTenant,
            preview,
            previewParams,
            theme
        },
        registerComponentGroups
    );
};
