var _ = require('lodash');
var when = require('when');
var Provider = require('../provider');

module.exports = [

  Provider.extend({
    name: 'etsy',
    type: 'rich',
    uri: "//(?:www\\.)?etsy\\.com/listing/.+$",
    version: 0,
    fetch: function(uri) {
      return this.fetchEmbed(uri, {
        api: 'http://openapi.etsy.com/svc/oembed/'
      });
    }
  }),

  Provider.extend({
    name: 'facebook-video',
    type: 'rich',
    uri: 'facebook\\.com/(.+?)/videos/([0-9]+)$',
    weight: 79, // parse before facebook provider
    version: 1,
    fetch: function(uri) {
      return this.fetchGraph(uri);
    },
    script: '//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.7',
    asEmbed: function(entry) {
      return '<div class="fb-video" data-href="'
        + entry.uri + '" data-width="auto" data-show-text="false">'
        + '<div class="fb-xfbml-parse-ignore">'
        + '<blockquote cite="' + entry.uri + '">'
        + '<a href="' + entry.uri + '">View video on Facebook</a>'
        + '</blockquote></div></div>'
        + this.asScript();
    }
  }),

  Provider.extend({
    name: 'facebook',
    type: 'rich',
    uri: 'facebook\\.com',
    version: 1,
    fetch: function(uri) {
      return this.fetchGraph(uri);
    },
    script: '//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.7',
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
    version: 0,
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
    version: 0,
    fetch: function(uri) {
      return this.fetchEmbed(uri, {
        api: 'http://www.funnyordie.com/oembed.json'
      });
    }
  })

];
