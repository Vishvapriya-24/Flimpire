import { useState } from "react";

function TrailerBox() {
  const [isPremium, setIsPremium] = useState(false);

  const styles = {
    box: {
      width: "90%",
      maxWidth: "1000px",
      margin: "40px auto",
      borderRadius: "15px",
      overflow: "hidden",
      position: "relative",
      boxShadow: "0 5px 15px rgba(0,0,0,0.6)",
    },
    video: {
      width: "800px",
      height: "500px",
      display: "block",
    },
    overlay: {
      position: "absolute",
      bottom: "0",
      width: "100%",
      background:
        "linear-gradient(180deg, transparent, rgba(0,0,0,0.9))",
      color: "white",
      padding: "20px",
      textAlign: "center",
    },
    button: {
      background: "linear-gradient(90deg, #ff9800, #ff5722)",
      border: "none",
      color: "white",
      fontWeight: "bold",
      padding: "10px 25px",
      borderRadius: "8px",
      cursor: "pointer",
      marginTop: "10px",
      fontSize: "16px",
    },
  };

  return (
    <div style={styles.box}>
      <video
        style={styles.video}
        src="https://www.w3schools.com/html/mov_bbb.mp4" // demo trailer
        autoPlay
        muted
        loop
      />
      <div style={styles.overlay}>
        {!isPremium ? (
          <>
            <h3>Watch the full movie in HD!</h3>
            <p>Upgrade to Premium to continue watching.</p>
            <button style={styles.button} onClick={() => setIsPremium(true)}>
              Upgrade to Premium
            </button>
          </>
        ) : (
          <h3>🎉 You’re now a Premium Member! Enjoy full movies.</h3>
        )}
      </div>
    </div>
  );
}

export default TrailerBox;
