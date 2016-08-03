var _ = require('lodash');
var when = require('when');
var Provider = require('../provider');

module.exports = [

  Provider.extend({
    name: 'alpha-api',
    type: 'rich',
    uri: "//(alpha|photos)\\.app\\.net/[^#?/]+/(post/)*.+$",
    version: 0,    
    fetch: function(uri) {
      return this.fetchEmbed(uri, {
        api: 'https://alpha-api.app.net/oembed'
      });
    }
  }),

  Provider.extend({
    name: 'animoto',
    type: "video",
    uri: "animoto.com/play/.+",
    version: 0,    
    fetch: function(uri) {
      return this.fetchEmbed(uri, {
        api: "http://animoto.com/services/oembed"
      });
    }
  }),

  Provider.extend({
    name: 'audioboo',
    type: 'rich',
    uri: "//audioboo\\.fm/boos/.+$",
    version: 0,    
    fetch: function(uri) {
      return this.fetchEmbed(uri, {
        api: 'https://audioboo.fm/publishing/oembed.json'
      });
    }
  }),

  Provider.extend({
    name: 'bambuser',
    type: "video",
    uri: [
      "//bambuser\\.com/channel/[^#?/]+/broadcast/.+$",
      "//bambuser\\.com/channel/.+$",
      "//bambuser\\.com/v/.+$"
    ],
    version: 0,    
    fetch: function(uri) {
      return this.fetchEmbed(uri, {
        api: "http://api.bambuser.com/oembed.json"
      });
    }
  }),

  Provider.extend({
    name: 'blip',
    type: 'rich',
    uri: "//[-\\w]+\\.blip\\.tv/.+$",
    version: 0,    
    fetch: function(uri) {
      return this.fetchEmbed(uri, {
        api: "http://blip.tv/oembed/"
      });
    }
  })

];
