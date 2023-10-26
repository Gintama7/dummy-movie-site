import React, { useEffect, useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';
import MovieForm from './components/MovieForm';
import { useCallback } from 'react';



function App() {

  const [movies,setMovies] = useState([]);
  const [isLoading,setIsLoading] = useState(false);
  const [error,setError] =useState(null);


 const loadingHandler= useCallback(async()=>{
  setIsLoading(true);
    try{
      const response = await fetch('https://react-http-rtd-default-rtdb.firebaseio.com/movies.json');

    if(!response.ok){
  
      throw new Error('Something went wrong...Retrying');
     }
     const data = await response.json();
     const loadedMovies = [];

     for(const key in data)
     {
      loadedMovies.push({
        id:key,
        title:data[key].title,
        openingText:data[key].opening,
        releaseDate:data[key].date
      })
     }   
     
      setMovies(loadedMovies);    
      
  }catch(error){
    setError(error.message);
  }
  setIsLoading(false);
  },[])

  useEffect(()=>{    

    loadingHandler();
  },[loadingHandler]) 

  

  return (
    <React.Fragment>
      <section>
        <MovieForm/>
      </section>
      <section>
        <button onClick={loadingHandler}>Fetch Movies</button>       
      </section>
      <section>
       {  isLoading ? 'Loading....' :(<MoviesList movies={movies} load={loadingHandler} />)}
    {!isLoading && error && <p>{error}</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
