const Subscribe = () => {
  return (
    <div style={{ textAlign: "center" }}>
      <h2>Subscribe to our Newsletter</h2>
      <p>Get the latest updates straight to your inbox!</p>
      <input
        type="email"
        placeholder="Enter your email"
        style={{
          padding: "10px",
          border: "1px solid #ccc",
          borderRadius: "6px",
          width: "80%",
          marginBottom: "15px",
        }}
      />
      <br />
      <button
        style={{
          padding: "10px 20px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        Subscribe
      </button>
    </div>
  );
};

export default Subscribe;
