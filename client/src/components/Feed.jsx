import { useContext, useEffect, useState } from "react";
import "../styles/feed.css";
import axios from 'axios';
import Post from "./Post";
import Share from "./Share";
import { AuthContext } from "../context/AuthContext";
import BASE_URL from "../.config";
import { Box } from "@mui/material";

export default function Feed({ username }) {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

  
      const res = username
        ? await axios.get(`${BASE_URL}/posts/profile/${username}`)
        : await axios.get(`${BASE_URL}/posts/timeline/${user._id}`);
      
        try{
        setPosts(
          res.data.sort((p1, p2) => {
            return new Date(p2.createdAt) - new Date(p1.createdAt);
          }))
        }
         catch(err){
          console.log("An error occured while fetching posts")
         } 
  };

  useEffect(() => {
    fetchData();
    setLoading(false);
  }, [username, user._id]);

  return (
    <Box sx={{ padding: { xs: '20px', md: '30px' }, display : 'flex' , justifyContent : 'center' , alignContent : 'center' , backgroundColor : '#f0ebf5' }} >
      <Box sx={{display : 'flex',flexDirection : 'column',alignItems : 'center' }} >
      {(!username || username === user.username) && <Share />}
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {posts?.map((p) => (
          <Post key={p._id} post={p} />
        ))}
        {!loading && !error && !posts?.length && <p>No posts found.</p>}
      </Box>
    </Box>
  );
}
