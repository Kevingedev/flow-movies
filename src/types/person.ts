export interface Person {
    id: number;
    name: string;
    original_name: string;
    gender: number;
    profile_path: string | null;
    known_for_department: string;
    known_for: (MovieKnownFor | TVKnownFor)[];
    popularity: number;
}

export interface MovieKnownFor {
    backdrop_path: string | null;
    id: number;
    title: string;
    original_title: string;
    overview: string;
    poster_path: string | null;
    media_type: 'movie';
    adult: boolean;
    original_language: string;
    genre_ids: number[];
    popularity: number;
    release_date: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

export interface TVKnownFor {
    backdrop_path: string | null;
    id: number;
    name: string;
    original_name: string;
    overview: string;
    poster_path: string | null;
    media_type: 'tv';
    adult: boolean;
    original_language: string;
    genre_ids: number[];
    popularity: number;
    first_air_date: string;
    vote_average: number;
    vote_count: number;
    origin_country: string[];
}

export interface PersonResponse {
    page: number;
    results: Person[];
    total_pages: number;
    total_results: number;
}
