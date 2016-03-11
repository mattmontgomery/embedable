var _ = require('lodash');
var when = require('when');
var Provider = require('../provider');

module.exports = [

  Provider.extend({
    name: 'yandex',
    type: 'video',
    uri: "//video\\.yandex\\.ru/users/[^#?/]+/view/.+$",
    fetch: function(uri) {
      return this.fetchEmbed(uri, {
        api: 'http://video.yandex.ru/oembed.json'
      });
    }
  }),

  Provider.extend({
    name: 'yfrog',
    type: 'rich',
    uri: "//(?:www\\.)?yfrog\\.(us|com)/.+$",
    fetch: function(uri) {
      return this.fetchEmbed(uri, {
        api: 'http://www.yfrog.com/api/oembed'
      });
    }
  }),

  Provider.extend({
    name: 'youtube',
    type: 'video',
    uri: [
      "//youtu\\.be/.+$",
      "//(?:[-\\w]+\\.)?youtube\\.com/[^#?/]+#[^#?/]+/.+$",
      "//m\\.youtube\\.com/index.+$",
      "//(?:[-\\w]+\\.)?youtube\\.com/(profile|view_play_list|playlist|user|watch|v).+$",
    ],
    fetch: function(uri) {
      return this.fetchGraph(uri, {
        paid: 'meta/paid',
        channelId: 'meta/channelId',
        videoId: 'meta/videoId',
        duration: 'meta/duration',
        unlisted: 'meta/unlisted',
        playerType: 'meta/playerType',
        isFamilyFriendly: 'meta/isFamilyFriendly',
        interactionCount: 'meta/interactionCount',
        datePublished: 'meta/datePublished',
        genre: 'meta/genre'
      });
    }
  })

];
