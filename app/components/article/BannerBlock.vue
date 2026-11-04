<script setup lang="ts">
defineProps<{
    title?: string;
    actionUrl?: string;
    actionLabel?: string;
    image?: string;
}>();
</script>

<template>
    <section data-block="banner" class="my-8 flex items-center gap-8 rounded-2xl border border-indigo-100 bg-indigo-50 p-8">
        <img v-if="image" class="h-20 w-20 rounded-xl object-cover" :src="image" :alt="title" />
        <div>
            <h3 class="mb-2 text-2xl font-bold text-slate-900">{{ title }}</h3>
            <a v-if="actionUrl" :href="actionUrl" class="text-indigo-600">{{ actionLabel }}</a>
        </div>
    </section>
</template>
