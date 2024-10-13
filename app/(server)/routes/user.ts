import { Hono } from "hono";
import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'
import { signupService } from "../service/user/signup.service";

const signupSchema = z.object({
  username: z.string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must not exceed 20 characters")
    .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores"),
  email: z.string()
    .email("Invalid email address")
    .refine(email => email.endsWith('@gmail.com') || email.endsWith('@yahoo.com'), {
      message: "Only Gmail and Yahoo email addresses are allowed"
    }),
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .max(100, "Password must not exceed 100 characters")
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"),
}) 

const app = new Hono()
  .get("/", (c) => {
    return c.json({ message: "Hello World" });
  })
  .post("/signup", zValidator("json", signupSchema), signupService)

export default app;
