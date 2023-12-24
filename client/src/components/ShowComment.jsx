import axios from 'axios';
import React, { useEffect, useState } from 'react'
import BASE_URL from '../.config';
import { Avatar, Box, Paper, Typography } from '@mui/material';

function ShowComment({comment}) {
    const id = comment.userId;
    const text = comment.text;
 

    const [user , setUser] = useState({})

    useEffect(()=>{
        const fetchUser = async() =>{
            try{

                const res = await axios.get(`${BASE_URL}/users?userId=${id}`);
                setUser(res.data)
            }
            catch(err)
            {
                console.log(err)
            }
              
        }
        fetchUser()

    } , [])




    
  return (
    <Paper elevation={1} sx={{margin : "10px" , padding : '5px'}}>
        <Box sx={{display : 'flex' , alignItems : 'center'}} >
        <Avatar alt="User Avatar" src={`https://upsocial-image-bucket.s3.ap-south-1.amazonaws.com/${user.profilePicture}`} sx={{margin : "5px"}} /> 
         <Typography variant="subtitle1" component="span">
        {user.username}
      </Typography>
        </Box>
        <Box sx={{backgroundColor : "#ffff"}} >
            <Typography variant="body1">{text}</Typography>
        </Box>
  </Paper>
  )
}

export default ShowComment