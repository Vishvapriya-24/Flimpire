import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useRef } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import MoviesRow from "./MoviesRow";
import TrailerBox from "./TrailerBox";


function Movies() {
  const containerStyle = {
    backgroundColor: "#000",
    minHeight: "100vh",
    padding: "20px",
    overflow: "hidden",
  };
    return(
      <div style={containerStyle}>
        <MoviesRow title="Now Playing" category="now-playing" />
        <MoviesRow title="Popular" category="popular" />
        <MoviesRow title="Top Rated" category="top_rated" />
        <MoviesRow title="Upcoming" category="upcoming" />
      </div>
    )
}

export default Movies;
