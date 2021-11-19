const axios = require('axios');

const environment = process.env.NODE_ENV || 'dev';
const SERVICE_URL =
  environment === 'production'
    ? 'https://members.h4i.app/api'
    : 'http://localhost:9000/api';

const getMemberInfo = (memberDbId) => {
  const requestString = `${SERVICE_URL}/members/${memberDbId}`;
  return axios
    .post(requestString, { secret: process.env.SESSION_SECRET })
    .catch((error) => ({
      type: 'MEMBER_INFO_FAIL',
      error,
    }));
};

module.exports = {
  getMemberInfo,
};
