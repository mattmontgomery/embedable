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
