import { Hono } from "hono";
import { postImageUploader } from "../service/uploadthing.service";

const app = new Hono()
  .post("/", postImageUploader);

export default app;

