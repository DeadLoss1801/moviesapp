import React, { Component } from "react";
import axios from "axios";
export default class Movies extends Component {

    constructor(){
        super();

        this.state= {
            hover : '',
            parr : [1],
            currPage : 1,
            movies:[],
            favourites : []
        }
    }

    async  componentDidMount(){
      //Side effects ke kaam
      const res  = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=697205b31a05b85900f4aa41593d55ae&language=en-US&page=${this.state.currPage}`)

      let data =  res.data;

      
      this.setState({
        movies : [...data.results]
      })

    }





    changeMovies= async()=>{

      const res  = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=697205b31a05b85900f4aa41593d55ae&language=en-US&page=${this.state.currPage}`)

      let data =  res.data;

      
      this.setState({
        movies : [...data.results]
      })

    }

    handleRight =()=>{
      let temparr=[];
      for(let i=1;i<=this.state.parr.length + 1;i++){
        temparr.push(i);
      }
      this.setState({
        parr:[...temparr],
        currPage:this.state.currPage +1
      },this.changeMovies)
      
      
    }

    handleLeft = () =>{
      this.setState({
        currPage : this.state.currPage-1
      }, this.changeMovies)
      
    }

    handleClick = (value)=>{
      if(value != this.state.currPage){
        this.setState({
          currPage : value
        }, this.changeMovies)
      } 
    }



    handleFavourite = (movie) =>{
      let oldData = JSON.parse(localStorage.getItem('movies-app') || "[]");
      if(this.state.favourites.includes(movie.id)){
        oldData= oldData.filter((m) => m.id != movie.id)
      }else{
        oldData.push(movie);
      }
      localStorage.setItem('movies-app' , JSON.stringify(oldData));
      this.handleFavouriteState();

    }
    handleFavouriteState=()=>{
      let oldData = JSON.parse(localStorage.getItem('movies-app') || "[]")
      let temp = oldData.map((movie)=>movie.id);
      this.setState({
        favourites : [...temp]
      })
    }






  render() {
  
    console.log('Render');
    return (
      <>
        {this.state.movies === "" ? (
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : 
        (
          <div>

            <h3 className="text-center">
              <strong>Trending</strong>
            </h3>
            <div className="Movies-list">
              {this.state.movies.map((movieOb) => (
                <div
                  className="card Movies-card"
                  style={{ width: "20vw", height: "40vh" }}
                  onMouseEnter={()=>this.setState({hover : movieOb.id})}

                  onMouseLeave={()=>this.setState({hover:''})}
                >
                  <img
                    src={`https://image.tmdb.org/t/p/original${movieOb.backdrop_path}`}
                    className="card-img-top Movies-img"
                    alt={movieOb.title}
                  />
                  {/* <div className="card-body"> */}
                  <h5 className="card-title Movies-title">{movieOb.title}</h5>
                  <div
                    className="button-wrapper"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      width: "100%",
                    }}
                  >
                   {
                    this.state.hover === movieOb.id &&
                   <a className="btn btn-primary Movies-button" onClick={()=>this.handleFavourite(movieOb)}>
                      {
                        this.state.favourites.includes(movieOb.id) ? "Remove to  Favourites" : "Add to favourites"
                      }
                    </a>
                    

                   }
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", justifyContent: "center" }}>
            <nav aria-label="Page navigation example">
                <ul className="pagination">
                    <li className="page-item"><a className="page-link" onClick={this.handleLeft}>Previous</a></li>
                {
                    this.state.parr.map((value)=>(
                        <li className="page-item"><a className="page-link" onClick={()=>this.handleClick(value)}>{value}</a></li>
                        

                    ))
                }
                
                    <li className="page-item"><a className="page-link" onClick={this.handleRight}>Next</a></li>
                </ul>
                </nav>
            </div>
          </div>
        )}
      </>
    );
  }
}
