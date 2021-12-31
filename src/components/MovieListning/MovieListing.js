import React from "react";
import { useSelector } from "react-redux";
import { getAllMovies, getAllTvSeries } from "../../features/movies/movieSlice";
import MovieCard from "../MovieCard/MovieCard";
import "./MovieListing.scss";
import Slider from "react-slick";
import { Settings } from "../../common/settings";

export default function MovieListing() {
  const movies = useSelector(getAllMovies);
  const tvSeries = useSelector(getAllTvSeries);

  let renderMovies,
    renderTvSeries = "";

  renderMovies =
    movies.Response === "True" ? (
      movies.Search.map((movie, index) => {
        return <MovieCard key={index} data={movie} />;
      })
    ) : (
      <div className="movies-error">
        <h3>{movies.Error}</h3>
      </div>
    );

  renderTvSeries =
    tvSeries.Response === "True" ? (
      tvSeries.Search.map((tvSeries, index) => {
        return <MovieCard key={index} data={tvSeries} />;
      })
    ) : (
      <div className="movies-error">
        <h3>{tvSeries.Error}</h3>
      </div>
    );
  return (
    <div className="movie-wrapper">
      <div className="movie-list">
        <h2>Movies</h2>
        <div className="movie-container">
          <Slider {...Settings}>{renderMovies}</Slider>
        </div>
        <h2>Tv series</h2>
        <div className="show-container">{renderTvSeries}</div>
      </div>
    </div>
  );
}
