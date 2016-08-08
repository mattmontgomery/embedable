var _ = require('lodash');
var when = require('when');
var Provider = require('../provider');

module.exports = [

  Provider.extend({
    name: 'qik',
    type: "video",
    uri: "//qik\\.(com|ly)/.+$",
    version: 0,
    fetch: function(uri) {
      return this.fetchEmbed(uri, {
        api: 'http://qik.com/api/oembed.json'
      });
    }
  }),

  Provider.extend({
     name: 'qzzr',
     type: 'rich',
     uri: /qzzr.com\/c\/quiz\/(.+?)\/(.+)/,
     script: '//dcc4iyjchzom0.cloudfront.net/widget/loader.js',
     version: 0,
     fetch: function(uri, values)  {
         return this.fetchGraph(uri).then(function(data) {
            return data;
         });
     },
     asEmbed: function(entry) {
         var data = entry.data;
         return '<div class="quizz-container" data-width="100%"" data-height="auto" data-quiz="253072"></div>'
           + this.asScript();
     }
  }),

  Provider.extend({
    name: 'redditPost',
    type: 'rich',
    uri: /reddit.com\/r\/(.+?)\/comments\/(.+?)\/(.+?)\/$/i,
    script: '//embed.redditmedia.com/widgets/platform.js',
    version: 1,
    fetch: function(uri, values) {
      return this.fetchGraph(uri).then(function(data) {
        data.post_sub = values[1];
        data.post_hash = values[2];
        data.post_slug = values[3];
        data.post_time = Math.floor(new Date() / 1000);
        data.title = data.title.replace(/\s*•.*/, '');

        return data;
      });
    },
    asEmbed: function(entry) {
      var data = entry.data;

      return '<blockquote class="reddit-card" data-card-created="' + data.post_time + '">'
        + '<a href="' + entry.uri + '?ref=share&ref_source=embed">' + data.title  + '</a>'
        + ' from <a href="https://www.reddit.com/r/' + data.post_sub + '">'
        + data.post_sub + '</a></blockquote>'
        + this.asScript();
    }
  }),

  Provider.extend({
    name: 'redditComment',
    type: 'rich',
    uri: /reddit.com\/r\/(.+?)\/comments\/(.+?)\/(.+?)\/(.+?)$/i,
    script: '//www.redditstatic.com/comment-embed.js',
    version: 1,
    fetch: function(uri, values) {
      return this.fetchGraph(uri).then(function(data) {
        data.post_sub = values[1];
        data.post_hash = values[2];
        data.post_slug = values[3];
        data.comment_hash = values[4];
        data.post_time = Math.floor(new Date() / 1000);
        data.title = data.title.replace(/\s*•.*/, '');

        return data;
      });
    },
    asEmbed: function(entry) {
      var data = entry.data;
      var time = new Date(data.post_time * 1000);

      return '<div class="reddit-embed" '
        + 'data-embed-media="www.redditmedia.com" '
        + 'data-embed-parent="false" data-embed-live="false" '
        + 'data-embed-created="' + time.toISOString() + '">'
        + '<a href="' + entry.uri + '">Comment</a> '
        + 'from discussion '
        + '<a href="https://www.reddit.com/r/'
        + data.post_sub + '/comments/'
        + data.post_hash + '/'
        + data.post_slug + '/">'
        + data.title + '</a>.</div>'
        + this.asScript();
    }
  }),

  Provider.extend({
    name: 'rdio.com',
    type: "rich",
    uri: "rdio\\.com/(people|artist)/[^#?/]+/(playlists|album)/.+$",
    version: 0,
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
    version: 0,
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
    version: 0,
    fetch: function(uri) {
      return this.fetchEmbed(uri, {
        api: "http://roomshare.jp/oembed.json"
      });
    }
  })

];
