import { useState } from "react";
import Navigation from "./Navigation";
import Plans from "./Plans";
function Movies_Page() {
  const [showSubscribe, setShowSubscribe] = useState(false);

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("overlay")) {
      setShowSubscribe(false);
    }
  };

  const handleSelectPlan = (planName) => {
    console.log("Plan selected:", planName);
    // ungala logic - subscription request send panna, modal close panna etc.
    setShowSubscribe(false);
  };

  return (
    <div>
      <Navigation setShowSubscribe={setShowSubscribe} />

      {showSubscribe && (
        <div
          className="overlay"
          onClick={handleOverlayClick}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: "#fff",
              borderRadius: "12px",
              padding: "30px",
              minWidth: "320px",
              maxWidth: "90%",
              boxShadow: "0 5px 20px rgba(0,0,0,0.2)",
            }}
          >
            <h2 style={{ textAlign: "center" }}>Choose a Plan</h2>
            <Plans onSelectPlan={handleSelectPlan} />
          </div>
        </div>
      )}
    </div>
  );
}


export default Movies_Page;