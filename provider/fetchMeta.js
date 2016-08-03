var parseHTML = require('./parseHTML')
  , fetchUri = require('./fetchUri');

/**
 * Fetch the HTML for a URI
 * 
 * @param  {[type]} uri [description]
 * @return {[type]}     [description]
 */
module.exports = function(uri) {
  return fetchUri(uri).then(function(data) {
    var meta;

    // If response is of type image
    if (data.type.indexOf('image') === 0) {
      return {
        type: 'photo',
        request: data.request,        
        photo_url: data.request,
        mime: data.type
      };
    }
    // If response is not of type text
    else if (data.type.indexOf('text') !== 0) {
      return {
        type: 'other',
        request: data.request,        
        mime: data.type,
        size: data.size
      };
    }
    // Parse HTML and extract metadata
    else {
      meta = parseHTML(uri, data.body);
      
      return {
        type: 'text',
        request: data.request,        
        title: meta.title,
        meta: meta.meta,
        icons: meta.icons
      };
    }
  });
};
