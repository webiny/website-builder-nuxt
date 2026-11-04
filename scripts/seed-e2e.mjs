// Seeds the entries the local e2e pages need: three articles, one product category, one product.
import fs from "node:fs";
import path from "node:path";

const env = Object.fromEntries(
    fs
        .readFileSync(path.resolve(import.meta.dirname, "../.env"), "utf8")
        .split("\n")
        .filter(line => line.includes("="))
        .map(line => [line.slice(0, line.indexOf("=")), line.slice(line.indexOf("=") + 1)])
);

const endpoint = `${env.WEBINY_API_HOST}/cms/manage/en-US`;

async function gql(query, variables) {
    const response = await fetch(endpoint, {
        method: "POST",
        headers: { "content-type": "application/json", authorization: `Bearer ${env.WEBINY_API_KEY}` },
        body: JSON.stringify({ query, variables })
    });
    const json = await response.json();
    if (json.errors) {
        throw new Error(JSON.stringify(json.errors));
    }
    return json.data;
}

async function createAndPublish(type, data) {
    const created = await gql(
        `mutation($data: ${type}Input!) { create${type}(data: $data) { data { id entryId } error { message } } }`,
        { data }
    );
    const result = created[`create${type}`];
    if (result.error) {
        throw new Error(`create${type}: ${result.error.message}`);
    }
    const published = await gql(
        `mutation($revision: ID!) { publish${type}(revision: $revision) { data { id } error { message } } }`,
        { revision: result.data.id }
    );
    if (published[`publish${type}`].error) {
        throw new Error(`publish${type}: ${published[`publish${type}`].error.message}`);
    }
    return result.data;
}

const articles = [
    { title: "Nuxt e2e one", slug: "nuxt-e2e-one" },
    { title: "Nuxt e2e two", slug: "nuxt-e2e-two" },
    { title: "Nuxt e2e three", slug: "nuxt-e2e-three" }
];

for (const article of articles) {
    const entry = await createAndPublish("Article", {
        values: {
            title: article.title,
            description: `Description of ${article.title}.`,
            slug: article.slug,
            content: [
                {
                    Hero: {
                        title: `Hero of ${article.title}`,
                        subtitle: "Dynamic zone",
                        description: "Rendered by DynamicZoneField."
                    }
                },
                { Banner: { title: `Banner of ${article.title}`, actionLabel: "Read", actionUrl: "/" } }
            ]
        }
    });
    console.log("article", article.slug, entry.entryId);
}

const category = await createAndPublish("ProductCategory", {
    values: { name: "Nuxt e2e category", slug: "nuxt-e2e-category" }
});
console.log("category", category.entryId);

const product = await createAndPublish("Product", {
    values: {
        name: "Nuxt e2e product",
        sku: "NUXT-E2E-1",
        price: 42,
        category: { modelId: "productCategory", id: category.id }
    }
});
console.log("product", product.entryId);
