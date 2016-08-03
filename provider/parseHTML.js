var $ = require('underscore.string')
  , htmlparser = require("htmlparser2")
  , url = require('url');

var ALIASES = {
  'og:image:url': 'og:image',
  'og:video:url': 'og:video',
  'og:audio:url': 'og:audio',
  'og:video:tag': 'og:tag'
};

module.exports = function(uri, html) {
  var tag = ''
    , title = ''
    , icons = {}
    , meta = {}
    , parser;

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

  parser = new htmlparser.Parser({
    onopentag: onOpenTag,
    ontext: onText,
    onclosetag: onCloseTag
  });

  parser.write(html);
  parser.end();

  return {
    title: title,
    meta: meta,
    icons: icons
  };
};
