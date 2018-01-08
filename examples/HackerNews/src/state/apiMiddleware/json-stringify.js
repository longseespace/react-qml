// stringify a body object and add request headers
const stringify = next => req => {
  // only stringify POST, PUT, PATCH requests with body is an object
  if (req.method && req.method.match(/POST|PUT|PATCH/) && typeof req.json === 'object') {
    const body = JSON.stringify(req.json);
    const headers = {
      ...req.headers,
      'content-type': 'application/json',
    };
    return next({ ...req, body, headers });
  }

  return next(req);
};

export default stringify;
