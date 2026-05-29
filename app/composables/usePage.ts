/**
 * Shared page logic used by both index.vue (root /) and [...slug].vue (all other paths).
 */
import { contentSdk } from "@webiny/website-builder-nuxt";
import { Webiny } from "@webiny/sdk";
import { initializeContentSdk } from "~/contentSdk/initializeContentSdk";
import { theme } from "~/theme/theme";
import { normalizeSlug } from "~/utils/normalizeSlug";

interface Language {
    code: string;
    name: string;
    isDefault?: boolean;
}

export function usePage(slug: ComputedRef<string[]>) {
    const route = useRoute();
    const config = useRuntimeConfig();

    // ---- Preview / editing mode ------------------------------------------
    // decode: v => v prevents Nuxt's default JSON.parse from turning "1" into the number 1.
    const previewCookie = useCookie("__wb_preview", { decode: v => v });
    const isPreview = computed(() => previewCookie.value === "1");
    const isEditing = computed(() => route.query["wb.editing"] === "true");

    // ---- Tenant ----------------------------------------------------------
    const tenantId = computed(
        () =>
            String(route.query["wb.tenant"] || "") ||
            String(config.public.webinyApiTenant)
    );

    function getWebinySdk() {
        return new Webiny({
            endpoint: String(config.public.webinyApiHost),
            token: String(config.public.webinyApiKey),
            tenant: tenantId.value
        });
    }

    // When in preview mode, build a wb.* query string from the route so PreviewSdk
    // can call getPageById() directly without relying on the fragile headers provider.
    const previewParams = computed(() =>
        isPreview.value ? new URLSearchParams(route.query as Record<string, string>).toString() : undefined
    );

    // Initialize the SDK eagerly so it's ready for rendering even when
    // useAsyncData restores from SSR payload and skips the fetcher.
    initializeContentSdk({ tenantId: tenantId.value, preview: isPreview.value, previewParams: previewParams.value, theme });

    // ---- Page data -------------------------------------------------------
    const { data: page } = useAsyncData(
        () => `page:${slug.value.join("/")}:${isPreview.value}`,
        async () => {
            initializeContentSdk({ tenantId: tenantId.value, preview: isPreview.value, previewParams: previewParams.value, theme });
            return await contentSdk.getPage(normalizeSlug(slug.value));
        }
    );

    // ---- Languages -------------------------------------------------------
    const { data: languages } = useAsyncData("languages", async () => {
        try {
            const sdk = getWebinySdk();
            const result = await sdk.languages.listLanguages();
            return result.isFail() ? ([] as Language[]) : (result.value as Language[]);
        } catch {
            return [] as Language[];
        }
    });

    // ---- Language resolution ---------------------------------------------
    const currentLanguageCode = computed(() => {
        const lang = page.value?.properties?.language;
        if (lang) return lang;
        const matched = (languages.value ?? []).find(l => l.code === slug.value[0]);
        return matched?.code;
    });

    const languagePaths = computed(
        () => (page.value?.languagePaths ?? {}) as Record<string, string>
    );

    // ---- SEO -------------------------------------------------------------
    const seoTitle = computed(
        () =>
            page.value?.properties?.seo?.title ??
            page.value?.properties?.title ??
            "Page"
    );
    const seoDescription = computed(
        () =>
            page.value?.properties?.seo?.description ??
            page.value?.properties?.description ??
            ""
    );

    useHead({
        title: seoTitle,
        meta: [{ name: "description", content: seoDescription }]
    });

    useSeoMeta({
        ogTitle: () => page.value?.properties?.social?.title ?? seoTitle.value,
        ogDescription: () =>
            page.value?.properties?.social?.description ?? seoDescription.value,
        ogType: "website"
    });

    return { page, languages, currentLanguageCode, languagePaths, isEditing };
}
