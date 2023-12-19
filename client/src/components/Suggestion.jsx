import React, { useState , useEffect , useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import axios from 'axios'
import BASE_URL from '../.config'
import { Link } from 'react-router-dom'
import { Avatar, Box, Paper, Typography } from '@mui/material'
import FollowButton from './followButton'



function Suggestion() {

    const [users , setUsers] = useState([])

    const fetchUser = async () => {
        try {
          const res = await axios.get(BASE_URL + '/users/all');
          setUsers(res.data);
          console.log(res);
        } catch (error) {
          console.error('Error fetching users:', error);
        }
      };
    useEffect(()=>{
        fetchUser();


    } , [])



  return (
    <Box sx={{maxWidth : "400px"}} >
        <h2>Suggestions</h2>
        <div>
        {users.map((user) => (
          <div key={user._id}>
              <Paper sx={{display : 'flex' , justifyContent : 'space-between', borderRadius : '25px'  , marginBottom : "10px" , maxWidth : "300px"}}>
                <Link to={`profile/${user.username}`}>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" width = "50px" height="50px" />
              </Link>
              <Box sx={{display : 'flex' , justifyContent : 'center' , alignItems : 'center' , width : '100%'}}>
                <Typography variant="h6" color="initial" sx={{margin : 'auto'}}>{user.username}</Typography>
              </Box>
              
              </Paper>
             
            
          
          
          </div>
        ))}
      </div>
    </Box>
  )
}

export default Suggestion