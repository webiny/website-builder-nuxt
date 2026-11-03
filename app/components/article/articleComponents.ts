import { createCmsComponent } from "@webiny/sdk-nuxt";
import HeroBlock from "./HeroBlock.vue";
import BannerBlock from "./BannerBlock.vue";
import RichTextBlock from "./RichTextBlock.vue";
import ThreeGridBoxBlock from "./ThreeGridBoxBlock.vue";

export const articleComponents = [
    createCmsComponent(HeroBlock, { name: "Article/Hero", label: "Hero Section", description: "" }),
    createCmsComponent(BannerBlock, { name: "Article/Banner", label: "Banner", description: "" }),
    createCmsComponent(RichTextBlock, { name: "Article/RichText", label: "Rich Text", description: "" }),
    createCmsComponent(ThreeGridBoxBlock, {
        name: "Article/ThreeGridBox",
        label: "Three Grid Box",
        description: ""
    })
];
