import { Hono } from "hono";
import { postHistory } from "../service/history.service";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

const postHistorySchema = z.object({
  userId: z.string(),
  contentId: z.string(),
  type: z.enum(["movie", "anime"]),
});

const app = new Hono()
  .post("/", zValidator("json", postHistorySchema), postHistory);

export default app;