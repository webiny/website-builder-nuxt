import { createComponent, createContentEntryInput, createTextInput } from "@webiny/sdk-nuxt";
import Hero1 from "./Hero1.vue";
import Banner from "./Banner.vue";
import ContentEntryDemo from "./ContentEntryDemo.vue";

// Vue SFC components (objects) need a cast since createComponent expects a function signature.
// At runtime createComponent stores the component as-is; the cast only affects type inference.
type AnyComponent = (props: any) => any;

export const editorComponents = [
    createComponent(Hero1 as unknown as AnyComponent, {
        name: "Webiny/Hero",
        label: "Hero #12345",
        inputs: []
    }),
    createComponent(Banner as unknown as AnyComponent, {
        name: "Custom/Banner",
        label: "Banner",
        inputs: [
            createTextInput({
                name: "headline",
                label: "Headline",
                description: "The main headline text displayed on the banner.",
                defaultValue: "Ready to get started?"
            }),
            createTextInput({
                name: "ctaLabel",
                label: "Button Label",
                description: "The text displayed on the call-to-action button.",
                defaultValue: "Get started"
            }),
            createTextInput({
                name: "ctaUrl",
                label: "Button URL",
                description: "The URL the button links to.",
                defaultValue: "/"
            })
        ]
    }),
    createComponent(ContentEntryDemo as unknown as AnyComponent, {
        name: "Custom/ContentEntryDemo",
        label: "Content Entry Demo",
        inputs: [
            createContentEntryInput({
                name: "featuredArticle",
                label: "Featured Article",
                models: ["code-article"],
                mode: "manual"
            }),
            createContentEntryInput({
                name: "handpickedArticles",
                label: "Hand-picked Articles",
                models: ["code-article"],
                mode: "manual",
                list: true
            }),
            createContentEntryInput({
                name: "latestArticles",
                label: "Latest Articles",
                models: ["code-article"],
                mode: "query",
                query: {
                    sort: {
                        fields: [
                            { field: "createdOn", label: "Created On" },
                            { field: "values_title", label: "Title" }
                        ]
                    },
                    limit: { default: 2, max: 20 },
                    search: true,
                    pagination: true
                }
            })
        ]
    })
];
