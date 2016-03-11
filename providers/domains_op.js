var _ = require('lodash');
var when = require('when');
var Provider = require('../provider');

module.exports = [

  Provider.extend({
    name: 'official.fm',
    type: "rich",
    uri: "official.fm/.+",
    fetch: function(uri) {
      return this.fetchEmbed(uri, {
        api: 'http://official.fm/services/oembed.json'
      });
    }
  }),

  Provider.extend({
    name: 'photobucket',
    type: "photo",
    uri: "photobucket\\.com/(albums|groups)/.+$",
    fetch: function(uri) {
      return this.fetchEmbed(uri, {
        api: "https://photobucket.com/oembed"
      });
    }
  }),

  Provider.extend({
    name: 'pinterest',
    type: 'rich',
    uri: 'pinterest\\.com/pin/.+$',
    script: "//assets.pinterest.com/js/pinit.js",
    asEmbed: function(entry) {
      return '<div class="embed-wrap">'
        + '<a data-pin-do="embedPin"'
        + ' href="' + entry.uri + '">'
        + '</a></div>'
        + this.asScript();
    }
  }),

  Provider.extend({
    name: "polldaddy",
    type: "rich",
    uri: "polldaddy.com/",
    fetch: function(uri) {
      return this.fetchEmbed(uri, {
        api: 'http://polldaddy.com/oembed/'
      });
    }
  }),

  Provider.extend({
    name: 'polleverywhere',
    type: 'rich',
    uri: "//www\\.polleverywhere\\.com/(polls|multiple_choice_polls|free_text_polls)/.+$",
    fetch: function(uri) {
      return this.fetchEmbed(uri, {
        api: 'http://www.polleverywhere.com/services/oembed/'
      });
    }
  })

];