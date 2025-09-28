// auth.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('./Database'); // database connection file

// Signup function
const signup = (req, res) => {
    const { name, age, email, password } = req.body;
    const search_query = "SELECT email FROM subscriber WHERE email=?";
    const insert_query = "INSERT INTO subscriber(name,age,email,password) VALUES(?,?,?,?)";

    db.query(search_query, [email], async (err, result) => {
        if (err) return res.status(500).json({ error: "Database error" });

        if (result.length > 0) {
            return res.status(400).json({ error: "User already exists" });
        }

        try {
            const hashed_password = await bcrypt.hash(password, 9);
            db.query(insert_query, [name, age, email, hashed_password], (err, userResult) => {
                if (err) {
                    console.log("User Insert Error:", err);
                    return res.status(500).json({ error: "Error inserting user" });
                }

                const userId = userResult.insertId;
                console.log("New UserId:", userId);

                const insert_profile_query = 
                    "INSERT INTO profiles(user_id, full_name,email, language, timezone) VALUES(?,?,?,?,?)";

                db.query(insert_profile_query, [userId, name,email, "English", "GMT-5"], (err, profileResult) => {
                    if (err) {
                        console.log("Profile Insert Error:", err);
                        return res.status(500).json({ error: "Error inserting profile" });
                    }

                    console.log("Profile Insert Success:", profileResult);
                    res.json({ msg: "User & profile created successfully" });
                });
            });
        } catch (e) {
            console.log("Password Hash Error:", e);
            res.status(500).json({ error: "Password hashing failed" });
        }
    });
};


// Signin function
const signin = (req, res) => {
    const { email, password } = req.body;
    console.log(req);
    const select_query = "SELECT id, email, password FROM subscriber WHERE email=?";

    db.query(select_query, [email], async (err, result) => {
        if (err) return res.status(500).json({ error: "Signin selection failed" });

        if (result.length === 0) {
            return res.status(400).json({ error: "Invalid Username" });
        }

        const { id, password: password_database } = result[0];

        try {
            const isMatch = await bcrypt.compare(password, password_database);
            if (isMatch) {
                const token = jwt.sign({ id:id }, process.env.JWT_KEY, { expiresIn: '1h' });
                res.json({ token, msg: "Signin successful" });
            } else {
                res.status(400).json({ error: "Invalid password" });
            }
        } catch {
            res.status(500).json({ error: "Password comparison failed" });
        }
    });
};

module.exports = { signup, signin };
