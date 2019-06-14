const path = require('path');
const assert = require('assert');
const { open } = require('../');

if (require.main == module) {
  const lines = [...open(path.join(__dirname, 'file.txt'))];
  assert.equal(lines.length, 58);
  assert.equal(lines[24], 'Quick tutorial');
  console.log('passed!');
}
else {
  process.exit(1);
}
