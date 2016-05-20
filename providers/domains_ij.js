var _ = require('lodash');
var when = require('when');
var Provider = require('../provider');

module.exports = [

  Provider.extend({
    name: 'ifixit',
    type: 'rich',
    uri: "//www\\.ifixit\\.com/[^#?/]+/[^#?/]+/.+$",
    fetch: function(uri) {
      return this.fetchEmbed(uri, {
        api: 'http://www.ifixit.com/Embed'
      });
    }
  }),

  Provider.extend({
    name: 'imgur',
    type: 'rich',
    uri: "//imgur\\.com/gallery/(.+)$",
    script: '//s.imgur.com/min/embed.js',
    fetch: function(uri, parts) {
      return this.fetchGraph(uri).then(function(data) {
        if (data && data.photo_url) {
          data.photo_url = data.photo_url.replace(/\?fb$/, '');
        }
        if (parts && parts[1]) {
          data.id = parts[1];
        }
        return data;
      });
    },
    asEmbed: function(entry) {
      return '<blockquote class="imgur-embed-pub" lang="en" data-id="' + entry.data.id + '">'
        + '<a href="//imgur.com/' + entry.data.id + '">View post on imgur.com</a>'
        + '</blockquote>'
        + this.asScript();
    }
  }),

  Provider.extend({
    name: 'instagram',
    type: 'photo',
    uri: "//(instagram\\.com|instagr\\.am)/p/.+$",
    parse: 'instgrm.Embeds.process',
    fetch: function(uri) {
      return this.fetchEmbed(uri, {
        api: 'http://api.instagram.com/oembed'
      });
    }
  }),

  Provider.extend({
    name: 'justin.tv',
    type: "video",
    uri: "justin.tv/.+",
    fetch: function(uri) {
      return this.fetchEmbed(uri, {
        api: 'http://api.justin.tv/api/embed/from_url.json'
      });
    }
  })

];


