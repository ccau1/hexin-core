const fs = require('fs');
const path = require('path');

const dirRequire = function(dir, container) {
  fs.readdirSync(dir).forEach(file => {
    const { name } = path.parse(file);
    file = `${dir}/${file}`;
    if (fs.statSync(file).isDirectory()) {
      container[name] = {};
      dirRequire(file, container[name]);
    } else {
      container[name] = require(file); // eslint-disable-line import/no-dynamic-require
    }
  });
};

const base = {};
dirRequire(path.join(__dirname, 'defines'), base);

const displays = {};
dirRequire(path.join(__dirname, 'locales'), displays);

function _process(o, s) {
  function isObject(obj) {
    return obj && typeof obj === 'object';
  }
  function isArray(obj) {
    return isObject(obj) && obj instanceof Array;
  }

  if (isArray(o)) {
    for (let i = 0; i < o.length; i++) {
      _process(o[i], s ? s[i] : null);
    }
  } else if (isObject(o)) {
    let end = true;
    Object.keys(o).forEach(k => {
      if (isArray(o[k]) || isObject(o[k])) {
        _process(o[k], s ? s[k] : null);
        end = false;
      } else if (s && s[k]) {
        o[k] = {
          id: o[k],
          key: k,
          displayName: s[k]
        };
      }
    });
    if (end) {
      o.toList = function() {
        const list = [];
        Object.keys(o).forEach(k => {
          if (isObject(o[k])) {
            list.push(o[k]);
          }
        });
        return list;
      };
    }
  }
}

function clone(obj) {
  if (Object.prototype.toString.call(obj) === '[object Array]') {
    const out = [];
    let i = 0;
    const len = obj.length;
    for (; i < len; i++) {
      out[i] = clone(obj[i]);
    }
    return out;
  }
  if (typeof obj === 'object') {
    const out = {};
    Object.keys(obj).forEach(objKey => {
      out[objKey] = clone(obj[objKey]);
    });
    return out;
  }
  return obj;
}

const defines = {};
Object.keys(displays).forEach(lang => {
  defines[lang] = clone(base);
  _process(defines[lang], displays[lang]);
});
Object.keys(displays).forEach(lang => {
  base[lang] = defines[lang];
});

exports.defines = base;
