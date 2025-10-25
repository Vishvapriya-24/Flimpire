import { useState } from "react";
import { FaHeart, FaDownload, FaUser, FaClock } from "react-icons/fa";

function FloatingNav() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        left: "20px",
        zIndex: 2000,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Floating Button */}
      <div
        style={{
          backgroundColor: "#111",
          color: "#fff",
          borderRadius: "50%",
          width: "55px",
          height: "55px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
          cursor: "pointer",
          transition: "0.3s",
        }}
      >
        <FaUser size={22} />
      </div>

      {/* Popup Menu */}
      {isHovered && (
        <div
          style={{
            position: "absolute",
            bottom: "70px",
            left: "0",
            backgroundColor: "#222",
            borderRadius: "12px",
            padding: "10px 15px",
            color: "#fff",
            width: "150px",
            boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            transition: "opacity 0.3s ease",
          }}
        >
          <div style={menuItemStyle}>
            <FaHeart /> <span>Favorite</span>
          </div>
          <div style={menuItemStyle}>
            <FaDownload /> <span>Download</span>
          </div>
          <div style={menuItemStyle}>
            <FaClock /> <span>Watch Later</span>
          </div>
        </div>
      )}
    </div>
  );
}

const menuItemStyle = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
  cursor: "pointer",
  padding: "5px 0",
  transition: "0.2s",
};

export default FloatingNav;
