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
    name: 'reddit',
    type: 'rich',
    uri: "reddit.com/r",
    script: '//embed.redditmedia.com/widgets/platform.js',
    fetch: function(uri, parts) {
      return this.fetchGraph(uri).then(function(data) {
        var title = data.title || '';
        var parts = title.match(/^(.*)? • (.*)$/);

        if (parts) {
          data.title = parts[1];
          data.sub_path = parts[2];
          data.sub_title = parts[2].replace(/^\/r\//, '');
        }
        data.card_time = Math.floor(new Date() / 1000);

        return data;
      });
    },
    asEmbed: function(entry) {
      var data = entry.data;

      return '<blockquote class="reddit-card" data-card-created="' + data.card_time + '">'
        + '<a href="' + entry.uri + '?ref=share&ref_source=embed">' + data.title  + '</a>'
        + ' from <a href="http://www.reddit.com' + data.sub_path + '">' 
        + data.sub_title + '</a></blockquote>'
        + this.asScript();
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
