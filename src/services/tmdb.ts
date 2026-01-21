import type { TMDBResponse, Movie, Genre, GenreResponse } from "../types/movie";
import type { GenreShows, GenreShowsResponse, TVShow, TVShowResponse } from "../types/tvshow";

const URL_BASE = 'https://api.themoviedb.org/3';
const TOKEN = import.meta.env.TMDB_TOKEN;
const LANGUAGE = 'en-US'; //language=es-ES

const OPTIONS = {
  headers: {
    Authorization: `Bearer ${TOKEN}`,
    accept: "application/json",
  },
};

export async function getHeroMovie() {

  const url = `${URL_BASE}/movie/popular?language=${LANGUAGE}&sort_by=vote_average.desc`;

  const response = await fetch(url, OPTIONS);

  const data: TMDBResponse = await response.json();

  return data.results[0] as Movie; // as Movie es para que TypeScript sepa que estamos devolviendo un objeto de tipo Movie
  // que cuando lo use en el componente sepa que tiene propiedades como title, overview, etc.
  // su uso seria algo como: const movie = await getHeroMovie(); console.log(movie.title); 

}

// https://api.themoviedb.org/3/search/movie?query=fight&include_adult=false&language=en-US&page=1

export async function getAllMovies(page: number = 1) {
  const url = `${URL_BASE}/discover/movie?language=${LANGUAGE}&page=${page}&sort_by=primary_release_date.desc&vote_average.gte=0.1&vote_count.gte=50`;
  const response = await fetch(url, OPTIONS);
  const data: TMDBResponse = await response.json();
  return data;
}

export async function getTrendingMovies(page: number = 1) {
  const url = `${URL_BASE}/trending/movie/day?language=${LANGUAGE}&page=${page}`;
  const response = await fetch(url, OPTIONS);
  const data: TMDBResponse = await response.json();
  return data;
}

export async function getDiscoverMovies(genreId: string, page: number = 1) {
  const url = `${URL_BASE}/discover/movie?language=${LANGUAGE}&with_genres=${genreId}&page=${page}&sort_by=popularity.desc&vote_average.gte=0.1`;
  const response = await fetch(url, OPTIONS);
  const data: TMDBResponse = await response.json();
  return data;
}

export async function getMovieDetails(id: string) {
  const url = `${URL_BASE}/movie/${id}?language=${LANGUAGE}`;
  const response = await fetch(url, OPTIONS);

  if (!response.ok) {
    throw new Error('Movie not found');
  }

  const data = await response.json();
  return data as Movie;
}

export async function getGenres() {

  const url = `${URL_BASE}/genre/movie/list?language=${LANGUAGE}`;
  const response = await fetch(url, OPTIONS);
  const data: GenreResponse = await response.json();
  return data.genres as Genre[];
}

export async function getNowPlayingMovies(page: number = 1) {
  const url = `${URL_BASE}/movie/now_playing?language=${LANGUAGE}&page=${page}`;
  const response = await fetch(url, OPTIONS);
  const data: TMDBResponse = await response.json();
  return data;
}

export async function getMovieProviders(id: string) {
  const url = `${URL_BASE}/movie/${id}/watch/providers`;
  const response = await fetch(url, OPTIONS);

  if (!response.ok) {
    return null;
  }

  const data = await response.json();
  return data.results;
}

export async function getGenresShows() {
  const url = `${URL_BASE}/genre/tv/list?language=${LANGUAGE}`;
  const response = await fetch(url, OPTIONS);
  const data: GenreShowsResponse = await response.json();
  return data.genres as GenreShows[];
}


// Traer las series
export async function getTvShows(page: number = 1) {
  const url = `${URL_BASE}/discover/tv?language=${LANGUAGE}&page=${page}&sort_by=primary_release_date.desc&vote_average.gte=0.1&vote_count.gte=50`;
  const response = await fetch(url, OPTIONS);
  const data: TVShowResponse = await response.json();
  return data;
  // data.results
}

export async function getDiscoverShows(genreId: string, page: number = 1) {

  const url = `${URL_BASE}/discover/tv?language=${LANGUAGE}&with_genres=${genreId}&page=${page}&sort_by=popularity.desc&vote_average.gte=0.1`;
  const response = await fetch(url, OPTIONS);
  const data: TVShowResponse = await response.json();
  return data;
}

export async function getTvShowDetails(id: string) {
  const url = `${URL_BASE}/tv/${id}?language=${LANGUAGE}`;
  const response = await fetch(url, OPTIONS);

  if (!response.ok) {
    throw new Error('TV show not found');
  }

  const data = await response.json();
  return data as TVShow;
}

export async function getTvShowProviders(id: string) {
  const url = `${URL_BASE}/tv/${id}/watch/providers`;
  const response = await fetch(url, OPTIONS);

  if (!response.ok) {
    return null;
  }

  const data = await response.json();
  return data.results;
}

export async function searchMulti(query: string, page: number = 1) {
  const url = `${URL_BASE}/search/multi?language=${LANGUAGE}&query=${encodeURIComponent(query)}&page=${page}&include_adult=false`;
  const response = await fetch(url, OPTIONS);

  if (!response.ok) {
    throw new Error('Search failed');
  }

  const data = await response.json();

  // Filter only movies and tv shows, excluding persons or other types
  const filteredResults = data.results.filter((item: any) =>
    item.media_type === 'movie' || item.media_type === 'tv'
  );

  return {
    ...data,
    results: filteredResults
  };
}




