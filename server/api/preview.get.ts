/**
 * Enables preview mode by setting the __wb_preview cookie, then redirects
 * to the requested page path (preserving all query parameters).
 *
 * Usage: GET /api/preview?wb.path=/my-page&wb.preview=true&...
 */
export default defineEventHandler(event => {
    console.log('wooooo', event);
    const query = getQuery(event);
    const targetPath = String(query["wb.path"] ?? "/");

    // Use the original query string but swap the pathname to targetPath.
    // Use a relative URL so the redirect stays on the public domain even when
    // Nuxt runs behind a reverse proxy (getRequestURL returns the backend address).
    const { searchParams } = new URL(getRequestURL(event));
    const redirectUrl = `${targetPath}?${searchParams.toString()}`;

    // Set the preview cookie (SameSite=None; Secure so it works cross-origin from the admin)
    setCookie(event, "__wb_preview", "1", {
        path: "/",
        sameSite: "none",
        secure: true
    });

    return sendRedirect(event, redirectUrl, 307);
});
