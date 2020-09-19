import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
//import jwt_decode from "jwt-decode";
import {
  GET_ERRORS,
  SET_CURRENT_USER,
  USER_LOADING
} from "./types";
// Register User

axios.defaults.baseURL = 'http://localhost:8080/';
export const registerUser = (userData, history) => dispatch => {
  axios
    .post("service/authenticate/signup", userData)
    .then(res => {
      console.log(res.data);
      dispatch(setCurrentUser(res.data));
      }
    )
    .catch(err =>{
      console.log(err.response.data);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })}
    );
};
export const loginUser = userData => dispatch => {
  axios
    .post("service/authenticate/login", userData)
    .then(res => {
      // Save to localStorage
      // Set token to localStorage
      const { token } = res.data;
      //localStorage.setItem("jwtToken", token);
      // Set token to Auth header
      //setAuthToken(token);
      // Decode token to get user data
      //const decoded = jwt_decode(token);
      // Set current user
      console.log(res.data);
      dispatch(setCurrentUser(res.data));
    })
    .catch(err =>{
      console.log("Printing error here")
      console.log(err.data);
      console.log(err.response);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    }
    );
};

export const submitDetails = (userData, history) => async (dispatch) => {
  console.log("inside")

  console.log(userData)
   await axios.post("service/details/submitDetails", userData).then(res => {
    console.log(res.data)
    dispatch(setCurrentUser(res.data));
   }).catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};
// User loading
export const setUserLoading = () => {
  return {
    type: USER_LOADING
  };
};
// Log user out
export const logoutUser = () => dispatch => {
  console.log("logout")
  // Remove token from local storage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};