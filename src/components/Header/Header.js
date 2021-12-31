import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  fetchAsyncMovies,
  fetchAsyncTvSeries,
} from "../../features/movies/movieSlice";
import logo from "../../images/logo.png";
import "../Header/Header.scss";

export default function Header() {
  const [searchText, setSearchText] = useState("");
  const dispatch = useDispatch();

  const submitHandler = e => {
    e.preventDefault();
    if (searchText === "") {
      alert("Please enter movie or tv series name");
    } else {
      dispatch(fetchAsyncMovies(searchText));
      dispatch(fetchAsyncTvSeries(searchText));
      setSearchText("");
    }
  };
  return (
    <div className="header">
      <div className="logo">
        <Link to="/">Movie App </Link>
      </div>

      <div className="search-bar">
        <form onSubmit={submitHandler}>
          <input
            type="text"
            value={searchText}
            onChange={e => {
              setSearchText(e.target.value);
            }}
          />
          <button type="submit">
            <i className="fa fa-search"></i>
          </button>
        </form>
      </div>
      <div className="user-image">
        <img src={logo} alt="logo" />
      </div>
    </div>
  );
}
