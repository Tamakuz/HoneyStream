import { hc } from "hono/client";
import type { AppType } from "@/app/(server)/api/[[...route]]/route";

export const client = hc<AppType>("https://honeystream.vercel.app");
