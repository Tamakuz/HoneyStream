import { Hono } from "hono";
import { createComment, getComments } from "../service/comment.service";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

const postCommentSchema = z.object({
  userId: z.string(),
  contentId: z.string(),
  type: z.enum(["movie", "anime"]),
});

const app = new Hono()
  .post("/", zValidator("json", postCommentSchema), createComment)
  .get("/:contentId/:type", getComments);

export default app;
