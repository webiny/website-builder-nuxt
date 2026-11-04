<script setup lang="ts">
defineProps<{
    title?: string;
    subtitle?: string;
    description?: string;
    callToActionButtonLabel?: string;
    callToActionButtonUrl?: string;
}>();
</script>

<template>
    <section data-block="hero" class="my-8 rounded-2xl bg-slate-900 p-10 text-white">
        <p v-if="subtitle" class="mb-3 text-sm font-medium uppercase tracking-wider text-emerald-400">
            {{ subtitle }}
        </p>
        <h2 class="mb-4 text-3xl font-bold">{{ title }}</h2>
        <p class="mb-6 text-lg text-slate-300">{{ description }}</p>
        <a
            v-if="callToActionButtonUrl"
            :href="callToActionButtonUrl"
            class="inline-block rounded-lg bg-emerald-500 px-6 py-3 font-medium"
        >
            {{ callToActionButtonLabel }}
        </a>
    </section>
</template>
