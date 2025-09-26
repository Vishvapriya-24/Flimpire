const express = require('express');
const axios = require('axios');
const app = express();

const API_KEY = "57a64673396bec00e661410df51019d4";
const BASE_URL = "https://api.themoviedb.org/3";


const carousel = async (req, res) => {
    try {
        const response = await axios.get(`${BASE_URL}/movie/popular`,
            {params:{api_key:API_KEY, language:"en-US",page:1},
        });


        const posters = response.data.results.map(movie => ({
            id: movie.id,
            title:movie.title,
            poster:`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`,
        }));

        res.json(posters);
    }
    catch(error) {
        res.status(500).json({error:error.message});
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

module.exports = {carousel,movies};

