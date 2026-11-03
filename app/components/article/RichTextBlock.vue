<script setup lang="ts">
const props = defineProps<{ content?: { html?: string } | string }>();

const html = computed(() => {
    if (typeof props.content === "string") {
        return props.content;
    }
    return props.content?.html ?? "";
});
</script>

<template>
    <div data-block="rich-text" class="my-8 prose max-w-none" v-html="html" />
</template>
