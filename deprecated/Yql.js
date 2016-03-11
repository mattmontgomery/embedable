/*
 * YQL
 *   name: 'service-name',
 *   type: 'audio' | 'video' | 'photo' | 'rich',
 *   uris: ["regular-expression"],
 *
 *   api: 'http://service.com/path',
 *   xpath: "//meta|//title|//link",
 *   from: 'json' | 'html' | 'htmlstring',
 *
 * XPATH EXPRESSIONS
 *
 * "//meta[contains(@content, \\'EmbeddedPlayer\\')]"
 * "//meta|//title|//link"
 * "json"
 * "//a[@id=\\'gc_article_graphic_image\\']/img"
 * '//pre[@class="textmate-source"]'
 * '(//div[@class="primary"])[1]',
 * '//pre/font',
 *
 */

var _ = require('lodash')
  , Service = require('../Service');

module.exports = Service.extend({

  api: null,
  from: 'htmlstring',
  xpath: '/',

  constructor: function(opts) {
    this.super.constructor(opts);
  },

  fetch: function(uri) {
    var self = this;

    uri = this.toUri(uri);

    return this.request({
      uri: "https://query.yahooapis.com/v1/public/yql",
      qs: {
        q: this.toQuery(uri),
        format: 'json',
        env: 'store://datatables.org/alltableswithkeys'
      }
    });
  },

  toUri: function(uri) {
    if (!this.api) {
      return uri;
    }
    return this.api
      + '?format=' + (this.from === 'xml' ? 'xml' : 'json')
      + '&url=' + uri;
  },

  toQuery: function(uri) {
    return 'SELECT * FROM ' + this.from
      + ' WHERE url = "' + uri + '"'
      + ' and ' + (/html/.test(this.from) ? 'xpath' : 'itemPath')
      + ' = "' + this.xpath + '"'
      + (this.from === 'html' ? ' and compat = "html5"' : '');
  },

  render: function(uri, data) {

  }

});
