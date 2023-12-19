import axios from "axios";
import BASE_URL from "./.config";

export const loginCall = async (userCredential, dispatch) => {
  let islogged = false;
  dispatch({ type: "LOGIN_START" });
  try {
    const res = await axios.post(`${BASE_URL}/auth/login`, userCredential);
    dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    islogged = true;
  } catch (err) {
    dispatch({ type: "LOGIN_FAILURE", payload: err });
  }
console.log(islogged)
  return islogged;
};

export const logoutCall = async (userCredential, dispatch) => {
  dispatch({ type: "LOGOUT" });
 localStorage.clear();
};

