import "./profile.css";
import Topbar from "../../components/Topbar";
import Sidebar from "../../components/Sidebar";
import Feed from "../../components/Feed";
import Rightbar from "../../components/Rightbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import { Grid } from '@mui/material';
import PersonIcon from "@mui/icons-material/Person";
import BASE_URL from "../../.config";

export default function Profile() {
  const [user, setUser] = useState({});
  const username = useParams().username;

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(
        `${BASE_URL}/users?username=${username}`
      );
      setUser(res.data);
    };
    fetchUser();

  }, [username]);
  
  console.log(user)
  return (
    <Grid container>
    
        <Topbar />
 
      <Grid item container className="profile">

        <Grid item xs={12} md={2}>
          <Sidebar />
        </Grid>
        <Grid item xs={12} md={10}>
          <Grid container direction="column">

            <Grid item >
              <Grid container justifyContent="center" alignItems="center">
       
                <Grid item className="profileCover" xs={12}>
                  <img
                    className="profileCoverImg"
                    src={user.coverPicture ? `https://upsocial-image-bucket.s3.ap-south-1.amazonaws.com/${user.coverPicture}` : "/static/cover.jpg"}
                    alt=""
                  />

                  <Avatar
                    className="profileUserImg"
                    src={user ? `https://upsocial-image-bucket.s3.ap-south-1.amazonaws.com/${user.profilePicture}` : " "}
                    sx={{ width: 150, height: 150 }}
                  />
                </Grid>

            
                <Grid item xs={12} md={12} className="profileInfo">
                  <h4 className="profileInfoName">{user.username}</h4>
                  <span className="profileInfoDesc">{user.desc}</span>
                </Grid>
              </Grid>
            </Grid>

            {/* Profile Right Bottom */}
            <Grid container className="profileRightBottom">
              <Grid item xs={8}  className="">
                  <Feed username={username}/>
              </Grid>
             <Grid item xs={4}>
               <Rightbar user={user} />
             </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
