import { Hono } from "hono";
import user from "../../routes/user";
import watchlist from "../../routes/watchlist";
import history from "../../routes/history";

const app = new Hono().basePath("/api");

const routes = app
  .route("/user", user)
  .route("/watchlist", watchlist)
  .route("/history", history);

export const GET = app.fetch;
export const POST = app.fetch;
export type AppType = typeof routes;
