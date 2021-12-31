import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import movieApi from "../../common/api/movieApi";
import { APIKEY } from "../../common/api/movieApiKey";

export const fetchAsyncMovies = createAsyncThunk(
  "movies/fetchAsyncMovies",
  async searchText => {
    const response = await movieApi.get(
      `?apikey=${APIKEY}&s=${searchText}&type=movie`
    );

    return response.data;
  }
);

export const fetchAsyncTvSeries = createAsyncThunk(
  "movies/fetchAsyncTvSeries",
  async searchText => {
    const response = await movieApi.get(
      `?apikey=${APIKEY}&s=${searchText}&type=series`
    );

    return response.data;
  }
);

export const fetchAsyncMovieOrSeriesDetail = createAsyncThunk(
  "movies/fetchAsyncMovieOrSeriesDetail",
  async id => {
    const response = await movieApi.get(`?apikey=${APIKEY}&i=${id}&Plot=full`);

    return response.data;
  }
);
const initialState = {
  movies: {},
  tvSeries: {},
  selectedMovieOrSeries: {},
};

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    removeSelectedMovieOrSeries: (state, { payload }) => {
      state.selectedMovieOrSeries = {};
    },
  },
  extraReducers: {
    [fetchAsyncMovies.pending]: () => {
      console.log("Pending");
    },
    [fetchAsyncMovies.fulfilled]: (state, { payload }) => {
      console.log("Fetched Successfully");
      return { ...state, movies: payload };
    },
    [fetchAsyncTvSeries.fulfilled]: (state, { payload }) => {
      console.log("Fetched Successfully");
      return { ...state, tvSeries: payload };
    },
    [fetchAsyncMovieOrSeriesDetail.fulfilled]: (state, { payload }) => {
      console.log("Fetched Successfully");
      return { ...state, selectedMovieOrSeries: payload };
    },
    [fetchAsyncMovies.rejected]: () => {
      console.log("Rejected");
    },
  },
});
export const { removeSelectedMovieOrSeries } = movieSlice.actions;
export const getAllMovies = state => state.movies.movies;
export const getAllTvSeries = state => state.movies.tvSeries;
export const getMovieOrTvSeriesDetail = state =>
  state.movies.selectedMovieOrSeries;
export default movieSlice.reducer;
