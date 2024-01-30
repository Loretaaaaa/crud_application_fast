// View.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

function View() {
  const { id } = useParams();
  const [record, setRecord] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3030/users/${id}`)
      .then(res => {
        setRecord(res.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, [id]);

  if (!record) {
    return <div>Loading...</div>;
  }

  return (
    <div className='container mt-5'>
      <h2>View Details</h2>
      <ul>
        <li>ID: {record.id}</li>
        <li>Name: {record.name}</li>
        <li>Username: {record.username}</li>
        <li>Email: {record.email}</li>
      </ul>
      <Link to="/">Back to List</Link>
    </div>
  );
}

export default View;
