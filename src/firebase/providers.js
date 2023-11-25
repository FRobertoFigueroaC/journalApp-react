import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile
} from 'firebase/auth'
import { firebaseAuth } from './config'

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: 'select_account'
});


const errorHandler = (error) => {
  const errorMessage = error.message;
  return {
    ok: false,
    error: errorMessage
  };
}

const handleResponse = (user) => {
  const { uid, email, displayName, photoURL } = user
  return {
    ok: true,
    uid, email, displayName, photoURL
  };
}


export const signInWithGoogle = async () => {
  try {

    const result = await signInWithPopup(firebaseAuth, googleProvider);
    // const credendials = GoogleAuthProvider.credentialFromResult(result);
    // const {accessToken, idToken} = credendials
    // return handleResponse(result.user);
    const { uid, email, displayName, photoURL } = result.user
    return {
      ok: true,
      uid, email, displayName, photoURL
    };
  } catch (error) {
    return errorHandler(error);
  }
}

export const registerEmailUser = async ({email, password, displayName}) => {
  try {
    // llegar a firebase
    const result = await createUserWithEmailAndPassword(firebaseAuth, email, password);
    return handleResponse(result.user);
  } catch (error) {
    return errorHandler(error)
  }

}

export const loginUser = async({email, password}) => {
  try {
    const result = await signInWithEmailAndPassword(firebaseAuth, email, password);
    return handleResponse(result.user);
  } catch (error) {
    return errorHandler(error);
  }
}

export const logoutUser = async () => {
  return await firebaseAuth.signOut();
}