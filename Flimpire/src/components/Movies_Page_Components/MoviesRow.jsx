import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRef } from "react";

const fetchMovies = (category) => {
    const res = axios.get(`http://localhost:8000/movies/${category}`);
    return res.data;
}

const MoviesRow = ({ title, category }) => {

    const scrollRef = useRef(null);

    const { data, isLoading, isError, error } = useQuery(
        {
            queryKey: ['Movies', category],
            queryFn: () => fetchMovies(category)
        }
    )

    const handleScroll = (direction) => {
        if (scrollRef.current) {
            const scrollAmount = 6 * 240;
            scrollRef.current.scrollBy({
                left: direction === "right" ? scrollAmount : -scrollAmount,
                behavior: "smooth",
            });
        }
    }
    if (isLoading)
        return <h3 style={{ color: "gray", marginLeft: "20px" }}>Loading {title}...</h3>;
    if (isError)
        return (
            <h3 style={{ color: "red", marginLeft: "20px" }}>
                Error loading {title}: {error.message}
            </h3>
        );

    return (
        <div ref={scrollRef}>
            <h2>{title}</h2>

            <button onClick={() => handleScroll("left")}><AiOutlineLeft size={26} /></button>

            <div>
                {data?.slice(0, 20).map((m) => (
                    <img
                        key={m.id}
                        src={m.poster}
                        alt={m.title}

                        onMouseEnter={(e) => {
                            e.target.style.transform = "scale(1.05)";
                            e.target.style.boxShadow = "0 2px 5px rgba(255,255,255,0.3)";
                        }}

                        onMouseLeave={(e) => {
                            e.target.style.transform = "scale(1)";
                            e.target.style.boxShadow = "none";
                        }}

                    />
                ))}
            </div>
            <button onClick={() => handleScroll("right")}>
                <AiOutlineRight size={26} />
            </button>
        </div>
    )
}


export default MoviesRow;