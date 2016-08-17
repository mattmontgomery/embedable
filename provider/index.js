var _ = require('lodash')
  , when = require('when')
  , request = require('request')
  , toTag = require('./toTag')
  , extend = require('./extend')
  , fetchUri = require('./fetchUri')
  , fetchMeta = require('./fetchMeta')
  , fetchGraph = require('./fetchGraph')
  , fetchEmbed = require('./fetchEmbed');

// -------------------------------------------------------------------
//        MAIN EXPORT
// -------------------------------------------------------------------

module.exports = Provider;

// -------------------------------------------------------------------
//        CONSTRUCTOR
// -------------------------------------------------------------------

function Provider() {
  var key, parts;

  // ensure there is a name
  if (!this.name) {
    throw new Error('Provider missing name');
  }
  // ensure there are uri
  if (!this.uri) {
    throw new Error('Provider missing uri: ', this.name);
  }
  // ensure name is lower case
  this.name = this.name.toLowerCase();

  // build the _as object
  this._as = {};

  for (key in this) {
    if ((parts = key.match(/^as(\w+)/))) {
      this._as[parts[1].toLowerCase()] = key;
    }
  }
}

Provider.extend = extend;

// -------------------------------------------------------------------
// URI WEIGHTS
//
//  10 = Begin   Protocols      High Priority
//  20 = Middle  Protocols      No Priority
//  30 = End     Protocols      Low Priority        (http://)
//
//  40 = Begin   Extensions     High Priority
//  50 = Middle  Extensions     No Priority         (png,gif,jpg)
//  60 = End     Extensions     Low Priority
//
//  70 = Begin   Domains        High Priority
//  80 = Middle  Domains        No Priority         (default weight)
//  90 = End     Domains        Low Priority
//
//  100 = Default              (when all else fails)
// -------------------------------------------------------------------

// -------------------------------------------------------------------
//        PROTOTYPE PROPERTIES
// -------------------------------------------------------------------

