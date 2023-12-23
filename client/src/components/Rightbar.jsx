

import { Box, Container} from "@mui/material";
import { ProfileRightBar } from "./ProfileRightBar";
import Homerightbar from "./Homerightbar";


export default function Rightbar({ user }) {
 

  return (
    <Box sx={{display : 'flex' , justifyContent : 'center', alignItems : 'center', }} >
      <Box sx={{display : 'flex' , justifyContent : 'center', alignItems : 'center', }} >
        {user ? <ProfileRightBar user={user} /> : ""}
      </Box>
    </Box>
  );
}
