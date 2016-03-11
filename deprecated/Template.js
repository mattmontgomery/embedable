/*
 * TAG
 *   name: 'service-name',
 *   type: 'audio' | 'video' | 'photo' | 'rich',
 *   uris: ["regular-expression"],
 *
 *   regex: /.*shots\/([\d]+)./,
 *   template: function(data) {} | 'string'
 */
var Service = require('../Service');

module.exports = Service.extend({

  regex: null,
  template: null,

  /**
   * Constructor Function
   *
   * @param  {[type]} opts [description]
   * @return {[type]}      [description]
   */
  constructor: function(opts) {
    this.super.constructor(opts);

    if (!this.regex) {
      throw new Error('Provider missing regex: ' + this.name);
    }
    if (!this.template) {
      throw new Error('Provider missing regex: ' + this.name);
    }
  },

  /**
   * Render the HTML
   *
   * @param  {[type]} uri [description]
   * @return {[type]}     [description]
   */
  render: function(uri) {
    return uri.replace(this.regex, this.template);
  }

});
