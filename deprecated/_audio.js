var Get = require('../services/Get')
  , Yql = require('../services/Yql')
  , Tag = require('../services/Tag')
  , Oembed = require('../services/Oembed');

module.exports = [

  Yql.extend({
    name: 'bandcamp',
    type: "rich",
    uris: ["bandcamp\\.com/album/.+"],
    xpath: "//meta[contains(@content, \\'EmbeddedPlayer\\')]",
    from: 'html',
    render: function(data) {
      return data.meta
        ? '<iframe width="400" height="100" src="'
          + data.meta.content
          + '" allowtransparency="true" frameborder="0"></iframe>'
        : false;
    }
  })

];
