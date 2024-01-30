import axios from 'axios';
import React from 'react'
import {useState} from 'react';
import { useNavigate } from 'react-router-dom'

function Add() {
    const [inputData, setInputData] = useState({name: "", username: "", email: ""})
    const navigat = useNavigate();

    function handleSubmit(event) {
      event.preventDefault();

      axios.post('http://localhost:3030/users', inputData)
      .then(res => {
        alert("Data Added Successfully!");
        navigat('/');
      }).catch(err => console.log(err));
    }

  return (
    <div className='d-flex w-100 h-100 justify-content-center align-items-center'>
      <div className='w-50 border bg-light p-5'>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name:</label>
            <input type="text" name='name' className='form-control'
            onChange={e => setInputData({...inputData, name: e.target.value})} />
          </div>
          <div>
            <label htmlFor="username">Username:</label>
            <input type="text" name='username' className='form-control'
            onChange={e => setInputData({...inputData, username: e.target.value})} />
          </div>
          <div>
          <label htmlFor="email">Email:</label>
            <input type="email" name='email' className='form-control'
            onChange={e => setInputData({...inputData, email: e.target.value})}/>
          </div> <br />
          <button className='btn btn-info'>Submit</button>
        </form>
      </div>
    </div>
  )
}

export default Add