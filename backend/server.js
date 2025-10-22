// const express = require('express');
// const mysql = require('mysql2');
// const cors = require('cors');
// require('dotenv').config();
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');

// const app = express();
// app.use(cors());
// app.use(express.json());



// const db = mysql.createConnection({
//     host: process.env.HOST,
//     user: process.env.USER,
//     password: process.env.PASSWORD,
//     database: process.env.DATABASE
// });

// db.connect(
//     (err) => {
//         if (err) {
//             console.log("database connection failed", err);
//         }
//         else {
//             console.log("database connected successfully.");
//         }
//     }
// )

// app.post('/signup', (req, res) => {
//     const { name, age, email, password } = req.body;
//     const search_query = "SELECT email from subscriber where email=?";
//     const insert_query = "INSERT INTO subscriber(name,age,email,password) VALUES(?,?,?,?)";

//     db.query(search_query, [email], async (err, result) => {
//         if (err) {
//             console.log("error searching", err);
//             return res.status(500).json({ error: "Database error" });
//         }

//         if (result.length > 0) {
//             return res.status(400).json({ error: "user already exists" });
//         }

//         try {
//             const hashed_password = await bcrypt.hash(password, 9);
//             db.query(insert_query, [name, age, email, hashed_password], (err, result) => {
//                 if (err) {
//                     console.log("error inserting", err);
//                 }
//                 else {
//                     res.json({ msg: "user inserted sucessfully" });
//                 }
//             })
//         } catch (hasherr) {
//             res.status(500).json({ error: "Password hashing failed" });

//         }


//     })
// })

// app.post('/signin', (req, res) => {
//     const { email, password } = req.body;
//     const select_query = "SELECT id, email, password FROM SUBSCRIBER WHERE email=?";

//     db.query(select_query, [email], async (err, result) => {
//         if (err) {
//             return res.status(500).json({ error: "signin selection failed" });
//         }

//         if (result.length === 0) {
//             return res.status(400).json({ error: "Invalid Username" });
//         }

//         const password_database = result[0].password;
//         const id_database = result[0].id;

//         try {
//             const isMatch = await bcrypt.compare(password, password_database);
//             if (isMatch) {
//                 const token = jwt.sign(
//                     { id: id_database },
//                     process.env.JWT_KEY,
//                     { expiresIn: '1h' }
//                 );
//                 return res.json({ token, msg: "signin correctly" });
//             } else {
//                 return res.status(400).json({ error: "Invalid password" });
//             }
//         } catch (compareErr) {
//             return res.status(500).json({ error: "Password comparison failed" });
//         }
//     });
// });



// app.listen(process.env.PORT, () => {
//     console.log("Flimpire API is running");
// })



// server.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();
require('./Database'); // just runs the db connection
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const { signup, signin } = require('./log_page');
const { carousel, getNowPlayingMovies, getPopularMovies,getTopRatedMovies, getUpCommingMovies, getMovieTrailer } = require('./movies_page');
const { createProfile, updateProfile, getProfile } = require('./Requests/ProfileRequest');


const app = express();
app.use('/uploads', express.static('uploads'));
app.use(cors());
app.use(express.json());

// Routes
app.post('/signup', signup);
app.post('/signin', signin);

app.get('/carousel', carousel);
app.get('/movies/now-playing',getNowPlayingMovies)
app.get('/movies/popular',getPopularMovies)
app.get('/movies/top_rated',getTopRatedMovies)
app.get('/movies/upcoming',getUpCommingMovies)
app.get('/movies/movieDetails/:movieId',getMovieTrailer);

// Profile routes
app.post('/profile/create', createProfile);   // create new profile
app.put('/profile/:user_id',upload.single("profile_pic"), updateProfile);   // update existing profile (partial allowed)
app.get('/profile/:user_id', getProfile);     // fetch profile by user_id




app.listen(process.env.PORT, () => {
    console.log("Flimpire API is running");
});
