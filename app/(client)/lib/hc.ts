import { hc } from "hono/client";
import type { AppType } from "@/app/(server)/api/[[...route]]/route";

export const client = hc<AppType>(process.env.NEXT_PUBLIC_HC_API_URL as string);
