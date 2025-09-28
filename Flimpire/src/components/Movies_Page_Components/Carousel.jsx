import axios from "axios";
import {useEffect, useState} from 'react';


// function Carousel() {
//     const [carouselMovies,setCarouselMovies] = useState([]);
//     useEffect(() => {
//   fetch("http://localhost:8000/carousel")
//     .then(res => res.json())
//     .then(data => setCarouselMovies(data));
// }, []);

//     return (
//         <div>
//         <h1>seetha</h1>
//         <div style={{ display: "flex", gap: "10px", overflowX: "scroll" }}>
//         {carouselMovies.length && carouselMovies.map(movie => (
//           <img
//             key={movie.id}
//             src={movie.poster}
//             alt={movie.title}
//             style={{ width: "200px", borderRadius: "8px" }}
//           />
//         ))}
//       </div>
//       </div>
//     );
// }

// export default Carousel;



import BootCarousel from "react-bootstrap/Carousel";

function Carousel() {

  const [carouselMovies,setCarouselMovies] = useState([]);
    useEffect(() => {
  fetch("http://localhost:8000/carousel")
    .then(res => res.json())
    .then(data => setCarouselMovies(data));
}, []);

  const styles = {
    image: {
      width: "100%",
      height: "400px",
      objectPosition:"center",
    },
    caption: {
      bottom: "40px",
      background: "rgba(0,0,0,0.6)",
      padding: "10px 20px",
      borderRadius: "8px",
    },
    carousel: {
      backgroundColor: "#000",
    },
  };

  return (
    <BootCarousel interval={2000}>
      {carouselMovies.length && carouselMovies.map((movie) => (
        <BootCarousel.Item key={movie.id}>
          <img
            style = {styles.image}
            className="d-block w-10"
            src={movie.poster}
            alt={movie.title}
          />
          <BootCarousel.Caption>
            <h3>{movie.title}</h3>
            <p>{movie.overview || "No description available."}</p>
          </BootCarousel.Caption>
        </BootCarousel.Item>
      ))}
    </BootCarousel>
  );
}

export default Carousel;
