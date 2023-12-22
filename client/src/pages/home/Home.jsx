
import Sidebar from "../../components/Sidebar";
import Feed from "../../components/Feed";
import Grid from '@mui/material/Grid';
import Rightbar from "../../components/Rightbar";
import "./home.css"
import Topbar from "../../components/Topbar";
import { Box, Paper } from "@mui/material";


export default function Home() {
  return (
    <Grid container>
      <Grid item xs={12} md={12}>
        <Topbar />
      </Grid>
      <Grid item xs={{display : 'none'}} sm={0}>
      <Sidebar/>
      </Grid>
      <Grid item xs={12} sm={7}>
       <Feed/>
      </Grid>
      <Grid item xs={0} sm={3}>
       <Rightbar/>
     
     </Grid>
  </Grid>
  );
}
