import { AuthContext } from './context/AuthContext.jsx';
import Settings from './pages/settings/Settings.jsx';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './Components/Layout';
import Dashboard from './Components/Dashboard';
import AllTvShows from './Components/TvShows/AllTvShows/AllTvShows.jsx';
import TvShowCategories from './Components/TvShows/TvShowsCategories/TvShowCategories.jsx';
import AddTvShow from './Components/TvShows/AllTvShows/AddTvShow/AddTvShow.jsx';
import MovieCategories from './Components/Movies/MovieCategories.jsx';
import AddMovieCategory from './Components/Movies/AddMovieCategory.jsx';
import Slider from './Components/Slider/Slider.jsx';
import AddSlider from './Components/Slider/AddSlider.jsx';
import AddMovie from './Components/Movies/AddMovie/AddMovie.jsx';
import Login from './Components/login/Login.jsx';
import { useContext } from 'react';
import Signup from './Components/Signup.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';

import AddTvShowCategory from './Components/TvShows/TvShowsCategories/AddTvShowCategory.jsx';
import TotalMovies from './Components/Movies/TotalMovies.jsx';

function App() {
  const { currentUser } = useContext(AuthContext);
  const [showAddMovie, setShowAddMovie] = useState(false);
  const [showAddTv, setShowAddTv] = useState(false);

  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/sign-in" />;
  };
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/sign-in" element={<Login />} />
          <Route path="/sign-up" element={<Signup />} />
          <Route
            index
            element={
              <RequireAuth children={<Layout childeren={<Dashboard />} />} />
            }
          />
          <Route
            path="settings/*"
            element={
              <RequireAuth children={<Layout childeren={<Settings />} />} />
            }
          />

          <Route
            path="/TvShows/All-TvShows"
            element={
              <RequireAuth
                children={
                  <Layout
                    childeren={
                      <AllTvShows
                        showAddTv={showAddTv}
                        setShowAddTv={setShowAddTv}
                      />
                    }
                  />
                }
              />
            }
          />

          <Route
            path="/TV-shows/Add-TvShow"
            element={
              <RequireAuth children={<Layout childeren={<AddTvShow />} />} />
            }
          />
          <Route
            path="/TvShows/TvShows-categories"
            element={
              <RequireAuth
                children={<Layout childeren={<TvShowCategories />} />}
              />
            }
          />

          <Route
            path="/TvShows/TvShows-categories/add-TvShow-category"
            element={
              <RequireAuth
                children={<Layout childeren={<AddTvShowCategory />} />}
              />
            }
          />
          <Route
            path="/Movies/movie-categories"
            element={
              <RequireAuth
                children={<Layout childeren={<MovieCategories />} />}
              />
            }
          />
          <Route
            path="/Movies/add-movie-category"
            element={
              <RequireAuth
                children={<Layout childeren={<AddMovieCategory />} />}
              />
            }
          />
          <Route
            path="/Movies/All-movies"
            element={
              <RequireAuth children={<Layout childeren={<TotalMovies />} />} />
            }
          />

          <Route
            path="/Movies/Add-movies"
            element={
              <RequireAuth children={<Layout childeren={<AddMovie />} />} />
            }
          />
          <Route
            path="/slider"
            element={
              <RequireAuth children={<Layout childeren={<Slider />} />} />
            }
          ></Route>
          <Route
            path="/slider/add-slider"
            element={
              <RequireAuth children={<Layout childeren={<AddSlider />} />} />
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
