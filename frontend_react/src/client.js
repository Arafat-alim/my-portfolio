import sanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const client = sanityClient({
  projectId: process.env.REACT_APP_SANTY_PROJECT_ID,
  dataset: process.env.REACT_APP_SANITY_DATASET_ENV,
  apiVersion: process.env.REACT_APP_SANITY_API_VERSION,
  useCdn: process.env.REACT_APP_SANITY_USE_CDN,
  token: process.env.REACT_APP_SANITY_TOKEN,
});

// ! To find the sanity manage  go to --> https://www.sanity.io/manage

const builder = imageUrlBuilder(client);
export const urlFor = (source) => builder.image(source);
