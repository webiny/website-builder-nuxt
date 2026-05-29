<script setup lang="ts">
import type { ComponentProps } from "@webiny/website-builder-nuxt";

interface BannerInputs {
    headline: string;
    ctaLabel: string;
    ctaUrl: string;
}

// Webiny editor components receive inputs, styles, element, and breakpoint as props.
const props = defineProps<ComponentProps<BannerInputs>>();
</script>

<template>
    <div class="bg-primary py-12 px-6 text-center text-white">
        <h2 class="text-3xl font-bold mb-4">{{ props.inputs.headline }}</h2>
        <a
            v-if="props.inputs.ctaLabel && props.inputs.ctaUrl"
            :href="props.inputs.ctaUrl"
            class="inline-block bg-white text-primary font-semibold px-6 py-3 rounded-md hover:bg-white/80 transition-colors"
        >
            {{ props.inputs.ctaLabel }}
        </a>
    </div>
</template>
