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
    return embed.fetch('https://www.youtube.com/watch?v=azYO-P181JQ').then(function(data) {
      console.log(data);
      assert.typeOf(data, 'object');
    });
  });

});