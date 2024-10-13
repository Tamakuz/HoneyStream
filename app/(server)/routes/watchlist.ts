import { Hono } from "hono";
import { addWatchlistService, getWatchlistService } from "../service/watchlist.service";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

const addWatchlistSchema = z.object({
  contentId: z.string(),
  userId: z.string(),
  type: z.enum(['movie', 'anime']),
})

const app = new Hono()
  .post('/', zValidator("json", addWatchlistSchema), addWatchlistService)
  .get('/:userId', getWatchlistService);

export default app;