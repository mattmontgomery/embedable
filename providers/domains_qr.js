var _ = require('lodash');
var when = require('when');
var Provider = require('../provider');

module.exports = [

  Provider.extend({
    name: 'qik',
    type: "video",
    uri: "//qik\\.(com|ly)/.+$",
    fetch: function(uri) {
      return this.fetchEmbed(uri, {
        api: 'http://qik.com/api/oembed.json'
      });
    }
  }),

  Provider.extend({
    name: 'rdio.com',
    type: "rich",
    uri: "rdio\\.com/(people|artist)/[^#?/]+/(playlists|album)/.+$",
    fetch: function(uri) {
      return this.fetchEmbed(uri, {
        api: "http://www.rdio.com/api/oembed/"
      });
    }
  }),

  Provider.extend({
    name: 'revision3',
    type: "video",
    uri: "//[-\\w]+\\.revision3\\.com/.+$",
    fetch: function(uri) {
      return this.fetchEmbed(uri, {
        api: "http://revision3.com/api/oembed/"
      });
    }
  }),

  Provider.extend({
    name: "roomsharejp",
    type: "rich",
    uri: "roomshare\\.jp/(en/)?post/.*",
    fetch: function(uri) {
      return this.fetchEmbed(uri, {
        api: "http://roomshare.jp/oembed.json"
      });
    }
  })

];
