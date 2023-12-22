import React from 'react'
import Suggestion from '../../components/Suggestion'
import { Box, Container } from '@mui/material';
import Topbar from '../../components/Topbar';
function Suggestions() {
  return (
    <Box>
      <Topbar/>
        <Container maxWidth="xs">
        <Suggestion/>
    </Container>
    </Box>
  
  )
}

export default Suggestions;