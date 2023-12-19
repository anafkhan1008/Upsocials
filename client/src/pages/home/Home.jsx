
import Sidebar from "../../components/Sidebar";
import Feed from "../../components/Feed";
import Grid from '@mui/material/Grid';
import Rightbar from "../../components/Rightbar";
import "./home.css"
import Topbar from "../../components/Topbar";
import { Box } from "@mui/material";

export default function Home() {
  return (
    <Grid container sx={{ margin: 'auto' }}>
    <Topbar />
    <Grid container sx={{ display: 'flex', margin: 'auto' }}>
      <Grid item xs={12} sm={2}>
        <Sidebar />
      </Grid>
      <Grid item xs={12} sm={7}>
        <Feed />
      </Grid>
      <Grid item xs={12} sm={3}>
        <Rightbar />
      </Grid>
    </Grid>
  </Grid>
  );
}
