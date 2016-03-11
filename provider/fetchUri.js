var when = require('when')
  , request = require('request');

module.exports = function(params) {
  return when.promise(function(resolve, reject) {
    request(params, function(error, data) {
      return error ? reject(error) : resolve(data);
    });
  });
};