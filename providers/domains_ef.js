var _ = require('lodash');
var when = require('when');
var Provider = require('../provider');

module.exports = [

  Provider.extend({
    name: 'etsy',
    type: 'rich',
    uri: "//(?:www\\.)?etsy\\.com/listing/.+$",
    version: 0,
    fetch: function(uri) {
      return this.fetchEmbed(uri, {
        api: 'http://openapi.etsy.com/svc/oembed/'
      });
    }
  }),

// https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2FFamilyShare%2Fvideos%2F10154202941490485%2F&show_text=1&width=560
// https://www.facebook.com/RebeccaSheehanKSDK/photos/a.671696456319040.1073741829.669142353241117/690241274464558/?type=3&theater
// <iframe src="https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2FRebeccaSheehanKSDK%2Fposts%2F690241274464558%3A0&width=500" width="500" height="625" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowTransparency="true"></iframe>
// <div 
//   class="fb-post" 
//   data-href="https://www.facebook.com/RebeccaSheehanKSDK/photos/a.671696456319040.1073741829.669142353241117/690241274464558/?type=3&amp;theater" 
//   data-width="500" 
//   data-show-text="true">
//   <blockquote cite="https://www.facebook.com/RebeccaSheehanKSDK/posts/690241274464558:0" class="fb-xfbml-parse-ignore"><p>Working on this story today in Freeburg, IL...here&#039;s the dress code flyer sent home with parents of 5th - 8th graders.  Many parents said they&#039;re offended by its wording and images. Are you?</p>Posted by <a href="https://www.facebook.com/RebeccaSheehanKSDK/">Rebecca Sheehan KSDK</a> on&nbsp;<a href="https://www.facebook.com/RebeccaSheehanKSDK/posts/690241274464558:0">Wednesday, July 27, 2016</a></blockquote></div>

//<iframe src="https://www.facebook.com/plugins/comment_embed.php?href=https%3A%2F%2Fwww.facebook.com%2FRebeccaSheehanKSDK%2Fphotos%2Fa.671696456319040.1073741829.669142353241117%2F690241274464558%2F%3Ftype%3D3%26comment_id%3D690960497725969&include_parent=false" width="560" height="221" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowTransparency="true"></iframe>

  // -------------------------------------------------------------------
  //          FACEBOOK VIDEO
  // -------------------------------------------------------------------

  // SEE: https://developers.facebook.com/docs/plugins/oembed-endpoints
  // https://www.facebook.com/{page-name}/videos/{video-id}/
  // https://www.facebook.com/{username}/videos/{video-id}/
  // https://www.facebook.com/video.php?id={video-id}
  // https://www.facebook.com/video.php?v={video-id}
  Provider.extend({
    name: 'facebook-video',
    type: 'rich',
    uri: [
      /facebook\.com\/plugins\/video.php(.*?)href=([^&]+)/, // REWRITE PLUGIN HREF URI
      function(parts) {
        return decodeURIComponent(parts[2]); 
      },
      /facebook\.com\/(.+?)\/videos\/(.+)$/,
      function(parts) {
        return {
          page_name: parts[1],
          video_id: parts[2]
        };
      },
      /facebook\.com\/video.php\?\w+=(.+)$/,
      function(parts) {
        return {
          video_id: parts[1]
        };
      }
    ],
    weight: 79, // parse before generic facebook provider
    version: 2,
    script: '//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.7',
    fetch: function(uri, params) {
      return this.fetchEmbed(uri, {
        api: "https://www.facebook.com/plugins/video/oembed.json/"
      })
      .then(function(data) {
        if (data.embed_html) {
          data.embed_html = data.embed_html.replace(/<script[^<]+?<\/script>/img, '');
          data.embed_html = data.embed_html.replace(/<div id="fb-root"><\/div>/, '');
          data.embed_raw = true; // don't render iframe via data.embed_src
        }
        return _.extend(data, params);
      });
    }
  }),

  // -------------------------------------------------------------------
  //          FACEBOOK POST
  // -------------------------------------------------------------------

  // SEE: https://developers.facebook.com/docs/plugins/oembed-endpoints
  // https://www.facebook.com/{page-name}/posts/{post-id}
  // https://www.facebook.com/{username}/posts/{post-id}
  // https://www.facebook.com/{username}/activity/{activity-id}
  // https://www.facebook.com/photo.php?fbid={photo-id}
  // https://www.facebook.com/photos/{photo-id}
  // https://www.facebook.com/permalink.php?story_fbid={post-id}
  // https://www.facebook.com/media/set?set={set-id}
  // https://www.facebook.com/questions/{question-id}
  // https://www.facebook.com/notes/{username}/{note-url}/{note-id}
  Provider.extend({
    name: 'facebook-post',
    type: 'rich',
    uri: [
      /facebook\.com\/plugins\/post.php(.*?)href=([^&]+)/, 
      function(parts) {
        return decodeURIComponent(parts[2]); // REWRITE PLUGIN HREF URI
      },
      /facebook\.com\/([^\/]+)\/posts\/(.+)$/,
      function(parts) {
        return {
          uri_type: 'post',
          page_name: parts[1],
          post_id: parts[2]
        };
      },
      /facebook\.com\/([^\/]+)\/activity\/(.+)$/,
      function(parts) {
        return {
          uri_type: 'activity',
          username: parts[1],
          activity_id: parts[2]
        };
      },
      /facebook\.com\/photo.php\?fbid=(.+)$/,
      function(parts) {
        return {
          uri_type: 'photo',
          photo_id: parts[1]
        };
      },
      /facebook\.com\/(.+?)\/photos\/(.+)$/,
      function(parts) {
        return {
          uri_type: 'photo',
          photo_id: parts[1]
        };
      },
      /facebook\.com\/photos\/(.+)$/,
      function(parts) {
        return {
          uri_type: 'photo',
          photo_id: parts[1]
        };
      },
      /facebook\.com\/permalink.php?story_fbid=(.+)$/,
      function(parts) {
        return {
          uri_type: 'permalink',
          post_id: parts[1]
        };
      },
      /facebook\.com\/media\/set\?set=(.+)$/,
      function(parts) {
        return {
          uri_type: 'media',
          set_id: parts[1]
        };
      },
      /facebook\.com\/questions\/(.+)$/,
      function(parts) {
        return {
          uri_type: 'question',
          question_id: parts[1]
        };
      },
      /facebook\.com\/notes\/(.*?)\/(.*?)\/(.+)$/,
      function(parts) {
        return {
          uri_type: 'note',
          username: parts[1],
          note_url: parts[2],
          note_id: parts[3]
        };
      },
    ],
    weight: 79, // parse before generic facebook provider
    version: 1,
    script: '//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.7',
    fetch: function(uri, params) {
      return this.fetchEmbed(uri, {
        api: "https://www.facebook.com/plugins/post/oembed.json/"
      })
      .then(function(data) {
        if (data.embed_html) {
          data.embed_html = data.embed_html.replace(/<script[^<]+?<\/script>/img, '');
          data.embed_html = data.embed_html.replace(/<div id="fb-root"><\/div>/, '');
          data.embed_raw = true; // don't render iframe via data.embed_src
        }
        return _.extend(data, params);
      });
    }
  }),

  // -------------------------------------------------------------------
  //          FACEBOOK COMMENT
  // -------------------------------------------------------------------

  // https://www.facebook.com/plugins/comment_embed.php?href=https%3A%2F%2Fwww.facebook.com%2FRebeccaSheehanKSDK%2Fphotos%2Fa.671696456319040.1073741829.669142353241117%2F690241274464558%2F%3Ftype%3D3%26comment_id%3D690960497725969&include_parent=false
  // https://www.facebook.com/zuck/posts/10102577175875681?comment_id=1193531464007751&reply_comment_id=654912701278942
  Provider.extend({
    name: 'facebook-comment',
    type: 'rich',
    uri: [
      /facebook\.com\/plugins\/comment_embed.php(.*?)href=([^&]+)/, 
      function(parts) {
        return decodeURIComponent(parts[2]); // REWRITE PLUGIN HREF URI
      },
      /facebook\.com\/(.+?)comment_id=(\d+)$/,
      function(parts) {
        return {
          comment_id: parts[2]
        };
      }
    ],
    weight: 79, // parse before generic facebook provider
    version: 2,
    script: '//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.7',
    fetch: function(uri, parts) {
      var data = { embed_src: uri };

      if ((parts = uri.match(/comment_id=(\d+)/))) {
        data.comment_id = parts[1];
      }
      if ((parts = uri.match(/reply_comment_id=(\d+)/))) {
        data.reply_comment_id = parts[1];
      }
      return data;
    },
    asEmbed: function(entry) {
      return '<div class="fb-comment-embed" '
        + 'data-href="' + entry.data.embed_src + '" '
        + 'data-width="auto" '
        + 'data-include-parent="false">'
        + '</div>'
        + this.asScript();
    }
  }),

  // <div 
  //   class="fb-comment-embed" 
  //   data-href="https://www.facebook.com/sabornva/posts/10155047462202908?comment_id=10155049290027908" 
  //   data-width="560" 
  //   data-include-parent="false">
  // </div>
  // 
  // <div 
  //   class="fb-comment-embed" 
  //   data-href="https://www.facebook.com/sabornva/posts/10155047462202908?comment_id=10155049290027908" 
  //   data-width="100%" 
  //   data-include-parent="false">
  // </div>

//   Provider.extend({
//     name: 'facebook',
//     type: 'rich',
//     uri: 'facebook\\.com',
//     version: 1,
//     fetch: function(uri) {
//       var href = uri
//         , type = 'fb-post'
//         , parts;

//       // test if iframe plugin uri
//       if ((/plugins/).test(uri) && (parts = uri.match(/href=([^&]+)/))) {
//         href = decodeURIComponent(parts[1]);
//       }
//       // test if embedded comment
//       if ((/comment/).test(href)) {
//         type = 'fb-comment-embed';
//       }
//       return this.fetchGraph(href).then(function(data) {
//         data.href = href;
//         data.type = type;
//         return data;
//       });
//     },
//     script: '//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.7',
//     asEmbed: function(entry) {
//       var uri = entry.data.href || entry.uri
//         , type = entry.data.type || 'fb-post';

// console.log("ENTRY", entry.data);
// console.log("TYPE", type);

//        // return '<iframe src="' + entry.uri + '" width="100%" height="161" '
//        //  + 'style="border:none;overflow:hidden" scrolling="no" '
//        //  + 'frameborder="0" allowTransparency="true"></iframe>';

//       return '<div class="embed-wrap">'
//         + '<div class="' + type + '" data-href="'
//         + uri + '" data-width="100%" data-include-parent="false"></div></div>'
//         + this.asScript();
//     }
//   }),

  Provider.extend({
    name: 'flickr',
    type: "photo",
    uri: [
      "//[-\\w]+\\.flickr\\.com/photos/.+$",
      "//flic\\.kr\\.com/.+$"
    ],
    version: 0,
    fetch: function(uri) {
      return this.fetchEmbed(uri, {
        api: "http://www.flickr.com/services/oembed/"
      });
    }
  }),

  Provider.extend({
    name: 'funnyordie',
    type: "video",
    uri: "//www\\.funnyordie\\.com/videos/.+$",
    version: 0,
    fetch: function(uri) {
      return this.fetchEmbed(uri, {
        api: 'http://www.funnyordie.com/oembed.json'
      });
    }
  })

];
