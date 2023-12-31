import RssFeed from '@mui/icons-material/RssFeed';
import Chat from '@mui/icons-material/Chat';

import Group from '@mui/icons-material/Group';
import Bookmark from '@mui/icons-material/Bookmark';
import HelpOutline from '@mui/icons-material/HelpOutline';
import WorkOutline from '@mui/icons-material/WorkOutline';
import Event from '@mui/icons-material/Event';
import School from '@mui/icons-material/School';
import "../styles/sidebar.css"


import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import Divider from '@mui/material/Divider';
import { Link } from 'react-router-dom';

export default function Sidebar() {
  return (
    <Box sx={{
   
    
      zIndex: 1, 
    position:"sticky",
    top : "65px",
    display: { xs: 'none', sm: 'none' , md : 'block' }
    }}




  
     >
       
      <List sx={{padding : {sm : "10px" , md : '15px'}}}>
      <ListItem disablePadding>
            <ListItemButton component = {Link} to="/">
              <ListItemIcon>
                <RssFeed sx={{color : '#212100'}}/>
              </ListItemIcon >
              <ListItemText primary="Feed"  />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <Chat sx={{color : '#212100'}}/>
              </ListItemIcon>
              <ListItemText primary="Chats" />
            </ListItemButton>
          </ListItem>
     
          <ListItem disablePadding>
            <ListItemButton href="/suggestion">
              <ListItemIcon>
                <Group sx={{color : '#212100'}}/>
              </ListItemIcon>
              <ListItemText primary="Suggestions" />
            </ListItemButton>
          </ListItem>

           <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <Bookmark />
              </ListItemIcon>
              <ListItemText primary="Bookmarks" />
            </ListItemButton>
          </ListItem>
   <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <HelpOutline />
              </ListItemIcon>
              <ListItemText primary="Questions" />
            </ListItemButton>
          </ListItem>
     
     <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <WorkOutline />
              </ListItemIcon>
              <ListItemText primary="Jobs" />
            </ListItemButton>
          </ListItem>   

     <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <Event />
              </ListItemIcon>
              <ListItemText primary="Events" />
            </ListItemButton>
          </ListItem> 
         
     <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <School />
              </ListItemIcon>
              <ListItemText primary="Courses" />
            </ListItemButton>
          </ListItem> 
        
         <Divider/>
     
      </List>
    
    </Box>  
  );
}
