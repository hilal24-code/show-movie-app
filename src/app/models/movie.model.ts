export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  release_date: string;
  vote_average: number;
}

export interface MovieResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export interface Genre {
  id: number;
  name: string;
}

export interface MovieDetailData {
  id: number;
  title: string;
  tagline: string;
  overview: string;
  poster_path: string | null;
  release_date: string;
  runtime: number;
  vote_average: number;
  genres: Genre[];
  videos?: { results: Video[] };
  credits?: { cast: CastMember[] };
}

export type MovieCategory = 'popular' | 'top_rated' | 'now_playing' | 'upcoming';

export interface Video {
  key: string;
  name: string;
  site: string;
  type: string;
  official: boolean;
}

export interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}