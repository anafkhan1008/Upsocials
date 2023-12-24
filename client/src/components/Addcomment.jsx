import React, { useContext, useState } from 'react';
import { Box, TextField, Button, Paper , Avatar, Input } from '@mui/material';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import BASE_URL from '../.config';

function AddComment({post}) {
  console.log("The post is" , post)
  const [inputValue, setInputValue] = useState('');
  const {user} = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = inputValue;
    const data = {
      text : formData,
      userId : user._id
    }
    try {
      const res = await axios.post(`${BASE_URL}/posts/${post._id}/comment`, data);
      console.log(res)
      setInputValue('');
    } catch (error) {
     
      console.error('Error submitting form:', error);
    }
    
  };

  return (
    <Paper sx={{ display: 'flex', alignItems: 'center' , padding : "5px 10px 10px 10px" , borderRadius : "10px" }}>
      <form onSubmit={handleSubmit} style={{ width: '100%', display : 'flex' , justifyContent : 'center' , alignItems : 'center' }}>
      <Avatar alt="Remy Sharp" src={`https://upsocial-image-bucket.s3.ap-south-1.amazonaws.com/${user.profilePicture}`} sx={{ width: 50, height: 50 , margin : "10px" }} />
        <TextField
          label="Enter Comment"
          fullWidth
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary" sx={{ marginLeft: '5px',marginTop : '5px' , height : '50px' }}>
          Submit
        </Button>
      </form>
    </Paper>
  );
}

export default AddComment;
