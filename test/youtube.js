var chai = require("chai")
  , assert = chai.assert
  , chaiAsPromised = require("chai-as-promised")
  , Embedable = require('../index.js');

chai.use(chaiAsPromised);

var embed = Embedable();

describe('Fetch from YouTube', function() {
  it('Is able to fetch from youtube', function() {
     return embed.fetch('https://www.youtube.com/watch?v=yYonI7n4XlE')
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

});
