var _ = require('lodash');
var when = require('when');
var Provider = require('../provider');

module.exports = [

  Provider.extend({
    name: "urtak",
    type: "rich",
    uri: "urtak.com/(u|clr)/.+",
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
    fetch: function(uri) {
      return this.fetchEmbed(uri, {
        api: "http://www.vimeo.com/api/oembed.json"
      });
    }
  }),

  Provider.extend({
    name: 'vodpod',
    type: "video",
    uri: "vodpod.com/watch/.*",
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
    fetch: function(uri) {
      return this.fetchEmbed(uri, {
        api: "http://vzaar.com/api/videos/{1}.json",
      });
    }
  })

];
