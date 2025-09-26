import axios from "axios";
import {useEffect, useState} from 'react';


function Carousel() {
    const [carouselMovies,setCarouselMovies] = useState([]);
    useEffect(() => {
  fetch("http://localhost:8000/carousel")
    .then(res => res.json())
    .then(data => setCarouselMovies(data));
}, []);

    return (
        <div>
        <h1>seetha</h1>
        <div style={{ display: "flex", gap: "10px", overflowX: "scroll" }}>
        {carouselMovies.length && carouselMovies.map(movie => (
          <img
            key={movie.id}
            src={movie.poster}
            alt={movie.title}
            style={{ width: "200px", borderRadius: "8px" }}
          />
        ))}
      </div>
      </div>
    );
}

export default Carousel;