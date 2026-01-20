export interface TVShow {
 
    id: number;
    name: string;
    overview: string;
    poster_path: string;
    backdrop_path: string;
    genre_ids: number[];
    vote_average: number;
    vote_count: number;
    first_air_date: string;
    origin_country: string[];
    original_language: string;
    original_name: string;
    popularity: number;
}

export interface TVShowResponse {
    results: TVShow[];
    total_pages: number;
}

export interface GenreShows {
    id: number;
    name: string;
}

export interface GenreShowsResponse {
    genres: GenreShows[];
}
