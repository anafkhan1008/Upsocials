import { useState, useEffect, useContext } from 'react';
import handleFollow from '../handlefollow';
import { AuthContext } from '../context/AuthContext';
import { Button } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
function FollowButton({ userId }) {
  const { user } = useContext(AuthContext);

  const [followingStatus, setFollowingStatus] = useState(false);

  useEffect(() => {
    setFollowingStatus(user.followings.includes(userId));
  }, [userId]);

  const handleClick = async () => {
    try {
      const updatedFollowingStatus = !followingStatus;
      setFollowingStatus(updatedFollowingStatus); 

      await handleFollow(userId, user._id, updatedFollowingStatus);
    } catch (error) {
      console.error('Error:', error);

    }
  };

  return (
    <Button variant='contained'
    onClick={handleClick}
    startIcon={followingStatus ? <PersonRemoveIcon /> : <PersonAddIcon />}
  >
    {!followingStatus ? 'Unfollow' : 'Follow'}
  </Button>
  );
}

export default FollowButton;
