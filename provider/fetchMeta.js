var _ = require('lodash')
  , $ = require('underscore.string')
  , htmlparser = require("htmlparser2")
  , request = require('request')
  , when = require('when')
  , url = require('url');

var HTTP_HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_2) '
    + 'AppleWebKit/537.36 (KHTML, like Gecko) '
    + 'Chrome/41.0.2272.76 Safari/537.36',
  'Accept-Language': 'en-US'
};

var ALIASES = {
  'og:image:url': 'og:image',
  'og:video:url': 'og:video',
  'og:audio:url': 'og:audio',
  'og:video:tag': 'og:tag'
};

module.exports = function(uri) {
  var tag = ''
    , title = ''
    , icons = {}
    , meta = {}
    , retry = false;

  var parser = new htmlparser.Parser({
    onopentag: onOpenTag,
    ontext: onText,
    onclosetag: onCloseTag
  });

  // -----------------------------------------------------------------
  //        MAIN-BEGIN-END
  // -----------------------------------------------------------------

  return when.promise(requestData);

  // -----------------------------------------------------------------
  //        PRIVATE METHODS
  // -----------------------------------------------------------------

  function requestData(resolve, reject) {
    request({
      uri: uri,
      method: 'GET',
      headers: HTTP_HEADERS,
      maxRedirects: 3,
      timeout: 5000,
      rejectUnauthorized: false
    }, function(err, response, body) {
      var type;

      // Handle request errors
      if (err) {
        if (err.code === 'ETIMEDOUT' && !retry) {
          retry = true;
          requestData(resolve, reject);
        }
        else {
          reject(err);
        }
      }
      // Handle status errors
      else if (response.statusCode !== 200) {
        console.log("STATUS_CODE", response.statusCode, uri);
        reject(response.statusCode);
      }
      // Get the content type
      else if (!(type = toType(response))) {
        reject(new Error('Response has no content-type'));
      }
      // Handle image types
      else if (type.indexOf('image') === 0) {
        resolve({
          uri: uri,
          mime: type,
          type: 'photo'
        });
      }
      // Handle non-text types
      else if (type.indexOf('text') !== 0) {
        resolve({
          uri: uri,
          type: 'other',
          mime: type,
          size: toSize(response)
        });
      }
      // Handle text/html type
      else if (body) {
        parser.write(body);
        parser.end();

        resolve({
          uri: uri,
          type: 'text',
          title: title,
          meta: meta,
          icons: icons
        });
      }
      // Handle body errors
      else {
        reject('URI returned no body');
      }
    });
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

  function onOpenTag(name, attrs) {
    tag = name;

    if (name === 'meta') {
      toMeta(attrs);
    }
    else if (name === 'link' && attrs.rel && attrs.href) {
      toIcon(attrs);
    }
  }

  function onText(text) {
    if (tag === 'title') {
      title = text;
    }
  }

  function onCloseTag() {
    tag = '';
  }

  function toMeta(attrs) {
    var name = attrs.name || attrs.property || attrs.itemprop
      , value = $.unescapeHTML(attrs.content);

    if (name && value) {
      if (ALIASES[name]) {
        name = ALIASES[name];
      }
      setMeta(meta, name, value);
    }
  }

  function setMeta(obj, name, value) {
    var parts = name.split(/[:.]/)
      , key = parts.pop()
      , val, tmp, i;

    for (i = 0; i < parts.length; i++) {
      val = parts[i];
      tmp = obj[val];

      if (!tmp) {
        obj[val] = tmp = {};
      }
      else if (typeof tmp === 'string') {
        tmp = { url: tmp };
        obj[val] = [tmp];
      }
      else if (Array.isArray(tmp)) {
        tmp = tmp[tmp.length - 1];
      }
      obj = tmp;
    }
    if (!(tmp = obj[key])) {
      obj[key] = value;
    }
    else if (!Array.isArray(tmp)) {
      obj[key] = [tmp, value];
    }
    else if (typeof tmp[0] === 'object') {
      tmp.push({ url: value });
    }
    else {
      obj[key].push(value);
    }
  }

  function toIcon(attrs) {
    var name = attrs.rel.replace(' ', '-')
      , value = $.unescapeHTML(attrs.href || '');

    if (attrs.sizes) {
      name += '-' + attrs.sizes;
    }
    if (/icon/.test(name) && value) {
      icons[name] = url.resolve(uri, value);
    }
  }
};
