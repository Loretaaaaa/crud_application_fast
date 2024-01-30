// Edit.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

function Edit() {
  const { id } = useParams();
  const [record, setRecord] = useState(null);
  const [updatedData, setUpdatedData] = useState({
    id: '',
    name: '',
    username: '',
    email: '',
    
  });

  useEffect(() => {
    axios.get(`http://localhost:3030/users/${id}`)
      .then(res => {
        setRecord(res.data);
        setUpdatedData({
          id: res.data.id,
          name: res.data.name,
          username: res.data.username,
          email: res.data.email,
        });
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, [id]);

  const handleUpdate = () => {
    axios.put(`http://localhost:3030/users/${id}`, updatedData)
      .then(() => {
        console.log('Record updated successfully');
      })
      .catch(error => {
        console.error('Error updating data:', error);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  if (!record) {
    return <div>Loading...</div>;
  }

  return (
    <div className='container mt-5'>
      <h2>Edit Details</h2>
    
      <div>
        <label>Name:</label>
        <input type="text" name="name" value={updatedData.name} onChange={handleInputChange} />
      </div>
      <div>
        <label>Username:</label>
        <input type="text" name="username" value={updatedData.username} onChange={handleInputChange} />
      </div>
      <div>
        <label>Email:</label>
        <input type="text" name="email" value={updatedData.email} onChange={handleInputChange} />
      </div>
      <button onClick={handleUpdate}>Update</button>
      <Link to="/">Back to List</Link>
    </div>
  );
}

export default Edit;
