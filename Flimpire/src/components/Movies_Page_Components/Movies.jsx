import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useRef } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import MoviesRow from "./MoviesRow";
function Movies() {
    return(
      <div>
        <MoviesRow title="Now Playing" category="now-playing" />
        <MoviesRow title="Popular" category="popular" />
        <MoviesRow title="Top Rated" category="top-rated" />
        <MoviesRow title="Upcoming" category="upcoming" />
      </div>
    )
}

export default Movies;
