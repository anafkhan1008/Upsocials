import { Box, Button } from '@mui/material';
import React, { useContext, useEffect, useState , useRef } from 'react'
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import BASE_URL from '../.config';
import { Link } from 'react-router-dom';


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
      <Box sx={{ display: { xs: 'none', md: 'block' } }} >
        {user.username !== currentUser.username && (
        <Button onClick={handleClick} variant="contained">
          {followed ? "Unfollow" : "Follow"}
        </Button>
        )}
        <h4 className="rightbarTitle">User information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">{user.city}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">{user.from}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">
              {user.relationship === 1
                ? "Single"
                : user.relationship === 1
                ? "Married"
                : "-"}
            </span>
          </div>
        </div>
        <h4 className="rightbarTitle">User friends</h4>
        <div className="rightbarFollowings">
          {friends.map((friend) => (
            <Link
              to={"/profile/" + friend.username}
              style={{ textDecoration: "none" }}
            >
              <div className="rightbarFollowing">
                <img
                  src={
                    friend.profilePicture
                      ? friend.profilePicture
                      : " "
                  }
                  alt=""
                  className="rightbarFollowingImg"
                />
                <span className="rightbarFollowingName">{friend.username}</span>
              </div>
            </Link>
          ))}
        </div>
      </Box>
    );
  };