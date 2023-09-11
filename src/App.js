import { useEffect, useState } from "react";
import "./Movie.css";
export default function App() {
  let [movies, setMovies] = useState([]);
  let [query, setQuery] = useState([]);

  function fetchData(movie = "spiderman") {
    const url = "https://api.themoviedb.org/3/search/movie?query=" + movie;

    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYTA0NTZlNzVmMGVkZmE0MTRjNDkwZGE3N2Y3ZWY0OCIsInN1YiI6IjU5YTZhZjFhYzNhMzY4MjdhZTAwYzNhMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hBOzJqPQGR1-izDrtWot8baJTH7ICN_wXGT6SFBCOH8",
      },
    };

    fetch(url, options)
      .then((res) => res.json())
      .then((json) => {
        setMovies([...json.results]);
      })
      .catch((err) => console.error("error:" + err));
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div>
        <input
          type="text"
          onChange={(event) => {
            setQuery(event.target.value);
          }}
        ></input>
        
        <button onClick={()=>{
          fetchData(query)
        }}>Search</button>
      </div>
      {movies.map((movie) => {
        return (
          <div className="movie-card">
            <img
              src={
                "https://www.themoviedb.org/t/p/w440_and_h660_face/" +
                movie.backdrop_path
              }
            ></img>
            <p>{movie.original_title}</p>
            <p>{movie.overview}</p>
            <p>{movie.release_date}</p>
            <p>{movie.vote_average}</p>
          </div>
        );
      })}
    </>
  );
}
