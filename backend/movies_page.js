const express = require('express');
const axios = require('axios');
const https = require('https');
const app = express();

const API_KEY = "57a64673396bec00e661410df51019d4";
const BASE_URL = "https://api.themoviedb.org/3";


const carousel = async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/popular`,
      {
        params: { api_key: API_KEY, language: "en-US", page: 1 },
      });


    const posters = response.data.results.map(movie => ({
      id: movie.id,
      title: movie.title,
      poster: `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`,
    }));

    res.json(posters);
  }
  catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const movies = async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/now_playing`, {
      params: { api_key: API_KEY, language: "en-US", page: 1 },
    });

    // return smaller posters
    const posters = response.data.results.map(movie => ({
      id: movie.id,
      title: movie.title,
      poster: `https://image.tmdb.org/t/p/w342${movie.poster_path}`, // smaller size for grid
    }));

    res.json(posters);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const axiosInstance = axios.create({
  timeout: 15000, // ⏱️ increase timeout
  httpsAgent: new https.Agent({
    keepAlive: true,
    rejectUnauthorized: false, // 🚫 ignore TLS issues (safe for read-only APIs)
  }),
});

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const getNowPlayingMovies = async (req, res) => {
  try {
    // 1️⃣ Fetch now playing movies
    const response = await axiosInstance.get(`${BASE_URL}/movie/now_playing`, {
      params: {
        api_key: API_KEY,
        region: "IN",
        page: 1,
      },
    });

    const movies = response.data.results;

    // 2️⃣ Get trailers (with retry)
    const moviesWithTrailers = await Promise.all(
      movies.map(async (m, index) => {
        await delay(index * 150); // small gap to avoid rate limits

        let trailerUrl = null;

        for (let attempt = 1; attempt <= 3; attempt++) {
          try {
            const videoRes = await axiosInstance.get(`${BASE_URL}/movie/${m.id}/videos`, {
              params: { api_key: API_KEY },
            });

            const trailer = videoRes.data.results.find(
              (v) =>
                v.site === "YouTube" &&
                ["Trailer", "Teaser", "Clip", "Featurette"].includes(v.type)
            );
            console.log(videoRes.data.results)
            if (trailer) {
              trailerUrl = `https://www.youtube.com/watch?v=${trailer.key}`;
            }
            break; // ✅ success → break retry loop
          } catch (err) {
            console.error(
              `⚠️ Attempt ${attempt} failed for ${m.title}: ${err.message}`
            );
            if (attempt === 3)
              console.error(`❌ Giving up on ${m.title} after 3 retries`);
            await delay(500); // wait before retry
          }
        }

        return {
          id: m.id,
          title: m.title,
          poster: m.poster_path
            ? `https://image.tmdb.org/t/p/w342${m.poster_path}`
            : null,
          videoUrl: trailerUrl,
        };
      })
    );

    // 3️⃣ Return result
    res.json(moviesWithTrailers);
  } catch (err) {
    console.error("🔥 Error fetching now playing movies:", err.message);
    res.status(500).json({ error: err.message });
  }
};



const getPopularMovies = async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/popular`, { params: { api_key: API_KEY, language: "En-US", page: "1" } })

    const posters = response.data.results.map((m) => (
      {
        id: m.id,
        title: m.title,
        poster: `http://image.tmdb.org/t/p/w342${m.poster_path}`
      }
    ))
    res.json(posters);
  }
  catch (err) {
    res.status(500).json({ error: err.message });
  }
}

const getTopRatedMovies = async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/top_rated`, { params: { api_key: API_KEY, language: "En-US", page: "2", region: "IN" } })
    const posters = response.data.results.map((m) => (
      {
        id: m.id,
        title: m.title,
        poster: `http://image.tmdb.org/t/p/w342${m.poster_path}`
      }
    ))
    res.json(posters);
  }
  catch (err) {
    res.status(500).json({ error: err.message });
  }
}

const getUpCommingMovies = async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/top_rated`, { params: { api_key: API_KEY, language: "En-US", page: "3" } })
    const posters = response.data.results.map((m) => (
      {
        id: m.id,
        title: m.title,
        poster: `http://image.tmdb.org/t/p/w342${m.poster_path}`
      }
    ))
    res.json(posters);
  }
  catch (err) {
    res.status(500).json({ error: err.message });
  }
}
module.exports = { carousel, movies, getNowPlayingMovies, getPopularMovies, getTopRatedMovies, getUpCommingMovies };

