/*
 * TAG
 *   name: 'service-name',
 *   type: 'audio' | 'video' | 'photo' | 'rich',
 *   uris: ["regular-expression"],
 *
 *   api: 'http://service.com/path',
 *   regex: /.*shots\/([\d]+)./,
 *   tag: 'iframe' | 'img' | 'embed',
 *   width: 400,
 *   height: 300,
 *   nocache: 1,
 *   flashvars: "id=$1&type=3",
 *   apikey: true
 *   fullscreen:
 *
 * FLASHVARS
 *
 * "lang=en_US&amp;embedId=pt-embed-$1-693&amp;treeId=$1&amp;pearlId=$2&amp;treeTitle=Diagrams%2FVisualization&amp;site=www.pearltrees.com%2FF"
 * "prezi_id=$1&amp;lock_to_path=0&amp;color=ffffff&amp;autoplay=no&amp;autohide_ctrls=0"
 * "base=http://togo.ebay.com/togo/&lang=en-us&mode=normal&itemid=$2&query=$1"
 * "id=$1&type=3"
 * "key=$1"
 */
var _ = require('lodash')
  , randomstring = require('randomstring')
  , Service = require('../Service');

module.exports = Service.extend({

  api: null,
  regex: null,
  tag: null,
  width: 'auto',
  height: 'auto',
  nocache: false,
  flashvars: null,
  apikey: null,
  fullscreen: true,
  scriptaccess: 'always',
  scrolling: 'no',
  mimetype: 'application/x-shockwave-flash',

  /**
   * Constructor Function
   *
   * @param  {[type]} opts [description]
   * @return {[type]}      [description]
   */
  constructor: function(opts) {
    this.super.constructor(opts);

    if (!this.api || typeof this.api !== 'string') {
      throw new Error('Provider missing api: ' + this.name);
    }
    if (!this.regex) {
      throw new Error('Provider missing regex: ' + this.name);
    }
    if (this.tag !== 'iframe') {
      this.scrolling = null;
      this.frameborder = null;
      this.fullscreen = null;
      this.scriptaccess = null;
    }
    if (this.tag !== 'embed') {
      this.mimetype = null;
    }
    this.apikey = this.apikey
      && opts[this.name]
      && opts[this.name].key
      || null;
  },

  /**
   * Fetch data for the uri
   *
   * @param  {[type]} uri [description]
   * @return {[type]}     [description]
   */
  fetch: function() {
    return {};
  },

  /**
   * Render the HTML
   *
   * @param  {[type]} uri [description]
   * @return {[type]}     [description]
   */
  render: function(uri) {
    return toTag(this.tag || 'embed', {
      src: this.toSrc(uri),
      flashvars: this.toFlashvars(uri),
      width: this.width,
      height: this.height,
      type: this.mimetype,
      frameborder: this.frameborder,
      scrolling: this.scrolling,
      scriptaccess: this.scriptaccess
    }, {
      'max-width': this.opts.maxWidth,
      'max-height': this.opts.maxHeight
    });
  },

  /**
   * Get the flashvars
   * @return {[type]} [description]
   */
  toFlashvars: function(uri) {
    return this.flashvars
      ? uri.replace(this.regex, this.flashvars)
      : null;
  },

  /**
   * Generate HTML src attribute
   *
   * @param  {[type]} uri [description]
   * @return {[type]}     [description]
   */
  toSrc: function(uri) {
    uri = uri.replace(this.regex, this.api);

    if (!this.nocache) {
      uri += '&jqoemcache=' + randomstring.generate(5);
    }
    if (this.apikey) {
      uri = uri.replace('_APIKEY_', this.apikey);
    }
    return uri;
  }

});
