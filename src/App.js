import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Link } from "react-router-dom"
import './App.css';

function App() {
  const [columns, setColumns] = useState([])
  const [records, setRecords] = useState([])

  useEffect(()=> {
    axios.get('http://localhost:3030/users')
    .then(res => {
      setColumns(Object.keys(res.data[0]))
      setRecords(res.data)
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3030/users/${id}`)
      .then(() => {
        setRecords(prevRecords => prevRecords.filter(record => record.id !== id));
      })
      .catch(error => {
        console.error('Error deleting data:', error);
      });
  };

  return (
    
    <div className='container mt-5'>
      <div className='text-end'>
        <Link to="/create" className='btn btn-sm btn-info float-right'>Add+</Link>
      </div>
      <table className='table'>
        <thead>
              <tr>
              {columns.map((c, i) => (
              <th key={i}>{c}</th>
            ))}
            <th>Action</th>
              </tr>
        </thead>
        <tbody>
          {
            records.map((d, i) => (
              <tr key={i}>
                <td>{d.id}</td>
                <td>{d.name}</td>
                <td>{d.username}</td>
                <td>{d.email}</td>
                <td>
                  <Link to={`/view/${d.id}`} className='btn btn-sm btn-warning'>View</Link>
                  <Link to={`/edit/${d.id}`} className='btn btn-sm btn-success'>Edit</Link>
                  <button 
                  className='btn btn-sm ms-1 btn-danger'
                  onClick={() => handleDelete(d.id)}
                  >Delete</button>
                </td>
              </tr>
            ))
          }

        </tbody>
      </table>
    </div>
  );
}
export default App;


