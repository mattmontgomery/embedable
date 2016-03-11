var Get = require('../services/Get')
  , Yql = require('../services/Yql')
  , Tag = require('../services/Tag')
  , Oembed = require('../services/Oembed');

module.exports = [

  Yql.extend({
    name: 'visual.ly',
    type: "rich",
    uris: ["visual\\.ly/.+"],
    xpath: "//a[@id=\\'gc_article_graphic_image\\']/img"
  }),

  Tag.extend({
    name: 'achewood',
    type: "photo",
    uris: ["achewood\\.com\\/index.php\\?date=.+"],
    api: "http://www.achewood.com/comic.php?date=$1",
    regex: /.*achewood\.com\/index.php\?date=(\w+).*/,
    tag: 'iframe',
    width: 480,
    height: 360,
    nocache: 1
  }),

  Tag.extend({
    name: 'fotokritik',
    type: "photo",
    uris: ["fotokritik\\.com/.+"],
    api: "http://www.fotokritik.com/embed/$1",
    regex: [/.*fotokritik\.com\/embed\/(\w+).*/, /.*fotokritik\.com\/(\w+).*/],
    tag: 'iframe',
    width: 480,
    height: 360,
    nocache: 1
  }),

  Tag.extend({
    name: 'giflike',
    type: "photo",
    uris: ["giflike\\.com/.+"],
    api: "http://www.giflike.com/embed/$1",
    regex: [/.*giflike\.com\/embed\/(\w+).*/, /.*giflike\.com\/a\/(\w+).*/],
    tag: 'iframe',
    width: 480,
    height: 360,
    nocache: 1
  }),

  Tag.extend({
    name: 'chart.ly',
    type: "photo",
    uris: ["chart\\.ly/[a-z0-9]{6,8}"],
    api: "http://chart.ly/uploads/large_$1.png",
    regex: /.*ly\/([^\/]+).*/,
    tag: 'img',
    nocache: 1
  }),

  Tag.extend({
    name: 'img.ly',
    type: "photo",
    uris: ["img\\.ly/.+"],
    api: "//img.ly/show/thumb/$1",
    regex: /.*ly\/([^\/]+).*/,
    tag: 'img',
    nocache: 1
  }),

  Tag.extend({
    name: 'twitgoo.com',
    type: "photo",
    uris: ["twitgoo\\.com/.+"],
    api: "http://twitgoo.com/show/thumb/$1",
    regex: /.*com\/([^\/]+).*/,
    tag: 'img',
    nocache: 1
  }),

  Tag.extend({
    name: 'imgur.com',
    type: "photo",
    uris: ["imgur\\.com/gallery/.+"],
    api: "http://imgur.com/$1l.jpg",
    regex: /.*gallery\/([^\/]+).*/,
    tag: 'img',
    nocache: 1
  }),

  Get.extend({
    name: 'dribbble',
    type: "photo",
    uris: ["dribbble.com/shots/.+"],
    api: "http://api.dribbble.com/shots/$1?callback=?",
    regex: /.*shots\/([\d]+).*/,
    render: function(data) {
      return data.image_teaser_url
        ? '<img src="' + data.image_teaser_url + '"/>'
        : '';
    }
  })

];
