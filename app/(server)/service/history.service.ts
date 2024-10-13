import { Context } from "hono";
import db from "../config/db";
import { history } from "../schema/user.schema";
import { eq, and } from "drizzle-orm";

export const postHistory = async (c: Context) => {
  try {
    const { userId, contentId, type } = await c.req.json();
    const existingHistory = await db
      .select()
      .from(history)
      .where(and(eq(history.userId, userId), eq(history.contentId, contentId), eq(history.type, type)));

    if (existingHistory.length > 0) {
      await db
        .update(history)
        .set({ visitedAt: new Date(Date.now() + 7 * 60 * 60 * 1000) })
        .where(and(eq(history.userId, userId), eq(history.contentId, contentId), eq(history.type, type)));
      return c.json({ message: "History updated successfully" }, 200);
    }

    await db.insert(history).values({ userId, contentId, type, visitedAt: new Date(Date.now() + 7 * 60 * 60 * 1000) });
    return c.json({ message: "History created successfully" }, 201);
  } catch (error) {
    console.log(error);
    return c.json({ message: "Internal server error" }, 500);
  }
};
