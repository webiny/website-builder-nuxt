/**
 * Server middleware that runs on every request to:
 *  1. Extract and forward tenant ID via event context
 *  2. Redirect to /api/preview when wb.preview or wb.editing is detected
 *  3. Exit preview mode when returning to a normal URL
 *  4. Check for and apply Webiny redirects
 */
export default defineEventHandler(async event => {
    const url = getRequestURL(event);
    console.log(url)
    const { pathname, searchParams } = url;

    // Skip Nitro internals, API routes, and static assets
    if (
        pathname.startsWith("/_") ||
        pathname.startsWith("/api/") ||
        pathname.startsWith("/favicon") ||
        pathname.includes(".")
    ) {
        return;
    }

    // --- Tenant detection ---
    const tenantId = searchParams.get("wb.tenant") ?? "root";
    event.context.tenantId = tenantId;

    // --- Preview / editing mode ---
    const previewRequested =
        searchParams.get("wb.preview") === "true" ||
        searchParams.get("wb.editing") === "true";

    const previewCookie = getCookie(event, "__wb_preview");
    const isPreviewActive = previewCookie === "1";

    if (previewRequested && !isPreviewActive) {
        // Not yet in preview mode → redirect to the preview API to set the cookie.
        // Use a relative URL so the redirect stays on the public domain even when
        // Nuxt runs behind a reverse proxy (getRequestURL returns the backend address).
        return sendRedirect(event, `/api/preview?${searchParams.toString()}`, 307);
    }

    if (!previewRequested && isPreviewActive) {
        // Preview mode was active but wb.preview is gone → clear the cookie and reload.
        deleteCookie(event, "__wb_preview");
        return sendRedirect(event, `${pathname}?${searchParams.toString()}`, 307);
    }

    if (isPreviewActive) {
        // Store wb.* params in event context so the SDK headers provider can
        // read them without relying on async-context composables.
        event.context.wbPreviewParams = searchParams.toString();
        // In preview: disable caching so editors see fresh content.
        setResponseHeaders(event, {
            "X-Preview-Params": searchParams.toString(),
            "Cache-Control": "no-store, no-cache, must-revalidate",
            Pragma: "no-cache",
            Expires: "0"
        });
        return; // let the page render normally
    }

    // --- Redirect lookup ---
    try {
        const redirectsUrl = new URL(url);
        redirectsUrl.pathname = "/api/redirects";
        redirectsUrl.searchParams.set("pathname", pathname);
        redirectsUrl.searchParams.set("wb.tenant", tenantId);

        const res = await $fetch<{ redirect: { to: string; permanent: boolean } | null }>(
            redirectsUrl.toString()
        );

        if (res?.redirect) {
            return sendRedirect(
                event,
                new URL(res.redirect.to, url).toString(),
                res.redirect.permanent ? 308 : 307
            );
        }
    } catch {
        // If redirect lookup fails, continue to page rendering.
    }
});
