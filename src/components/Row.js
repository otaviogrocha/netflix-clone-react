import React, { useEffect } from "react";
import ReactPlayer from "react-player";
import { getMovie } from "../api";
import movieTrailer from "movie-trailer";
import "./Row.css";

const baseImage = "https://image.tmdb.org/t/p/original/";

function Row({title, path, isLarge}) {
  const [movies, setMovies] = React.useState([]);
  const [trailerUrl, setTrailerUrl] = React.useState("")
  const handleOnClick = (movie) =>{
    if(trailerUrl){
      setTrailerUrl("");
    }else{
      movieTrailer(movie.title || movie.name || movie.original_name || "")
      .then((url) => {
        setTrailerUrl(url);
      })
      .catch((error) => {
        console.error("Error fetching movie trailer: ", error)
      })
    }
  }

  const fetchMovies = async (_path) =>{
    try {
        const data = await getMovie(_path);
        const movies = data?.results
        console.log("data ", data)
        setMovies(movies);
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
                  onClick={()=> handleOnClick(movie)}
                  key = {movie.id} 
                  src = {`${baseImage}${isLarge ? movie.backdrop_path : movie.poster_path}`} 
                  alt = {movie.name}
                  ></img>
                );
            })}
        </div>
        {trailerUrl && <ReactPlayer url ={trailerUrl} playing = {true}/>}
    </div>
  );
}

export default Row