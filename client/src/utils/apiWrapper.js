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
 * Returns attending sessions of user
 * Returns GET_SAMPLE_FAIL upon failure
 */
export const getAttendingSessions = (userId) => {
  const requestString = `${BASE_URL}/session/attending/${userId}`;
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
 * Returns user by id
 * Returns GET_SAMPLE_FAIL upon failure
 */
export const getUserById = (userId) => {
  const requestString = `${BASE_URL}/user/${userId}`;
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

export const addSession = (body) => {
  const postSession = `${BASE_URL}/session`;
  return axios
    .post(postSession, body, {
      headers: {
        'Content-Type': 'application/JSON',
      },
    })
    .catch((error) => ({
      type: 'POST_SESSION_FAIL',
      error,
    }));
};

export const editSession = (body) => {
  const putSession = `${BASE_URL}/session`;
  return axios
    .put(putSession, body, {
      headers: {
        'Content-Type': 'application/JSON',
      },
    })
    .catch((error) => ({
      type: 'PUT_SESSION_FAIL',
      error,
    }));
};

// Calling backend endpoint to edit user class in profile
export const editUserClasses = (userId, body) => {
  const requestString = `${BASE_URL}/user/${userId}`;
  return axios
    .put(requestString, body, {
      headers: {
        'Content-Type': 'application/JSON',
      },
    })
    .catch((error) => ({
      type: 'PUT_CLASS_FAIL',
      error,
    }));
};
