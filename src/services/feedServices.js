import axios from 'axios';

/**
 * Retrieves posts from user's feed
 * @function retrieveFeedPosts
 * @param {string} authToken A user's auth token
 * @param {number} offset The offset of posts to retrieve
 * @returns {array} Array of posts
 */
export const retrieveFeedPosts = async (authToken, offset = 0) => {
  try {
    const response = await axios.get(process.env.REACT_APP_BACKEND_URL + `/api/post/feed/${offset}`, {
      headers: {
        authorization: authToken,
      },
    });
    return response.data;
  } catch (err) {
    throw new Error(err.response.data);
  }
};
