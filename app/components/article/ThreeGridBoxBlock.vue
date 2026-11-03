<script setup lang="ts">
defineProps<{
    boxes?: Array<{ title: string; description: string; icon?: string }>;
}>();
</script>

<template>
    <section data-block="three-grid-box" class="my-8 grid gap-6 md:grid-cols-3">
        <div v-for="(box, index) in boxes ?? []" :key="index" class="rounded-xl border border-slate-200 p-6">
            <img v-if="box.icon" :src="box.icon" :alt="box.title" class="mb-4 w-full rounded-lg" />
            <h3 class="mb-2 font-semibold">{{ box.title }}</h3>
            <p class="text-sm text-slate-500">{{ box.description }}</p>
        </div>
    </section>
</template>
