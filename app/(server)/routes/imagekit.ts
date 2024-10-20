import { Hono } from "hono";
import { uploadProfileService } from "../service/imageKit.service";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";

const imagekitSchema = z.object({
  file: z.string(),
  userId: z.string(),
})

const app = new Hono()
  .post("/uploadProfile", zValidator("json", imagekitSchema), uploadProfileService)

export default app;