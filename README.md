# youtube-url-parser

[![Build Status](https://travis-ci.org/iktakahiro/youtube-url-parser.svg?branch=master)](https://travis-ci.org/iktakahiro/youtube-url-parser)

## Install

```bash
npm install @iktakahiro/youtube-url-parser
```

## How to use

```typescript
import { YouTubeURLParser } from "@iktakahiro/youtube-url-parser"

const parser = new YouTubeURLParser("https://youtu.be/7lmCu8wz8ro?t=2m10s")

console.log(parser.isValid())
// -> true
console.log(parser.getId())
// -> "7lmCu8wz8ro"
console.log(parser.getCanonicalURL())
// -> "https://www.youtube.com/watch?v=7lmCu8wz8ro&t=2m10s"
console.log(parser.getShortURL())
// -> "https://youtu.be/7lmCu8wz8ro&t=2m10s"
console.log(parser.getThumbnailURL())
// -> "https://img.youtube.com/vi/7lmCu8wz8ro/0.jpg"
console.log(parser.getStartAtSecound())
// -> 130 (2m * 60s + 10s)
```

`getIframe()` method returns HTML strings for embedding.

```js
console.log(parser.getIframe())
```

```html
<div class="embed-responsive embed-responsive-16by9">
<iframe
   class="embed-responsive-item" type="text/html"
   src="https://www.youtube.com/embed/7lmCu8wz8ro?rel=0&amp;start=4830"
   frameborder="0" allowfullscreen />
</div>
```

with options:

```js
options = {
  allowFullScreen: false,
  frameBorder: 1,
  noCookie: true,
}
console.log(parser.getIframe(options))
```

```html
<div class="embed-responsive embed-responsive-16by9">
<iframe
   class="embed-responsive-item" type="text/html"
   src="https://www.youtube-nocookie.com/embed/7lmCu8wz8ro?rel=0&amp;start=4830"
   frameborder="1" />
</div>
```

## Test

```bash
npm test
```
