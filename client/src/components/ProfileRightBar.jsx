import { Box, Button , Grid, Typography } from '@mui/material';
import React, { useContext, useEffect, useState , useRef } from 'react'
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import BASE_URL from '../.config';
import { Link } from 'react-router-dom';
import "../styles/rightbar.css"
import Avatar from '@mui/material/Avatar';
import Paper from '@mui/material/Paper';
export const ProfileRightBar = ({user}) => {

    const [friends, setFriends] = useState([]);
    const {user : currentUser , dispatch} = useContext(AuthContext)
    const [followed , setFollowed] = useState(false);
    

    useEffect(() => {
        setFollowed(currentUser.followings.includes(user._id));
        const getFriends = async () => {
          try {
            const friendList = await axios.get(BASE_URL + "/users/following/" + user._id);
            setFriends(friendList.data);
          } catch (err) {
            console.log(err);
          }
        };
    
     
        getFriends();
      }, [user]);


  console.log(followed)
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
      <Box sx={{ display: {  md: 'block' } }} >
        <Grid container>
          <Grid item xs={12} m={2} >
  {user.username !== currentUser.username && (
        <Button onClick={handleClick} variant="contained">
          {followed ? "Unfollow" : "Follow"}
        </Button>
        )}
          </Grid>
         
        </Grid>
       
        <Paper elevation={1} style={{ padding: '20px' }}>
  <Typography variant="h6" gutterBottom className="rightbarTitle">
    About
  </Typography>
  <Grid container spacing={2} className="rightbarInfo">
    <Grid item xs={12} sm={6} md={12}>
      <div className="rightbarInfoItem">
        <Typography variant="subtitle1" component="span">
          City:
        </Typography>
        <Typography variant="body1" component="span">
          {user.city}
        </Typography>
      </div>
    </Grid>
    <Grid item xs={12} sm={6} md={12}>
      <div className="rightbarInfoItem">
        <Typography variant="subtitle1" component="span" className="rightbarInfoKey">
          Country:
        </Typography>
        <Typography variant="body1" component="span" className="rightbarInfoValue">
          {user.country}
        </Typography>
      </div>
    </Grid>
    <Grid item xs={12} sm={6} md={12}>
      <div className="rightbarInfoItem">
        <Typography variant="subtitle1" component="span" className="rightbarInfoKey">
          Relationship:
        </Typography>
        <Typography variant="body1" component="span" className="rightbarInfoValue">
          {user.relationship === 1 ? 'Single' : user.relationship === 2 ? 'Married' : 'Not disclosed'}
        </Typography>
      </div>
    </Grid>
  </Grid>
</Paper>
      
       
        <h4 className="rightbarTitle">User friends</h4>
        <div className="rightbarFollowings">
          {friends.map((friend) => (
            <Link
              to={"/profile/" + friend.username}
              style={{ textDecoration: "none" }}
            >
              <div className="rightbarFollowing">
              <Avatar 
              variant='square'

  src={friend.profilePicture ? `https://upsocial-image-bucket.s3.ap-south-1.amazonaws.com/${friend.profilePicture}` : " "}
  sx={{ width: 100, height: 100 , margin : "5px" }}
/>
                <span className="rightbarFollowingName">{friend.username}</span>
              </div>
            </Link>
          ))}
        </div>
      </Box>
    );
  };