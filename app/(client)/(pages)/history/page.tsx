"use client";
import { useSession } from 'next-auth/react';
import DefaultLayout from '../../components/DefaultLayout';
import SidebarLayout from '../../components/SidebarLayout';
import { useSearchParams } from 'next/navigation';
import AnimeHistoryList from '../../components/history/AnimeHistoryList';
import MovieHistoryList from '../../components/history/MovieHistoryList';
import { History } from '@/app/(server)/schema/user.schema';

const HistoryPage = () => {
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const type = searchParams.get('type');

  const history = (session?.user as any)?.history as History[] || [];

  const animeHistory = history.filter(item => item.type === 'anime');
  const movieHistory = history.filter(item => item.type === 'movie');

  return (
    <DefaultLayout>
      <SidebarLayout>
        {type === 'anime' ? (
          <AnimeHistoryList history={animeHistory} />
        ) : (
          <MovieHistoryList history={movieHistory} />
        )}
      </SidebarLayout>
    </DefaultLayout>
  );
}

export default HistoryPage;