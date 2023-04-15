import React, {Component} from 'react';
import './App.css';
import Navbar from './Components/Navbar';
import Banner from './Components/banner';
import Movies from './Components/movies';
import Favourite from './Components/Favourite';
import { BrowserRouter , Routes, Route} from 'react-router-dom';
function App() {
  return (
    <>
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' exact element={
        <>
        <Banner/>
        <Movies/>
        </>
        }/>
        <Route path='/favourites'  element={<Favourite/>}  />

      </Routes>

      </BrowserRouter>
      {/* <Banner/> 
      <Movies/>
      <Favourite/> */}
    </>
  );
}

export default App;
