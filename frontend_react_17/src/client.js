import sanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const client = sanityClient({
  //   projectId: process.env.REACT_APP_SANITY_PROJECT_ID,
  projectId: "gci1ca0d",
  dataset: "production",
  apiVersion: "2022-02-01",
  useCdn: true,
  token: process.env.REACT_APP_SANITY_TOKEN,
});

// ! To find the sanity manage  go to --> https://www.sanity.io/manage

const builder = imageUrlBuilder(client);
export const urlFor = (source) => builder.image(source);
