import { Context } from "hono";
import { UTApi } from "uploadthing/server";

const utapi = new UTApi({
  token: process.env.NEXT_PUBLIC_UPLOADTHING_TOKEN as string,
});

export const postImageUploader = async (c: Context) => {
  const formData = await c.req.formData();
  const file = formData.get("file") as File;
  if (!file) {
    return c.json({ error: "No file uploaded" }, 400);
  }
  console.log("file", file);
  // try {
  //   const response = await utapi.uploadFiles(file);
  //   console.log("response", response);
  //   if (response.error) {
  //     return c.json({ error: response.error.message }, 400);
  //   }
  //   return c.json({ url: response.data.url });
  // } catch (error) {
  //   console.error("Error uploading file:", error);
  //   return c.json({ error: "Failed to upload file" }, 500);
  // }
};
