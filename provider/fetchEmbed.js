var _ = require('lodash')
  , fetchUri = require('./fetchUri');

var MAP_PARAMS = {
  type: 'type',
  description: 'description',
  version: 'version',
  title: 'title',
  html: 'embed_html',
  author_name: 'author',
  author_url: 'author_url',
  provider_name: 'provider',
  provider_url: 'provider_url',
  channel_name: 'channel',
  channel_url: 'channel_url',
  cache_age: 'cache_age',
  thumbnail_url: 'photo_url',
  thumbnail_width: 'photo_width',
  thumbnail_height: 'photo_height'
};

var MOVE_PARAMS = {
  rich: {
    url: 'embed_src',
    width: 'embed_width',
    height: 'embed_height'
  },
  video: {
    width: 'embed_width',
    height: 'embed_height'
  },
  photo: {
    url: 'photo_url',
    width: 'photo_width',
    height: 'photo_height'
  }
};

// -------------------------------------------------------------------
//        MAIN EXPORT
// -------------------------------------------------------------------

module.exports = function(uri, opts) {
  return fetchUri(toAPI(uri, opts)).then(function(data) {
    try {
      data = JSON.parse(unescape(data.body));
    }
    catch (err) {
      throw {
        type: 'oembed_error',
        request: data.request
      };
    }
    // console.log('GRAPH', JSON.stringify(data, null, ' '));

    data = _.extend(data, { uri: uri });
    data = parseHTML(data);
    data = mapParams(data);
    data = moveParams(data);

    return data;
  });
};

// -------------------------------------------------------------------
//        PRIVATE METHODS
// -------------------------------------------------------------------

function parseHTML(data) {
  var parts, attrs, val, x, l;

  if (!data.html || typeof data.html !== 'string') {
    return data;
  }
  if ((parts = data.html.match(/<(iframe|embed) ([^>]+)/i))) {
    data.embed_type = parts[1];
    attrs = parts[2];

    if ((attrs = attrs.split(/\b(\w+)=(('|")(.*?)\3|[^\s>]+)/))) {
      for (x = 1, l = attrs.length; x < l; x += 5) {
        val = attrs[x + 3] || attrs[x + 1];

        if (val === '""' || val === "''") {
          val = '';
        }
        data['embed_' + attrs[x]] = val;
      }
    }
  }
  return data;
}

function mapParams(data) {
  return _.reduce(data, function(out, val, key) {
    key = MAP_PARAMS[key] || key;
    out[key] = val;
    return out;
  }, {});
}

function moveParams(data) {
  var map = MOVE_PARAMS[data.type];

  _.each(map, function(to, from) {
    var val = data[from];

    if (val) {
      data[to] = val;
      delete data[from];
    }
    else if (data[to]) {
      delete data[to];
    }
  });
  return data;
}

function toAPI(uri, opts) {
  var api = opts.api;

  api += (api.indexOf('?') <= 0) ? "?" : "&";
  api += 'format=json';
  api += "&url=" + encodeURIComponent(uri);
  api += "&for=" + 'embedable';

  return api;
}
