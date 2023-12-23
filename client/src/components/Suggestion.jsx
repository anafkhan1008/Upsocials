import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import axios from 'axios';
import BASE_URL from '../.config';
import { Link } from 'react-router-dom';
import { Avatar, Box, Button, Paper, Typography } from '@mui/material';

function Suggestion() {
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const [users, setUsers] = useState([]);

  const fetchUser = async () => {
    try {
      const res = await axios.get(BASE_URL + '/users/all');
      const updatedUsers = res.data.map(user => ({
        ...user,
        followed: currentUser.followings.includes(user._id)
      }));
      setUsers(updatedUsers);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleFollow = async (userId) => {
    try {
      const userIndex = users.findIndex(user => user._id === userId);
      const followed = users[userIndex].followed;

      if (followed) {
        await axios.put(`${BASE_URL}/users/${userId}/unfollow`, {
          userId: currentUser._id,
        });
        dispatch({ type: 'UNFOLLOW', payload: userId });
      } else {
        await axios.put(`${BASE_URL}/users/${userId}/follow`, {
          userId: currentUser._id,
        });
        dispatch({ type: 'FOLLOW', payload: userId });
      }

      const updatedUsers = [...users];
      updatedUsers[userIndex] = { ...updatedUsers[userIndex], followed: !followed };
      setUsers(updatedUsers);
    } catch (err) {
      console.error('Error:', err);
    }
  };

  return (
    <Box>
      <h2>Suggestions</h2>
      <div>
        {users.map((user) => (
          <Paper
            key={user._id}
            elevation={0}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '20px',
              maxWidth: '500px',
              borderRadius : "10px"
            }}
          >
            <Link to={`/profile/${user.username}`}>
              <Avatar
                src={`https://upsocial-image-bucket.s3.ap-south-1.amazonaws.com/${user.profilePicture}`}
                width="60px"
                height="60px"
              />
            </Link>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
              }}
            >
              <Typography variant="h6" color="initial" sx={{ margin: 'auto' }}>
                {user.username}
              </Typography>
            </Box>
            {
              user.followed ? 
              (  <Button
              variant="contained"
              onClick={() => handleFollow(user._id)}
              sx={{borderRadius : "20px" , width : "200px" ,  backgroundColor : "#5328b0"}}
              startIcon={<PersonRemoveIcon/> }
            >
              <Typography variant="subtitle2" color="#ffff" >Unfollow</Typography>
           
            </Button>):
              (<Button
                variant="contained"
                onClick={() => handleFollow(user._id)}
                sx={{borderRadius : "20px" , width : "200px" ,  backgroundColor : "#5328b0"}}
                startIcon={<PersonAddAlt1Icon/> }
              >
                <Typography variant="subtitle2" color="#ffff" >Follow</Typography>
             
              </Button>)
            }
          
          </Paper>
        ))}
      </div>
    </Box>
  );
}

export default Suggestion;

