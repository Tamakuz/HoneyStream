import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
import db from "../config/db"
import { users } from "../schema/user.schema"
import { watchlist } from "../schema/user.schema"
import { history } from "../schema/user.schema"
import { eq } from "drizzle-orm";
import bcrypt from 'bcryptjs';
import { JWT } from "next-auth/jwt";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXT_PUBLIC_AUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        try {
          const existingUser = await db.select().from(users).where(eq(users.username, credentials?.username as string));

          if (existingUser.length === 0) {
            throw new Error("User not found");
          }

          const isPasswordValid = await bcrypt.compare(credentials?.password as string, existingUser[0]?.password as string);

          if (!isPasswordValid) {
            throw new Error("Invalid password");
          }

          return existingUser[0];
        } catch (error) {
          if (error instanceof Error) {
            throw new Error(error.message);
          } else {
            throw new Error("An unexpected error occurred while logging in");
          }
        }
      },
    })
  ],
  callbacks: {
    async signIn({ user, account, profile }: any) {
      const existingUser = await db.select().from(users).where(eq(users.email, user.email));

      if (existingUser.length > 0) {
        await db.update(users).set({
          provider: account?.provider,
        }).where(eq(users.email, user.email));
        return true;
      }

      return false;
    },
    async jwt({ token, user }: { token: JWT; user?: any }): Promise<JWT> {
      if (token) {
        const existingUser = await db.select().from(users).where(eq(users.email, token.email as string));
        const existingWatchlist = await db.select().from(watchlist).where(eq(watchlist.userId, existingUser[0].id));
        const existingHistory = await db.select().from(history).where(eq(history.userId, existingUser[0].id));
        
        if (existingUser.length > 0) {
          token.id = existingUser[0].id;
          token.name = existingUser[0].username;
          token.provider = existingUser[0].provider;
          token.watchlist = existingWatchlist.map((item) => ({
            contentId: item.contentId,
            type: item.type,
          }));
          token.history = existingHistory.map((item) => ({
            contentId: item.contentId,
            type: item.type,
          }));
          token.avatarUrl = existingUser[0].avatarUrl;
        }
      }
      return token;
    },
    async session({ session, token }: { session: any; token: JWT }): Promise<any> {
      if (token) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        session.user.provider = token.provider as string;
        session.user.watchlist = token.watchlist as any;
        session.user.history = token.history as any;
        session.user.avatarUrl = token.avatarUrl as string;
      }
      return session;
    },
  },
};
