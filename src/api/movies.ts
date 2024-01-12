import axios from 'axios';
import { findCrewByRole } from '../utils/findCrewByRole';

export type Crew = {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  credit_id: string;
  department: string;
  job: string;
};

export type Movie = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  movieId: number;
};

export interface SingleMovie extends Movie {
  genres: string[];

  credits: {
    crew: Crew[];
  };
}

type MovieResponse = {
  results: Movie[];
};

export async function getNowPlayingMovie() {
  const { data } = await axios.get<MovieResponse>(
    `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1`,
    {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_APP_MOVIES_SECRET}`,
      },
    }
  );

  return data.results;
}

export async function getSingleMovie(movieId: number) {
  const { data } = await axios.get<SingleMovie>(
    `https://api.themoviedb.org/3/movie/${movieId}?append_to_response=credits&language=en-US`,
    {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_APP_MOVIES_SECRET}`,
      },
    }
  );

  return data;
}
