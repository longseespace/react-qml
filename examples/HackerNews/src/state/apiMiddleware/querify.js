import qs from 'query-string';
import url from 'url';

// transform query string
const querify = next => async req => {
  if (typeof req.query === 'object') {
    const { query, ...others } = url.parse(req.endpoint);
    const existingQuery = qs.parse(query);
    const finalQuery = {
      ...existingQuery,
      ...req.query,
    };
    const finalQueryString = qs.stringify(finalQuery);
    const finalUrlObject = {
      ...others,
      query: finalQueryString,
      search: `?${finalQueryString}`,
    };
    const endpoint = url.format(finalUrlObject);
    return next({ ...req, endpoint });
  }

  return next(req);
};

export default querify;
