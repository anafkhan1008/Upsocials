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

const Edit = () => {
  const { user, dispatch } = useContext(AuthContext);
  const [updatedUser, setUpdatedUser] = useState({ ...user });
 

  useEffect(() => {
    setUpdatedUser({ ...user }); 
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser({ ...updatedUser, [name]: value });
  };

  const handleSelectChange = (e) => {
    const value = e.target.value;
    setUpdatedUser({ ...updatedUser, relationship: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      // Call API to update user data
    //   const updated = await updateUser(updatedUser); // Function that updates user data, replace this with your actual API call
    //   dispatch({ type: 'UPDATE_SUCCESS', payload: updated }); // Update user context with new data
     // Redirect to the user's profile page after successful update
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };

  return (
    <Container>
      <form onSubmit={handleFormSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h6">Edit Profile</Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              label="Username"
              name="username"
              value={updatedUser.username}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              value={updatedUser.email}
              onChange={handleInputChange}
            />
          </Grid>
          {/* Add other fields for profile information */}
          <Grid item xs={4}>
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
          <Grid item xs={4} >
            <Typography variant="subtitle1" color="initial">Update profile Picture</Typography>
            <TextField
              id=""
              type='file'
            />
          </Grid>
          <Grid item xs={4} >
            <Typography variant="subtitle1" color="initial">Update Cover Picture</Typography>
            <TextField
              id=""
              type='file'
            />
          </Grid>

          <Grid item xs={12}>
            <Button variant="contained" color="primary" type="submit">
              Save Changes
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default Edit;
