import SearchBar from '../SearchBar/SearchBar';
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';
import { fetchMovies } from '../../services/movieService';
import type { Movie } from '../../types/movie';
import MovieGrid from '../MovieGrid/MovieGrid';
import { useState, useEffect } from 'react';
import styles from './App.module.css';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import MovieModal from '../MovieModal/MovieModal';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import ReactPaginate from 'react-paginate';


export default function App() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const {data, isLoading, isError } = useQuery({
    queryKey: ['movies', searchQuery, currentPage],
    queryFn: () => fetchMovies(searchQuery, currentPage),
    retry: 1,
    enabled: searchQuery.trim().length > 0, 
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
    // gcTime: 2000,
    // staleTime: 5000,
  });

  const movies = data ? data.results || []: [];
  
  console.log('Movies length:', movies.length); 
  console.log('Data:', data);


  const handleSubmit = (query: string): void => {
    if (searchQuery !== query) {
      setCurrentPage(1);
    }
    setSearchQuery(query)
  }
  const handleMovieSelect = (movie: Movie) => {
    setSelectedMovie(movie);
  }
  const handleCloseModal = () => {
    setSelectedMovie(null);
  }

  useEffect(() => {
    if (data && movies.length === 0 && searchQuery && !isLoading) {
      toast.error('No movies found for your request.');
    }
  }, [data, movies.length, searchQuery, isLoading]);


  return (
    <>
      <SearchBar onSubmit={handleSubmit} />
      <Toaster position="top-right" />

      <main className={styles.main}>
        {isLoading && <Loader />}
        {isError && <ErrorMessage />}

        {!isLoading && !isError && data && (
          <>
            <MovieGrid movies={movies} onSelect={handleMovieSelect} />

            {data.total_pages > 1 && (
              <ReactPaginate
                pageCount={data?.total_pages ?? 0}
                pageRangeDisplayed={5}
                marginPagesDisplayed={1}
                onPageChange={({ selected }) => setCurrentPage(selected + 1)}
                forcePage={currentPage - 1}
                containerClassName={styles.pagination}
                activeClassName={styles.active}
                nextLabel="→"
                previousLabel="←"
                renderOnZeroPageCount={null}
              />
            )}
          </>
        )}
          
      </main>
      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={handleCloseModal} />
      )}
    </>
  );
}
