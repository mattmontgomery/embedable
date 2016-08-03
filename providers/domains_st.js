var _ = require('lodash');
var when = require('when');
var Provider = require('../provider');

module.exports = [

  Provider.extend({
    name: 'sapo',
    type: "video",
    uri: "videos\\.sapo\\.pt/.*",
    version: 0,
    fetch: function(uri) {
      return this.fetchEmbed(uri, {
        api: "http://videos.sapo.pt/oembed"
      });
    }
  }),

  Provider.extend({
    name: "screenr",
    type: "rich",
    uri: "//www\\.screenr\\.com/.+$",
    version: 0,
    fetch: function(uri) {
      return this.fetchEmbed(uri, {
        api: "http://www.screenr.com/api/oembed.json"
      });
    }
  }),

  Provider.extend({
    name: "scribd",
    type: "rich",
    uri: "//[-\\w]+\\.scribd\\.com/.+$",
    version: 0,
    fetch: function(uri) {
      return this.fetchEmbed(uri, {
        api: 'http://www.scribd.com/services/oembed'
      });
    }
  }),

  Provider.extend({
    name: 'shoudio',
    type: "rich",
    uri: "(shoudio\\.com|shoul\\.io)/.+",
    version: 0,
    fetch: function(uri) {
      return this.fetchEmbed(uri, {
        api: "http://shoudio.com/api/oembed"
      });
    }
  }),

  Provider.extend({
    name: "sketchfab",
    type: "rich",
    uri: "sketchfab.com/show/.+",
    version: 0,
    fetch: function(uri) {
      return this.fetchEmbed(uri, {
        api: 'http://sketchfab.com/oembed'
      });
    }
  }),

  Provider.extend({
    name: 'skitch',
    type: "photo",
    uri: "//(?:www\\.)?skitch\\.(com|ch)/.+$",
    version: 0,
    fetch: function(uri) {
      return this.fetchEmbed(uri, {
        api: 'http://skitch.com/oembed'
      });
    }
  }),

  Provider.extend({
    name: "slideshare",
    type: "rich",
    uri: "//www\\.slideshare\\.net/.+$",
    version: 0,
    fetch: function(uri) {
      return this.fetchEmbed(uri, {
        api: "http://www.slideshare.net/api/oembed/2"
      });
    }
  }),

  Provider.extend({
    name: 'smugmug',
    type: "photo",
    uri: "smugmug.com/[-.\\w@]+/.+",
    version: 0,
    fetch: function(uri) {
      return this.fetchEmbed(uri, {
        api: "http://api.smugmug.com/services/oembed/"
      });
    }
  }),

  Provider.extend({
    name: 'speakerdeck',
    type: 'rich',
    uri: "//speakerdeck\\.com/.+$",
    version: 0,
    fetch: function(uri) {
      return this.fetchEmbed(uri, {
        api: 'https://speakerdeck.com/oembed.json'
      });
    }
  }),

  Provider.extend({
    name: 'soundcloud',
    type: "rich",
    uri: [
      "//soundcloud\\.com/[^#?/]+/.+$",
      "//snd.sc/.+"
    ],
    version: 0,
    fetch: function(uri) {
      return this.fetchEmbed(uri, {
        api: "http://soundcloud.com/oembed"
      });
    }
  }),

  Provider.extend({
    name: 'spotify',
    type: "rich",
    uri: [
      "//open\\.spotify\\.com/(track|album|user).+$",
      "//spoti\\.fi/.+$"
    ],
    version: 0,
    fetch: function(uri) {
      return this.fetchEmbed(uri, {
        api: "https://embed.spotify.com/oembed/"
      });
    }
  }),

  Provider.extend({
    name: 'surveymonkey',
    type: "rich",
    uri: '//www.surveymonkey.com/r/(.+?)$',
    version: 0,
    fetch: function(uri, params) {
      return {
        id: params[1]
      };
    },
    asEmbed: function(entry) {
      return '<iframe src="' + entry.uri + '" width="100%" height="500" style="border: 1px solid #ddd;"></iframe>';
    }
  }),

  Provider.extend({
    name: 'ted',
    type: 'video',
    uri: [
      "//(?:www\\.)?ted\\.com/talks/.+$",
      "//(?:www\\.)?ted\\.com/talks/lang/[^#?/]+/.+$",
      "//(?:www\\.)?ted\\.com/index\\.php/talks/.+$",
      "//(?:www\\.)?ted\\.com/index\\.php/talks/lang/[^#?/]+/.+$"
    ],
    version: 0,
    fetch: function(uri) {
      return this.fetchEmbed(uri, {
        api: 'http://www.ted.com/talks/oembed.json'
      });
    }
  }),

  Provider.extend({
    name: 'tout',
    type: 'video',
    uri: "//player\\.tout\\.com/embeds/([^.]+)\\.js\\?(.+)$",
    version: 0,
    fetch: function(uri, params) {
      return _.reduce(params[2].split('&'), function(out, part) {
        var vals = part.split('=');
        out[vals[0]] = vals[1];
        return out;
      }, { id: params[1] });
    },
    asEmbed: function(entry) {
      return '<div id="tout-' + entry.data.id + '-target">'
        + '</div><script src="' + entry.uri + '"></script>';
    }
  }),

  Provider.extend({
    name: 'tumblr',
    type: 'rich',
    uri: "tumblr.com/post/(.+)$",
    script: '//secure.assets.tumblr.com/post.js',
    version: 0,
    fetch: function(uri, parts) {
      return when.all([
        this.fetchGraph(uri),
        this.fetchEmbed(uri, {
          api: 'https://www.tumblr.com/oembed/1.0'
        })
      ])
      .then(function(data) {
        var out = _.omit(_.extend(data[0], data[1]), [
          'embed_src', 'embed_width'
        ]);

        if (out.embed_html) {
          out.embed_html = out.embed_html.replace(/<script.*?<\/script>/, '');
        }
        return out;
      });
    }
  }),

  Provider.extend({
    name: "twitter",
    type: "rich",
    uri: "//twitter\\.com/(?:#!)?[^#?/]+/status/.+$",
    script: '//platform.twitter.com/widgets.js',
    parse: 'twttr.widgets.load',
    version: 0,
    fetch: function(uri) {
      return when.all([
        this.fetchGraph(uri),
        this.fetchEmbed(uri, {
          api: "https://api.twitter.com/1/statuses/oembed.json"
        })
      ]).then(function(data) {
        var out = _.omit(_.extend(data[0], data[1]), [
          'embed_src', 'embed_width'
        ]);

        if (out.embed_html) {
          out.embed_html = out.embed_html.replace(/<script.*?<\/script>/, '');
        }
        return out;
      });
    }
  })

];
