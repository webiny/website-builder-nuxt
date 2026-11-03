<script setup lang="ts">
import { EntryRenderer, RefField, sdk, useEntry } from "@webiny/sdk-nuxt";
import { initializeContentSdk } from "~/contentSdk/initializeContentSdk";

const MODEL_ID = "product";

const route = useRoute();
const entryId = computed(() => String(route.params.id));

initializeContentSdk();

const { data } = await useAsyncData(
    () => `product:${entryId.value}`,
    async () => {
        initializeContentSdk();
        const model = await sdk.cms.getModel(MODEL_ID);
        const entry = await sdk.cms.getEntry({ modelId: MODEL_ID, entryId: entryId.value });
        return {
            model: model.isOk() ? model.value : null,
            entry: entry.isOk() ? entry.value : null,
            error: model.isFail() ? model.error.message : entry.isFail() ? entry.error.message : null
        };
    }
);

const ProductView = defineComponent({
    setup() {
        const entry = useEntry<{ name: string; category: { id: string; modelId: string } | null }>();
        return () =>
            entry.value
                ? h("div", [
                      h("h1", { "data-testid": "product-name", class: "text-3xl font-bold" }, entry.value.values.name),
                      h(
                          RefField,
                          { value: entry.value.values.category },
                          {
                              default: ({ entries }: { entries: Array<{ values: Record<string, unknown> }> }) =>
                                  h("p", { "data-testid": "product-category" }, `Category: ${entries.map(e => e.values.name ?? e.values.title).join(", ")}`),
                              loading: () => h("p", { "data-testid": "product-category-loading" }, "Loading category…")
                          }
                      )
                  ])
                : null;
    }
});
</script>

<template>
    <main class="mx-auto max-w-3xl p-8">
        <p v-if="data?.error" data-testid="product-error">{{ data.error }}</p>
        <EntryRenderer v-else-if="data?.model && data.entry" :entry="data.entry" :model="data.model">
            <ProductView />
        </EntryRenderer>
    </main>
</template>
