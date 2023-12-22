import {
  Avatar,
  Button,
  Divider,
  Grid,
  IconButton,
  Input,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Label, Room, EmojiEmotions, Cancel } from "@mui/icons-material";
import { useContext, useRef, useState } from "react";
import PermMediaIcon from "@mui/icons-material/PermMedia";
import LabelImportantIcon from "@mui/icons-material/LabelImportant";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AddReactionIcon from "@mui/icons-material/AddReaction";

import axios from "axios";
import BASE_URL from "../.config";
import { AuthContext } from "../context/AuthContext";
import styled from "@emotion/styled";

export default function Share() {
  const { user } = useContext(AuthContext);
  const desc = useRef();
  const [file, setFile] = useState(null);

  const submitHandler = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    };
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + '-' + file.name;
      data.append("name", fileName);
      data.append("image", file);
      data.append('Content-Type' , 'image/png')
      newPost.img = fileName;
      try {
        await axios.post(`${BASE_URL}/posts/upload`, data , { headers: {'Content-Type': 'multipart/form-data'}});
      } catch (err) {
        console.log(err + "image upload error-------------------------------------------")
      }
    }
    try {
      await axios.post(`${BASE_URL}/posts`, newPost);
      window.location.reload();
    } catch (err) {}
  };

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  return (
    <Paper sx={{display : 'flex', padding: "30px", borderRadius: "10px", maxWidth: "700px", margin : "20px" , top : "30px" , position : 'relative'}}>
      <Grid container className="share" >
        <Grid item xs={12} className="shareWrapper">
          <Grid container mb={6} alignItems="center" spacing={2}>
            <Grid item>
              <Avatar
                alt="Remy Sharp"
                src={user ? `https://upsocial-image-bucket.s3.ap-south-1.amazonaws.com/${user.profilePicture}` : " "}
                sx={{ width: 56, height: 56 }}
              />
            </Grid>
            <Grid item xs>
              <TextField
                placeholder={"What's in your mind " + user.username + "?"}
                className="shareInput"
                fullWidth
                inputRef={desc}
              />
            </Grid>
          </Grid>
          <Divider />
          {file && (
            <Grid container alignItems="center" >
              <Grid item>
                <img
                  className="shareImg"
                  src={URL.createObjectURL(file)}
                  alt=""
                  style={{ maxWidth: '600px', height: 'auto' }}
                />
              </Grid>
              <Grid item>
                <IconButton onClick={() => setFile(null)}>
                  <Cancel className="shareCancelImg" />
                </IconButton>
              </Grid>
            </Grid>
          )}
          <form  onSubmit={submitHandler}  >
            <Grid container mx={3}>
              <Grid item m={2}>
                <Button
                  component="label"
                  sx={{ color: "#fa004b", borderColor: "#fa004b" , backgroundColor : '#ffff'  }}
                  variant="outlined"
                  startIcon={<PermMediaIcon />}
                >
                  Photo or Vedio
                  <VisuallyHiddenInput
                    type="file"
                    id="file"
                    name="image"
                    accept="image/*"
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                </Button>
              </Grid>
              <Grid item m={2}>
                <Button
                  component="label"
                  sx={{ color: "#079902", borderColor: "##079902" , backgroundColor : '#ffff' }}
                  variant="outlined"
                  startIcon={<LabelImportantIcon />}
                >
                  Tag
                  <VisuallyHiddenInput />
                </Button>
              </Grid>

              <Grid item m={2}>
                <Button
                  component="label"
                  sx={{ color: "#023499", borderColor: "#023499" , backgroundColor : '#ffff' }}
                  variant="outlined"
                  startIcon={<LocationOnIcon />}
                >
                  Location
                  <VisuallyHiddenInput />
                </Button>
              </Grid>
              <Grid item m={2}>
                <Button
                  component="label"
                  sx={{ color: "#aeba02", borderColor: "#aeba02" , backgroundColor : '#ffff' }}
                  variant="outlined"
                  startIcon={<AddReactionIcon />}
                >
                  Feeling
                  <VisuallyHiddenInput />
                </Button>
              </Grid>
            </Grid>
            <Button variant="contained"  type="submit">
              Share
            </Button>
          </form>
        </Grid>
      </Grid>{" "}
    </Paper>
  );
}
