import { createComponent, createTextInput } from "@webiny/website-builder-nuxt";
import Hero1 from "./Hero1.vue";
import Banner from "./Banner.vue";

// Vue SFC components (objects) need a cast since createComponent expects a function signature.
// At runtime createComponent stores the component as-is; the cast only affects type inference.
type AnyComponent = (props: any) => any;

export const editorComponents = [
    createComponent(Hero1 as unknown as AnyComponent, {
        name: "Webiny/Hero",
        label: "Hero",
        inputs: {}
    }),
    createComponent(Banner as unknown as AnyComponent, {
        name: "Custom/Banner",
        label: "Banner",
        inputs: {
            headline: createTextInput({
                label: "Headline",
                description: "The main headline text displayed on the banner.",
                defaultValue: "Ready to get started?"
            }),
            ctaLabel: createTextInput({
                label: "Button Label",
                description: "The text displayed on the call-to-action button.",
                defaultValue: "Get started"
            }),
            ctaUrl: createTextInput({
                label: "Button URL",
                description: "The URL the button links to.",
                defaultValue: "/"
            })
        }
    })
];
