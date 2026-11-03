/**
 * Allows the Webiny Admin to embed this site in an iframe (page editor and preview).
 * Read per request, so `WEBINY_ADMIN_HOST` set when the server starts is respected.
 */
export default defineEventHandler(event => {
    const ancestors = [
        process.env.WEBINY_ADMIN_HOST || "http://localhost:3001",
        ...(process.env.WEBINY_ADDITIONAL_FRAME_ANCESTORS ?? "").split(",")
    ]
        .map(host => host.trim())
        .filter(Boolean);

    setResponseHeader(event, "Content-Security-Policy", `frame-ancestors ${ancestors.join(" ")}`);
});
