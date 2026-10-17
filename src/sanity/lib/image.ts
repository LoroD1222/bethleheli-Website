import { createImageUrlBuilder } from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";

import { dataset, projectId } from "./env";

const builder = createImageUrlBuilder({ dataset, projectId });

export const urlForImage = (source: SanityImageSource) => builder.image(source);
