import { Avatar, Card, CardContent, CardHeader, CardMedia, Divider, IconButton, Typography } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PersonIcon from '@mui/icons-material/Person';

import CommentIcon from '@mui/icons-material/Comment';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {format} from 'timeago.js'
import '../styles/post.css';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';
import ThumbUpAltTwoToneIcon from '@mui/icons-material/ThumbUpAltTwoTone';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import VolunteerActivismTwoToneIcon from '@mui/icons-material/VolunteerActivismTwoTone';
import Comment from './Comment';
import BASE_URL from '../.config';

export default function Post({ post }) {
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  const { user: currentUser } = useContext(AuthContext);
  const [open , setOpen] = useState(false);

  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id));
  }, [currentUser._id, post.likes]);

  
 const likeHandler = () => {
  try {
    axios.put(`${BASE_URL}/posts/` + post._id + "/like", { userId: currentUser._id });
  } catch (err) {}
  setLike(isLiked ? like - 1 : like + 1);
  setIsLiked(!isLiked);
};

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/users?userId=${post.userId}`);
        setUser(res.data);
       
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };
    fetchUser();
  }, [post.userId]);

  return (
    <>
    <Card className="post" sx={{ boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)' }}>
      <CardHeader sx={{background : "white"}}
      
        avatar= {<Link to = {`/profile/${user.username}`}> 
          <Avatar
  alt="Profile Picture"
  src={`https://upsocial-image-bucket.s3.ap-south-1.amazonaws.com/${user.profilePicture}`}
  style={{
    borderRadius: '50%',
    width: '50px',
    height: '50px'

  }}
/>
          </Link>
        }
        title={<Typography variant="subtitle1" className="postUsername">{user.username}</Typography>}
        subheader={<Typography variant="subtitle3" className="postDate">{format(post.createdAt)}</Typography>}
      />
      <CardMedia
        component="img"
        src={`https://upsocial-image-bucket.s3.ap-south-1.amazonaws.com/${post.img}`}
        alt=""
        className="postImg"
      />
      <Divider SX={{color : '#d080ff'}} />
      <CardContent >
        <Typography variant="body1" className="postText">{post.desc}</Typography>
      </CardContent>
      <div className="postBottom">
        <div>

       
        <IconButton onClick={likeHandler}>
          {
            isLiked ? ( <ThumbUpIcon sx={{color : '#3f0169'}} />) : (<ThumbUpAltTwoToneIcon sx={{color : '#d080ff'}} />)
          }
         
        </IconButton>
       
            <IconButton onClick={likeHandler}>
         <VolunteerActivismTwoToneIcon sx={{color : '#d080ff'}} />
        </IconButton>
        <Typography variant="body2" component="span" className="postLikeCounter">{like} people like it</Typography>
       </div>

        <IconButton onClick={()=>{setOpen(!open)}} >
        <CommentIcon sx={{ color: open ? '#3f0169' : 'gray' }} />
        </IconButton>
      
      </div>
    </Card>
    {open ? (<Comment/>) : ("")}
    </>
  );
}
