import React, { useState, useEffect } from 'react'
import { FiYoutube } from "react-icons/fi";
const Movieposter = () => {
  const MovieData = [
    {
      id: 0,
      name: 'Leo',
      desc: 'It is the third instalment in the Lokesh Cinematic Universe and is inspired by A History of Violence. The film follows Parthi, a café owner and animal rescuer in Theog, who is pursued by gangsters Antony and Harold Das who suspect him to be Antonys estranged son, Leo.',
      src: 'https://occ-0-2085-2164.1.nflxso.net/dnm/api/v6/6AYY37jfdO6hpXcMjf9Yu5cnmO0/AAAABeAhdEUxyn74PG_PSVqVTjZLPs53FMAVqkQQkn6-xqoRxnrdv33su-TQp7qP3wOU2HqGgBqKqSJj7MBwfmqxlvcT55ntZBw5x038.jpg?r=fe5',
      alt: 'img1',
      url:'https://posters.movieposterdb.com/23_12/2023/15654328/l_leo-movie-poster_c324ff57.png',
      trailer:'https://www.youtube.com/watch?v=Po3jStA673E'
    },
    {
      id: 1,
      name: 'Jailer',
      desc: 'Tiger Muthuvel Pandian, a retired jailer, is now a family man who leads an ordinary life. Trouble knocks on his door when his son, a diligent cop, investigates an idol smuggling mafia. And forces Muthuvel Pandian to step back into the dark world of his past.',
      src: 'https://m.media-amazon.com/images/S/pv-target-images/e40e50510afe106bb1c3d0d38451db12f800c66c80432c6d9a5ce260e9b0d6e1._SX1920_FMwebp_.jpg',
      alt: 'img2',
      url: 'https://image.tmdb.org/t/p/original/wFcHcYtgkq1oxDWPHYp1G20EEP.png',
      trailer:'https://www.youtube.com/watch?v=xenOE1Tma0A'
    },
    {
      id: 2,
      name:'Kantara',
      desc:'Kantara is a story set in the fictional village of Dakshina Kannada which explores the ideological conflict of human and nature. A battle of ego swirls along tradition and culture of the land. Will Shiva, the protagonist of the film be able to reinstate peace and harmony in the village perceiving his existence?',
      src:'https://occ-0-2085-2186.1.nflxso.net/dnm/api/v6/6AYY37jfdO6hpXcMjf9Yu5cnmO0/AAAABXP8-LlXmyHE7iG6PJB7O1aymCQGWiZpco9k3ft8qYKlOIQkKrHGbAYRazp4sHGNQ58e8pgU_SsDCbJtMgrQ_8-sv2xMl_OmQu-n.jpg?r=e00',
      alt:'img3',
      url:'https://occ-0-2085-2186.1.nflxso.net/dnm/api/v6/LmEnxtiAuzezXBjYXPuDgfZ4zZQ/AAAABX8uQx3euldvwUKy6arGvjyagZB0AB7vmMeJ0-Cr5TsaHpIlYI3Zx7Pa5Wk0giRBNxeXUdfaG4zAK3L23sirOPd8opR2i0jawkb2BCgJWBHk.png?r=aca',
      trailer:'https://www.youtube.com/watch?v=8mrVmf239GU'
    }
  ]

  const [index, setIndex] = useState(0);

  useEffect(() => {

    const interval = setInterval(() => {
      setIndex((previndex) => (previndex + 1) % MovieData.length)
    }, 5000);

    return () => clearInterval(interval);

  }, [MovieData.length])

  const data = MovieData[index];
  return (
    <div className="movie_poster">
      <div className="slider">
        <div className="slide-content">
          <div className="title_img">
          <img src={data.url} alt="x" />
          </div>
          <p>About Movie:</p>
          <p className="movie-desc">{data.desc}</p>
          <a href={data.trailer}><FiYoutube/> Watch Trailer</a>
        </div>
        <div className="img_cont">
        <img src={data.src} alt={data.alt} />
        </div>
      </div>
    </div>
  )
}

export default Movieposter