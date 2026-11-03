import { sdk } from "@webiny/sdk-nuxt";
import { initializeContentSdk } from "~/contentSdk/initializeContentSdk";

const REDIRECTS_TTL = 60; // seconds

/**
 * Returns a redirect definition for the given pathname, or null if none exists.
 *
 * Query params:
 *   pathname  - the URL path to look up
 *   wb.tenant - tenant override (defaults to env var)
 */
export default defineEventHandler(async event => {
    const query = getQuery(event);
    const pathname = String(query.pathname ?? "");
    const tenantId = String(query["wb.tenant"] ?? "");

    if (!pathname) {
        return { redirect: null };
    }

    initializeContentSdk({ tenantId: tenantId || undefined });

    const result = await sdk.wb.getRedirectByPath(pathname);
    const redirect = result.isOk() ? result.value : undefined;

    if (redirect) {
        setResponseHeaders(event, {
            "Cache-Control": `public, max-age=${REDIRECTS_TTL}, s-maxage=${REDIRECTS_TTL}, stale-while-revalidate=${REDIRECTS_TTL - 1}`
        });
        return { redirect };
    }

    setResponseHeaders(event, {
        "Cache-Control": "no-store, no-cache"
    });
    return { redirect: null };
});
