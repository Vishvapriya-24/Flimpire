import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { BiLogoImdb } from "react-icons/bi";

const FetchTrailers = async (movieId) => {
  const res = await axios.get(`http://localhost:8000/movies/movieDetails/${movieId}`);
  return res.data;
};

const FetchRecommendation = async (movieId)=> {
  const res = await axios.get(`http://localhost:8000/movies/movieDetails/${movieId}/recommendation`);
  return res.data;
}

function MovieDetails() {
  const { state: movie } = useLocation();
  const [trailerUrl, setTrailerUrl] = useState(null);
  
  if (!movie)
    return <h2 style={{ color: "white", textAlign: "center" }}>Movie not found</h2>;

  const { data: trailerData, isLoading, isError, } = useQuery({
    queryKey: ["trailer", movie?.id],
    queryFn: () => FetchTrailers(movie.id),
    enabled: !!movie,
  });


  useEffect(() => {
    if (trailerData?.trailer) setTrailerUrl(trailerData.trailer);
  }, [trailerData]);


  if (isLoading)
    return <h2 style={{ color: "white", textAlign: "center" }}>Loading...</h2>;

  if (isError)
    return <h2 style={{ color: "red", textAlign: "center" }}>Failed to load movie details</h2>;

  if (!trailerData || !trailerData.details)
    return <h2 style={{ color: "white", textAlign: "center" }}>No movie details found</h2>;

  const md = trailerData.details;

  return (
    <div style={{ backgroundColor: "black", color: "white", minHeight: "100vh" }}>
      {/* ===== HERO SECTION ===== */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          height: "60vh",
          overflow: "hidden",
        }}
      >

        {/* Left section - Info */}
        <div
          style={{
            width: "40%",
            height: "100%",
            background: "linear-gradient(to right, rgba(0,0,0,1), rgba(0,0,0,0.3), transparent)",
            padding: "6% 5%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            zIndex: 2,

          }}
        >
          <h1
            style={{
              fontSize: "2.8rem",
              fontWeight: "bold",
              marginBottom: "15px",
              lineHeight: "1.1",
            }}
          >
            {md.title}
          </h1>

          <p
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              color: "#bbb",
              fontSize: "1.2rem",
              marginBottom: "10px",
            }}
          >
            <BiLogoImdb style={{ color: "yellow", fontSize: "2em" }} />  {md.rating} /10
          </p>

          <p style={{ color: "#bbb", fontSize: "1rem", marginBottom: "10px" }}>
            <span style={{ color: "red", marginLeft: "5px" }}>2B+ </span> Streams
          </p>

          <p style={{ color: "#bbb", marginLeft:"5px",}}> Language: {md.language}</p>

          <div style={{ display: "flex", gap: "25px", marginTop: "20px" }}>
            <button
              style={{
                backgroundColor: "#e50914",
                color: "white",
                border: "none",
                borderRadius: "25px",
                padding: "10px 35px",
                fontSize: "1rem",
                cursor: "pointer",
                transition: "0.3s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#b00610")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#e50914")}
            >
              Play
            </button>

            {trailerUrl ? (
              <a
                href={trailerUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  backgroundColor: "rgba(255,255,255,0.15)",
                  color: "white",
                  border: "1px solid white",
                  borderRadius: "25px",
                  padding: "10px 35px",
                  fontSize: "1rem",
                  textDecoration: "none",
                  transition: "0.3s",
                  cursor:"pointer",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.3)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.15)")
                }
              >
                Watch Trailer
              </a>
            ) : (
              <p style={{ color: "#aaa", marginTop: "8px" }}>Trailer not available</p>
            )}
          </div>

          
        </div>

        <div
          style={{
            height: "100%",
            width: "200px",
            background:
              "linear-gradient(to left, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 100%)",
            zIndex:5,
            marginRight: "-120px",
            position:"relative",
          }}
        ></div>
        {/* Poster Image */}
        <img
          src={md.backdrop}
          alt={md.title}
          style={{
            width: "100%",
            height: "100%",
            filter: "brightness(90%)",
          }}
        />
      </div>
      

      {/* ===== SHADOW TRANSITION ===== */}
      <div
        style={{
          height: "120px",
          width:"100%",
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 100%)",
          marginTop: "-120px",
          position: "relative",
        }}
      ></div>
    </div>


    
  );
}

export default MovieDetails;
