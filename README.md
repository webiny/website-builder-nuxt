# Webiny Website Builder — Nuxt Starter

A Nuxt 3 starter kit for building sites powered by Webiny Website Builder.

---

## Get started

Follow the [Learn Webiny Website Builder](https://www.webiny.com/learn/course/website-builder/setting-up-website-builder) course to get up and running, or check out the [Learn Webiny](https://webiny.com/learn) course for a broader introduction.

## Environment variables

Copy the block below into a `.env` file at the project root and fill in your values.

```bash
# Required — your Webiny API credentials.
# Find these in Webiny Admin → Website Builder → Configure Starter Kit (select Nuxt).
WEBINY_API_KEY=your-api-key
WEBINY_API_HOST=https://your-api.cloudfront.net
WEBINY_API_TENANT=root

# Required — URL of your Webiny Admin app.
# Allows the editor to embed this site in an iframe for live preview/editing.
WEBINY_ADMIN_HOST=https://your-admin.cloudfront.net

# Optional — extra origins allowed to embed this site, comma-separated.
# Useful when running multiple Admin instances locally.
# WEBINY_ADDITIONAL_FRAME_ANCESTORS=https://admin2.localhost,https://admin3.localhost
```

## Documentation

For full documentation, visit [webiny.com/docs](https://www.webiny.com/docs).

## Multi-language

Languages are managed in Webiny. Each page has a `language` property and a set of `languagePaths` that map language codes to their corresponding URLs (e.g. `{ en: "/en/contact", de: "/de/kontakt" }`).

Rules of URLs in the Website Builder:
- 1 language in the system - pages are NOT prefixed with the language code
- 2 or more languages in the system - page paths are prefixed with their language code (e.g. `/de/about`).

The `LanguageSelector` component in the header reads the available languages and the current language from the server, and renders a dropdown that links directly to the equivalent page in each language. When no matching page exists for a given URL, the active language is inferred from the first URL segment.

## Community

For help, discussion about best practices, or feature ideas:

[Join our Slack community](https://www.webiny.com/slack)
