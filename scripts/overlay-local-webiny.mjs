// Copies the SDK package builds from a local webiny-js checkout over the published ones,
// so the app runs the branch under test. Local e2e setup only.
import fs from "node:fs";
import path from "node:path";

const WEBINY_JS = process.env.WEBINY_JS ?? path.resolve(import.meta.dirname, "../../wby-next3");

const PACKAGES = [
    "sdk",
    "sdk-frontend",
    "cms-sdk",
    "cms-vue",
    "sdk-nuxt",
    "website-builder-sdk",
    "website-builder-vue",
    "website-builder-nuxt"
];

for (const name of PACKAGES) {
    const source = path.join(WEBINY_JS, "packages", name, "dist");
    const target = path.resolve(import.meta.dirname, "../node_modules/@webiny", name);

    if (!fs.existsSync(source)) {
        throw new Error(`Missing build: ${source}.`);
    }

    fs.rmSync(target, { recursive: true, force: true });
    fs.cpSync(source, target, { recursive: true });
    console.log(`@webiny/${name} <- ${source}`);
}
