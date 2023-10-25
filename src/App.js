import React, { useEffect, useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

const dummyMovies = [
  {
    id: 1,
    title: 'Some Dummy Movie',
    openingText: 'This is the opening text of the movie',
    releaseDate: '2021-05-18',
  },
  {
    id: 2,
    title: 'Some Dummy Movie 2',
    openingText: 'This is the second opening text of the movie',
    releaseDate: '2021-05-19',
  },
];

function App() {

  const [movies,setMovies] = useState([]);
  const [isLoading,setIsLoading] = useState(false);
  const [error,setError] =useState(null);

  useEffect(()=>{
    async function loading(){
      try{const response = await fetch('https://swapi.dev/api/films');
  
      if(!response.ok){
    
        throw new Error('Something went wrong...Retrying');
       }
       const data = await response.json();
      
        const tranformedMovies = data.results.map(movieData =>{
          return{
            id:movieData.episode_id,
            title:movieData.title,
            openingText:movieData.opening_crawl,
            releaseDate:movieData.release_date
          }
          
        })
       
        setMovies(tranformedMovies);    
    }catch(error){
      setError(error.message);
    }
    }

    loading();
  },[])


  

  return (
    <React.Fragment>
      <section>
        <button onClick={()=>setIsLoading(true)}>Fetch Movies</button>       
      </section>
      <section>
       {  isLoading ? 'Loading....' :(<MoviesList movies={movies} />)}
    {!isLoading && error && <p>{error}</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
