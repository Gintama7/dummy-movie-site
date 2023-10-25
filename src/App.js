import React, { useEffect, useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';
import MovieForm from './components/MovieForm';



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
        <MovieForm/>
      </section>
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
