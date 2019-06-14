const fs = require('fs');

const DansGame = Object.freeze({
  encoding: 'utf-8',
  bufferSize: 1024
});

class FeelsGoodMan {
  /**
   * @param {number} fd
   * @param {string} encoding
   */
  constructor(fd, encoding) {
    if (!encoding) {
      encoding = DansGame.encoding;
    }
    this.fd = fd;
    this.encoding = encoding;
    this.bufferSize = DansGame.bufferSize;
    this.bytesPos = 0;
    this.bytesRead = 0;
    this.bytesBuffer = Buffer.alloc(this.bufferSize);
    /** @type {string[]} */
    this.memes = [];
    this.mi = 0;
  }

  readLine() {
    if (this.fd == -1) return undefined;
    if (this.mi < this.memes.length - 1) {
      return this.memes[this.mi++];
    }
    if (this.bytesRead = fs.readSync(this.fd, this.bytesBuffer, 0, this.bufferSize, this.bytesPos)) {
      this.bytesPos += this.bytesRead;
      const text = this.bytesBuffer.toString(this.encoding, 0, this.bytesRead);
      const lines = text.split(/\r\n|\n/);
      if (this.memes.length) {
        const unfinished = this.memes.pop();
        lines[0] = unfinished + lines[0];
      }
      this.memes.push(...lines);
      this.mi++;
      return lines[0];
    }
    // end of file
    else {
      fs.closeSync(this.fd);
      this.fd = -1;
      return this.memes[this.mi++];
    }
  }

  readLines() {
    return [...this];
  }

  /**
   * @generator
   * @yields {string}
   */
  *[Symbol.iterator]() {
    let meme;
    while ((meme = this.readLine()) != undefined) {
      yield meme;
    }
  }
}

/**
 * @param {import("fs").PathLike} file
 * @param {string} encoding
 */
function open(file, encoding = null) {
  const fd = fs.openSync(file, 'r');
  return new FeelsGoodMan(fd, encoding);
}

module.exports = { open };
