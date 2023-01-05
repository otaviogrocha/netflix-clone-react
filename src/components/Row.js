import React, { useEffect } from "react";
import { getMovie } from "../api";
import "./Row.css";

const baseImage = "https://image.tmdb.org/t/p/original/";

function Row({title, path, isLarge}) {
  const [movies, setMovies] = React.useState([]);

  const fetchMovies = async (_path) =>{
    try {
        const data = await getMovie(_path);
        console.log("data ", data)
        setMovies(data?.results);
    } catch (error) {
        console.log("FetchMovies error: ", error)
    }
  };

  useEffect(() => {
    fetchMovies(path);
  }, [path])
  

  return (
    <div className = "row-container">
        <h2 className="row-header">{title}</h2>
        <div className="row-cards">
            {movies?.map((movie) =>{
                return (
                  <img className={`movie-card ${isLarge && "movie-card-large"}`}
                  key = {movie.id} 
                  src = {`${baseImage}${isLarge ? movie.backdrop_path : movie.poster_path}`} 
                  alt = {movie.name}
                  ></img>
                );
            })}
        </div>
    </div>
  );
}

export default Row