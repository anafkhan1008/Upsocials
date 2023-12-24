import React, { useEffect, useState } from 'react'
import Addcomment from './Addcomment'
import { Add } from '@mui/icons-material'
import { Box} from '@mui/material'
import Button from '@mui/material/Button';
import axios from 'axios';
import ShowComment from './ShowComment';

function Comment({post}) {
  const [open , setOpen] = useState(false);
  const [comments , setComments] = useState([]);
  const len = comments.length;


useEffect(()=>{
  setComments(post.comments)
},[comments])





  return (
    <Box sx={{width : "95%"}} >
        <Addcomment post={post}/>
        <Button variant="text" onClick={()=>(setOpen(!open))}>{open ? "Hide comments" : "Show comments"}</Button>
        {open ? (
  <div>
    {comments.map((comment, index) => (
      <div key={index}>
        <ShowComment comment={comment} />
      </div>
    ))}
  </div>
) : (
  <div></div>
)}




    </Box>
  )
}

export default Comment