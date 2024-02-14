# embeddable

Embed media via oEmbed or openGraph

# Install

`npm install ddm-embeddable`

# Example of using the embedable code to fetch and render a uri

```javascript
// Require the embedable library
var Embeddable = require('ddm-embeddable');

// Instantiate the embedable object
var embed = Embeddable();

// Asynchronously fetch metadata for a URI
var data = embed.fetch('https://www.youtube.com/watch?v=igUMDICqTpQ');

// Asynchronously render html with the metadata
var html = data.then(function(data) {
  return embed.render(data);
});
```
