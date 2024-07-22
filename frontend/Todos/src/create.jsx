import React, { useState } from 'react'
import './todo.css'
import axios from 'axios';


function Create() {
    const [task,settask]=useState()
    const handleSubmit=(e)=>{
      e.preventDefault();
        axios.post('https://todolist-mip9.onrender.com/add',{task:task})
        .then(result=>{

          settask('');
          location.reload()
        })
        .catch(err=>console.log(err))


    }
  return (
   
      <form   onSubmit={handleSubmit}>
         <div className='search-area' >
         <input type="text" className='inputbox' name='' placeholder='Enter your task here' id='' onChange={(e)=>settask(e.target.value)} />
         <button type='submit'className='inputbtn' >Add</button>
         </div>
      </form>
       
  
  )
}

export default Create