var _ = require('lodash');
var when = require('when');
var Provider = require('../provider');

module.exports = [

  Provider.extend({
    name: "cacoo",
    type: "rich",
    uri: "cacoo.com/.+",
    version: 0,    
    fetch: function(uri) {
      return this.fetchEmbed(uri, {
        api: "http://cacoo.com/oembed.json"
      });
    }
  }),

  Provider.extend({
    name: 'chirbit',
    type: "rich",
    uri: "chirb.it/.+",
    version: 0,    
    fetch: function(uri) {
      return this.fetchEmbed(uri, {
        api: 'http://chirb.it/oembed.json'
      });
    }
  }),

  Provider.extend({
    name: 'circuitlab',
    type: "photo",
    uri: "//(?:www\\.)?circuitlab\\.com/circuit/.+$",
    version: 0,    
    fetch: function(uri) {
      return this.fetchEmbed(uri, {
        api: "https://www.circuitlab.com/circuit/oembed/"
      });
    }
  }),

  Provider.extend({
    name: 'clikthrough',
    type: "video",
    uri: "//(?:[-\\w]+\\.)?clikthrough\\.com/.+$",
    version: 0,    
    fetch: function(uri) {
      return this.fetchEmbed(uri, {
        api: "http://clikthrough.com/services/oembed"
      });
    }
  }),

  Provider.extend({
    name: 'collegehumor',
    type: "video",
    uri: "collegehumor\\.com/video/.+",
    version: 0,    
    fetch: function(uri) {
      return this.fetchEmbed(uri, {
        api: "http://www.collegehumor.com/oembed.json"
      });
    }
  }),

  Provider.extend({
    name: 'coub',
    type: "video",
    uri: "//coub\\.com/(view|embed)/.+$",
    version: 0,    
    fetch: function(uri) {
      return this.fetchEmbed(uri, {
        api: 'http://coub.com/api/oembed.json'
      });
    }
  }),

  Provider.extend({
    name: 'crowdranking',
    type: 'rich',
    uri: "//crowdranking\\.com/(crowdrankings|rankings|topics|widgets|r)/.+$",
    version: 0,    
    fetch: function(uri) {
      return this.fetchEmbed(uri, {
        api: 'http://crowdranking.com/api/oembed.json'
      });
    }
  }),

  Provider.extend({
    name: "dailymile",
    type: "rich",
    uri: "//(?:www\\.)?dailymile\\.com/people/[^#?/]+/entries/.+$",
    version: 0,    
    fetch: function(uri) {
      return this.fetchEmbed(uri, {
        api: "http://api.dailymile.com/oembed"
      });
    }
  }),

  Provider.extend({
    name: 'dailymotion',
    type: "video",
    uri: "//[-\\w]+\\.dailymotion\\.com/.+$",
    version: 0,    
    fetch: function(uri) {
      return this.fetchEmbed(uri, {
        api: 'http://www.dailymotion.com/api/oembed/'
      });
    }
  }),

  Provider.extend({
    name: 'deseretnews',
    type: 'rich',
    uri: "//(?:[-\\w]+\\.)?deseretnews\\.com/.+$",
    version: 0,
    fetch: function(uri) {
      return this.fetchEmbed(uri, {
        api: "https://www.deseretnews.com/services/oembed",
      });
    }
  }),

  Provider.extend({
    name: 'deseretnews-ask',
    type: 'rich',
    uri: "amazonaws\\.com/ask\\.deseretnews.com/(\\w+)\\.html$",
    version: 0,
    fetch: function(uri) {
      return this.fetchEmbed(uri, {
        api: "https://www.deseretnews.com/services/oembed",
      });
    }
  }),

  Provider.extend({
    name: 'deviantart',
    type: 'photo',
    uri: [
      "//(?:[-\\w]+\\.)?deviantart\\.com/art/.+$",
      "//(fav\\.me|sta\\.sh)fav\\.me/.+$",
      "//(?:[-\\w]+\\.)?deviantart\\.com/[^#?/]+#/d.+$"
    ],
    version: 0,    
    fetch: function(uri) {
      return this.fetchEmbed(uri, {
        api: "http://backend.deviantart.com/oembed",
      });
    }
  }),

  Provider.extend({
    name: 'dipdive',
    type: 'rich',
    uri: "//[-\\w]+\\.dipdive\\.com/media/.+$",
    version: 0,    
    fetch: function(uri) {
      return this.fetchEmbed(uri, {
        api: 'http://api.dipdive.com/oembed.json'
      });
    }
  }),

  Provider.extend({
    name: "dipity",
    type: "rich",
    uri: "dipity.com/(timeline|voaweb)/.+",
    version: 0,    
    fetch: function(uri) {
      return this.fetchEmbed(uri, {
        api: 'http://www.dipity.com/oembed/timeline/'
      });
    }
  }),

  Provider.extend({
    name: 'dotsub',
    type: "video",
    uri: "//dotsub\\.com/view/.+$",
    version: 0,    
    fetch: function(uri) {
      return this.fetchEmbed(uri, {
        api: "http://dotsub.com/services/oembed"
      });
    }
  })

];
