var chai = require("chai")
  , assert = chai.assert
  , chaiAsPromised = require("chai-as-promised")
  , Embedable = require('../index.js');

chai.use(chaiAsPromised);

var embed = Embedable();

describe('Embedable Module', function() {

  it('Is a constructor', function() {
    assert.typeOf(Embedable, 'function');
  });

  it('Has a provider constructor', function() {
    assert.typeOf(Embedable.Provider, 'function');
  });

  it('Has a providers array', function() {
    assert.typeOf(Embedable.Providers, 'array');
  });

  it('Has more than 80 providers', function() {
    assert.isAtLeast(Embedable.Providers.length, 80);
  });

});

describe('Instance Methods', function() {

  it('Has addProvider()', function() {
    assert.typeOf(embed.addProvider, 'function');
  });

  it('Has findProvider()', function() {
    assert.typeOf(embed.findProvider, 'function');
  });

  it('Has fetchProvider()', function() {
    assert.typeOf(embed.fetchProvider, 'function');
  });

  it('Has fetch()', function() {
    assert.typeOf(embed.fetch, 'function');
  });

  it('Has render()', function() {
    assert.typeOf(embed.render, 'function');
  });

});

describe('Fetch Method', function() {

  it('Is able to fetch from youtube', function() {
    return embed.fetch('https://www.reddit.com/r/todayilearned/comments/4k9f47/til_hocus_pocus_may_have_been_coined_by/')
    .then(function(data) {
      console.log(data);
      console.log("----------------------------------------");
      return embed.render(data);
    })
    .then(function(html) {
      console.log(html);
      assert.typeOf(html, 'string');
    });
  });

  // it('Is able to fetch from pinterest', function() {
  //   return embed.fetch('https://www.pinterest.com/pin/417708934164289675/')
  //   .then(function(data) {
  //     console.log(data);
  //     return embed.render(data);
  //   })
  //   .then(function(html) {
  //     console.log(html);
  //     assert.typeOf(html, 'string');
  //   });
  // });

});