


// server.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();
require('./Database'); // just runs the db connection
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const { signup, signin } = require('./log_page');
const { carousel, getNowPlayingMovies, getPopularMovies,getTopRatedMovies, getUpCommingMovies, getMovieTrailer, getRecommendation, getSeries, getSeriesEpisodes } = require('./movies_page');
const { createProfile, updateProfile, getProfile } = require('./Requests/ProfileRequest');


const app = express();
app.use('/uploads', express.static('uploads'));
app.use(cors());
app.use(express.json());

// Routes
app.post('/signup', signup);
app.post('/signin', signin);

//movies
app.get('/carousel', carousel);
app.get('/movies/now-playing', getNowPlayingMovies)
app.get('/movies/popular', getPopularMovies)
app.get('/movies/top_rated', getTopRatedMovies)
app.get('/movies/upcoming', getUpCommingMovies)
app.get('/movies/movieDetails/:movieId', getMovieTrailer);
app.get('/movies/movieDetails/:movieId/recommendation', getRecommendation);

//series
app.get('/series/:category', getSeries);
app.get('/series/:seriesId/season/:seasonId',getSeriesEpisodes);

// Profile routes
app.post('/profile/create', createProfile);   // create new profile
app.put('/profile/:user_id',upload.single("profile_pic"), updateProfile);   // update existing profile (partial allowed)
app.get('/profile/:user_id', getProfile);     // fetch profile by user_id




app.listen(process.env.PORT, () => {
    console.log("Flimpire API is running");
});
