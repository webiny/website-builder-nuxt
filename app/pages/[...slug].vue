<script setup lang="ts">
import { DocumentRenderer } from "@webiny/website-builder-nuxt";
import { editorComponents } from "~/editorComponents";

const route = useRoute();
const slug = computed(() => (route.params.slug as string[] | undefined) ?? []);
const { page, languages, currentLanguageCode, languagePaths, isEditing } = await usePage(slug);
</script>

<template>
    <div class="min-h-screen bg-background flex flex-col">
        <Header
            :languages="languages ?? []"
            :language-paths="languagePaths"
            :current-language-code="currentLanguageCode"
        />
        <main class="flex-1 mx-auto w-full max-w-7xl px-6 lg:px-8 py-10">
            <NotFound v-if="!page && !isEditing" />
            <DocumentRenderer
                v-else
                :document="page ?? null"
                :components="editorComponents"
            />
        </main>
    </div>
</template>
