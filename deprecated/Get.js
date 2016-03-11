/*
 * GET
 *   name: 'service-name',
 *   type: 'audio' | 'video' | 'photo' | 'rich',
 *   uris: ["regular-expression"],
 *
 *   api: 'http://service.com/path',
 *   regex: /pattern/,
 *   apikey: 'a2342342'
 */

var _ = require('lodash')
  , Service = require('../Service');

module.exports = Service.extend({

  api: null,
  regex: null,
  apikey: null,

  /**
   * Constructor Function
   *
   * @param  {[type]} opts [description]
   * @return {[type]}      [description]
   */
  constructor: function(opts) {
    this.super.constructor(opts);

    this.apikey = this.apikey
      && opts[this.name]
      && opts[this.name].key
      || '';

    if (!this.api || typeof this.api !== 'string') {
      throw new Error('Provider missing api: ' + this.name);
    }
    if (!this.regex) {
      throw new Error('Provider missing regex: ' + this.name);
    }
    if (typeof this.render !== 'function') {
      throw new Error('Provider missing render: ' + this.name);
    }
  },

  /**
   * Fetch Data
   *
   * @param  {[type]} uri [description]
   * @return {[type]}     [description]
   */
  fetch: function(uri) {
    if (!this.api) {
      return {};
    }
    api = this.api.replace('_APIKEY_', this.apikey);
    uri = uri.replace(this.regex, api);

    return this.request(uri).then(function(data) {
      return data.body;
    });
  }

});