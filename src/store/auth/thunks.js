import { checkingCredentials, logout, login } from "./"
import {
  signInWithGoogle,
  registerEmailUser,
  loginUser,
  logoutUser
} from "../../firebase/providers";
import { clearNotesLogout } from "../journal";


const handleResponse = (dispatch, result) => {
  if (!result.ok) return dispatch(logout(result));
  return dispatch(login(result));
}

export const checkingAuthentication = (email, password) => {
  return async (dispatch) => {
    dispatch(checkingCredentials());
  }
}


export const startGoogleSignIn = () => {
  return async (dispatch) => {
    dispatch(checkingCredentials());
    const result = await signInWithGoogle();
    return handleResponse(dispatch, result);
  }
};

export const startCreatingEmailUser = ({email, password}) => {
  return async (dispatch)=> {
    dispatch(checkingCredentials());
    const result = await registerEmailUser({email, password, displayName});
    return handleResponse(dispatch, result);
  }
}

export const startLogIn = ({email, password}) => {
  return async (dispatch) => {
    dispatch(checkingCredentials());
    
    const result = await loginUser({email, password});
    return handleResponse(dispatch, result);
  }
}

export const startLogout = () => {
  return async (dispatch) => {
    await logoutUser();
    dispatch(clearNotesLogout());
    dispatch(logout());
  }
}