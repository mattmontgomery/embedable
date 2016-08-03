var _ = require('lodash')
  , fetchMeta = require('./fetchMeta')
  , url = require('url');

// -------------------------------------------------------------------
//        MAIN EXPORT
// -------------------------------------------------------------------

module.exports = function(uri, opts) {
  return fetchMeta(uri).then(function(data) {
    var out = data;

    if (data.type === 'text') {
      out = extract(out, _.extend({
        type: 'meta/og/type',
        title: [
          'meta/title',
          'meta/og/title',
          'meta/twitter/title',
          'meta/sailthru/title',
          'title'
        ],
        description: [
          'meta/og/description',
          'meta/twitter/description',
          'meta/sailthru/description'
        ],
        author_url: null,
        author: [
          'meta/profile/first_name',
          'meta/article/author',
          'meta/sailthru/author'
        ],
        site_url: [
          'meta/og/website',
          'article/publisher'
        ],
        site: [
          'meta/og/site_name',
          'meta/twitter/site'
        ],
        photo_url: [
          'meta/og/image',
          'meta/og/image/url',
          'meta/og/image/secure_url',
          'meta/tbi-image',
          'meta/sailthru/image/full',
          'meta/sailthru/image/thumb',
          'meta/twitter/image',
          'icons/apple-touch-icon',
          'icons/icon',
          'icons/shortcut-icon'
        ],
        photo_type: 'meta/og/image/type',
        photo_width: 'meta/og/image/width',
        photo_height: 'meta/og/image/height',
        embed_src: [
          'meta/og/video',
          'meta/og/video/url',
          'meta/og/video/secure_url'
        ],
        embed_mime: 'meta/og/video/type',
        embed_html: null,
        embed_width: 'meta/og/video/width',
        embed_height: 'meta/og/video/height'
      }, opts));
    }
    out.request = data.request; 
    normalizeURL(out, 'photo_url');

    return out;
  });
};

// -------------------------------------------------------------------
//        PRIVATE METHODS
// -------------------------------------------------------------------

function normalizeURL(out, name) {
  var path = out[name];

  if (path) {
    out[name] = url.resolve(out.request, path);
  }
}

function extract(data, opts) {
  return _.mapValues(opts, function(path) {
    var val, i, l;

    if (!path) {
      return null;
    }
    if (!Array.isArray(path)) {
      return get(data, path);
    }
    for (i = 0, l = path.length; i < l; i++) {
      if ((val = get(data, path[i]))) {
        return val;
      }
    }
  });
}

function get(data, path) {
  var parts = path.split('/')
    , part;

  for (var i = 0, l = parts.length; i < l; i++) {
    if (!data || typeof data !== 'object') {
      return;
    }
    part = parts[i];
    data = data[part];

    if (Array.isArray(data)) {
      data = data[0];
    }
  }
  //return data;
  return (typeof data === 'string') && data;
}
