import { Context } from "hono";
import db from "../config/db";
import { watchlist } from "../schema/user.schema";
import { and, eq } from "drizzle-orm";

export const addWatchlistService = async (c: Context) => {
  try {
    const { contentId, userId, type } = await c.req.json();
    console.log(contentId, userId, type);

    const existingWatchlist = await db.select().from(watchlist).where(and(eq(watchlist.userId, userId), eq(watchlist.contentId, contentId), eq(watchlist.type, type)));

    if (existingWatchlist.length > 0) {
      return c.json({ error: 'Content already in watchlist' }, 400);
    }

    await db.insert(watchlist).values({
      userId,
      contentId,
      type,
    })
    return c.json({ message: 'Content added to watchlist' }, 201);
  } catch (error) {
    console.log(error);
    return c.json({ error: 'An error occurred while processing your request' }, 500);
  }
}

export const getWatchlistService = async (c: Context) => {
  try {
    const userId = c.req.param('userId');
    
    const userWatchlist = await db.select().from(watchlist).where(eq(watchlist.userId, userId));

    if (userWatchlist.length === 0) {
      return c.json({ data: [] }, 200);
    }
    
    return c.json({ data: userWatchlist }, 200);
  } catch (error) {
    console.log(error);
    return c.json({ error: 'An error occurred while processing your request' }, 500);
  }
}
