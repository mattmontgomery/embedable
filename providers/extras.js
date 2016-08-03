var _ = require('lodash');
var when = require('when');
var Provider = require('../provider');

module.exports = [

  // No-Priority Protocol
  Provider.extend({
    name: 'telephone-number',
    type: 'other',
    weight: 20,
    uri: '^tel:(.*)$',
    version: 0,
    fetch: function(uri, parts) {
      return {
        title: parts[1]
      };
    }
  }),

  // No-Priority Protocol
  Provider.extend({
    name: 'email-address',
    type: 'other',
    weight: 20,
    uri: '^mailto:(.*)$',
    version: 0,
    fetch: function(uri, parts) {
      return {
        title: parts[1]
      };
    }
  }),

  // Low-Priority Protocol
  Provider.extend({
    name: 'other-protocol',
    type: 'other',
    weight: 30,
    uri: '^(?!https*:|\\\/\\\/)',
    version: 0,
    fetch: function(uri) {
      return {};
    }
  }),

  // No-Priority Extension
  Provider.extend({
    name: 'image-file',
    type: 'photo',
    weight: 50,
    uri: '\\.(jpg|jpeg|gif|png)$',
    version: 0,
    fetch: function(uri) {
      return {
        type: 'photo',
        photo_url: uri
      };
    }
  }),

  // Default Provider
  Provider.extend({
    name: 'default',
    type: "rich",
    weight: 100,
    uri: '.*'
  }),

];
