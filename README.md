# embeddable

Embed media via oEmbed or openGraph

# Example of using the embedable code to fetch and render a uri

```javascript
// Require the embedable library
var Embedable = require('embedable');

// Instantiate the embedable object
var embed = Embedable();

// Asynchronously fetch metadata for a URI
var data = embed.fetch('https://www.youtube.com/watch?v=igUMDICqTpQ');

// Asynchronously render html with the metadata
var html = data.then(function(data) {
  return embed.render(data);
});
```
