import type { TMDBResponse, Movie } from "../types/movie";

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

  const url = `${URL_BASE}/movie/upcoming?language=${LANGUAGE}&page=1&sort_by=vote_average.desc`;

  const response = await fetch(url, OPTIONS);

  const data: TMDBResponse = await response.json();

  return data.results[0] as Movie; // as Movie es para que TypeScript sepa que estamos devolviendo un objeto de tipo Movie
  // que cuando lo use en el componente sepa que tiene propiedades como title, overview, etc.
  // su uso seria algo como: const movie = await getHeroMovie(); console.log(movie.title); 

}

// https://api.themoviedb.org/3/search/movie?query=fight&include_adult=false&language=en-US&page=1

export async function getTrendingMovies() {
  const url = `${URL_BASE}/trending/movie/day?language=${LANGUAGE}`;
  const response = await fetch(url, OPTIONS);
  const data: TMDBResponse = await response.json();
  return data.results; // devuelve un array de películas
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