import logo from './logo.svg';
import './App.css';
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import Edit from './pages/edit/Edit';
import { createTheme, ThemeProvider } from '@mui/material/styles'
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  Switch,
  Routes,
  redirect,
  Navigate
} from "react-router-dom";
import { BrowserRouter  } from "react-router-dom";
import { AuthContext } from './context/AuthContext';
import { useContext } from 'react';

const theme = createTheme({
  palette: {
    primary: {
      main: '#3f0169', 
    },
    secondary : {
      main : '#e0b8fc'
    }
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '&$focused $notchedOutline': {
            borderColor: '#3f0169',
            backgroundColor : '#18025c'
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: "#f7ebff",
        },
      },
    },
  },
});
function App() {
  const {user} = useContext(AuthContext);
  return (
    <ThemeProvider theme = {theme} >
<BrowserRouter>
<Routes>
          {/* If user is logged in, render Home, otherwise redirect to Register or Login */}
          <Route path="/" element={user ? <Home /> : <Navigate to="/register" />} />
          <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
          <Route path="/register" element={user ? <Navigate to="/" /> : <Register />} />
          {/* Profile routes */}
          <Route path="/profile/:username" element={<Profile />} />
          <Route path="/profile/edit/:username" element={<Edit />} />
        </Routes>
  </BrowserRouter>

    </ThemeProvider>

  );
}

export default App;
