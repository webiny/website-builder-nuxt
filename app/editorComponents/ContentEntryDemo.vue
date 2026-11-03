<script setup lang="ts">
import { useContentEntryList, type ResolvedContentEntryQuery } from "@webiny/sdk-nuxt";

interface CmsEntryShape {
    entryId: string;
    values: Record<string, unknown>;
}

const props = defineProps<{
    inputs: {
        featuredArticle?: CmsEntryShape | null;
        handpickedArticles?: CmsEntryShape[];
        latestArticles?: ResolvedContentEntryQuery<CmsEntryShape>;
    };
}>();

const { items, hasMore, loading, loadMore } = useContentEntryList(() => props.inputs.latestArticles);

const titleOf = (entry: CmsEntryShape) => String(entry.values?.title ?? entry.entryId);
</script>

<template>
    <section data-testid="content-entry-demo" class="mx-auto max-w-4xl space-y-10 px-6 py-12">
        <div>
            <h2 class="mb-4 text-2xl font-bold">Featured Article (manual single)</h2>
            <p v-if="inputs.featuredArticle" data-testid="featured">{{ titleOf(inputs.featuredArticle) }}</p>
            <p v-else class="italic text-gray-400">No featured article selected.</p>
        </div>

        <div>
            <h2 class="mb-4 text-2xl font-bold">Hand-picked Articles (manual list)</h2>
            <ul v-if="inputs.handpickedArticles?.length" data-testid="handpicked">
                <li v-for="entry in inputs.handpickedArticles" :key="entry.entryId">{{ titleOf(entry) }}</li>
            </ul>
            <p v-else class="italic text-gray-400">No articles hand-picked yet.</p>
        </div>

        <div>
            <h2 class="mb-4 text-2xl font-bold">Latest Articles (query mode)</h2>
            <ul v-if="items.length" data-testid="latest" class="grid gap-2 sm:grid-cols-2">
                <li v-for="entry in items" :key="entry.entryId" class="rounded border p-3">{{ titleOf(entry) }}</li>
            </ul>
            <p v-else class="italic text-gray-400">No articles matched the query.</p>
            <button
                v-if="hasMore"
                data-testid="load-more"
                :disabled="loading"
                class="mt-6 rounded-md bg-primary px-6 py-2 font-medium text-white disabled:opacity-50"
                @click="loadMore"
            >
                {{ loading ? "Loading…" : "Load more" }}
            </button>
        </div>
    </section>
</template>
