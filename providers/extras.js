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
