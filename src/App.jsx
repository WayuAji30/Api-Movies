import { Result } from 'postcss';
import { getMovieList, searchMovie } from './api'
import { useEffect, useState } from 'react'
import {AiFillStar} from 'react-icons/ai'


function App() {
  const [popularMovies, setPopularMovies] = useState([])

  useEffect(() => {
    getMovieList().then((result) => {
      setPopularMovies(result)
    })
  }, []);

  const PopularMoviesList = () => {
    return popularMovies.map((movie, i) => {
      return (
    <div key={i} className='card mt-4'>
      <img src={`${process.env.REACT_APP_BASEIMGURL}/${movie.poster_path}`} alt="poster" className='w-60'/>
      <div className='movie-title text-white text-xl font-semibold w-60'>{movie.title}</div>
      <div className='flex items-center text-white gap-5 mt-1'>
      <div className='movie-date'>{movie.release_date}</div>
      <div className='movie-rate text-yellow-300 flex items-center gap-2'><AiFillStar/> {movie.vote_average}</div>
      </div>
    </div>
      )
    })
  }

  const search = async (q) => {
    if (q.length > 3) {
   const query = await searchMovie(q)
   setPopularMovies(query.results)
  }
}

  return (
    <div className='App'>
    <div className='NavBar fixed top-0 right-0 left-0 flex justify-center'>
    <div className='bg-white bg-opacity-20 max-w-7xl h-14 flex items-center mt-5 rounded-full'>
      <input type="text" onChange={({target}) => search(target.value)} className='mx-20 border-2 border-black px-3 py-2 rounded-full w-96 bg-black text-white' placeholder='Cari film anda...'/>
    </div>
    </div>
    <p className='text-white mt-36 mx-40 text-lg'>Movie popular(<span className='font-semibold'>{popularMovies.length}</span>)</p>
  <div className='mt-2 flex flex-wrap gap-20 mx-10 justify-center mb-10'>
    <PopularMoviesList />
  </div>
</div>
  );
}

export default App;
