import axios from 'axios';

const BASE_URL = process.env.REACT_APP_VERCEL_URL
  ? `https://${process.env.REACT_APP_VERCEL_URL}/api`
  : 'http://localhost:9001/api';

export const getUserInfo = () => {
  const requestString = `http://localhost:9001/api/user`;
  return axios.get(requestString, { withCredentials: true }).catch((error) => ({
    type: 'USER_INFO_FAIL',
    error,
  }));
};

/**
 * Returns a sample API response to demonstrate a working backend
 * Returns GET_SAMPLE_FAIL upon failure
 */
export const getSampleResponse = () => {
  const requestString = `${BASE_URL}/home`;
  return axios
    .get(requestString, {
      headers: {
        'Content-Type': 'application/JSON',
      },
    })
    .catch((error) => ({
      type: 'GET_SAMPLE_FAIL',
      error,
    }));
};

/**
 * Executes a sample POST request
 * Returns POST_SAMPLE_FAIL upon failure
 */
export const addSampleResponse = (body) => {
  const requestString = `${BASE_URL}/home`;
  return axios
    .post(requestString, body, {
      headers: {
        'Content-Type': 'application/JSON',
      },
    })
    .catch((error) => ({
      type: 'POST_SAMPLE_FAIL',
      error,
    }));
};

<<<<<<< HEAD
export const addSession = (body) => {
  const postSession = `${BASE_URL}/session`;
  return axios
    .post(postSession, body, {
=======
//calling backend endpoint to edit user class in profile
export const editUserClasses = (body) => {
  const requestString = `${BASE_URL}/user/:userID`;
  return axios
    .put(requestString, body, {
>>>>>>> 84d947c3706983be4b32644adc043552834941f9
      headers: {
        'Content-Type': 'application/JSON',
      },
    })
    .catch((error) => ({
<<<<<<< HEAD
      type: 'POST_SESSION_FAIL',
=======
      type: 'PUT_CLASS_FAIL',
>>>>>>> 84d947c3706983be4b32644adc043552834941f9
      error,
    }));
};
