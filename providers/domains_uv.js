var _ = require('lodash');
var when = require('when');
var Provider = require('../provider');

module.exports = [

  Provider.extend({
    name: "urtak",
    type: "rich",
    uri: "urtak.com/(u|clr)/.+",
    version: 0,
    fetch: function(uri) {
      return this.fetchEmbed(uri, {
        api: "http://oembed.urtak.com/1/oembed"
      });
    }
  }),

  Provider.extend({
    name: 'ustream',
    type: "video",
    uri: [
      "//(?:www\\.)?ustream\\.(tv|com)/.+$",
      "//ustre\\.am/.+$"
    ],
    version: 0,
    fetch: function(uri) {
      return this.fetchEmbed(uri, {
        api: "http://www.ustream.tv/oembed"
      });
    }
  }),

  Provider.extend({
    name: 'vhx',
    type: "video",
    uri: "vhx.tv/.+",
    version: 0,
    fetch: function(uri) {
      return this.fetchEmbed(uri, {
        api: "http://vhx.tv/services/oembed.json"
      });
    }
  }),

  Provider.extend({
    name: 'viddler',
    type: 'rich',
    uri: "viddler\\.com/(v|explore)/.+$",
    version: 0,
    fetch: function(uri) {
      return this.fetchEmbed(uri, {
        api: 'http://www.viddler.com/oembed/'
      });
    }
  }),

  Provider.extend({
    name: 'videojug',
    type: "video",
    uri: "videojug\\.com/(film|payer|interview).*",
    version: 0,
    fetch: function(uri) {
      return this.fetchEmbed(uri, {
        api: "http://www.videojug.com/oembed.json"
      });
    }
  }),

  Provider.extend({
    name: 'vimeo',
    type: "video",
    uri: "//(www|player|)\\.vimeo\\.com/.+$",
    version: 0,
    fetch: function(uri) {
      return this.fetchEmbed(uri, {
        api: "http://www.vimeo.com/api/oembed.json"
      });
    }
  }),

  Provider.extend({
    name: 'vine',
    type: "rich",
    uri: /vine\.co\/v\/([^\/]+)/,
    script: '//platform.vine.co/static/scripts/embed.js',
    version: 0,
    fetch: function(uri) {
      return this.fetchEmbed(uri, {
        api: "https://vine.co/oembed.json"
      });
    }
  }),

  Provider.extend({
    name: 'vodpod',
    type: "video",
    uri: "vodpod.com/watch/.*",
    version: 0,
    fetch: function(uri) {
      return this.fetchEmbed(uri, {
        api: "http://vodpod.com/oembed.js"
      });
    }
  }),

  Provider.extend({
    name: 'vzaar',
    type: "video",
    uri: [
      "//(?:www\\.)?vzaar\\.com/videos/([^#?/]+)(?:.+)?$",
      "//www\\.vzaar\\.tv/([^#?/]+)(?:.+)?$",
      "//vzaar\\.tv/([^#?/]+)(?:.+)?$",
      "//vzaar\\.me/([^#?/]+)(?:.+)?$",
      "//[-\\w]+\\.vzaar\\.me/([^#?/]+)(?:.+)?$"
    ],
    version: 0,
    fetch: function(uri) {
      return this.fetchEmbed(uri, {
        api: "http://vzaar.com/api/videos/{1}.json",
      });
    }
  })

];
