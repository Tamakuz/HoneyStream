import { Context } from "hono";
import { imagekit } from "../config/imagekit";
import db from "../config/db";
import { users } from "../schema/user.schema";
import { eq } from "drizzle-orm";

export const uploadProfileService = async (c: Context) => {
  try {
    const { file, userId } = await c.req.json();
    const currentUser = await db
      .select()
      .from(users)
      .where(eq(users.id, userId));

    if (!currentUser) {
      return c.json({ error: "User not found" }, 404);
    }

    const currentAvatarKey = currentUser[0].avatarKey;
    if (currentAvatarKey) {
      await imagekit.deleteFile(currentAvatarKey);
    }

    try {
      const responseUpload = await imagekit.upload({
        file,
        fileName: `profile_${Date.now()}.jpg`,
        folder: "profile",
      });
      
      await db
        .update(users)
        .set({
          avatarKey: responseUpload.fileId,
          avatarUrl: responseUpload.url,
        })
        .where(eq(users.id, userId));

      return c.json(
        {
          message: "File uploaded successfully",
          avatarUrl: responseUpload.url,
        },
        200
      );
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    return c.json({ error: "Internal server error" }, 500);
  }
};
