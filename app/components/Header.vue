<script setup lang="ts">
import type { LanguagePaths } from "./LanguageSelector.vue";

interface Language {
    code: string;
    name: string;
    isDefault?: boolean;
}

defineProps<{
    languages?: Language[];
    languagePaths?: LanguagePaths;
    currentLanguageCode?: string;
}>();

const navigation = [
    { name: "Menu Item 1", href: "#" },
    { name: "Menu Item 2", href: "#" },
    { name: "Menu Item 3", href: "#" }
];
</script>

<template>
    <header class="bg-background border-b border-border shadow-sm sticky top-0 z-50">
        <nav
            aria-label="Global"
            class="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8"
        >
            <div class="flex sm:flex-1">
                <a href="/" class="text-lg font-bold tracking-tight text-primary">ACME Inc</a>
            </div>

            <div class="hidden sm:flex sm:gap-x-10">
                <a
                    v-for="item in navigation"
                    :key="item.name"
                    :href="item.href"
                    class="text-sm font-medium text-text-muted hover:text-text-base transition-colors"
                >
                    {{ item.name }}
                </a>
            </div>

            <div class="hidden lg:flex lg:flex-1 lg:justify-end lg:items-center lg:gap-4">
                <LanguageSelector
                    v-if="languages && languages.length > 0"
                    :languages="languages"
                    :language-paths="languagePaths"
                    :current-language-code="currentLanguageCode"
                />
                <a
                    href="#"
                    class="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary/80 transition-colors"
                >
                    Log in
                </a>
            </div>
        </nav>
    </header>
</template>
