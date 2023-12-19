import { AppBar, Toolbar, IconButton, Badge, Avatar, useMediaQuery, useTheme } from '@mui/material';
import { styled } from '@mui/system';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import ChatIcon from '@mui/icons-material/Chat';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link , useLocation } from "react-router-dom";
import InputBase from '@mui/material/InputBase';
import { InputAdornment } from '@mui/material';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';

import Tooltip from '@mui/material/Tooltip';

import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import { logoutCall } from '../apiCalls';

const StyledAppBar = styled(AppBar)({
  background: '#3f0169',
  color: '#ffff',
  boxShadow: 'none',
  borderBottom: '1px solid #e0e0e0',
});

const StyledToolbar = styled(Toolbar)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

const StyledLogo = styled(Link)({
  fontSize: '1.5rem',
  fontWeight: 'bold',
  color : 'white',
  textDecoration : 'none'
});

const StyledInputBase = styled(InputBase)({
  backgroundColor: '#f5f5f5',
  borderRadius: '5px',
  padding: '5px 10px',
  marginLeft: '10px',
  width: '400px',
});


const Topbar = () => {
  const location = useLocation();
  const { user , dispatch } = useContext(AuthContext);
  console.log(location.pathname)
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md')); 

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [isProfilePage, setIsProfilePage] = useState(false);

  useEffect(() => {
    setIsProfilePage(location.pathname === `/profile/${user.username}`);
  }, [location.pathname, user.username]);

  const handleLogout = () => {
    localStorage.clear();
    logoutCall(user._id , dispatch)
    window.location.reload();
  };


  return (
    <StyledAppBar position="sticky">
      <StyledToolbar>
      
        <StyledLogo to="/" >
          
          Upsocial
        </StyledLogo>
        
        
        
        {isMobile ? (
          // Render only on mobile
          <IconButton>
   
          </IconButton>
        ) : (
          // Render on desktop
          <div>
           <StyledInputBase
          placeholder="Search for friend, post or video"
          endAdornment={
            <InputAdornment position="end">
              <IconButton>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          }
        />
           
          </div>
        )}

        <div>
          <IconButton sx={{ margin: "10px" }}>
            <Badge badgeContent={1} color="secondary">
              <PersonIcon sx={{ color: "#ffff" }} />
            </Badge>
          </IconButton>
          <IconButton sx={{ margin: "10px" }}>
            <Badge badgeContent={1} color="secondary">
              <ChatIcon sx={{ color: "#ffff" }} />
            </Badge>
          </IconButton>
          <IconButton sx={{ margin: "10px" }}>
            <Badge badgeContent={1} color="secondary">
              <NotificationsIcon sx={{ color: "#ffff" }} />
            </Badge>
          </IconButton>

       
        </div>
        
     
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
          </IconButton>
        </Tooltip>
        
      </StyledToolbar>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleClose} >
        {!isProfilePage ? (
    <Link to={`profile/${user.username}`} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', textDecoration : 'none' }}>
      <Avatar /> 
      Profile
    </Link>
  ) : "" }
       
        </MenuItem>
        <MenuItem onClick={handleClose}>
        <Link to={`profile/edit/${user.username}`} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', textDecoration : 'none' }}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Edit profile
          </Link>
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>

    </StyledAppBar>
  );
};

export default Topbar;
