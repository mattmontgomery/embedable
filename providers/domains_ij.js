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

  // NOTE: We have to include the script tag once for every embed. 
  //       If we don't do this, then only the first embed renders.
  Provider.extend({
    name: 'imgur',
    type: 'rich',
    uri: "//imgur\\.com/gallery/(.+)$",
    script: '//s.imgur.com/min/embed.js',
    fetch: function(uri, parts) {
      return when.all([
        this.fetchEmbed(uri, {
          api: 'http://api.imgur.com/oembed.json'
        }),
        this.fetchGraph(uri)
      ])
      .then(function(data) {
        data = _.extend({}, data[1], data[0]);

        if (data && data.photo_url) {
          data.photo_url = data.photo_url.replace(/\?fb$/, '');
        }
        if (parts && parts[1]) {
          data.id = parts[1];
        }
        return data;
      });
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


