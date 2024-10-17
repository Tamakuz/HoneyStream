import { Hono } from "hono";
import { cors } from "hono/cors";
import user from "../../routes/user";
import watchlist from "../../routes/watchlist";
import history from "../../routes/history";
import uploadthing from "../../routes/uploadthing";

const app = new Hono().basePath("/api");

app.use("*", cors({
  origin: ["http://localhost:3000", "https://honeystream.vercel.app"],
  allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
}));

const routes = app
  .route("/user", user)
  .route("/watchlist", watchlist)
  .route("/history", history)
  .route("/uploadthing", uploadthing);

export const GET = app.fetch;
export const POST = app.fetch;
export type AppType = typeof routes;
