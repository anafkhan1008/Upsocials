import axios from 'axios';
import BASE_URL from './.config';

const handleFollow = async (userid, userId  ,followingStatus) => {
 let response;
  try {
    if (followingStatus) {
     
    response = await axios.put(`${BASE_URL}/users/${userid}/unfollow` , {userId});
    } else {
 
     response =  await axios.put(`${BASE_URL}/users/${userid}/follow` , {userId});
    }
    console.log(response)
    return !followingStatus;
  } catch (error) {
    console.error('Error:', error);
    // Handle error
    return followingStatus;
  }
};

export default handleFollow;
