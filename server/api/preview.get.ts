import { createPreviewHandler } from "@webiny/website-builder-nuxt/server";

/**
 * Turns preview mode on, then redirects to `wb.path`.
 *
 * Usage: GET /api/preview?wb.path=/my-page&wb.preview=true&...
 */
export default defineEventHandler(createPreviewHandler());
