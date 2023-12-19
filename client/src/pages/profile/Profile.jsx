import "./profile.css";
import Topbar from "../../components/Topbar";
import Sidebar from "../../components/Sidebar";
import Feed from "../../components/Feed";
import Rightbar from "../../components/Rightbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
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
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src={
                  user.coverPicture ? user.coverPicture : "/static/cover.jpg"
                }
                alt=""
              />

              <Avatar
                className="profileUserImg"
                alt="Remy Sharp"
                src={user ? user.profilePicture : " "}
                sx={{ width: 150, height: 150 }}
              />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{user.username}</h4>
              <span className="profileInfoDesc">{user.desc}</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed username={username} />
            <Rightbar user={user} />
          </div>
        </div>
      </div>
    </>
  );
}
