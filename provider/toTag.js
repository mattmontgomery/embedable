var _ = require('lodash');

var SELF_CLOSING = {
  area: true,
  base: true,
  br: true,
  col: true,
  command: true,
  embed: true,
  hr: true,
  img: true,
  input: true,
  keygen: true,
  link: true,
  meta: true,
  param: true,
  source: true,
  track: true,
  wbr: true
};

// -------------------------------------------------------------------
//          EXPORT FUNCTION
// -------------------------------------------------------------------

module.exports = toTag;

// -------------------------------------------------------------------
//          RENDER AN HTML TAG
// -------------------------------------------------------------------

function toTag(tag, attrs, text) {
  var out = '<' + tag
    , key, val;

  if (typeof attrs === 'object') {
    for (key in attrs) {
      if ((val = attrs[key])) {
        if (key === 'style') {
          val = renderStyle(val);
        }
        if (val === true) {
          out += ' ' + key;
        }
        else {
          out += ' ' + key + '="' + val + '"';
        }
      }
    }
  }
  else {
    text = attrs;
  }
  if (SELF_CLOSING[tag]) {
    out += ' />';
  }
  else {
    out += '>';

    if (text) {
      out += text;
    }
    out += '</' + tag + '>';
  }
  return out;
}

/**
 * Render Style Object to HTML
 *
 * @param  {[type]} style [description]
 * @return {[type]}       [description]
 */
function renderStyle(style) {
  var type = typeof style
    , out = ''
    , key;

  if (type === 'string') {
    return style;
  }
  if (type === 'object') {
    for (key in style) {
      out += (out ? ' ' : '')
        + key + ': '
        + style[key] + ';';
    }
    return out;
  }
  return '';
}