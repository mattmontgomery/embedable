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
      if (!_.isRegExp(uri)) {
        uri = new RegExp(uri, "i");
      }
      self.patterns.push({
        regex: uri,
        provider: provider
      });
    });
  },

  fetch: function(opts) {
    var self = this
      , pattern;    

    // ensure opts is an object
    if (typeof opts === 'string') {
      opts = { uri: opts };
    }
    // ensure uri is a string
    else if (typeof opts.uri !== 'string') {
      opts.uri = '' + opts.uri;
    }
    // ensure error isn't already set
    if (opts.error) {
      delete opts.error;
    }
    // ensure data isn't already set
    if (opts.data) {
      delete opts.data;
    }
    // get the matching provider pattern
    if ((pattern = this.findProvider(opts.redirect || opts.uri))) {
      opts.provider = pattern.provider.name;
      opts.version = pattern.provider.version;
      opts.updated = Date.now();
    }
    // if no provider was found, return error
    else {
      return when.reject({
        type: 'provider_mismatch',
        err: 'unable to find provider'
      });
    }
    // resolve the provider promise
    return this.fetchProvider(opts, pattern)
      .then(function(data) {

        // handle default provider redirects
        if (opts.provider === 'default'
            && data.request 
            && opts.uri !== data.request
            && !opts.redirect) {
          opts.redirect = data.request;
          return self.fetch(opts);
        }
        opts.data = _.pick(data, _.identity);
        return opts;
      })
      // handle fetching errors
      .catch(function(err) {
        if (typeof err !== 'object') {
          err = { type: 'embed_error' };
        }
        opts.error = err;
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
    var uri = opts.redirect || opts.uri
      parts = uri.match(pattern.regex);

    try {
      data = pattern.provider.fetch(uri, parts);
    }
    catch (err) {
      return when.reject({
        type: 'provider_fetch',
        err: err.toString()
      });
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

    // resolve entry promise
    if (entry && typeof entry.then === 'function') {
      return entry.then(function(data) {
        return this.render(data);
      });
    }
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
      return this.fetch(entry).then(function(data) {
        return self.render(data, opts);
      });
    }
    // render via the provider
    return provider.render(entry, opts);
  }

});
