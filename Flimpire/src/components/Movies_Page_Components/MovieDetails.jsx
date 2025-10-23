import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { BiLogoImdb } from "react-icons/bi";
import MoviesRow from "./MoviesRow";

const fetchMovieDetails = async (movieId) => {
  const res = await axios.get(`http://localhost:8000/movies/movieDetails/${movieId}`);
  return res.data;
};

function MovieDetails() {
  const { state: movie } = useLocation();
  const [trailerUrl, setTrailerUrl] = useState(null);

  // 🚫 Safety check if no movie data
  if (!movie)
    return <h2 style={styles.centerText}>Movie not found</h2>;

  // 🎬 Fetch trailer and details
  const { data, isLoading, isError } = useQuery({
    queryKey: ["movieDetails", movie.id],
    queryFn: () => fetchMovieDetails(movie.id),
    enabled: !!movie,
  });

  // 🎞️ Update trailer URL
  useEffect(() => {
    if (data?.trailer) setTrailerUrl(data.trailer);
  }, [data]);

  if (isLoading) return <h2 style={styles.centerText}>Loading...</h2>;
  if (isError) return <h2 style={styles.errorText}>Failed to load movie details</h2>;
  if (!data?.details) return <h2 style={styles.centerText}>No details found</h2>;

  const md = data.details;

  return (
    <div style={styles.page}>
      {/* ===== HERO SECTION ===== */}
      <section style={styles.hero}>
        {/* --- Left Info Section --- */}
        <div style={styles.info}>
          <h1 style={styles.title}>{md.title}</h1>

          <p style={styles.rating}>
            <BiLogoImdb style={{ color: "yellow", fontSize: "2em" }} />
            {md.rating} /10
          </p>

          <p style={styles.streams}>
            <span style={{ color: "red" }}>2B+</span> Streams
          </p>

          <p style={styles.language}>Language: {md.language}</p>

          {/* --- Buttons --- */}
          <div style={styles.buttons}>
            <button
              style={styles.playButton}
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
                style={styles.trailerButton}
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
              <p style={{ color: "#aaa" }}>Trailer not available</p>
            )}
          </div>
        </div>

        {/* --- Right Image Section --- */}
        <div style={styles.imageContainer}>
          <div style={styles.fadeOverlay}></div>
          <img src={md.backdrop} alt={md.title} style={styles.image} />
        </div>
      </section>

      {/* ===== SHADOW TRANSITION ===== */}
      <div style={styles.shadow}></div>

      <MoviesRow title="Recommendation" category={`movieDetails/${movie.id}/recommendation`} />
    </div>
  );
}

/* 🎨 CSS-in-JS styles */
const styles = {
  page: {
    backgroundColor: "black",
    color: "white",
    minHeight: "100vh",
    overflow: "hidden",
  },

  hero: {
    display: "flex",
    alignItems: "center",
    height: "60vh",
    position: "relative",
  },

  info: {
    flex: "0 0 28%", // 👈 fixed width: 40%
    padding: "4% 4%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    background:
      "linear-gradient(to right, rgba(0,0,0,1), rgba(0,0,0,0.4), transparent)",
    zIndex: 2,
  },


  title: {
    fontSize: "2.8rem",
    fontWeight: "bold",
    marginBottom: "15px",
    lineHeight: "1.1",
  },

  rating: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    color: "#bbb",
    fontSize: "1.2rem",
    marginBottom: "10px",
  },

  streams: {
    color: "#bbb",
    fontSize: "1rem",
    marginBottom: "10px",
    marginLeft:"5px",
  },

  language: {
    color: "#bbb",
    marginLeft: "5px",
  },

  buttons: {
    display: "flex",
    gap: "25px",
    marginTop: "20px",
  },

  playButton: {
    backgroundColor: "#e50914",
    color: "white",
    border: "none",
    borderRadius: "25px",
    padding: "10px 35px",
    fontSize: "1rem",
    cursor: "pointer",
    transition: "0.3s",
  },

  trailerButton: {
    backgroundColor: "rgba(255,255,255,0.15)",
    color: "white",
    border: "1px solid white",
    borderRadius: "25px",
    padding: "10px 35px",
    fontSize: "1rem",
    textDecoration: "none",
    transition: "0.3s",
    cursor: "pointer",
  },

  imageContainer: {
    flex: "0 0 72%", // 👈 fixed width: 60%
    position: "relative",
    height: "100%",
    overflow: "hidden",
  },

  image: {
    width: "100%",
    height: "100%",
    filter: "brightness(80%)",
  },

  fadeOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "200px",
    height: "100%",
    background:
      "linear-gradient(to left, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 100%)",
    zIndex: 3,
  },

  shadow: {
    height: "120px",
    width: "100%",
    background:
      "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 100%)",
    marginTop: "-120px",
    position: "relative",
  },

  centerText: { color: "white", textAlign: "center", marginTop: "30vh" },
  errorText: { color: "red", textAlign: "center", marginTop: "30vh" },
};

export default MovieDetails;
