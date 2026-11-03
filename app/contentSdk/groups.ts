import type { ComponentGroup, ComponentManifest } from "@webiny/sdk-nuxt";

export const componentGroups: ComponentGroup[] = [
    {
        name: "basic",
        label: "Basic",
        description: "Components for simple content creation"
    },
    {
        name: "custom",
        label: "Custom",
        description: "Assorted custom components",
        filter: (component: ComponentManifest) => !component.group
    }
];
