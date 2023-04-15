import React, { Component } from "react";
import { movies } from "./getmovies";

export default class Banner extends Component {
  render() {
    let movie  = movies.results[5];

    return (
      <>
      {
        movie===''? 


        <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
         </div>

        :


        <div className="card Banner-card" >
          <img src={` https://image.tmdb.org/t/p/original${movie.backdrop_path}`} className="card-img-top Banner-img" alt={movie.title} />
          
            <h1 className="card-title Banner-title">{movie.original_title}</h1>
            <p className="card-text Banner-text Movie-button">
              {movie.overview}
            </p>
        </div>

      }
      </>
    );
  }
}
