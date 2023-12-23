import { useState, useEffect, useContext } from 'react';
import {
  Container,
  TextField,
  Button,
  Grid,
  Typography,
  FormControl,
  Select,
  MenuItem,
} from '@mui/material';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios'
import BASE_URL from '../../.config';
import Topbar from '../../components/Topbar';
import { useNavigate } from "react-router-dom";



const Edit = () => {
  const { user, dispatch } = useContext(AuthContext);
  const [updatedUser, setUpdatedUser] = useState({ ...user });
  const [profilePic, setProfilePic] = useState(null);
  const [coverPic , setCoverPic] = useState(null);
let navigate = useNavigate();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser({ ...updatedUser, [name]: value });
  };

  const handleSelectChange = (e) => {
    const value = e.target.value;
    setUpdatedUser({ ...updatedUser, relationship: value });
  };

  useEffect(() => {

   
    setUpdatedUser(updatedUser)
   
  }, [updatedUser]);
  

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    let updatedUserData = { ...updatedUser };
    if (profilePic) {
      const data = new FormData();
      const fileName = Date.now() + '-' + profilePic.name;
      data.append('name', fileName);
      data.append('image', profilePic);
      data.append('Content-Type', 'image/png');

      try {
        const res = await axios.post(`${BASE_URL}/users/upload`, data, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        if (res.status === 200) {
          console.log('Image uploaded successfully');
          updatedUserData = {
            ...updatedUserData,
            profilePicture: fileName,
          };
        }
      } catch (err) {
        console.log(err + 'Image upload error');
      }
    }
    if (coverPic) {
      const data = new FormData();
      const fileName = Date.now() + '-' + coverPic.name;
      data.append('name', fileName);
      data.append('image', coverPic);
      data.append('Content-Type', 'image/png');

      try {
        const res = await axios.post(`${BASE_URL}/users/upload`, data, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        if (res.status === 200) {
          console.log('cover Image uploaded successfully');
          updatedUserData = {
            ...updatedUserData,
            coverPicture: fileName,
          };
        }
      } catch (err) {
        console.log(err + 'Image upload error');
      }
    }

    try {
      console.log(updatedUser)
      const res = await axios.put(`${BASE_URL}/users/${user._id}`, updatedUserData);

      if (res.status === 200) {
        dispatch({ type: 'UPDATE_PROFILE', payload: res.data.user });
        console.log('User successfully updated');
        return navigate(`/profile/${updatedUser.username}`)
      } else {
        console.log(res.status);
      }
    } catch (error) {
      console.error(error);
    }

 
  };

  return (
    <Container>
      <Topbar/>
      <Container maxWidth="md" sx={{position : 'relative' , top : "100px"}}>
        <form onSubmit={handleFormSubmit} >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h6">Edit Profile</Typography>
          </Grid>
          <Grid item xs={12} sm={6} >
            <TextField
              fullWidth
              label="Username"
              name="username"
              value={updatedUser.username}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              value={updatedUser.email}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Country"
              name="country"
              value={updatedUser.country}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="City"
              name="city"
              value={updatedUser.city}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="About"
              name="about"
              value={updatedUser.about}
              onChange={handleInputChange}
            />
          </Grid>
      
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <Select
                value={updatedUser.relationship || ''}
                onChange={handleSelectChange}
              
                name="relationship"
                renderValue={(value) => {
                  if (value === 1) return 'Single';
                  if (value === 2) return 'In a relationship';
                  if (value === 3) return 'Married';
                  return '';
                }}
              >
                <MenuItem value={1}>Single</MenuItem>
                <MenuItem value={2}>In a relationship</MenuItem>
                <MenuItem value={3}>Married</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} >
            <Typography variant="subtitle1" color="initial">Update profile Picture</Typography>
            <input
            type="file"
            id="file"
            name="image"
            accept="image/*"
            onChange={(e) => setProfilePic(e.target.files[0])}
            />
          </Grid>
          <Grid item xs={12} >
            <Typography variant="subtitle1" color="initial">Update Cover Picture</Typography>
            <input
            type="file"
            id="file"
            name="image"
            accept="image/*"
            onChange={(e) => setCoverPic(e.target.files[0])}
            />
          </Grid>

          <Grid item xs={12} p={5}>
            <Button variant="contained" color="primary" type="submit">
              Save Changes
            </Button>
          </Grid>
        </Grid>
      </form>
      </Container>
      
    </Container>
  );
};

export default Edit;
