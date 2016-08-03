var _ = require('lodash');
var when = require('when');
var Provider = require('../provider');

module.exports = [

  Provider.extend({
    name: '23hq',
    type: "photo",
    uri: "23hq.com/[-.\\w@]+/photo/.+",
    version: 0,
    fetch: function(uri) {
      return this.fetchEmbed(uri, {
        api: "http://www.23hq.com/23/oembed"
      });
    }
  }),

  Provider.extend({
    name: '500px',
    type: 'rich',
    uri: "//500px\\.com/photo/([^#?/]+)(?:.+)?$",
    version: 0,
    fetch: function(uri) {
      return this.fetchEmbed(uri, {
        api: 'http://500px.com/photo/{1}/oembed.json'
      });
    }
  }),

  Provider.extend({
    name: '5min',
    type: "video",
    uri: "//www\\.5min\\.com/video/.+$",
    version: 0,    
    fetch: function(uri) {
      return this.fetchEmbed(uri, {
        api: 'http://api.5min.com/oembed.json'
      });
    }
  })

];
