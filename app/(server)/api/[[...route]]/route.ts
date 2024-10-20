import { Hono } from "hono";
import { cors } from "hono/cors";
import user from "../../routes/user";
import watchlist from "../../routes/watchlist";
import history from "../../routes/history";
import imagekit from "../../routes/imagekit";

const app = new Hono().basePath("/api");

const routes = app
  .route("/user", user)
  .route("/watchlist", watchlist)
  .route("/history", history)
  .route("/imagekit", imagekit)
  
export const GET = app.fetch;
export const POST = app.fetch;
export const OPTIONS = app.fetch; // Add OPTIONS method to handle preflight requests
export type AppType = typeof routes;
