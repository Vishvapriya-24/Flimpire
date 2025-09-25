const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(express.json());



const db = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

db.connect(
    (err) => {
        if (err) {
            console.log("database connection failed", err);
        }
        else {
            console.log("database connected successfully.");
        }
    }
)

app.post('/signup', (req, res) => {
    const { name, age, email, password } = req.body;
    const search_query = "SELECT email from subscriber where email=?";
    const insert_query = "INSERT INTO subscriber(name,age,email,password) VALUES(?,?,?,?)";

    db.query(search_query, [email], async (err, result) => {
        if (err) {
            console.log("error searching", err);
            return res.status(500).json({ error: "Database error" });
        }

        if (result.length > 0) {
            return res.status(400).json({ error: "user already exists" });
        }

        try {
            const hashed_password = await bcrypt.hash(password, 9);
            db.query(insert_query, [name, age, email, hashed_password], (err, result) => {
                if (err) {
                    console.log("error inserting", err);
                }
                else {
                    res.json({ msg: "user inserted sucessfully" });
                }
            })
        } catch (hasherr) {
            res.status(500).json({ error: "Password hashing failed" });

        }


    })
})

app.post('/signin', (req, res) => {
    const { email, password } = req.body;
    const select_query = "SELECT id, email, password FROM SUBSCRIBER WHERE email=?";

    db.query(select_query, [email], async (err, result) => {
        if (err) {
            return res.status(500).json({ error: "signin selection failed" });
        }

        if (result.length === 0) {
            return res.status(400).json({ error: "Invalid Username" });
        }

        const password_database = result[0].password;
        const id_database = result[0].id;

        try {
            const isMatch = await bcrypt.compare(password, password_database);
            if (isMatch) {
                const token = jwt.sign(
                    { id: id_database },
                    process.env.JWT_KEY,
                    { expiresIn: '1h' }
                );
                return res.json({ token, msg: "signin correctly" });
            } else {
                return res.status(400).json({ error: "Invalid password" });
            }
        } catch (compareErr) {
            return res.status(500).json({ error: "Password comparison failed" });
        }
    });
});



app.listen(process.env.PORT, () => {
    console.log("Flimpire API is running");
})