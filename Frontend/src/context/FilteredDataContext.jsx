import React, { createContext, useState, useCallback, useEffect } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';

export const FilteredDataContext = createContext();

export const FilteredDataProvider = ({ children }) => {
  const [shows, setShows] = useState([]);
  const [filteredShows, setFilteredShows] = useState([]);
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [tvCategories, setTvCategories] = useState([]);
  const [filteredTvCategories, setFilteredTvCategories] = useState([]);
  const [errorMesaage, setErrorMesaage] = useState('');
  const db = getDatabase();

  const fetchShows = useCallback(() => {
    const starCountRef = ref(db, 'shows/');
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const arrayOfObjects = Object.keys(data).map((key) => ({
          'TMDB ID': key,
          ...data[key],
        }));
        setShows(arrayOfObjects);
        setFilteredShows(arrayOfObjects);
      } else {
        setShows([]);
        setFilteredShows([]);
        setErrorMesaage(
          'No TV shows available to display. Try adding a TV show'
        );
      }
    });
  }, [db]);

  const fetchMovies = useCallback(() => {
    const starCountRef = ref(db, 'movies/');
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const arrayOfObjects = Object.keys(data).map((key) => ({
          'TMDB ID': key,
          ...data[key],
        }));
        setMovies(arrayOfObjects);
        setFilteredMovies(arrayOfObjects);
      } else {
        setMovies([]);
        setFilteredMovies([]);
        setErrorMesaage('No Movies available to display. Try adding a Movie');
      }
    });
  }, [db]);

  const fetchCategories = useCallback(() => {
    const starCountRef = ref(db, 'categories/');
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const arrayOfObjects = Object.keys(data).map((key) => ({
          'Category ID': key,
          ...data[key],
        }));
        setCategories(arrayOfObjects);
        setFilteredCategories(arrayOfObjects);
      } else {
        setCategories([]);
        setFilteredCategories([]);
        setErrorMesaage(
          'No Categories available to display. Try adding a Category'
        );
      }
    });
  }, [db]);

  const fetchTvCategories = useCallback(() => {
    const starCountRef = ref(db, 'tvcategories/');
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const arrayOfObjects = Object.keys(data).map((key) => ({
          'TV Category ID': key,
          ...data[key],
        }));
        setTvCategories(arrayOfObjects);
        setFilteredTvCategories(arrayOfObjects);
      } else {
        setTvCategories([]);
        setFilteredTvCategories([]);
        setErrorMesaage(
          'No TV Categories available to display. Try adding a TV Category'
        );
      }
    });
  }, [db]);

  useEffect(() => {
    fetchShows();
    fetchMovies();
    fetchCategories();
    fetchTvCategories();
  }, [fetchShows, fetchMovies, fetchCategories, fetchTvCategories]);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();

    const filterData = (data, keys) => {
      if (!Array.isArray(data)) {
        return [];
      }
      return data.filter((item) =>
        keys.some((key) => String(item[key]).toLowerCase().includes(query))
      );
    };

    setFilteredShows(filterData(shows, ['TMDB ID', 'title']));
    setFilteredMovies(filterData(movies, ['TMDB ID', 'title']));
    setFilteredCategories(filterData(categories, ['name']));
    setFilteredTvCategories(filterData(tvCategories, ['name']));
  };

  return (
    <FilteredDataContext.Provider
      value={{
        shows,
        filteredShows,
        movies,
        filteredMovies,
        categories,
        filteredCategories,
        tvCategories,
        filteredTvCategories,
        handleSearch,
      }}
    >
      {children}
    </FilteredDataContext.Provider>
  );
};
