import { Context } from "hono";
import db from "../config/db";
import { comments, users } from "../schema/user.schema";
import { eq, and } from "drizzle-orm";

//params : userId, contentId, type, text, timestamp

export const createComment = async (c: Context) => {
  const { userId, contentId, type, text } = await c.req.json();

  if (!userId || !contentId || !type || !text) {
    return c.json({ message: "Invalid request" }, 400);
  }

  try {
    const comment = await db
      .insert(comments)
      .values({ userId, contentId, type, text });
    return c.json({ message: "Comment created successfully", comment }, 201);
  } catch (error) {
    console.log(error);
    return c.json({ message: "Failed to create comment", error }, 500);
  }
};

export const getComments = async (c: Context) => {
  const contentId = c.req.param('contentId');
  const type = c.req.param('type') as 'movie' | 'anime';

  if (!contentId || !type) {
    return c.json({ message: "Invalid request" }, 400);
  }

  try {
    const result = await db
      .select({
        id: comments.id,
        text: comments.text,
        createdAt: comments.createdAt,
        updatedAt: comments.updatedAt,
        userId: users.id,
        username: users.username,
        avatarUrl: users.avatarUrl
      })
      .from(comments)
      .leftJoin(users, eq(comments.userId, users.id))
      .where(and(eq(comments.contentId, contentId), eq(comments.type, type)));

    return c.json(result, 200);
  } catch (error) {
    return c.json({ message: "Failed to fetch comments", error }, 500);
  }
};
