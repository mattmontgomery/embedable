var _ = require('lodash');
var when = require('when');
var Provider = require('../provider');

module.exports = [

  Provider.extend({
    name: 'geograph',
    type: 'rich',
    uri: "//(?:[-\\w]+\\.)?geograph\\.(org|co|ie)(\\.uk)?/.+$",
    version: 0,
    fetch: function(uri) {
      return this.fetchEmbed(uri, {
        api: 'http://api.geograph.org.uk/api/oembed'
      });
    }
  }),

  Provider.extend({
    name: "giphy",
    type: "video",
    uri: "(giphy\.com|gph\.is)/.+",
    version: 1,
    fetch: function(uri) {
      return this.fetchGraph(uri).then(function(data) {
        var photo = data.photo_url
          , parts = photo && photo.match(/media\/([^\/]+)/)
          , id = parts && parts[1];

        data.embed_src = id
          ? ('//giphy.com/embed/' + id)
          : null;

        return data;
      });
    }
  }),

  Provider.extend({
    name: "github",
    type: "rich",
    uri: "gist.github.com/.+",
    version: 0,
    fetch: function(uri) {
      return this.fetchEmbed(uri, {
        api: "https://github.com/api/oembed"
      });
    }
  }),

  Provider.extend({
    name: "gmep",
    type: "rich",
    uri: "gmep.(imeducate\\.com|org)/.*",
    version: 0,
    fetch: function(uri) {
      return this.fetchEmbed(uri, {
        api: "http://gmep.org/oembed.json"
      });
    }
  }),

  Provider.extend({
    name: "graphiq",
    type: "rich",
    uri: /\/\/.+?graphiq.com\/(.+?)\/(.+)/,
    version: 0,
    fetch: function(uri) {
        console.log(uri);
      return this.fetchEmbed(uri, {
        api: "http://oembed.graphiq.com/services/oembed"
      });
    }
  }),

  Provider.extend({
    name: 'hlipp',
    type: 'rich',
    uri: [
      "//geo-en\\.hlipp\\.de/.+$",
      "//geo\\.hlipp\\.de/.+$",
      "//germany\\.geograph\\.org/.+$"
    ],
    version: 0,
    fetch: function(uri) {
      return this.fetchEmbed(uri, {
        api: 'http://geo.hlipp.de/restapi.php/api/oembed'
      });
    }
  }),

  Provider.extend({
    name: 'huffduffer',
    type: "rich",
    uri: "huffduffer.com/[-.\\w@]+/\\d+",
    version: 0,
    fetch: function(uri) {
      return this.fetchEmbed(uri, {
        api: "http://huffduffer.com/oembed"
      });
    }
  }),

  Provider.extend({
    name: 'hulu',
    type: "video",
    uri: "//www\\.hulu\\.com/watch/.+$",
    version: 0,
    fetch: function(uri) {
      return this.fetchEmbed(uri, {
        api: "http://www.hulu.com/api/oembed.json"
      });
    }
  })

];
