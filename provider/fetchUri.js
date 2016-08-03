var _ = require('lodash')
  , when = require('when')
  , request = require('request');

// Define custom http headers
var HTTP_HEADERS = {
  'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
  'Accept-Language': 'en-US,en;q=0.8',
  'Cache-Control': 'max-age=0',
  'Upgrade-Insecure-Requests': 1,
  'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36'
};

// Increase limit to prevent memory leak errors
require('events').EventEmitter.prototype._maxListeners = 30;  

// Set up cookie jar
var jar = request.jar();

/**
 * Main Fetch Routing
 * 
 * @param  {[type]} params [description]
 * @return {[type]}        [description]
 */
module.exports = function(params) {
  return when.promise(function(resolve, reject) {
    if (typeof params === 'string') {
      params = { 
        uri: params 
      };
    }
    if (typeof params === 'object') {
      params = _.extend({
        method: 'GET',
        headers: HTTP_HEADERS,
        followAllRedirects: true,
        maxRedirects: 10,
        timeout: 10000,
        rejectUnauthorized: false,
        gzip: true,
        jar: jar,
      }, params);
    }
    request(params, function(error, response, body) {
      var href = toHref(response, params.uri)
        , type;

      // Handle request errors
      if (error) {
        return reject({
          type: 'request_error',
          request: href,
          code: error.code,
          message: error.toString()
        });
      } 
      // Returned status code
      if (response.statusCode !== 200) {
        return reject({
          type: 'response_error',
          request: href,
          code: response.statusCode
        });
      }
      // No type returned
      if (!(type = toType(response))) {
        return reject({
          type: 'response_type',
          request: href
        });
      }
      // No body returned
      if (!body) {
        return reject({
          type: 'response_body',
          request: href
        });
      }
      resolve({
        request: href,                
        response: response,
        body: body,
        type: type,
        size: toSize(response)
      });
    });
  });
};

function toHref(response, uri) {
  return response && response.request
    && response.request.href
    || uri || '';
}

function toType(response) {
  return response.headers 
    && response.headers['content-type'] 
    || '';
}
    
function toSize(response) {
  return parseInt(response.headers
    && response.headers['content-length'], 10)
    || 0;
}
