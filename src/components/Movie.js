import React from 'react';

import classes from './Movie.module.css';

const Movie = (props) => {

  const deleteHandler=async()=>{
    
    try{
      await fetch(`https://react-http-rtd-default-rtdb.firebaseio.com/movies/${props.id}.json`,{
      
      method:'DELETE',

    })
    console.log('deleted');
  }catch(error){
      console.log(error.message);
    }
  console.log('deleted');
  props.load();
  }
  return (
    <li className={classes.movie}>
      <h2>{props.title}</h2>
      <h3>{props.releaseDate}</h3>
      <p>{props.openingText}</p>
      <button onClick={deleteHandler}>Delete</button>
    </li>
  );
};

export default Movie;
