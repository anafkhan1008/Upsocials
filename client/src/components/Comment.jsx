import React from 'react'
import Addcomment from './Addcomment'
import { Add } from '@mui/icons-material'
import { Box } from '@mui/material'

function Comment() {
  return (
    <Box sx={{width : "95%"}} >
        <Addcomment/>
    </Box>
  )
}

export default Comment