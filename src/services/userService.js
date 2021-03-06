import axios from 'axios';

/**
 * Searches for a username that is similar to the one supplied
 * @function searchUsers
 * @param {string} username The username to search for
 * @param {number} offset The number of documents to skip
 * @returns {array} Array of users that match the criteria
 */
export const searchUsers = async (username, offset = 0) => {
  try {
    const response = await axios.get(process.env.REACT_APP_BACKEND_URL + `/api/user/${username}/${offset}/search`);
    return response.data;
  } catch (err) {
    console.warn(err);
  }
};

/**
 * Verifies a user's email
 * @function verifyUser
 * @param {string} confirmationToken The token to verify an email
 */
export const confirmUser = async (confirmationToken) => {
  try {
    await axios.post(
      process.env.REACT_APP_BACKEND_URL + '/api/user/confirm',
      {
        token: confirmationToken,
      }
    );
  } catch (err) {
    throw new Error(err);
  }
};

/**
 * Uploads and changes a user's avatar
 * @function changeAvatar
 * @param {object} image The image to upload
 * @param {string} authToken A user's auth token
 * @returns {string} The new avatar url
 */
export const changeAvatar = async (image, authToken) => {
  const formData = new FormData();
  formData.append('image', image);
  try {
    const response = await axios.post(process.env.REACT_APP_BACKEND_URL + '/api/user/avatar', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        authorization: authToken,
      },
    });
    return response.data;
  } catch (err) {
    throw new Error(err.response.data.error);
  }
};

/**
 * Removes a user's current avatar
 * @function removeAvatar
 * @param {string} authToken A user's auth token
 */
export const removeAvatar = async (authToken) => {
  try {
    axios.delete(process.env.REACT_APP_BACKEND_URL + '/api/user/avatar', {
      headers: {
        authorization: authToken,
      },
    });
  } catch (err) {
    throw new Error(err.response.data.error);
  }
};

/**
 * Updates the specified fields on the user
 * @function updateProfile
 * @param {string} authToken A user's auth token
 * @param  {object} updates An object of the fields to update on the user model
 * @returns {object} Updated user object
 */
export const updateProfile = async (authToken, updates) => {
  try {
    const response = await axios.put(
      process.env.REACT_APP_BACKEND_URL + '/api/user',
      {
        ...updates,
      },
      {
        headers: {
          authorization: authToken,
        },
      }
    );
    return response.data;
  } catch (err) {
    throw new Error(err.response.data.error);
  }
};

/**
 * Updates the specified fields on the user
 * @function updateProfile
 * @param {string} authToken A user's auth token
 * @param  {object} atoken The accessToken from google
 * @returns {object} API response
 */
 export const applyCreatorConnect = async (authToken, atoken) => {
  try {
    const response = await axios.post(
      process.env.REACT_APP_BACKEND_URL + '/api/user/joinCreatorConnect',
      {
        atoken:atoken,
      },
      {
        headers: {
          authorization: authToken,
        },
      }
    );
    return response.data;
  } catch (err) {
    return err.response.data
  }
};

/**
 * Gets random suggested users for the user to follow
 * @function getSuggestedUsers
 * @param {string} authToken A user's auth token
 * @returns {array} Array of users
 */
export const getSuggestedUsers = async (authToken, max) => {
  try {
    const response = await axios.get(process.env.REACT_APP_BACKEND_URL + `/api/user/suggested/${max || ''}`, {
      headers: {
        authorization: authToken,
      },
    });
    return response.data;
  } catch (err) {
    throw new Error(err.response.data.error);
  }
};
