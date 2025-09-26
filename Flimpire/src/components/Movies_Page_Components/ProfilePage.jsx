import { useState, useEffect } from "react";
import { FaEnvelope, FaEdit, FaSave, FaCamera } from "react-icons/fa";

function ProfilePage() {
  const [profile, setProfile] = useState({
    name: "Alexa Rawles",
    email: "alexarawles@gmail.com",
    gender: "Female",
    nickname: "Alexa",
    country: "USA",
    language: "English",
    timezone: "GMT-5",
    profile_pic: "https://via.placeholder.com/100",
    emails: ["alexarawles@gmail.com"] // multiple emails stored here
  });

  const [editing, setEditing] = useState(false);
  const [activeField, setActiveField] = useState(null);
  const [dateTime, setDateTime] = useState(new Date());
  const [newEmail, setNewEmail] = useState("");
  const [showEmailInput, setShowEmailInput] = useState(false);

  // auto update time
  useEffect(() => {
    const timer = setInterval(() => setDateTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfile((prev) => ({ ...prev, profile_pic: imageUrl }));
    }
  };

  const handleAddEmail = () => {
    if (newEmail.trim()) {
      setProfile((prev) => ({
        ...prev,
        emails: [...prev.emails, newEmail.trim()]
      }));
      setNewEmail("");
      setShowEmailInput(false);
    }
  };

  const styles = {
    container: {
      minHeight: "100vh",
      background: "#f4f6fa",
      fontFamily: "Arial, sans-serif"
    },
    header: {
      background: "linear-gradient(135deg, #4a6cf7, #6ec1e4)",
      color: "#fff",
      padding: "50px 20px",
      textAlign: "center"
    },
    card: {
      background: "#fff",
      borderRadius: "12px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      padding: "30px",
      width: "950px",
      margin: "20px auto"
    },
    headerCard: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "20px"
    },
    profileBox: {
      display: "flex",
      alignItems: "center",
      gap: "15px"
    },
    profilePicWrapper: {
      position: "relative",
      width: "100px",
      height: "100px"
    },
    profilePic: {
      width: "100px",
      height: "100px",
      borderRadius: "50%",
      objectFit: "cover",
      border: "2px solid #ddd"
    },
    uploadIcon: {
      position: "absolute",
      bottom: "5px",
      right: "5px",
      background: "#4a6cf7",
      color: "#fff",
      borderRadius: "50%",
      padding: "6px",
      cursor: "pointer",
      fontSize: "14px"
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "20px",
      marginTop: "20px"
    },
    label: {
      fontWeight: "bold",
      marginBottom: "6px",
      fontSize: "14px"
    },
    input: {
      width: "100%",
      padding: "10px",
      borderRadius: "6px",
      border: "1px solid #ddd",
      transition: "all 0.2s ease"
    },
    button: {
      background: "#4a6cf7",
      color: "#fff",
      padding: "8px 16px",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      gap: "6px"
    },
    emailSection: {
      marginTop: "25px"
    },
    emailItem: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      marginTop: "8px"
    }
  };

  return (
    <div style={styles.container}>
      {/* Header with background */}
      <div style={styles.header}>
        <h1>Welcome, {profile.name} 👋</h1>
        <p>{dateTime.toLocaleString()}</p>
      </div>

      {/* Profile Card */}
      <div style={styles.card}>
        <div style={styles.headerCard}>
          <div style={styles.profileBox}>
            <div style={styles.profilePicWrapper}>
              <img
                src={profile.profile_pic}
                alt="Profile"
                style={styles.profilePic}
              />
              <label style={styles.uploadIcon}>
                <FaCamera />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ display: "none" }}
                />
              </label>
            </div>
            <div>
              <h3>{profile.name}</h3>
              <p style={{ color: "#777" }}>{profile.email}</p>
            </div>
          </div>

          <button
            style={styles.button}
            onClick={() => setEditing((prev) => !prev)}
          >
            {editing ? <FaSave /> : <FaEdit />}
            {editing ? "Save" : "Edit"}
          </button>
        </div>

        {/* Profile Info */}
        <div style={styles.grid}>
          {[
            { label: "Full Name", field: "name" },
            { label: "Nick Name", field: "nickname" },
            { label: "Gender", field: "gender" },
            { label: "Country", field: "country" },
            { label: "Language", field: "language" },
            { label: "Time Zone", field: "timezone" }
          ].map((item) => (
            <div key={item.field}>
              <div style={styles.label}>{item.label}</div>
              <input
                style={{
                  ...styles.input,
                  outline:
                    editing && activeField === item.field
                      ? "2px solid #4a6cf7"
                      : "none",
                  cursor: editing ? "text" : "not-allowed",
                  background: editing ? "#fff" : "#f9f9f9"
                }}
                name={item.field}
                value={profile[item.field]}
                onChange={handleChange}
                onFocus={() => setActiveField(item.field)}
                onBlur={() => setActiveField(null)}
                readOnly={!editing}
              />
            </div>
          ))}
        </div>

        {/* Email Section */}
        <div style={styles.emailSection}>
          <h4>My email Addresses</h4>
          {profile.emails.map((mail, idx) => (
            <div style={styles.emailItem} key={idx}>
              <FaEnvelope style={{ color: "#4a6cf7" }} />
              <div>
                <div>{mail}</div>
                <small style={{ color: "#999" }}>
                  {idx === 0 ? "Primary" : "Added recently"}
                </small>
              </div>
            </div>
          ))}

          {showEmailInput ? (
            <div style={{ marginTop: "10px" }}>
              <input
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                placeholder="Enter new email"
                style={{ ...styles.input, marginBottom: "8px" }}
              />
              <button style={styles.button} onClick={handleAddEmail}>
                Save Email
              </button>
            </div>
          ) : (
            <button
              style={{
                ...styles.button,
                background: "#e7edff",
                color: "#4a6cf7",
                marginTop: "10px"
              }}
              onClick={() => setShowEmailInput(true)}
            >
              + Add Email Address
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
