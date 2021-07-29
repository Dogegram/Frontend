import userTypes from './userTypes';

import { disconnectSocket } from '../socket/socketActions';
import { bookmarkPost as bookmark } from '../../services/postService';
import {
  registerUser,
  login,
  forgetPassword
} from '../../services/authenticationServices';
import {
  changeAvatar,
  removeAvatar,
  updateProfile,
} from '../../services/userService';

export const signOut = () => (dispatch) => {
  localStorage.removeItem('token');
  dispatch(disconnectSocket());
  dispatch({ type: userTypes.SIGN_OUT });
};

export const signInSuccess = (user) => {
  localStorage.setItem('token', user.token);
  return {
    type: userTypes.SIGN_IN_SUCCESS,
    payload: user,
  };
};

export const signInFailure = (err) => ({
  type: userTypes.SIGN_IN_FAILURE,
  payload: err,
});

export const signInStart = (usernameOrEmail, password, authToken) => async (
  dispatch
) => {
  try {
    dispatch({ type: userTypes.SIGN_IN_START });
    const response = await login(usernameOrEmail, password, authToken);
    dispatch(signInSuccess(response));
  } catch (err) {
    console.log(err)
    if(err.message === 'Not authorized.'){
      dispatch(signOut())
      window.location.reload();

     /* console.log("this?")
      localStorage.removeItem('token');
      dispatch({ type: userTypes.SIGN_OUT });
*/
    }
    if (authToken) dispatch(signOut());
    dispatch(signInFailure(err.message));
  }
};


export const signUpStart = (userdata) => async (
  dispatch
) => {
 const {email, fullName, pronoun, birthday, username, password} = userdata;
  try {
    console.log(password);
    dispatch({ type: userTypes.SIGN_UP_START });
    const response = await registerUser(email, fullName,pronoun, birthday, username, password);
    dispatch(signInStart(null, null, response.token));
  } catch (err) {
    dispatch({ type: userTypes.SIGN_UP_FAILURE, payload: err.message });
  }
};

export const passwordResetStart = (email) => async (
  dispatch
) => {
  try {
   await forgetPassword(email);
  } catch (err) {
    dispatch({ type: userTypes.SIGN_UP_FAILURE, payload: err.message });
  }
};

export const bookmarkPost = (postId, authToken) => async (dispatch) => {
  try {
    const response = await bookmark(postId, authToken);
    dispatch({
      type: userTypes.BOOKMARK_POST,
      payload: { ...response, postId },
    });
  } catch (err) {
    return err;
  }
};

export const changeAvatarStart = (formData, authToken) => async (dispatch) => {
  try {
    dispatch({ type: userTypes.CHANGE_AVATAR_START });
    const response = await changeAvatar(formData, authToken);
    dispatch({
      type: userTypes.CHANGE_AVATAR_SUCCESS,
      payload: response.avatar,
    });
  } catch (err) {
    dispatch({
      type: userTypes.CHANGE_AVATAR_FAILURE,
      payload: err.message,
    });
  }
};

export const removeAvatarStart = (authToken) => async (dispatch) => {
  try {
    dispatch({ type: userTypes.REMOVE_AVATAR_START });
    await removeAvatar(authToken);
    dispatch({ type: userTypes.REMOVE_AVATAR_SUCCESS });
  } catch (err) {
    dispatch({ type: userTypes.REMOVE_AVATAR_FAILURE, payload: err.message });
  }
};

export const updateProfileStart = (authToken, updates) => async (dispatch) => {
  try {
    dispatch({ type: userTypes.UPDATE_PROFILE_START });
    const response = await updateProfile(authToken, updates);
    dispatch({ type: userTypes.UPDATE_PROFILE_SUCCESS, payload: response });
  } catch (err) {
    dispatch({ type: userTypes.UPDATE_PROFILE_FAILURE, payload: err.message });
  }
};
