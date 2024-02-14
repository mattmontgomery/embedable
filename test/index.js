var chai = require("chai"),
  assert = chai.assert,
  chaiAsPromised = require("chai-as-promised"),
  Embedable = require("../index.js");

chai.use(chaiAsPromised);

var embed = Embedable();

describe("Embedable Module", function() {
  it("Is a constructor", function() {
    assert.typeOf(Embedable, "function");
  });

  it("Has a provider constructor", function() {
    assert.typeOf(Embedable.Provider, "function");
  });

  it("Has a providers array", function() {
    assert.typeOf(Embedable.Providers, "array");
  });

  it("Has more than 80 providers", function() {
    assert.isAtLeast(Embedable.Providers.length, 80);
  });
});

describe("Instance Methods", function() {
  it("Has addProvider()", function() {
    assert.typeOf(embed.addProvider, "function");
  });

  it("Has findProvider()", function() {
    assert.typeOf(embed.findProvider, "function");
  });

  it("Has fetchProvider()", function() {
    assert.typeOf(embed.fetchProvider, "function");
  });

  it("Has fetch()", function() {
    assert.typeOf(embed.fetch, "function");
  });

  it("Has render()", function() {
    assert.typeOf(embed.render, "function");
  });
});

describe("Fetch Method", function() {
  //  it('Is able to fetch from imgur', function() {
  //   return embed.fetch('http://imgur.com/gallery/wz49SF8')
  //   .then(function(data) {
  //     console.log(data);
  //     console.log("----------------------------------------");
  //     return embed.render(data);
  //   })
  //   .then(function(html) {
  //     console.log(html);
  //     assert.typeOf(html, 'string');
  //   });
  // });

  it("Is able to fetch from vimeo", function() {
    return embed
      .fetch("https://vine.co/v/5AvZeItT92Z")
      .then(function(data) {
        console.log(data);
        console.log("----------------------------------------");
        return embed.render(data);
      })
      .then(function(html) {
        console.log(html);
        assert.typeOf(html, "string");
      });
  });

  // it("Is able to fetch from qzzr", function() {
  //   return embed
  //     .fetch(
  //       "https://www.qzzr.com/c/quiz/253072/which-dog-are-you-45cc751a-48dc-46df-a327-6703b44a14a5"
  //     )
  //     .then(function(data) {
  //       console.log(data);
  //       console.log("----------------------------------------");
  //       return embed.render(data);
  //     })
  //     .then(function(html) {
  //       console.log(html);
  //       assert.typeOf(html, "string");
  //     });
  // });
  it("Is able to fetch from twitter", function() {
    return embed
      .fetch("https://twitter.com/slcmayor/status/1022618019904729088")
      .then(function(data) {
        console.log(data);
        console.log("----------------------------------------");
        return embed.render(data);
      })
      .then(function(html) {
        console.log(html);
        assert.typeOf(html, "string");
      });
  });

  // it("Is able to fetch from pollcaster", function() {
  //   return embed
  //     .fetch("https://www.pollcaster.com/c/poll/4xi4zsfv5gSXhnkaVoT9pfTOOgm")
  //     .then(function(data) {
  //       console.log(data);
  //       console.log("----------------------------------------");
  //       return embed.render(data);
  //     })
  //     .then(function(html) {
  //       console.log(html);
  //       assert.typeOf(html, "string");
  //     });
  // });
  /*it('Is able to fetch from Graphiq', function() {
    return embed.fetch('https://www.graphiq.com/wlp/dkAYMGlYKlD')
    .then(function(data) {
      console.log(data);
      console.log("----------------------------------------");
      return embed.render(data);
    })
    .then(function(html) {
      console.log(html);
      assert.typeOf(html, 'string');
    });
  });*/

  // it('Is able to fetch from reddit comment', function() {
  //   return embed.fetch('https://www.reddit.com/r/todayilearned/comments/4lbdfl/til_louis_armstrong_asked_richard_nixon_to_carry/')
  //   .then(function(data) {
  //     console.log(data);
  //     console.log("----------------------------------------");
  //     return embed.render(data);
  //   })
  //   .then(function(html) {
  //     console.log(html);
  //     assert.typeOf(html, 'string');
  //   });
  // });

  // it('Is able to fetch from reddit comment', function() {
  //   return embed.fetch('https://www.reddit.com/r/todayilearned/comments/4lbdfl/til_louis_armstrong_asked_richard_nixon_to_carry/d3m86v8')
  //   .then(function(data) {
  //     console.log(data);
  //     console.log("----------------------------------------");
  //     return embed.render(data);
  //   })
  //   .then(function(html) {
  //     console.log(html);
  //     assert.typeOf(html, 'string');
  //   });
  // });

  // it('Is able to fetch from youtube', function() {
  //   return embed.fetch('https://www.reddit.com/r/todayilearned/comments/4k9f47/til_hocus_pocus_may_have_been_coined_by/')
  //   .then(function(data) {
  //     console.log(data);
  //     console.log("----------------------------------------");
  //     return embed.render(data);
  //   })
  //   .then(function(html) {
  //     console.log(html);
  //     assert.typeOf(html, 'string');
  //   });
  // });

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
