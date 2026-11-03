import { createWebsiteBuilderMiddleware } from "@webiny/website-builder-nuxt/server";

const isIgnored = (pathname: string) =>
    pathname.startsWith("/_") ||
    pathname.startsWith("/api/") ||
    pathname.startsWith("/favicon") ||
    pathname.includes(".");

const websiteBuilder = createWebsiteBuilderMiddleware({ ignore: isIgnored });

/**
 * Preview mode, tenant and the A/B visitor cookie come from the SDK middleware.
 * Webiny redirects are looked up here once it lets the request through.
 */
export default defineEventHandler(async event => {
    const handled = await websiteBuilder(event);
    if (handled !== undefined) {
        return handled;
    }

    const { pathname } = getRequestURL(event);
    if (isIgnored(pathname)) {
        return;
    }
    if (getCookie(event, "__wb_preview") === "1") {
        return;
    }

    try {
        const res = await $fetch<{ redirect: { to: string; permanent: boolean } | null }>(
            "/api/redirects",
            { query: { pathname, "wb.tenant": event.context.tenantId } }
        );

        if (res?.redirect) {
            return sendRedirect(event, res.redirect.to, res.redirect.permanent ? 308 : 307);
        }
    } catch {
        // If redirect lookup fails, continue to page rendering.
    }
});
