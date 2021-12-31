import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import MovieListing from "../MovieListning/MovieListing";
import {
  fetchAsyncMovies,
  fetchAsyncTvSeries,
} from "../../features/movies/movieSlice";

export default function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAsyncMovies("Harry"));
    dispatch(fetchAsyncTvSeries("Friend"));
  }, [dispatch]);

  return (
    <div>
      <div className="banner-img"></div>
      <MovieListing />
    </div>
  );
}
