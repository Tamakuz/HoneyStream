import { pgTable, text, varchar, timestamp, uuid, integer } from "drizzle-orm/pg-core"

export const users = pgTable('users', {
  id: varchar('id', { length: 8 }).primaryKey().notNull().unique().$defaultFn(() => crypto.randomUUID().slice(0, 8)),
  username: varchar('username', { length: 50 }).notNull().unique(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  password: varchar('password', { length: 255 }),
  fullName: varchar('full_name', { length: 100 }),
  avatar: text('avatar'),
  provider: varchar('provider', { length: 20 }).$type<'credentials' | 'google' | 'github'>(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})

export const history = pgTable('history', {
  id: varchar('id', { length: 8 }).primaryKey().notNull().unique().$defaultFn(() => crypto.randomUUID().slice(0, 8)),
  userId: varchar('user_id', { length: 8 }).notNull().references(() => users.id),
  contentId: varchar('content_id', { length: 255 }).notNull(),
  type: varchar('type', { length: 5 }).$type<'movie' | 'anime'>().notNull(),
  visitedAt: timestamp('visited_at').defaultNow(),
})

export const watchlist = pgTable('watchlist', {
  id: varchar('id', { length: 8 }).primaryKey().notNull().unique().$defaultFn(() => crypto.randomUUID().slice(0, 8)),
  userId: varchar('user_id', { length: 8 }).notNull().references(() => users.id),
  contentId: varchar('content_id', { length: 255 }).notNull(),
  type: varchar('type', { length: 5 }).$type<'movie' | 'anime'>().notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})

export type User = typeof users.$inferSelect;
export type Watchlist = typeof watchlist.$inferSelect;
export type History = typeof history.$inferSelect;
