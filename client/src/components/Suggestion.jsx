import React, { useState , useEffect , useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import axios from 'axios'
import BASE_URL from '../.config'
import { Link } from 'react-router-dom'
import { Avatar, Box, Paper, Typography , Button } from '@mui/material'

import SuggestionCard from './SuggestionCard'



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
    <Box>
        <h2>Suggestions</h2>
        <div>
        {users.map((user) => (
          <div >
            {console.log(user)}
             <SuggestionCard user={user} />
          </div>
        ))}
      </div>
    </Box>
  )
}

export default Suggestion