import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// ✅ Fetch 1 season of a given series
const FetchSeriesSeason = async (seriesId, season) => {
  const res = await axios.get(
    `http://localhost:8000/series/${seriesId}/season/${season}`
  );
  return res.data;
};

function SeriesDetails() {
  const [season, setSeason] = useState(1);
  const { state: series } = useLocation();

  // ✅ Fetch series details for given season
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["seriesSeason", series.id, season],
    queryFn: () => FetchSeriesSeason(series.id, season),
  });

  if (isLoading) return <p style={styles.centerText}>Loading series...</p>;
  if (isError)
    return <p style={styles.errorText}>Error fetching data: {error.message}</p>;

  return (
    <div style={styles.page}>
      {/* ===== HERO SECTION ===== */}
      <section style={styles.hero}>
        {/* --- Left Info Section --- */}
        <div style={styles.info}>
          <h1 style={styles.title}>{series.name}</h1>

          <p style={styles.language}>
            Original Language:{" "}
            <span style={{ color: "#fff" }}>{series.original_language}</span>
          </p>

          {/* --- Season Dropdown --- */}
          <div style={styles.seasonContainer}>
            <label htmlFor="seasonSelect" style={styles.seasonLabel}>
              Select Season:
            </label>
            <select
              id="seasonSelect"
              value={season}
              onChange={(e) => setSeason(Number(e.target.value))}
              style={styles.seasonSelect}
            >
              {Array.from({ length: series.number_of_seasons || 1 }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  Season {i + 1}
                </option>
              ))}
            </select>
          </div>


          <div style={styles.buttons}>
            <button
              style={styles.playButton}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#b00610")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "#e50914")
              }
            >
              ▶ Play
            </button>
          </div>
        </div>

        {/* --- Right Image Section --- */}
        <div style={styles.imageContainer}>
          <div style={styles.fadeOverlay}></div>
          <img
            src={series.backdrop || series.poster}
            alt={series.name}
            style={styles.image}
          />
        </div>
      </section>

      {/* ===== SHADOW TRANSITION ===== */}
      <div style={styles.shadow}></div>

      {/* ===== EPISODES LIST ===== */}
      <section style={styles.episodesSection}>
        <h2 style={styles.episodeTitle}>Episodes</h2>
        <div style={styles.episodeGrid}>
          {data?.episodes?.map((ep) => (
            <div key={ep.id} style={styles.episodeCard}>
              <img
                src={`https://image.tmdb.org/t/p/w500${ep.still_path}`}
                alt={ep.name}
                style={styles.episodeImage}
              />
              <div style={styles.episodeOverlay}>
                <h4>{ep.episode_number}. {ep.name}</h4>
                <p>{ep.overview?.slice(0, 100)}...</p>
              </div>
            </div>
          ))}
        </div>
      </section>
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
    fontFamily: "Poppins, sans-serif",
  },

  hero: {
    display: "flex",
    alignItems: "center",
    height: "60vh",
    position: "relative",
  },

  info: {
    flex: "0 0 30%",
    padding: "4%",
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

  language: {
    color: "#bbb",
    marginBottom: "10px",
  },

  overview: {
    marginTop: "20px",
    color: "#ccc",
    fontSize: "1rem",
    lineHeight: "1.5",
  },

  buttons: {
    display: "flex",
    gap: "20px",
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

  imageContainer: {
    flex: "0 0 70%",
    position: "relative",
    height: "100%",
    overflow: "hidden",
  },

  image: {
    width: "100%",
    height: "100%",
    filter: "brightness(80%)",
    objectFit: "cover",
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

  seasonContainer: {
    display: "flex",
    alignItems: "center",
    marginTop: "10px",
    gap: "10px",
  },

  seasonLabel: { fontSize: "1rem", color: "#bbb" },

  seasonSelect: {
    backgroundColor: "#111",
    color: "white",
    padding: "5px 10px",
    border: "1px solid #333",
    borderRadius: "5px",
  },

  episodesSection: {
    padding: "40px",
  },

  episodeTitle: {
    fontSize: "1.8rem",
    marginBottom: "20px",
  },

  episodeGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "20px",
  },

  episodeCard: {
    position: "relative",
    borderRadius: "10px",
    overflow: "hidden",
    backgroundColor: "#181818",
    transition: "transform 0.3s ease",
  },

  episodeCardHover: {
    transform: "scale(1.05)",
  },

  episodeImage: {
    width: "100%",
    height: "160px",
    objectFit: "cover",
  },

  episodeOverlay: {
    padding: "10px",
  },

  centerText: { color: "white", textAlign: "center", marginTop: "30vh" },
  errorText: { color: "red", textAlign: "center", marginTop: "30vh" },
};

export default SeriesDetails;
