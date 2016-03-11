var Get = require('../services/Get')
  , Yql = require('../services/Yql')
  , Tag = require('../services/Tag')
  , Oembed = require('../services/Oembed')
  , Template = require('../services/Template');

module.exports = [

  Yql.extend({
    name: "pastie",
    type: "rich",
    uris: ["pastie\\.org/pastes/.+"],
    xpath: '//pre[@class="textmate-source"]'
  }),

  Yql.extend({
    name: "lanyard",
    type: "rich",
    uris: ["lanyrd.com/\\d+/.+"],
    xpath: '(//div[@class="primary"])[1]',
    render: function(data) {
      return data.result
        ? ('<div class="oembedall-lanyard">' + data.result + '</div>')
        : '';
    }
  }),

  Yql.extend({
    name: "asciiartfarts",
    type: "rich",
    uris: ["asciiartfarts.com/\\d+.html"],
    xpath: '//pre/font',
    render: function(data) {
      return data.result
        ? ('<pre style="background-color:#000;">' + data.result + '</div>')
        : '';
    }
  }),

  Tag.extend({
    name: "popplet",
    type: "rich",
    uris: ["popplet.com/app/.*"],
    api: "http://popplet.com/app/Popplet_Alpha.swf?page_id=$1&em=1",
    regex: /.*#\/([^\/]+).*/,
    width: 460,
    height: 460
  }),

  Tag.extend({
    name: "pearltrees",
    type: "rich",
    uris: ["pearltrees.com/.*"],
    api: "http://cdn.pearltrees.com/s/embed/getApp?",
    regex: /.*N-f=1_(\d+).*N-p=(\d+).*/,
    width: 460,
    height: 460,
    flashvars: "lang=en_US&amp;embedId=pt-embed-$1-693&amp;treeId=$1&amp;pearlId=$2&amp;treeTitle=Diagrams%2FVisualization&amp;site=www.pearltrees.com%2FF"
  }),

  Tag.extend({
    name: "prezi",
    type: "rich",
    uris: ["prezi.com/.*"],
    api: "//prezi.com/bin/preziloader.swf?",
    regex: /.*com\/([^\/]+)\/.*/,
    width: 550,
    height: 400,
    flashvars: "prezi_id=$1&amp;lock_to_path=0&amp;color=ffffff&amp;autoplay=no&amp;autohide_ctrls=0"
  }),

  Tag.extend({
    name: "ebay",
    type: "rich",
    uris: ["ebay\\.*"],
    api: "http://togo.ebay.com/togo/togo.swf?2008013100",
    regex: /.*\/([^\/]+)\/(\d{10,13}).*/,
    width: 355,
    height: 300,
    flashvars: "base=http://togo.ebay.com/togo/&lang=en-us&mode=normal&itemid=$2&query=$1"
  }),

  Tag.extend({
    name: "circuitbee",
    type: "rich",
    uris: ["circuitbee\\.com/circuit/view/.+"],
    api: "http://c.circuitbee.com/build/r/schematic-embed.html?id=$1",
    regex: /.*circuit\/view\/(\d+).*/,
    tag: 'iframe',
    width: '500',
    height: '350'
  }),

  Tag.extend({
    name: "googlecalendar",
    type: "rich",
    uris: ["www.google.com/calendar/embed?.+"],
    api: "$1",
    regex: /(.*)/,
    tag: 'iframe',
    width: '800',
    height: '600'
  }),

  Tag.extend({
    name: "jsfiddle",
    type: "rich",
    uris: ["jsfiddle.net/[^/]+/?"],
    api: "http://jsfiddle.net/$1/embedded/result,js,resources,html,css/?",
    regex: /.*net\/([^\/]+).*/,
    tag: 'iframe',
    width: '100%',
    height: '300'
  }),

  Tag.extend({
    name: "jsbin",
    type: "rich",
    uris: ["jsbin.com/.+"],
    api: "http://jsbin.com/$1/?",
    regex: /.*com\/([^\/]+).*/,
    tag: 'iframe',
    width: '100%',
    height: '300'
  }),

  Tag.extend({
    name: "jotform",
    type: "rich",
    uris: ["form.jotform.co/form/.+"],
    api: "$1?",
    regex: /(.*)/,
    tag: 'iframe',
    width: '100%',
    height: '507'
  }),

  Tag.extend({
    name: "reelapp",
    type: "rich",
    uris: ["reelapp\\.com/.+"],
    api: "http://www.reelapp.com/$1/embed",
    regex: /.*com\/(\S{6}).*/,
    tag: 'iframe',
    width: '400',
    height: '338'
  }),

  Tag.extend({
    name: "linkedin",
    type: "rich",
    uris: ["linkedin.com/pub/.+"],
    api: "https://www.linkedin.com/cws/member/public_profile?public_profile_url=$1&format=inline&isFramed=true",
    regex: /(.*)/,
    tag: 'iframe',
    width: '368',
    height: 'auto'
  }),

  Tag.extend({
    name: "timetoast",
    type: "rich",
    uris: ["timetoast.com/timelines/[0-9]+"],
    api: "http://www.timetoast.com/flash/TimelineViewer.swf?passedTimelines=$1",
    regex: /.*timelines\/([0-9]*)/,
    width: 550,
    height: 400,
    nocache: 1
  }),

  Tag.extend({
    name: "pastebin",
    type: "rich",
    uris: ["pastebin\\.com/[\\S]{8}"],
    api: "http://pastebin.com/embed_iframe.php?i=$1",
    regex: /.*\/(\S{8}).*/,
    tag: 'iframe',
    width: '100%',
    height: 'auto'
  }),

  Tag.extend({
    name: "mixlr",
    type: "rich",
    uris: ["mixlr.com/.+"],
    api: "http://mixlr.com/embed/$1?autoplay=ae",
    regex: /.*com\/([^\/]+).*/,
    tag: 'iframe',
    width: '100%',
    height: 'auto'
  }),

  Tag.extend({
    name: "gigpans",
    type: "rich",
    uris: ["gigapan\\.org/[-.\\w@]+/\\d+"],
    api: "http://gigapan.org/gigapans/$1/options/nosnapshots/iframe/flash.html",
    regex: /.*\/(\d+)\/?.*/,
    tag: 'iframe',
    width: '100%',
    height: 400
  }),

  Tag.extend({
    name: "amazon",
    type: "rich",
    uris: ["amzn.com/B+", "amazon.com.*/(B\\S+)($|\\/.*)"],
    api: "http://rcm.amazon.com/e/cm?t=_APIKEY_&o=1&p=8&l=as1&asins=$1&ref=qf_br_asin_til&fc1=000000&IS2=1&lt1=_blank&m=amazon&lc1=0000FF&bc1=000000&bg1=FFFFFF&f=ifr",
    apikey: true,
    regex: /.*\/(B[0-9A-Z]+)($|\/.*)/,
    tag: 'iframe',
    width: '120',
    height: '240'
  }),

  Tag.extend({
    name: "360io",
    type: "rich",
    uris: ["360\\.io/.+"],
    api: "http://360.io/$1",
    regex: /.*360\.io\/(\w+).*/,
    tag: 'iframe',
    width: 480,
    height: 360,
    nocache: 1
  }),

  Tag.extend({
    name: "bubbli",
    type: "rich",
    uris: ["on\\.bubb\\.li/.+"],
    api: "http://on.bubb.li/$1",
    regex: /.*on\.bubb\.li\/(\w+).*/,
    tag: 'iframe',
    width: 480,
    height: 360,
    nocache: 1
  }),

  Tag.extend({
    name: "cloudup",
    type: "rich",
    uris: ["cloudup\\.com/.+"],
    api: "http://cloudup.com/$1?chromeless",
    regex: [/.*cloudup\.com\/(\w+).*/],
    tag: 'iframe',
    width: 480,
    height: 360
  }),

  Tag.extend({
    name: "codepen",
    type: "rich",
    uris: ["codepen.io/.+"],
    api: "http://codepen.io/$1/embed/$2",
    regex: [/.*io\/(\w+)\/pen\/(\w+).*/, /.*io\/(\w+)\/full\/(\w+).*/],
    tag: 'iframe',
    width: '100%',
    height: '300',
    nocache: 1
  }),

  Tag.extend({
    name: "googleviews",
    type: "rich",
    uris: ["(.*maps\\.google\\.com\\/maps\\?).+(output=svembed).+(cbp=(.*)).*"],
    api: "https://maps.google.com/maps?layer=c&panoid=$3&ie=UTF8&source=embed&output=svembed&cbp=$5",
    regex: /(.*maps\.google\.com\/maps\?).+(panoid=(\w+)&).*(cbp=(.*)).*/,
    tag: 'iframe',
    width: 480,
    height: 360,
    nocache: 1
  }),

  Tag.extend({
    name: "googlemaps",
    type: "rich",
    uris: ["google\\.com\/maps\/place/.+"],
    api: "http://maps.google.com/maps?t=m&q=$1&output=embed",
    regex: /.*google\.com\/maps\/place\/([\w\+]*)\/.*/,
    tag: 'iframe',
    width: 480,
    height: 360,
    nocache: 1
  }),

  Tag.extend({
    name: "imajize",
    type: "rich",
    uris: ["embed\\.imajize\\.com/.+"],
    api: "http://embed.imajize.com/$1",
    regex: /.*embed\.imajize\.com\/(.*)/,
    tag: 'iframe',
    width: 480,
    height: 360,
    nocache: 1
  }),

  Tag.extend({
    name: "mapjam",
    type: "rich",
    uris: ["mapjam\\.com/.+"],
    api: "http://www.mapjam.com/$1",
    regex: /.*mapjam\.com\/(.*)/,
    tag: 'iframe',
    width: 480,
    height: 360,
    nocache: 1
  }),

  Tag.extend({
    name: "polar",
    type: "rich",
    uris: ["polarb\\.com/.+"],
    api: "http://assets-polarb-com.a.ssl.fastly.net/api/v4/publishers/unknown/embedded_polls/iframe?poll_id=$1",
    regex: /.*polarb\.com\/polls\/(\w+).*/,
    tag: 'iframe',
    width: 480,
    height: 360,
    nocache: 1
  }),

  Tag.extend({
    name: "ponga",
    type: "rich",
    uris: ["ponga\\.com/.+"],
    api: "https://www.ponga.com/embedded?id=$1",
    regex: [/.*ponga\.com\/embedded\?id=(\w+).*/, /.*ponga\.com\/(\w+).*/],
    tag: 'iframe',
    width: 480,
    height: 360,
    nocache: 1
  }),

  Get.extend({
    name: "wikipedia",
    type: "rich",
    uris: ["wikipedia.org/wiki/.+"],
    api: "http://$1.wikipedia.org/w/api.php?action=parse&page=$2&format=json&section=0&callback=?",
    regex: /.*\/\/([\w]+).*\/wiki\/([^\/]+).*/,
    render: function(data) {
      if (!data.parse) {
        return '';
      }
      var text = data.parse.text['*'].replace(/href="\/wiki/g, 'href="http://en.wikipedia.org/wiki');
      return '<div id="content"><h3>'
        + '<a class="nav-link" href="http://en.wikipedia.org/wiki/'
        + data.parse.displaytitle + '">' + data.parse.displaytitle
        + '</a></h3>' + text + '</div>';
    }
  }),

  Get.extend({
    name: "imdb",
    type: "rich",
    uris: ["imdb.com/title/.+"],
    api: "http://www.imdbapi.com/?i=$1&callback=?",
    regex: /.*\/title\/([^\/]+).*/,
    render: function(data) {
      if (!data.Title) {
        return '';
      }
      return '<div id="content"><h3>'
        + '<a class="nav-link" href="http://imdb.com/title/'
        + data.imdbID + '/">' + data.Title + '</a> ('
        + data.Year + ')</h3><p>Rating: ' + data.imdbRating
        + '<br/>Genre: ' + data.Genre + '<br/>Starring: '
        + data.Actors + '</p></div>  <div id="view-photo-caption">'
        + data.Plot + '</div></div>';
    }
  }),

  Get.extend({
    name: "livejournal",
    type: "rich",
    uris: ["livejournal.com/"],
    api: "http://ljpic.seacrow.com/json/$2$4?jsonp=?",
    regex: /(http:\/\/(((?!users).)+)\.livejournal\.com|.*users\.livejournal\.com\/([^\/]+)).*/,
    render: function(data) {
      if (!data.username) {
        return '';
      }
      return '<div><img src="' + data.image
        + '" align="left" style="margin-right: 1em;" />'
        + '<span class="oembedall-ljuser"><a href="http://'
        + data.username + '.livejournal.com/profile">'
        + '<img src="http://www.livejournal.com/img/userinfo.gif" '
        + 'alt="[info]" width="17" height="17" /></a><a href="http://'
        + data.username + '.livejournal.com/">'
        + data.username + '</a></span><br />'
        + data.name + '</div>';
    }
  }),

  Get.extend({
    name: "github2",
    type: "rich",
    uris: ["github.com/[-.\\w@]+/[-.\\w@]+"],
    api: "https://api.github.com/repos/$1/$2?callback=?",
    regex: /.*\/([^\/]+)\/([^\/]+).*/,
    render: function(data) {
      if (!data.data.html_url) {
        return '';
      }
      return '<div class="oembedall-githubrepos"><ul class="oembedall-repo-stats"><li>'
        + data.data.language + '</li><li class="oembedall-watchers"><a title="Watchers" href="'
        + data.data.html_url + '/watchers">&#x25c9; ' + data.data.watchers + '</a></li>'
        + '<li class="oembedall-forks"><a title="Forks" href="' + data.data.html_url
        + '/network">&#x0265; ' + data.data.forks + '</a></li></ul><h3><a href="'
        + data.data.html_url + '">' + data.data.name
        + '</a></h3><div class="oembedall-body"><p class="oembedall-description">'
        + data.data.description + '</p>'
        + '<p class="oembedall-updated-at">Last updated: '
        + data.data.pushed_at + '</p></div></div>';
    }
  }),

  Get.extend({
    name: "stackoverflow",
    type: "rich",
    uris: ["stackoverflow.com/questions/[\\d]+"],
    api: "http://api.stackoverflow.com/1.1/questions/$1?body=true&jsonp=?",
    regex: /.*questions\/([\d]+).*/,
    render: function(data) {
      if (!data.questions) {
        return '';
      }
      var q = data.questions[0];
      //var body = domify(q.body).innerHTML;
      var body = 'INNERHTML goes here...';
      var html = '<div class="oembedall-stoqembed">'
        + '<div class="oembedall-statscontainer">'
        + '<div class="oembedall-statsarrow"></div>'
        + '<div class="oembedall-stats">'
        + '<div class="oembedall-vote"><div class="oembedall-votes">'
        + '<span class="oembedall-vote-count-post"><strong>'
        + (q.up_vote_count - q.down_vote_count)
        + '</strong></span>'
        + '<div class="oembedall-viewcount">vote(s)</div></div>'
        + '</div><div class="oembedall-status"><strong>'
        + q.answer_count + '</strong>answer</div></div>'
        + '<div class="oembedall-views">'
        + q.view_count + ' view(s)</div></div>'
        + '<div class="oembedall-summary">'
        + '<h3><a class="oembedall-question-hyperlink" href="http://stackoverflow.com/questions/'
        + q.question_id + '/">' + q.title + '</a></h3>'
        + '<div class="oembedall-excerpt">'
        + body.substring(0, 100) + '...</div>'
        + '<div class="oembedall-tags">';

      for (i in q.tags) {
        html += '<a title="" class="oembedall-post-tag" '
          + 'href="http://stackoverflow.com/questions/tagged/'
          + q.tags[i] + '">' + q.tags[i] + '</a>';
      }
      html += '</div><div class="oembedall-fr">'
        + '<div class="oembedall-user-info"><div class="oembedall-user-gravatar32">'
        + '<a href="http://stackoverflow.com/users/'
        + q.owner.user_id + '/' + q.owner.display_name + '">'
        + '<img width="32" height="32" alt="" src="http://www.gravatar.com/avatar/'
        + q.owner.email_hash + '?s=32&amp;d=identicon&amp;r=PG"></a></div>'
        + '<div class="oembedall-user-details">'
        + '<a href="http://stackoverflow.com/users/' + q.owner.user_id + '/'
        + q.owner.display_name + '">' + q.owner.display_name
        + '</a><br><span title="reputation score" class="oembedall-reputation-score">'
        + q.owner.reputation + '</span></div></div></div></div></div>';

      return html;
    }
  }),

  Template.extend({
    name: "tourwrist",
    type: "rich",
    uris: ["tourwrist.com/tours/.+"],
    regex: /.*tours.([\d]+).*/,
    template: function(wm, tourid) {
      return "<div id='" + tourid
        + "' class='tourwrist-tour-embed direct'></div>"
        + '<script type="text/javascript" '
        + 'src="http://tourwrist.com/tour_embed.js"></script>';
    }
  }),

  Template.extend({
    name: "facebook",
    type: "rich",
    uris: ["facebook.com"],
    regex: /.*\/([^\/]+)\/([^\/]+).*/,
    template: function(url) {
      // adding script directly to DOM to make sure that it is loaded correctly.
      /*
      if (!window.oembed.facebokScriptHasBeenAdded) {
        document.body.appendChild(domify('<div id="fb-root"></div>'));
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.text = '(function(d, s, id) {var js, fjs = d.getElementsByTagName(s)[0];if (d.getElementById(id)) return;js = d.createElement(s); js.id = id;js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.0";fjs.parentNode.insertBefore(js, fjs);}(document, "script", "facebook-jssdk"));';
        document.body.appendChild(script);
        window.oembed.facebokScriptHasBeenAdded = true;
      }
      */
      return '<div class="fb-post" data-href="' + url
        + '" data-width="520"><div class="fb-xfbml-parse-ignore"><a href="'
        + url + '"></div></div>';
    }
  }),

  Template.extend({
    name: "coveritlive",
    type: "rich",
    uris: ["coveritlive.com/"],
    regex: /(.*)/,
    template: '<iframe src="$1" allowtransparency="true" scrolling="no" width="615px" frameborder="0" height="625px"></iframe>'
  })

];
