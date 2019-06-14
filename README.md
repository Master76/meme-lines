# meme-lines

Read lines synchronously.

## Usage
```javascript
const meme = require('meme-lines');
const file = meme.open('file', 'utf8');

// use the iterator
for (const line of file) {
  console.log(line);
}

// use readlines, this will read the whole file
const lines = file.readLines();

// use a while loop
let line;
while ((line = file.readLine()) != undefined) {
  console.log(line);
}
```
