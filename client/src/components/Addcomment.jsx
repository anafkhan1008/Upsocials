import React, { useContext, useState } from 'react';
import { Box, TextField, Button, Paper , Avatar } from '@mui/material';
import { AuthContext } from '../context/AuthContext';

function AddComment() {
  const [inputValue, setInputValue] = useState('');
  const {user} = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted with value:', inputValue);
    setInputValue('');
  };

  return (
    <Paper sx={{ display: 'flex', alignItems: 'center' , padding : "10px 20px 20px 20px" , borderRadius : "10px" }}>
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
