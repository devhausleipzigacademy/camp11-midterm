import { useInfiniteQuery } from '@tanstack/react-query';
import { getNowPlayingByGenre } from '../api/movies';
import { useContext } from 'react';
import { GenreContext } from '../context/GenreProvider';
import { genresLibraryType } from '../utils/genresLibraryType';

function getSelectedIDs(genreList: genresLibraryType[]) {
  const selectedGenreIDs: number[] = [];
  for (let genre of genreList) {
    if (genre.isSelected) {
      selectedGenreIDs.push(genre.genreId);
    }
  }
  return selectedGenreIDs;
}

export function useGetMoviesByGenre() {
  const { genres } = useContext(GenreContext);
  const selectedGenreIDs = getSelectedIDs(genres).join('|');
  const { data: movies, ...rest } = useInfiniteQuery({
    queryKey: ['movies', selectedGenreIDs],
    queryFn: async ({ pageParam }) =>
      await getNowPlayingByGenre(pageParam, selectedGenreIDs),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.page >= lastPage.total_pages) return undefined;
      return allPages.length + 1;
    },
  });
  return { movies, ...rest };
}
