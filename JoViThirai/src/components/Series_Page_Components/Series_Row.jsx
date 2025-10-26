import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

const FetchSeries = async (category) => {
  const res = await axios.get(`http://localhost:8000/series/${category}`);
  return res.data;
};

function Series_Row({ title, category }) {

  const navigate = useNavigate();

  const {
    data: series,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["series", category],
    queryFn: () => FetchSeries(category),
  });

  if (isLoading) return <p>Loading {title}...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <>
      <style>{`
        .series-row {
          width: 100%;
          padding: 20px 40px;
          color: #e8e3e3ff;
          background-color: #0b0e17;
          font-family: "Poppins", sans-serif;
        }

        .row-title {
          font-size: 22px;
          font-weight: 600;
          margin-bottom: 20px;
        }

        .series-container {
          display: flex;
          justify-content: space-between;
          gap: 20px;
          flex-wrap: wrap;
        }

        .series-card {
          position: relative;
          width: 48%;
          height: 250px;
          border-radius: 12px;
          overflow: hidden;
          background-color: #dadce1ff;
          transition: transform 0.3s ease;
        }

        .series-card:hover {
          transform: scale(1.03);
        }

        .series-image {
          width: 100%;
          height: 100%;
        }

        .series-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          padding: 15px;
          width: 100%;
          background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
        }

        .series-title {
          font-size: 26px;
          font-weight: 500;
          color: white;
        }
      `}</style>

      <div className="series-row">
        <h2 className="row-title">{title}</h2>

        <div className="series-container">
          {series.map((item, index) => (
            <div key={index} className="series-card">
              <img
                src={item.poster}
                alt={item.title || item.name}
                className="series-image"
                onClick={() => navigate("/home/series/seriesDetails", { state: item })}
              />

              <div className="series-overlay">
                <h3 className="series-title">{item.title || item.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Series_Row;
