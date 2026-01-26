import axios from "axios";
import type { Movie } from "../types/movie";

interface TMDBResponse {
  results: Movie[];
  total_results: number;
  page: number;
}

export const fetchMovies = async (query: string): Promise<Movie[]> => {
        console.log('Пошуковий запит:', query);
    const { data } = await axios.get<TMDBResponse>(`https://api.themoviedb.org/3/search/movie`,
            {
            params: {
                    query: query
            },
            headers: {
                Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
            }
            })
        console.log(data.results);
        return data.results;
    };