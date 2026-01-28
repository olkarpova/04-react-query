import axios from "axios";
import type { Movie, TMDBResponse } from "../types/movie";
// interface TMDBResponse {
//   results: Movie[];
//   total_results: number;
//   page: number;
// }

export const fetchMovies = async (query: string, page: number):
    Promise<TMDBResponse> => {
        console.log('Пошуковий запит:', query);
    const { data } = await axios.get<TMDBResponse>(
        `https://api.themoviedb.org/3/search/movie`,
        {
            params: {
                query: query,
                page: page,
            },
            headers: {
                Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
            }
        });
        return data;
    };