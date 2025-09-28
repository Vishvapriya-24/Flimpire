import { useEffect,useState } from "react";

function Movies() {
    const [movies,setmovies] = useState([]);
    useEffect(() => {
      fetch("http://localhost:8000/movies")
        .then(res => res.json())
        .then(data => setmovies(data));
    }, []);

    const styles = {
    container: {
      background: "black"
    }
  };

    return (
        <div style={styles.container}>
            <h2 style={{color:"white",marginTop:"10px"}}>Latest Movies</h2>
            <hr style={{ border: "1px solid gray", margin: "20px 0" }} />
        <div style={{ display: "flex",flexWrap: "wrap" , gap: "50px", overflowX: "scroll" }}>
        {movies.length && movies.map(movie => (
          <img
            key={movie.id}
            src={movie.poster}
            alt={movie.title}
            style={{ width: "220px", borderRadius: "5px" }}
          />
        ))}
      </div>
        </div>
        

    );
}

export default Movies;