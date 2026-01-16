const BASE_URL = 'https://api.themoviedb.org/3';

export async function fetchTMDB(endpoint: string, query: string = '') {
  const response = await fetch(`${BASE_URL}/${endpoint}?language=es-ES${query}`, {
    headers: {
      Authorization: `Bearer ${import.meta.env.TMDB_TOKEN}`,
      accept: 'application/json',
    }
  });
  if (!response.ok) throw new Error('Error al conectar con TMDB');
  return await response.json();
}