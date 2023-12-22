import { Avatar, Box, Button, Paper, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import BASE_URL from '../.config';

function SuggestionCard({user}) {
    console.log(user)
    const {user : currentUser , dispatch} = useContext(AuthContext);
    const [followed , setFollowed] = useState(false)

    useEffect(()=>{
        setFollowed(currentUser.followings.includes(user._id));
    })

    const handleClick = async () => {
        try {
          if (followed) {
            await axios.put(`${BASE_URL}/users/${user._id}/unfollow`, {
              userId: currentUser._id,
            });
            dispatch({ type: "UNFOLLOW", payload: user._id });
          } else {
            await axios.put(`${BASE_URL}/users/${user._id}/follow`, {
              userId: currentUser._id,
            });
            dispatch({ type: "FOLLOW", payload: user._id });
          }
        setFollowed(!followed)
        } catch (err) {
          console.error('Error:', err);
        }
      };
  return (
    
         <Paper elevation={0} sx={{display : 'flex' , justifyContent : 'space-between'  , marginBottom : "5px" , maxWidth : "400px"}}>
                <Link to={`profile/${user.username}`}>
              <Avatar  src={`https://upsocial-image-bucket.s3.ap-south-1.amazonaws.com/${user.profilePicture}`} variant='square' width = "50px" height="50px"  />
              </Link>
              <Box sx={{display : 'flex' , justifyContent : 'center' , alignItems : 'center' , width : '100%'}}>
                <Typography variant="h6" color="initial" sx={{margin : 'auto'}}>{user.username}</Typography>
              </Box>
              <Button variant='contained'onClick={handleClick} >
                {
                  followed ? "Unfollow" : "Follow"
                }
              </Button>
              </Paper>
 
  )}

export default SuggestionCard;