import { SlugNormalizer, type SlugInput } from "./SlugNormalizer";

// No trailing slash (matches the Next.js reference app behaviour)
const normalizer = new SlugNormalizer({ trailingSlash: false });

export const normalizeSlug = (slug: SlugInput) => normalizer.normalize(slug);
