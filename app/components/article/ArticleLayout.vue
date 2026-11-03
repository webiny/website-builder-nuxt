<script setup lang="ts">
import { DynamicZoneField, useEntry } from "@webiny/sdk-nuxt";

const entry = useEntry<{ title: string; description: string; content: unknown[] }>();
</script>

<template>
    <article v-if="entry" class="mx-auto flex max-w-[1100px] flex-col px-[10px]">
        <h1 data-testid="article-title" class="mb-4 text-5xl font-extrabold text-gray-900">
            {{ entry.values.title ?? "Untitled" }}
        </h1>
        <p data-testid="article-description" class="text-xl text-gray-500">
            {{ entry.values.description ?? "" }}
        </p>
        <DynamicZoneField :value="entry.values.content" />
    </article>
</template>
