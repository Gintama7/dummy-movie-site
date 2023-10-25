import React from 'react';
import './MovieForm.css';
import { useState } from 'react';

const MovieForm = () => {
    console.log('im here');
    const [formData,setFormData] = useState({
        title:'',date:'',opening:''
    })
    const handleChange=(e)=>{
        const {name,value} = e.target;
        setFormData({...formData,[name]:value});
    }

    const addMovieHandler=(e)=>{
            e.preventDefault();
        const obj=formData;
        console.log(obj);
    }
  return (
    <form action="">
          <label htmlFor="title">Title</label>
    <input name='title' type='text' onChange={handleChange}/>
    <label htmlFor="opening">Opening Text</label>
    <textarea name="opening" id="" cols="30" rows="6" onChange={handleChange}/>
    <label htmlFor="date">Release Date</label>
    <input type="text" name='date' onChange={handleChange}/>
    <button onClick={addMovieHandler}>Add Movie</button>
        </form>
  )
}

export default React.memo(MovieForm)
