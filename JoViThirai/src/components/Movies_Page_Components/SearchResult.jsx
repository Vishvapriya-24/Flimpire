import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const API_KEY = "57a64673396bec00e661410df51019d4"; // your TMDB key

function SearchResult() {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("q") || "";

  const [movies, setMovies] = useState([]);
  const [tvShows, setTvShows] = useState([]);
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) return;

    const fetchAll = async () => {
      setLoading(true);
      try {
        const [movieRes, tvRes, personRes] = await Promise.all([
          axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`),
          axios.get(`https://api.themoviedb.org/3/search/tv?api_key=${API_KEY}&query=${query}`),
          axios.get(`https://api.themoviedb.org/3/search/person?api_key=${API_KEY}&query=${query}`),
        ]);

        setMovies(movieRes.data.results || []);
        setTvShows(tvRes.data.results || []);
        setArtists(personRes.data.results || []);
      } catch (err) {
        console.error("TMDB fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, [query]);

  return (
    <div className="container mt-4 text-light">
      <h3 className="mb-4">Search results for: "{query}"</h3>
      {loading && <p>Loading...</p>}

      {/* Artists */}
      {!loading && artists.length > 0 && (
        <section className="mb-5">
          <h5 className="text-uppercase fw-bold mb-3 text-warning">Artists</h5>
          <div className="d-flex flex-wrap gap-4">
            {artists.slice(0, 8).map((person) => (
              <div
                key={person.id}
                className="text-center"
                style={{ width: "120px" }}
              >
                <img
                  src={
                    person.profile_path
                      ? `https://image.tmdb.org/t/p/w200${person.profile_path}`
                      : "https://via.placeholder.com/120x120?text=No+Image"
                  }
                  alt={person.name}
                  className="rounded-circle mb-2"
                  style={{ width: "120px", height: "120px", objectFit: "cover" }}
                />
                <p className="small mb-0">{person.name}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Movies */}
      {!loading && movies.length > 0 && (
        <section className="mb-5">
          <h5 className="text-uppercase fw-bold mb-3 text-warning">Movies</h5>
          <div className="row">
            {movies.slice(0, 8).map((movie) => (
              <div key={movie.id} className="col-6 col-md-3 mb-4">
                <div className="card bg-dark text-light h-100 border-0">
                  <img
                    src={
                      movie.poster_path
                        ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
                        : "https://via.placeholder.com/300x450?text=No+Image"
                    }
                    alt={movie.title}
                    className="card-img-top rounded"
                  />
                  <div className="card-body p-2">
                    <h6 className="card-title mb-1 text-truncate">
                      {movie.title}
                    </h6>
                    <p className="text-muted small mb-0">
                      {movie.release_date
                        ? movie.release_date.split("-")[0]
                        : "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* TV Shows */}
      {!loading && tvShows.length > 0 && (
        <section className="mb-5">
          <h5 className="text-uppercase fw-bold mb-3 text-warning">TV Shows</h5>
          <div className="row">
            {tvShows.slice(0, 8).map((tv) => (
              <div key={tv.id} className="col-6 col-md-3 mb-4">
                <div className="card bg-dark text-light h-100 border-0">
                  <img
                    src={
                      tv.poster_path
                        ? `https://image.tmdb.org/t/p/w300${tv.poster_path}`
                        : "https://via.placeholder.com/300x450?text=No+Image"
                    }
                    alt={tv.name}
                    className="card-img-top rounded"
                  />
                  <div className="card-body p-2">
                    <h6 className="card-title mb-1 text-truncate">{tv.name}</h6>
                    <p className="text-muted small mb-0">
                      {tv.first_air_date
                        ? tv.first_air_date.split("-")[0]
                        : "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {!loading &&
        movies.length === 0 &&
        tvShows.length === 0 &&
        artists.length === 0 && <p>No results found.</p>}
    </div>
  );
}

export default SearchResult;
