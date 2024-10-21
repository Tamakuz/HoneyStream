import { client } from '@/app/(client)/lib/hc';

export const getHomeAnimeList = async () => {
  const randomPage = Math.floor(Math.random() * 20) + 1;
  const res = await fetch(`https://ripleystream.vercel.app/api/v1/animes/popular?page=${randomPage}&limit=40&api_token=${process.env.NEXT_PUBLIC_RIPLEYSTREAM_API_TOKEN}`);
  const data = await res.json();
  return data;
};


export const getBackdropsAnimeHero = async () => {
  const randomPage = Math.floor(Math.random() * 100) + 1;
  const res = await fetch(`https://ripleystream.vercel.app/api/v1/animes/popular?page=${randomPage}&limit=1&api_token=${process.env.NEXT_PUBLIC_RIPLEYSTREAM_API_TOKEN}`);
  const data = await res.json();
  return data;
};

export const getAnimeDiscover = async (page: number) => {
  const res = await fetch(`https://ripleystream.vercel.app/api/v1/animes/discover?page=${page}&limit=20&api_token=${process.env.NEXT_PUBLIC_RIPLEYSTREAM_API_TOKEN}`);
  const data = await res.json();
  return data;
};

export const getAnimePopular = async (page: number) => {
  const res = await fetch(`https://ripleystream.vercel.app/api/v1/animes/popular?page=${page}&limit=20&api_token=${process.env.NEXT_PUBLIC_RIPLEYSTREAM_API_TOKEN}`);
  const data = await res.json();
  return data;
};

export const getAnimeTopRated = async (page: number) => {
  const res = await fetch(`https://ripleystream.vercel.app/api/v1/animes/popular?page=${page}&limit=20&api_token=${process.env.NEXT_PUBLIC_RIPLEYSTREAM_API_TOKEN}`);
  const data = await res.json();
  return data;
};

export const getAnimeDetail = async (animeId: string) => {
  const res = await fetch(`https://ripleystream.vercel.app/api/v1/anime/${animeId}?api_token=${process.env.NEXT_PUBLIC_RIPLEYSTREAM_API_TOKEN}`);
  const data = await res.json();
  return data;
};

export const getAnimeSearch = async (query: string) => {
  const res = await fetch(`https://ripleystream.vercel.app/api/v1/search?query=${query}&type=animes&api_token=${process.env.NEXT_PUBLIC_RIPLEYSTREAM_API_TOKEN}`);
  const data = await res.json();
  return data;
};


export const getCommentsAnime = async (contentId: string) => {
  const res = await client.api.comment[':contentId'][':type'].$get({
    param: {
      contentId,
      type: 'anime'
    }
  })

  const data = await res.json()
  return data
};
