<script setup lang="ts">
import { EntryRenderer, sdk } from "@webiny/sdk-nuxt";
import { initializeContentSdk } from "~/contentSdk/initializeContentSdk";
import { articleComponents } from "~/components/article/articleComponents";
import ArticleLayout from "~/components/article/ArticleLayout.vue";

const MODEL_ID = "code-article";

const route = useRoute();
const previewCookie = useCookie("__wb_preview", { decode: v => v });
const isPreview = computed(() => previewCookie.value === "1");
const isEditing = computed(() => route.query["wb.editing"] === "true");
const slug = computed(() => ((route.params.slug as string[] | undefined) ?? []).join("/"));
const tenantId = computed(() => (route.query["wb.tenant"] as string | undefined) || undefined);

initializeContentSdk({ tenantId: tenantId.value, preview: isPreview.value });

const { data } = await useAsyncData(
    () => `article:${slug.value}:${isPreview.value}:${route.query["wb.id"] ?? ""}`,
    async () => {
        initializeContentSdk({ tenantId: tenantId.value, preview: isPreview.value });

        const modelResult = await sdk.cms.getModel(MODEL_ID);
        const model = modelResult.isOk() ? modelResult.value : null;

        const entryId = route.query["wb.id"] as string | undefined;
        if (entryId) {
            const result = await sdk.cms.getEntry({ modelId: MODEL_ID, entryId });
            return { model, entry: result.isOk() ? result.value : null };
        }

        const result = await sdk.cms.listEntries({
            modelId: MODEL_ID,
            where: { values: { slug: slug.value } },
            limit: 1
        });
        const entry = result.isOk() ? (result.value.data[0] ?? null) : null;
        return { model, entry };
    }
);
</script>

<template>
    <main class="pb-12">
        <div v-if="!data?.model">Unable to load model {{ MODEL_ID }}.</div>
        <div v-else-if="!data.entry && !isEditing" class="p-8">Article not found.</div>
        <!-- In the CMS editor the entry comes from the editor, keyed by `wb.id` (same as the Next.js starter). -->
        <ClientOnly v-else-if="isEditing">
            <EntryRenderer :entry="null" :model="data.model" :components="articleComponents">
                <ArticleLayout />
            </EntryRenderer>
        </ClientOnly>
        <EntryRenderer v-else :entry="data.entry" :model="data.model" :components="articleComponents">
            <ArticleLayout />
        </EntryRenderer>
    </main>
</template>
