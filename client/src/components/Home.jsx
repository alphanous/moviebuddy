import React from 'react'
import { useState, useEffect } from 'react';
import Nav from './Nav';
import './css/Home.css'
import Movieposter from './Movieposter';
import MovieData from './MovieList'
import MovieCard from './MovieCard';
import upcoming from './Upcoming';
import { Player } from '@lottiefiles/react-lottie-player';
export const Home = () => {

  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setisLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="loader">
        <div className="loader_area">
        <Player
          src='https://lottie.host/3d2e66d9-437f-427a-8271-d3fce8f0ec6d/a79HVXVCtJ.json'
          className="player1"
          loop
          autoplay
        />
        </div>
      </div>
    )
  }

  return (
    <>
      <Nav />
      <div className="main_home">
        <Movieposter />
        <div className="new_release">
          <h1>Now Showing </h1>
          <div className="card_container">
            {
              MovieData.map((data, index) => {
                return <MovieCard key={index} id={data.id} src={data.src} title={data.title} type={data.type} lang={data.lang} />
              })
            }
          </div>
        </div>
        <div className="upcoming">
          <h1>Upcoming Movies</h1>
          <div className="upcoming_container">
            {
              upcoming.map((data, index) => {
                return <MovieCard key={index} id={data.id} src={data.src} title={data.title} type={data.type} lang={data.lang} />
              })
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default Home;
