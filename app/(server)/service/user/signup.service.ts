import { Context } from "hono";
import { users } from "../../schema/user.schema";
import db from "../../config/db";
import { eq, or } from 'drizzle-orm';
import bcrypt from 'bcryptjs';

export const signupService = async (c: Context) => {
  try {
    const { username, email, password } = await c.req.json();

    // Check if username or email already exists
    const existingUser = await db.select().from(users).where(or(eq(users.username, username), eq(users.email, email)));
    
    if (existingUser.length > 0) {
      console.log("Existing user found:", existingUser);
      return c.json({ error: "Username or email already exists" }, 400);
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Insert new user
    const newUser = await db.insert(users).values({
      username,
      email,
      password: hashedPassword,
    }).returning();

    console.log("New user created:", newUser[0]);
    return c.json({ message: "User created successfully", user: newUser[0] }, 201);
  } catch (error) {
    console.error("Error in signupService:", error);
    return c.json({ error: "An error occurred while processing your request" }, 500);
  }
}