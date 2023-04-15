import React, { Component } from "react";

export default class Favourite extends Component {
  constructor() {
    super();
    this.state = {
      genres: [],
      curgen: "All Genres",
      movies: [],
      curText: "",
      limit: 5,
      curPage: 1,
    };
  }
  componentDidMount() {
    let data = JSON.parse(localStorage.getItem("movies-app") || "[]");

    let genreids = {
      28: "Action",
      12: "Adventure",
      16: "Animation",
      35: "Comedy",
      80: "Crime",
      99: "Documentary",
      18: "Drama",
      10751: "Family",
      14: "Fantasy",
      36: "History",
      27: "Horror",
      10402: "Music",
      9648: "Mystery",
      10749: "Romance",
      878: "Sci-Fi",
      10770: "TV",
      53: "Thriller",
      10752: "War",
      37: "Western",
    };

    let temp = [];
    data.forEach((ob) => {
      if (!temp.includes(genreids[ob.genre_ids[0]])) {
        temp.push(genreids[ob.genre_ids[0]]);
      }
    });

    temp.unshift("All Genres");
    this.setState({
      movies: [...data],
      genres: [...temp],
    });
  }
  handlePageChange(page) {
    this.setState({
      curPage: page,
    });
  }
  handleDelete(ob){
    let newArr = this.state.movies.filter((movie)=>{
        return movie.id != ob
    })
    this.setState({
        movies : [...newArr]
    })

    localStorage.setItem('movies-app', JSON.stringify(newArr))
  }

  handleGenreChange = (genre) => {
    this.setState({
      curgen: genre,
    });
  };

  render() {
    let genreids = {
      28: "Action",
      12: "Adventure",
      16: "Animation",
      35: "Comedy",
      80: "Crime",
      99: "Documentary",
      18: "Drama",
      10751: "Family",
      14: "Fantasy",
      36: "History",
      27: "Horror",
      10402: "Music",
      9648: "Mystery",
      10749: "Romance",
      878: "Sci-Fi",
      10770: "TV",
      53: "Thriller",
      10752: "War",
      37: "Western",
    };

    let filterArr = [];
    if (this.state.curText === "") {
      filterArr = this.state.movies;
    } else {
      filterArr = this.state.movies.filter((ob) => {
        let title = ob.original_title.toLowerCase();
        return title.includes(this.state.curText.toLowerCase());
      });
    }
    if (this.state.curgen != "All Genres") {
      filterArr = filterArr.filter(
        (ob) => this.state.curgen == genreids[ob.genre_ids[0]]
      );
    }

    let pagearr = [];
    if (this.state.limit <= 0) {
      filterArr = [];
      pagearr = [];
    } else {
      let pages = Math.ceil(filterArr.length / this.state.limit);
      for (let i = 1; i <= pages; i++) {
        pagearr.push(i);
      }

      let si = (this.state.curPage - 1) * this.state.limit;
      let ei = si + this.state.limit;
      filterArr = filterArr.slice(si, ei);
    }

    return (
      <>
        <div className="main">
          <div className="row">
            <div className="col-lg-3 col-sm-12">
              <ul class="list-group favourites-genres">
                {this.state.genres.map((ob) =>
                  this.state.curgen === ob ? (
                    <li
                      class="list-group-item"
                      style={{
                        background: "#3f51b5",
                        color: "white",
                        fontWeight: "bold",
                      }}
                    >
                      {ob}
                    </li>
                  ) : (
                    <li
                      class="list-group-item"
                      style={{ background: "white", color: "#3f51b5" }}
                      onClick={() => this.handleGenreChange(ob)}
                    >
                      {ob}
                    </li>
                  )
                )}
              </ul>
            </div>
            <div className="col-lg-9 favourites-table col-sm-12" >
              <div className="row">
                <input
                  type="text"
                  className="input-group-text col"
                  placeholder="Search"
                  value={this.state.curText}
                  onChange={(e) => {
                    this.setState({ curText: e.target.value });
                  }}
                />
                <input
                  type="number"
                  className="input-group-text col"
                  placeholder="No. of rows"
                  value={this.state.limit}
                  onChange={(e) => this.setState({ limit: e.target.value })}
                />
              </div>

              <table class="table">
                <thead>
                  <tr>
                    <th></th>
                    <th scope="col">Title</th>
                    <th scope="col">Genre</th>
                    <th scope="col">Popularity</th>
                    <th scope="col">Rating</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {filterArr.map((ob) => (
                    <tr>
                      <td>
                        <img
                          src={`https://image.tmdb.org/t/p/original${ob.backdrop_path}`}
                          alt={ob.title}
                          style={{ width: "5rem" }}
                        />
                      </td>
                      <td>{ob.original_title}</td>
                      <td>{genreids[ob.genre_ids[0]]}</td>
                      <td>{ob.popularity}</td>
                      <td>{ob.vote_average}</td>
                      <td>
                        <button type="button" class="btn btn-outline-danger" onClick={()=>this.handleDelete(ob.id)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <nav aria-label="Page navigation example">
                <ul class="pagination">
                  {pagearr.map((page) => (
                    <li class="page-item">
                      <a
                        class="page-link"
                        onClick={() => this.handlePageChange(page)}
                      >
                        {page}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </>
    );
  }
}
