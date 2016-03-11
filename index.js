var _ = require('lodash')
  , when = require('when');

var Provider = require('./provider');

var Providers = [].concat(
  require('./providers/domains_09'),
  require('./providers/domains_ab'),
  require('./providers/domains_cd'),
  require('./providers/domains_ef'),
  require('./providers/domains_gh'),
  require('./providers/domains_ij'),
  require('./providers/domains_kl'),
  require('./providers/domains_mn'),
  require('./providers/domains_op'),
  require('./providers/domains_qr'),
  require('./providers/domains_st'),
  require('./providers/domains_uv'),
  require('./providers/domains_wx'),
  require('./providers/domains_yz'),
  require('./providers/extras')
);

module.exports = Embed;

/**
 *
 * Option Precedence:
 *
 * 1. Inline Options                (From Markdown)
 * 2. Render Options                (From Page)
 * 3. Provider Data                 (From Fetch)
 * 4. Provider Options              (From Provider)
 *
 * options = {
 *   as: 'rich',                    (render method + style class)
 *   size: 'full',                  (render modifier)
 *   popup: true,                   (popup link flag)
 *   nofollow: true,                (nofollow link flag)
 *   link_from: 1234,               (source article id)
 * };
 *
 * entry = {
 *   uri: 'http://domain/path',     (Source URI)
 *   name: 'main',                  (Entry name)
 *
 *   renditions: {},                (Rendition options)
 *
 *   inline: {                      (Inline options)
 *     as: 'photo',
 *     size: 'full',
 *     title: 'Alt Title',
 *     credit: 'Photo Credit'
 *   },
 *
 *   media: {
 *     url: 'http://',
 *     id: 1234455,
 *     hash: 'c013a93283',
 *     type: 'image/jpeg',
 *     width: 400,
 *     height: 600,
 *     client: 2,
 *     size: 183391,
 *   },
 *
 *   provider: 'default',           (Provider name)
 *   error: 'Error String'          (Provider error)
 *   data: {                        (Provider data)
 *     type: 'article',
 *     title: 'Article title',
 *     description: 'Description',
 *
 *     author_url: 'http://',
 *     author_name: 'Name',
 *
 *     provider_url: 'http://',
 *     provider_name: 'Name',
 *
 *     photo_url: 'http://',
 *     photo_type: 'jpg',
 *     photo_width: 300,
 *     photo_height: 400,
 *
 *     embed_url: 'http://',
 *     embed_tag: 'iframe',
 *     embed_type: 'flash',
 *     embed_width: 300,
 *     embed_height: 400,
 *     embed_html: '<html></html>'
 *   }
 * };
 */

// ------------------------------------------------------------------
//        Embed Constructor
// ------------------------------------------------------------------

function Embed() {
  var self = this
    , providers;

  if (!(this instanceof Embed)) {
    return new Embed();
  }
  this.patterns = [];
  this.providers = {};

  // instantiate providers
  providers = _.map(Providers, function(Type) {
    return new Type();
  });

  // sort providers
  providers = providers.sort(function(a, b) {
    if (a.weight < b.weight) {
      return -1;
    }
    if (a.weight > b.weight) {
      return 1;
    }
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  });

  // add to this.patterns & this.providers
  _.each(providers, function(provider) {
    self.addProvider(provider);
  });
}

Embed.Provider = Provider;
Embed.Providers = Providers;

// ------------------------------------------------------------------
//        EXPORT METHODS
// ------------------------------------------------------------------

_.extend(Embed.prototype, {

  patterns: null,
  providers: null,

  addProvider: function(provider) {
    var name = provider.name
      , self = this;

    if (this.providers[name]) {
      throw new Error('Duplicate provider: ' + name);
    }
    this.providers[name] = provider;

    if (!provider.uri) {
      throw new Error('Missing provider uri: ' + name);
    }
    if (!Array.isArray(provider.uri)) {
      provider.uri = [provider.uri];
    }
    _.each(provider.uri, function(uri) {
      self.patterns.push({
        regex: new RegExp(uri, "i"),
        provider: provider
      });
    });
  },

  fetch: function(opts) {
    var pattern, data;

    // ensure opts is an object
    if (typeof opts === 'string') {
      opts = { uri: opts };
    }
    // ensure uri is a string
    else if (typeof opts.uri !== 'string') {
      opts.uri = '' + opts.uri;
    }
    // get the matching provider pattern
    if ((pattern = this.findProvider(opts.uri))) {
      opts.provider = pattern.provider.name;
    }
    else {
      throw new Error('Unable to find provider for ' + opts.uri);
    }
    // resolve the provider promise
    return this.fetchProvider(opts, pattern).then(function(data) {
      opts.data = _.pick(data, _.identity);
      return opts;
    })
    // handle fetching errors
    .catch(function(err) {
      opts.error = '' + err;
      opts.data = {};
      return opts;
    });
  },

  findProvider: function(uri) {
    for (var i = 0, l = this.patterns.length; i < l; i++) {
      if (this.patterns[i].regex.test(uri)) {
        return this.patterns[i];
      }
    }
  },

  fetchProvider: function(opts, pattern) {
    var parts = opts.uri.match(pattern.regex);

    try {
      data = pattern.provider.fetch(opts.uri, parts);
    }
    catch (err) {
      return when.reject(err);
    }
    if (!data) {
      return when.resolve({});
    }
    if (!data.then) {
      return when.resolve(data);
    }
    return data;
  },

  render: function(entry, opts) {
    var self = this
      , provider;

    opts = opts || {};

    // if entry is an array of entries
    if (Array.isArray(entry)) {
      return when.map(entry, function(_entry) {
        return self.render(_entry, opts);
      });
    }
    // ensure entry is an object
    if (typeof entry === 'string') {
      entry = { uri: entry };
    }
    // fetch provider & data if not set
    if (entry.uri && (!entry.provider || !entry.data)) {
      return this.fetch(entry).then(function(data) {
        return self.render(data, opts);
      });
    }
    // make sure provider is valid
    if (!(provider = this.providers[entry.provider])) {
      throw new Error('Invalid render data.provider: ' + entry.provider);
    }
    // render via the provider
    return provider.render(entry, opts);
  }

});
