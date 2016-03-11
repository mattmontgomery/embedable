var Get = require('../services/Get')
  , Tag = require('../services/Tag')
  , Oembed = require('../services/Oembed')
  , Template = require('../services/Template');

module.exports = [

  Tag.extend({
    name: 'xtranormal',
    type: "video",
    uris: ["xtranormal\\.com/watch/.+"],
    api: "http://www.xtranormal.com/xtraplayr/$1/$2",
    regex: /.*com\/watch\/([\w\-]+)\/([\w\-]+).*/,
    tag: 'iframe',
    width: '320',
    height: '269'
  }),

  Tag.extend({
    name: 'scivee',
    type: "video",
    uris: ["scivee.tv/node/.+"],
    api: "http://www.scivee.tv/flash/embedCast.swf?",
    regex: /.*tv\/node\/(.+)/,
    width: '480',
    height: '400',
    flashvars: "id=$1&type=3"
  }),

  Tag.extend({
    name: 'veoh',
    type: "video",
    uris: ["veoh.com/watch/.+"],
    api: "http://www.veoh.com/swf/webplayer/WebPlayer.swf?version=AFrontend.5.7.0.1337&permalinkId=$1&player=videodetailsembedded&videoAutoPlay=0&id=anonymous",
    regex: /.*watch\/([^\?]+).*/,
    width: '410',
    height: '341'
  }),

  Tag.extend({
    name: 'gametrailers',
    type: "video",
    uris: ["gametrailers\\.com/video/.+"],
    api: "http://media.mtvnservices.com/mgid:moses:video:gametrailers.com:$2",
    regex: /.*com\/video\/([\w\-]+)\/([\w\-]+).*/,
    width: '512',
    height: '288'
  }),

  Tag.extend({
    name: 'metacafe',
    type: "video",
    uris: ["metacafe\\.com/watch/.+"],
    api: "http://www.metacafe.com/fplayer/$1/$2.swf",
    regex: /.*watch\/(\d+)\/(\w+)\/.*/,
    width: 400,
    height: 345
  }),

  Tag.extend({
    name: 'twitvid',
    type: "video",
    uris: ["twitvid\\.com/.+"],
    api: "http://www.twitvid.com/embed.php?guid=$1&autoplay=0",
    regex: /.*twitvid\.com\/(\w+).*/,
    tag: 'iframe',
    width: 480,
    height: 360
  }),

  Tag.extend({
    name: 'aniboom',
    type: "video",
    uris: ["aniboom\\.com/animation-video/.+"],
    api: "http://api.aniboom.com/e/$1",
    regex: /.*animation-video\/(\d+).*/,
    width: 594,
    height: 334
  }),

  Tag.extend({
    name: 'snotr',
    type: "video",
    uris: ["snotr\\.com/video/.+"],
    api: "http://www.snotr.com/embed/$1",
    regex: /.*\/(\d+).*/,
    tag: 'iframe',
    width: 400,
    height: 330,
    nocache: 1
  }),

  Tag.extend({
    name: 'youku',
    type: "video",
    uris: ["v.youku.com/v_show/id_.+"],
    api: "http://player.youku.com/player.php/sid/$1/v.swf",
    regex: /.*id_(.+)\.html.*/,
    width: 480,
    height: 400,
    nocache: 1
  }),

  Tag.extend({
    name: 'tudou',
    type: "video",
    uris: ["tudou.com/programs/view/.+\/"],
    api: "http://www.tudou.com/v/$1/v.swf",
    regex: /.*view\/(.+)\//,
    width: 480,
    height: 400,
    nocache: 1
  }),

  Tag.extend({
    name: 'embedr',
    type: "video",
    uris: ["embedr\\.com/playlist/.+"],
    api: "http://embedr.com/swf/slider/$1/425/520/default/false/std?",
    regex: /.*playlist\/([^\/]+).*/,
    width: 425,
    height: 520,
  }),

  Tag.extend({
    name: 'bambuser2',
    type: "video",
    uris: ["bambuser\\.com\/channel\/.*\/broadcast\/.*"],
    api: "http://static.bambuser.com/r/player.swf?vid=$1",
    regex: /.*bambuser\.com\/channel\/.*\/broadcast\/(\w+).*/,
    width: 512,
    height: 339
  }),

  Tag.extend({
    name: 'boxofficebuz',
    type: "video",
    uris: ["boxofficebuz\\.com\\/embed/.+"],
    api: "http://boxofficebuz.com/embed/$1/$2",
    regex: [/.*boxofficebuz\.com\/embed\/(\w+)\/([\w*\-*]+)/],
    tag: 'iframe',
    width: 480,
    height: 360
  }),

  Tag.extend({
    name: 'clipsyndicate',
    type: "video",
    uris: ["clipsyndicate\\.com/video/play/.+", "clipsyndicate\\.com/embed/iframe\\?.+"],
    api: "http://eplayer.clipsyndicate.com/embed/iframe?pf_id=1&show_title=0&va_id=$1&windows=1",
    regex: [/.*www\.clipsyndicate\.com\/video\/play\/(\w+)\/.*/, /.*eplayer\.clipsyndicate\.com\/embed\/iframe\?.*va_id=(\w+).*.*/],
    tag: 'iframe',
    width: 480,
    height: 360,
    nocache: 1
  }),

  Tag.extend({
    name: 'discoverychannel',
    type: "video",
    uris: ["snagplayer\\.video\\.dp\\.discovery\\.com/.+"],
    api: "http://snagplayer.video.dp.discovery.com/$1/snag-it-player.htm?auto=no",
    regex: [/.*snagplayer\.video\.dp\.discovery\/(\w+).*/],
    tag: 'iframe',
    width: 480,
    height: 360
  }),

  Tag.extend({
    name: 'telly',
    type: "video",
    uris: ["telly\\.com/.+"],
    api: "http://www.telly.com/embed.php?guid=$1&autoplay=0",
    regex: [/.*telly\.com\/embed\.php\?guid=(\w+).*/, /.*telly\.com\/(\w+).*/],
    tag: 'iframe',
    width: 480,
    height: 360
  }),

  Tag.extend({
    name: 'minilogs',
    type: "video",
    uris: ["minilogs\\.com/.+"],
    api: "http://www.minilogs.com/e/$1",
    regex: [/.*minilogs\.com\/e\/(\w+).*/, /.*minilogs\.com\/(\w+).*/],
    tag: 'iframe',
    width: 480,
    height: 360,
    nocache: 1
  }),

  Tag.extend({
    name: 'viddy',
    type: "video",
    uris: ["viddy\\.com/.+"],
    api: "http://www.viddy.com/embed/video/$1",
    regex: [/.*viddy\.com\/embed\/video\/(\.*)/, /.*viddy\.com\/video\/(\.*)/],
    tag: 'iframe',
    width: 480,
    height: 360,
    nocache: 1
  }),

  Tag.extend({
    name: 'worldstarhiphop',
    type: "video",
    uris: ["worldstarhiphop\\.com\/embed/.+"],
    api: "http://www.worldstarhiphop.com/embed/$1",
    regex: /.*worldstarhiphop\.com\/embed\/(\w+).*/,
    tag: 'iframe',
    width: 480,
    height: 360,
    nocache: 1
  }),

  Tag.extend({
    name: 'zapiks',
    type: "video",
    uris: ["zapiks\\.fr\/.+"],
    api: "http://www.zapiks.fr/index.php?action=playerIframe&media_id=$1&autoStart=fals",
    regex: /.*zapiks\.fr\/index.php\?[\w\=\&]*media_id=(\w+).*/,
    tag: 'iframe',
    width: 480,
    height: 360,
    nocache: 1
  }),

  Template.extend({
    name: 'vine',
    type: "video",
    uris: ["vine.co/v/.*"],
    regex: /https?:\/\/w?w?w?.?vine\.co\/v\/([a-zA-Z0-9]*).*/,
    template: '<iframe src="https://vine.co/v/$1/embed/postcard" '
      + 'width="600" height="600" allowfullscreen="true" '
      + 'allowscriptaccess="always" scrolling="no" frameborder="0"></iframe>'
      + '<script async src="//platform.vine.co/static/scripts/embed.js" '
      + 'charset="utf-8"></script>',
    nocache: 1
  })

];