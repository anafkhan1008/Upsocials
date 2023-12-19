
import Suggestion from "./Suggestion";
import { Box} from "@mui/material";
import { ProfileRightBar } from "./ProfileRightBar";


export default function Rightbar({ user }) {
 
  const HomeRightbar = () => {
    return (
      <Box sx={{display : 'flex' ,flexDirection : 'column', justifyContent : 'center', alignItems : 'center'}}>
        <div className="birthdayContainer" display={{xs : 'none' , md : 'block'}}>
          <img className="birthdayImg" src="assets/gift.png" alt="" />
          <span className="birthdayText">
            <b>Pola Foster</b> and <b>3 other friends</b> have a birhday today.
          </span>
        </div>
        <img className="rightbarAd" src="assets/ad.png" alt="" />
       <Suggestion/>
      </Box>
    );
  };

  
  return (
    <Box sx={{display : 'flex' , justifyContent : 'center', alignItems : 'center', }} >
      <Box sx={{display : 'flex' , justifyContent : 'center', alignItems : 'center', }} >
        {user ? <ProfileRightBar user={user} /> : <HomeRightbar />}
      </Box>
    </Box>
  );
}
