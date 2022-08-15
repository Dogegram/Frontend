import axios from 'axios';

/**
 * Logs a user in with the provided credentials
 * @function login
 * @param {string} usernameOrEmail The username or email to login with
 * @param {string} password A password to log in with
 * @param {string} authToken A token to be used instead of a username/email or password
 * @returns {object} The user object
 */
export const login = async (usernameOrEmail, password, authToken, twofactorCode) => {
  try {
    const request =
      usernameOrEmail && password
        ? { data: { usernameOrEmail, password, twofactorCode } }
        : { headers: { authorization: authToken } };
    const response = await axios(process.env.REACT_APP_BACKEND_URL + '/api/auth/login', {
      method: 'POST',
      ...request,
    });
    return response.data;
  } catch (err) {
    throw new Error(err.response.data.error);
  }
};



/**
 * Registers a user with the provided credentials
 * @param {string} email A user's email address
 * @param {string} fullName A user's full name
 * @param {string} birthday A user's full name
 * @param {string} username A user's username
 * @param {string} password A user's password
 * @returns {object} The user object
 */
export const registerUser = async (email, fullName, birthday, username, password) => {
  console.log(password)
  try {
    const response = await axios.post(process.env.REACT_APP_BACKEND_URL + '/api/auth/register', {
      email,
      fullName,
      birthday,
      username,
      password
    });
    return response.data;
  } catch (err) {
    throw new Error(err.response.data.error);
  }
};

/**
 * Changes a users password
 * @function changePassword
 * @param {string} oldPassword The user's current password
 * @param {string} newPassword The new password
 * @param {string} authToken A user's auth token
 */
 export const changePassword = async (oldPassword, newPassword, authToken) => {
  try {
    await axios.put(
      process.env.REACT_APP_BACKEND_URL + '/api/auth/password',
      {
        oldPassword,
        newPassword,
      },
      {
        headers: {
          authorization: authToken,
        },
      }
    );
  } catch (err) {
    throw new Error(err.response.data.error);
  }
};

/**
 * Sends email to the user with link to reset password.
 * @function forgetPassword
 * @param {string} email The user's email address.
 */
 export const forgetPassword = async (email) => {
  try {
    const response = await axios.post(
      process.env.REACT_APP_BACKEND_URL + '/api/auth/forgetpassword',
      {
        email: email
      }
    );
    return response.data
  } catch (err) {
    throw new Error(err.response.data.message);
  }
};
