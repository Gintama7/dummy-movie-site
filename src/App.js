import React, { useState } from 'react';

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
  const [cancel,setCancel] = useState(false);

 async function fetchMoviesHandler(){
  setIsLoading(true);
  setError(null);
  try{const response = await fetch('https://swapi.dev/api/film');
  
  if(!response.ok){

    while(!cancel)
    {
      setTimeout(()=>{
        const response = fetch('https://swapi.dev/api/film');
        console.log("retrying");
        if(response.ok){
          setCancel(true);
        }
      },5000)
    }
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
setIsLoading(false);
  }
  

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
       {  isLoading ? 'Loading....' :(<MoviesList movies={movies} />)}
    {!isLoading && error && <p>Retrying....<button onClick={()=>setCancel(true)}>Stop Retrying</button></p>}
      </section>
    </React.Fragment>
  );
}

export default App;
