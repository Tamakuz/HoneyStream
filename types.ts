import { DefaultSession } from "next-auth";

type WatchlistItem = {
  contentId: string;
  type: "anime" | "movie";
};

type HistoryItem = {
  contentId: string;
  type: "anime" | "movie";
};

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      name: string;
      email: string;
      provider: string;
      watchlist: WatchlistItem[];
      history: HistoryItem[];
      avatarUrl: string;
    } & DefaultSession["user"];
    expires: string;
  }
}
