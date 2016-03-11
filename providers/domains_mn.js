var _ = require('lodash');
var when = require('when');
var Provider = require('../provider');

module.exports = [

  Provider.extend({
    name: 'major-league-gaming',
    type: 'rich',
    uri: [
      "//mlg\\.tv/.+$",
      "//tv\\.majorleaguegaming\\.com/.+$"
    ],
    fetch: function(uri) {
      return this.fetchEmbed(uri, {
        api: 'http://tv.majorleaguegaming.com/oembed'
      });
    }
  }),

  Provider.extend({
    name: "meetup",
    type: "rich",
    uri: "meetup\\.(com|ps)/.+",
    fetch: function(uri) {
      return this.fetchEmbed(uri, {
        api: "http://api.meetup.com/oembed"
      });
    }
  }),

  Provider.extend({
    name: 'minoto-video',
    type: "video",
    uri: [
      "//api.minoto-video.com/publishers/.+/videos/.+",
      "//dashboard.minoto-video.com/main/video/details/.+",
      "//embed.minoto-video.com/.+"
    ],
    fetch: function(uri) {
      return this.fetchEmbed(uri, {
        api: "http://api.minoto-video.com/services/oembed.json"
      });
    }
  }),

  Provider.extend({
    name: 'mixcloud',
    type: "audio",
    uri: "//www\\.mixcloud\\.com/oembed/[^#?/]+/.+$",
    fetch: function(uri) {
      return this.fetchEmbed(uri, {
        api: 'http://www.mixcloud.com/oembed/'
      });
    }
  }),

  Provider.extend({
    name: 'mobypicture',
    type: "photo",
    uri: "(moby.to|mobypicture.com/user/.+/view/).+",
    fetch: function(uri) {
      return this.fetchEmbed(uri, {
        api: "http://api.mobypicture.com/oEmbed"
      });
    }
  }),

  Provider.extend({
    name: 'my-opera',
    type: 'rich',
    uri: "//my\\.opera\\.com/.+$",
    fetch: function(uri) {
      return this.fetchEmbed(uri, {
        api: 'http://my.opera.com/service/oembed'
      });
    }
  }),

  Provider.extend({
    name: 'nfb-ca',
    type: "video",
    uri: "//(?:[-\\w]+\\.)?nfb\\.ca/film/.+$",
    fetch: function(uri) {
      return this.fetchEmbed(uri, {
        api: 'http://www.nfb.ca/remote/services/oembed/'
      });
    }
  })

];
