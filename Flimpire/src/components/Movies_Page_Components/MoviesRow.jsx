import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRef } from "react";

const fetchMovies = async (category) => {
  const res = await axios.get(`http://localhost:8000/movies/${category}`);
  return res.data;
};

const MoviesRow = ({ title, category }) => {
  const scrollRef = useRef(null);
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["Movies", category],
    queryFn: () => fetchMovies(category),
  });

  const handleScroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 6 * 220; // smoother scroll for 6 movies
      scrollRef.current.scrollBy({
        left: direction === "right" ? scrollAmount : -scrollAmount,
        behavior: "smooth",
      });
    }
  };

  if (isLoading)
    return (
      <h3 style={{ color: "gray", marginLeft: "20px" }}>
        Loading {title}...
      </h3>
    );
  if (isError)
    return (
      <h3 style={{ color: "red", marginLeft: "20px" }}>
        Error loading {title}: {error.message}
      </h3>
    );

  const styles = {
    section: {
      marginBottom: "40px",
      position: "relative",
      padding: "0 40px",
    },
    title: {
      fontSize: "22px",
      fontWeight: "bold",
      color: "#fff",
      marginBottom: "10px",
      textShadow: "0 2px 4px rgba(0,0,0,0.6)",
    },
    scrollContainer: {
      display: "flex",
      overflowX: "hidden",
      gap: "25px",
      paddingBottom: "20px",
    },
    poster: {
      width: "200px",
      height: "260px",
      cursor: "pointer",
      borderRadius: "8px",
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
    },
    arrowButton: {
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      backgroundColor: "rgba(0, 0, 0, 0.6)",
      border: "none",
      color: "white",
      padding: "10px",
      borderRadius: "50%",
      cursor: "pointer",
      zIndex: 10,
    },
    leftArrow: { left: "20px" },
    rightArrow: { right: "20px" },
    
  };

  return (
    <>
      <div style={styles.section}>
        <h2 style={styles.title}>{title}</h2>

        {/* Left arrow */}
        <button
          style={{ ...styles.arrowButton, ...styles.leftArrow }}
          onClick={() => handleScroll("left")}
        >
          <AiOutlineLeft size={26} />
        </button>

        {/* Movie List */}
        <div style={styles.scrollContainer} ref={scrollRef}>
          {data?.slice(0, 20).map((m) => (
            <img
              key={m.id}
              src={m.poster}
              alt={m.title}
              style={styles.poster}
              onClick={() => {
    if (m.videoUrl) window.open(m.videoUrl, "_blank");
    else alert("Trailer not available 😢");
  }}
              onMouseEnter={(e) => {
                e.target.style.transform = "scale(1.07)";
                e.target.style.boxShadow =
                  "0 4px 10px rgba(255,255,255,0.3)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "scale(1)";
                e.target.style.boxShadow = "none";
              }}
            />
          ))}
        </div>

        {/* Right arrow */}
        <button
          style={{ ...styles.arrowButton, ...styles.rightArrow }}
          onClick={() => handleScroll("right")}
        >
          <AiOutlineRight size={26} />
        </button>

        {/* Fade bottom gradient */}
        <div style={styles.gradient}></div>
      </div>

      
    </>
  );
};

export default MoviesRow;
