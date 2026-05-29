<script setup lang="ts">
export type LanguagePaths = Record<string, string>;

interface Language {
    code: string;
    name: string;
    isDefault?: boolean;
}

const props = defineProps<{
    languages: Language[];
    languagePaths?: LanguagePaths;
    currentLanguageCode?: string;
}>();

const open = ref(false);
const containerRef = ref<HTMLDivElement | null>(null);

const defaultLanguage = computed(() => props.languages.find(l => l.isDefault));
const activeCode = computed(() => props.currentLanguageCode ?? defaultLanguage.value?.code);
const activeLabel = computed(
    () =>
        props.languages.find(l => l.code === activeCode.value)?.name ??
        activeCode.value?.toUpperCase() ??
        "—"
);

function handleClickOutside(e: MouseEvent) {
    if (containerRef.value && !containerRef.value.contains(e.target as Node)) {
        open.value = false;
    }
}

onMounted(() => document.addEventListener("mousedown", handleClickOutside));
onUnmounted(() => document.removeEventListener("mousedown", handleClickOutside));
</script>

<template>
    <div v-if="languages.length" ref="containerRef" class="relative">
        <button
            class="flex items-center gap-1 rounded-md border border-border px-3 py-1.5 text-sm font-medium text-text-base hover:bg-surface transition-colors cursor-pointer"
            :aria-expanded="open"
            aria-haspopup="listbox"
            @click="open = !open"
        >
            {{ activeLabel }}
            <svg
                :class="['w-3 h-3 transition-transform', open ? 'rotate-180' : '']"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
            >
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
        </button>

        <div
            v-if="open"
            class="absolute right-0 mt-1 min-w-[8rem] rounded-md border border-border bg-background shadow-md z-50"
        >
            <ul role="listbox" class="py-1">
                <li
                    v-for="lang in languages"
                    :key="lang.code"
                    role="option"
                    :aria-selected="lang.code === activeCode"
                >
                    <a
                        :href="languagePaths?.[lang.code] ?? `/${lang.code}`"
                        :class="[
                            'block px-4 py-2 text-sm transition-colors cursor-pointer',
                            lang.code === activeCode
                                ? 'font-semibold text-primary bg-surface'
                                : 'text-text-base hover:bg-surface'
                        ]"
                    >
                        {{ lang.name }}
                    </a>
                </li>
            </ul>
        </div>
    </div>
</template>
