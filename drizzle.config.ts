import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: "./app/(server)/schema",
  dialect: "postgresql",
  dbCredentials: {
    url: "postgresql://honeystream_owner:EsTt0mO8zdgo@ep-square-union-a52g5fu8-pooler.us-east-2.aws.neon.tech/honeystream?sslmode=require",
  },
  out: "./drizzle",
});
