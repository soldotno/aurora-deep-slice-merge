var append = require('../').append;
var util = require('util');

function clone(elem) {
  return JSON.parse(JSON.stringify(elem));
}

const config = {
  meta: {
    title: 'Blabla'
  },
  app: {
    type: 'awesome-app',
    options: {
      modules: [{
        type: 'awesome-module',
        options: {
          a: 5
        }
      }, {
        type: 'awesome-module',
        options: {
          b: 10
        }
      }]
    }
  }
};

const appendage = [{
  type: 'awesome-hom',
  options: {
    modules: [{
      type: 'awesome-module',
      options: {
        c: 15
      }
    }, {
      type: 'awesome-module',
      options: {
        d: 20
      }
    }, {
      type: 'awesome-hom',
      options: {
        modules: [{
          type: 'awesome-module',
          options: {
            e: 25
          }
        }, {
          type: 'awesome-module',
          options: {
            f: 30
          }
        }]
      }
    }]
  }
}]


var merged = append(config, appendage);

console.log('initial:', util.inspect(config, { colors: true, depth: 20 }));
console.log('appendage:', util.inspect(appendage, { colors: true, depth: 20 }));
console.log('merged:', util.inspect(merged, { colors: true, depth: 20 }));
