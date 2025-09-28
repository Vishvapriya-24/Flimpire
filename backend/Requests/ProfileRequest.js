const db = require('../Database')



const getProfile = (req,res) =>{
    const {user_id} = req.params;

    const getProfileQuery = "SELECT * FROM profiles WHERE user_id= ?";
    db.query(getProfileQuery,[user_id],async(err,result)=>{
        if(err){
            return res.status(500).json({error:"Error Occured While Getting UserProfile"})
            
        }
        if(result.length === 0){
            return res.status(404).json({msg:"Profile not found"})
        }
        return res.json({profile:result[0]})

    })

}


const createProfile = (req, res) => {
    const { user_id, name, age, gender, nickname, country, bio } = req.body;

    if (!user_id) {
        return res.status(400).json({ error: "user_id is required" });
    }

    const insertQuery = `
        INSERT INTO profiles (user_id, name, age, gender, nickname, country, bio)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(insertQuery, [user_id, name || null, age || null, gender || null, nickname || null, country || null, bio || null], (err, result) => {
        if (err) {
            console.error("Error creating profile:", err);
            return res.status(500).json({ error: "Error occurred while creating profile" });
        }
        return res.json({ msg: "Profile created successfully" });
    });
};


const updateProfile = (req, res) => {
    const fields = req.body;
    const {user_id} = req.params;

    if (!user_id) {
        return res.status(400).json({ error: "user_id is required" });
    }
    if (req.file) {
    fields.profile_pic =  `/uploads/${req.file.filename}`; // store filename in DB
  }

    const keys = Object.keys(fields);
    if (keys.length === 0) {
        return res.status(400).json({ error: "No fields to update" });
    }

    const setClause = keys.map(key => `${key}=?`).join(", ");
    const values = Object.values(fields);

    const updateQuery = `UPDATE profiles SET ${setClause} WHERE user_id=?`;

    db.query(updateQuery, [...values, user_id], (err, result) => {
        if (err) {
            console.error("Error updating profile:", err);
            return res.status(500).json({ error: "Error occurred while updating profile" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ msg: "Profile not found for update" });
        }
        return res.json({ msg: "Profile updated successfully" });
    });
};




module.exports = {getProfile,createProfile,updateProfile}