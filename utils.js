const path = require('path');
const fs = require('fs');
const _root = path.resolve(__dirname, '..');

function root(args) {
    args = Array.prototype.slice.call(arguments, 0);
    return path.join.apply(path, [_root].concat(args));
}

function file2object(file) {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
}

module.exports = {
    root: root,
    file2object: file2object
};
