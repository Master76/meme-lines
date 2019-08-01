const path = require('path');
const assert = require('assert');
const { open } = require('../');

if (require.main == module) {
  let lines = [...open(path.join(__dirname, 'file.txt'))];
  assert.equal(lines.length, 58);
  assert.equal(lines[24], 'Quick tutorial');
  
  lines = [...open(path.join(__dirname, 'verylong.txt'))];
  assert.equal(lines.length, 7);
  assert.equal(lines[0].length, 2180);
  assert.equal(lines[3].length, 1370);
  assert.equal(lines[5], '2003 before Microsoft released the Group Policy Management Console.');
  assert.equal(lines[6], '');

  console.log('passed!');
}
else {
  process.exit(1);
}
