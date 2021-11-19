/**
 * Builds URL based on endpoint
 * @param {String} endpoint the endpoint for the URL
 * @param {String} successRedirect URL to redirect to on successful requests
 * @param {String} failureRedirect  URL to redirect to on failed requests
 */
const buildURI = (endpoint, successRedirect, failureRedirect = '/login') => {
  const uri = new URL(`http://localhost:9000/api/${endpoint}`);

  switch (endpoint) {
    case 'auth/login':
      uri.searchParams.append('successRedirect', successRedirect);
      uri.searchParams.append('failureRedirect', failureRedirect);
      break;
    default:
      break;
  }
  return uri;
};

export { buildURI };