_.extend(Provider.prototype, {

  _as: null,            // {Object} Render methods

  name: null,           // {String} Provider name
  uri: null,            // {Array}  URL patterns
  weight: 80,           // {Number} URI weight (lower is first)
  version: 0,           // {Number} Version of code

  type: 'rich',         // {String} Default data type

  // Class attributes
  prefix: 'embed',      // {String} HTML Class prefix

  // Link attributes
  nofollow: 'true',     // {String} Don't follow links
  popup: 'true',        // {String} Popup window

  // Embed attributes
  tag: 'iframe',        // {String} Default embed tag type
  script: null,         // {String} Javascript to include
  parse: null,          // {String} Javascript library function to call to re-parse dynamic content

  constructor: Provider, // Set the constructor function
  toTag: toTag,         // Set the toTag function

  fetchUri: fetchUri,     // {Function} Fetch uri data
  fetchMeta: fetchMeta,   // {Function} Fetch meta data
  fetchEmbed: fetchEmbed, // {Function} Fetch oembed data
  fetchGraph: fetchGraph, // {Function} Fetch ograph data

  /**
   * Fetch data for a given URI
   *
   * @return {[type]} [description]
   */
  fetch: function(uri) {
    return this.fetchGraph(uri);
  },

  /**
   * Make a promise for a remote http request
   *
   * @param  {[type]} params [description]
   * @return {[type]}        [description]
   */
  request: function(params) {
    return when.promise(function(resolve, reject) {
      request(params, function(error, data) {
        return error ? reject(error) : resolve(data);
      });
    });
  },

  /**
   * Call specified render function
   *
   * opts = {
   *   as: 'link'
   * }
   *
   * @param  {[type]} entry [description]
   * @param  {[type]} opts  [description]
   * @return {[type]}       [description]
   */
  render: function(entry, opts) {
    var style = 'full'
      , out = ''
      , name;

    // if error & error handling enabled
    if (entry.error && opts.errors) {
      out = this.asError(entry, opts);
    }
    // if noembed flag && embeded type
    else if (opts.noembed && entry.data.embed_src) {
      out = '';
    }
    // if no as option, auto render
    else if (!opts.as) {
      out = this.asAuto(entry, opts);
    }
    // if as option, render it
    else if ((name = this._as[opts.as])) {
      out = this[name](entry, opts);
    }
    // wrap in block tag
    if (out && typeof out === 'string' && opts.block) {
      if (opts.as !== 'link') {
        style = opts.style;
      }
      out = '<div class="embed-block'
        + (style ? ' embed-' + style : '')
        + '">' + out + '</div>';
    }
    return out;
  },

  // -----------------------------------------------------------------
  //        RENDER-AS META METHODS
  // -----------------------------------------------------------------

  asAuto: function(entry, opts) {
    return this.asEmbed(entry, opts) || this.asRich(entry, opts);
  },

  asRich: function(entry, opts) {
    return this.asPhoto(entry, opts)
      + this.asTitle(entry, opts);
  },

  // -----------------------------------------------------------------
  //        RENDER-AS PRIMITIVES
  // -----------------------------------------------------------------

  asDebug: function(entry, opts) {
    return '<div class="embed-debug"><pre>'
      + JSON.stringify(entry, null, ' ') + '\n'
      + '-------------------------------------\n'
      + JSON.stringify(opts, null, ' ') + '\n'
      + '</pre></div>';
  },

  asError: function(entry) {
    var prefix = this.prefix;

    return '<div class="' + prefix + '-error">'
      + '<div class="' + prefix + '-label">Embed Error</div>'
      + '<div class="' + prefix + '-uri">' + entry.uri + '</div>'
      + '<div class="' + prefix + '-err">' + entry.error + '</div>'
      + '</div>';
  },

  asTitle: function(entry, opts) {
    var data = entry.data
      , title = opts.title || data.title || ''
      , credit = this.asCredit(entry, opts) || '';

    if (!credit && !title) {
      return '';
    }
    if (credit) {
      credit = 'via ' + credit;
    }
    return '<div class="'
      + this.prefix + '-title">'
      + title
      + ((title && credit) ? ' / ' : '')
      + credit
      + '</div>';
  },

  asCredit: function(entry, opts) {
    var data = entry.data
      , credit = opts.credit || data.site
      , link = opts.credit_url || data.site_url;

    if (!credit) {
      return '';
    }
    if (link) {
      credit = '<a href="' + link + '">' + credit + '</a>';
    }
    return '<span class="embed-credit">'
      + credit + '</span>';
  },

  /**
   * PRIMITIVE: Render link
   *
   * @param  {[type]} entry [description]
   * @return {[type]}      [description]
   */
  asLink: function(entry, opts) {
    var data = entry.data;

    return this.toTag('a', {
      'href': entry.uri,
    }, opts.title || data.title || entry.uri);
  },

  /**
   * PRIMITIVE: Render photo
   *
   * @param  {[type]} entry [description]
   * @return {[type]}      [description]
   */
  asPhoto: function(entry, opts) {
    var data = entry.data;

    if (!data.photo_url) {
      return '';
    }
    return this.toTag('img', {
      'src': data.photo_url,
      'alt': opts.title || data.title,
      'width': opts.width || '100%',
      'height': opts.height || 'auto',
      'class': 'embed-photo'
    });
  },

  /**
   * PRIMITIVE: Render embeded
   *
   * @param  {[type]} entry [description]
   * @param  {[type]} opts [description]
   * @return {[type]}      [description]
   */
  asEmbed: function(entry, opts) {
    var data = entry.data
      , out = ''
      , tag, title, width, height, ratio;

    // if embed_raw = true, then use embed_html instead
    if (data.embed_src && !data.embed_raw) {
      tag = data.embed_tag || this.tag;
      title = data.embed_title || data.title;

      width = parseInt(opts.width || data.embed_width, 10) || 0;
      height = parseInt(opts.height || data.embed_height, 10) || 0;

      ratio = (width && height)
        ? Math.round((height / width) * 100)
        : 50;

      out = '<div class="' + this.prefix + '-embed" style="'
        + 'padding-bottom: ' + ratio
        + '%;"><' + tag
        + ' frameborder="0"'
        + (title ? ' title="' + title + '"' : '')
        + ' src="' + data.embed_src
        + '" webkitallowfullscreen mozallowfullscreen allowfullscreen></'
        + tag + '>'
        + '</div>';
    }
    // render pre-defined html
    else if (data.embed_html) {
      out = '<div class="'
        + this.prefix + '-html">'
        + data.embed_html
        + '</div>';
    }
    // add javascript tag
    out += this.asScript(entry, opts);

    return out;
  },

  /**
   * PRIMITIVE: Render javascript tag
   *
   * - only add script to page once
   * - use opts to keep track of embedded scripts
   *
   * @param  {[type]} entry [description]
   * @param  {[type]} opts  [description]
   * @return {[type]}       [description]
   */
  asScript: function() {
    if (!this.script) {
      return '';
    }
    return '\n<script'
      + ' type="text/javascript"'
      + ' async defer src="'
      + this.script
      + '"></script>';
  }

});
