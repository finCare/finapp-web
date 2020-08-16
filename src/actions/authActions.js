import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
//import jwt_decode from "jwt-decode";
import {
  GET_ERRORS,
  SET_CURRENT_USER,
  USER_LOADING
} from "./types";
// Register User
export const registerUser = (userData, history) => async (dispatch) => {
   await axios.post("service/authenticate/signup", userData).then(res => {
     if(res.status=="200")
     {
       console.log("LOGIN SUCCESSFUL")
       history.push("/details");

     }
     else{
       console.log("NOT OK")
     }
   }).catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
// Login - get user token
export const loginUser =(userData, history)  => async (dispatch) => {
  await axios.post("service/authenticate/login", userData).then(res => {
    //console.log(res.data.message._id);
    if(res.status=="200")
    {
      console.log("LOGIN SUCCESSFUL");
      history.push("/dashboard");
    }
    else{
      console.log("NOT OK") //add when response corrected
    }
  }
  )
      //{
//*** Save to localStorage
//*** Set token to localStorage
      //const { token } = res.data;
      //localStorage.setItem("jwtToken", token);
      // Set token to Auth header
      //setAuthToken(token);
      // Decode token to get user data
      //const decoded = jwt_decode(token);
      // Set current user
      //dispatch(setCurrentUser(decoded));
    //})

};

export const submitDetails = (userData, history) => async (dispatch) => {
  console.log("inside")

  console.log(userData)
   await axios.post("service/details/submitDetails", userData).then(res => {
     if(res.status=="200")
     {
       console.log(userData)
       history.push("/dashboard");

     }
     else{
       console.log("NOT OK")
     }
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
  // Remove token from local storage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};
