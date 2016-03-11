var _ = require('lodash');
var when = require('when');
var Provider = require('../provider');

module.exports = [

  Provider.extend({
    name: 'etsy',
    type: 'rich',
    uri: "//(?:www\\.)?etsy\\.com/listing/.+$",
    fetch: function(uri) {
      return this.fetchEmbed(uri, {
        api: 'http://openapi.etsy.com/svc/oembed/'
      });
    }
  }),

  Provider.extend({
    name: 'facebook',
    type: 'rich',
    uri: 'facebook\\.com',
    fetch: function(uri) {
      return this.fetchGraph(uri);
    },
    script: '//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.2',
    asEmbed: function(entry) {
      return '<div class="embed-wrap">'
        + '<div class="fb-post" data-href="'
        + entry.uri + '" data-width="100%"></div></div>'
        + this.asScript();
    }
  }),

  Provider.extend({
    name: 'flickr',
    type: "photo",
    uri: [
      "//[-\\w]+\\.flickr\\.com/photos/.+$",
      "//flic\\.kr\\.com/.+$"
    ],
    fetch: function(uri) {
      return this.fetchEmbed(uri, {
        api: "http://www.flickr.com/services/oembed/"
      });
    }
  }),

  Provider.extend({
    name: 'funnyordie',
    type: "video",
    uri: "//www\\.funnyordie\\.com/videos/.+$",
    fetch: function(uri) {
      return this.fetchEmbed(uri, {
        api: 'http://www.funnyordie.com/oembed.json'
      });
    }
  })

];
