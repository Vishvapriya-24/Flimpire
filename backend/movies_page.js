const express = require('express');
const axios = require('axios');
const https = require('https');
const app = express();

const API_KEY = "57a64673396bec00e661410df51019d4";
const BASE_URL = "https://api.themoviedb.org/3";

// ✅ Create HTTPS agent to ignore certificate issues safely
const agent = new https.Agent({
  keepAlive: true,
  rejectUnauthorized: false, // ignore SSL verification issues
});
axios.defaults.httpsAgent = agent;

// ✅ Helper – get YouTube trailer (with fallback)
const getMovieTrailer = async (req, res) => {
  const { movieId } = req.params;

  try {
    // Two API calls: one for videos (trailers), one for details
    const [videoRes, detailsRes] = await Promise.all([
      axios.get(`${BASE_URL}/movie/${movieId}/videos`, {
        params: { api_key: API_KEY },
      }),
      axios.get(`${BASE_URL}/movie/${movieId}`, {
        params: { api_key: API_KEY, language: "en-US" },
      }),
    ]);

    // ===== Extract trailer =====
    let trailer = videoRes.data.results.find(
      (v) => v.site === "YouTube" && ["Trailer", "Teaser"].includes(v.type)
    );
    if (!trailer) {
      trailer = videoRes.data.results.find((v) => v.site === "YouTube");
    }

    // ===== Extract movie details =====
    const movie = detailsRes.data;

    const details = {
      id: movie.id,
      title: movie.title,
      overview: movie.overview,
      rating: movie.vote_average,
      release_date: movie.release_date,
      language: movie.original_language,
      adult_content: movie.adult,
      backdrop: `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`,
    };

    const trailerUrl = trailer ? `https://www.youtube.com/watch?v=${trailer.key}` : null;

    res.json({
      trailer: trailerUrl,
      details,
    });
  } catch (err) {
    console.error(`❌ Error fetching trailer/details for movie ${movieId}:`, err.message);
    res.status(500).json({ error: "Failed to fetch movie data" });
  }
};


const getRecommendation = async (req, res) => {
  const { movieId } = req.params;

  try {
    // 🔹 Fetch similar/recommended movies from TMDB
    const recommendation = await axios.get(`${BASE_URL}/movie/${movieId}/similar`, {
      params: { api_key: API_KEY, language: "en-US", page: 1 },
    });

    // 🔹 Map essential movie info
    const recommendation_movies = recommendation.data.results.map((m) => ({
      id: m.id,
      title: m.title,
      poster: m.poster_path
        ? `https://image.tmdb.org/t/p/w342${m.poster_path}`
        : "https://via.placeholder.com/342x513?text=No+Image",
    }));

    // ✅ Send data back to frontend
    res.json(recommendation_movies);

  } catch (err) {
    console.error(`❌ Error fetching recommendation for movie ${movieId}:`, err.message);
    res.status(500).json({ error: "Failed to fetch recommendation movie data" });
  }
};


// ✅ Fetch carousel movies
const carousel = async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/popular`, {
      params: { api_key: API_KEY, language: "en-US", page: 1 },
    });

    const posters = response.data.results.map((movie) => ({
      id: movie.id,
      title: movie.title,
      overview:movie.overview.split('.')[0],
      poster: `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`,
    }));

    res.json(posters);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// ✅ Fetch now playing movies
const getNowPlayingMovies = async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/now_playing`, {
      params: {
        api_key: API_KEY,
        region: "IN",
        page: 1,
      },
    });

    const movies = response.data.results.map((m) => (
        {  id: m.id,
          title: m.title,
          poster: `https://image.tmdb.org/t/p/w342${m.poster_path}`,  }
    ));

    res.json(movies);
  } catch (err) {
    console.error("🔥 Error fetching now playing movies:", err.message);
    res.status(500).json({ error: err.message });
  }
};

// ✅ Fetch popular movies
const getPopularMovies = async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/popular`, {
      params: { api_key: API_KEY, language: "en-US", page: 1 },
    });

    const posters = response.data.results.map((m) => ({
      id: m.id,
      title: m.title,
      poster: `https://image.tmdb.org/t/p/w342${m.poster_path}`,
    }));
    res.json(posters);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Fetch top rated movies
const getTopRatedMovies = async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/top_rated`, {
      params: { api_key: API_KEY, language: "en-US", page: 2, region: "IN" },
    });

    const posters = response.data.results.map((m) => ({
      id: m.id,
      title: m.title,
      poster: `https://image.tmdb.org/t/p/w342${m.poster_path}`,
    }));
    res.json(posters);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Fetch upcoming movies
const getUpCommingMovies = async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/upcoming`, {
      params: { api_key: API_KEY, language: "en-US", page: 3 },
    });

    const posters = response.data.results.map((m) => ({
      id: m.id,
      title: m.title,
      poster: `https://image.tmdb.org/t/p/w342${m.poster_path}`,
    }));
    res.json(posters);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// 🟢 Fetch Korean (K-drama) Series Example
const getSeries = async (req, res) => {

  const {category} = req.params;
  try {
    const response = await axios.get(`${BASE_URL}/discover/tv`, {
      params: {
        api_key: API_KEY,
        with_original_language: category,
        with_genres: 10749,  // ✅ Correct spelling
        sort_by: "popularity.asc",
        page:3,   // optional, but better for relevance
      },
    });

    // 🧩 Transform only the needed data
    const series = response.data.results
    .filter((s)=>s.poster_path)
    .map((s) => ({
      id: s.id,
      name: s.name,
      overview: s.overview,
      poster: `https://image.tmdb.org/t/p/w1280${s.backdrop_path}`,
      rating: s.vote_average,
      releaseDate: s.first_air_date,
      country: s.origin_country,
      total_season:s.number_of_seasons || null,
    }));

    res.json(series);
  } catch (err) {
    console.error("Error fetching series:", err.message);
    res.status(500).json({ error: "Failed to fetch series" });
  }
};

const getSeriesEpisodes = async (req,res) => {
  const { seriesId,seasonId } = req.params;
  try {
    const response = await axios.get(`${BASE_URL}/tv/${seriesId}/season/${seasonId}`,{
      params:{api_key:API_KEY}
    });

    const episodes = response.data.episodes.map((ep) => ({
      id: ep.id,
      name: ep.name,
      overview: ep.overview,
      episodeNumber: ep.episode_number,
      airDate: ep.air_date,
      stillPath:
    ep.still_path
      ? `https://image.tmdb.org/t/p/w500${ep.still_path}`
      : response.data.poster_path
      ? `https://image.tmdb.org/t/p/w500${response.data.poster_path}`
      : "https://via.placeholder.com/500x281?text=No+Image",
    }));

    res.json({
      seriesId,
      seasonId,
      totalEpisodes: episodes.length,
      episodes,
    });
  } catch (err) {
    console.error("Error fetching season",seasonId,":", err.message);
    res.status(500).json({ error: "Failed to fetch Season 1 episodes" });
  }
}


module.exports = {
  carousel,
  getNowPlayingMovies,
  getPopularMovies,
  getTopRatedMovies,
  getUpCommingMovies,
  getMovieTrailer,
  getRecommendation,
  getSeries,
  getSeriesEpisodes,
};
