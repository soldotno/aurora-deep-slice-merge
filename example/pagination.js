var slice = require('../').slice;
var merge = require('../').merge;

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
      }, {
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
    }
  }
};

var page1 = clone(slice(config, 0, 3));
var page2 = clone(slice(config, 3, 6));
var merged = merge(page1, page2);

console.log('initial:', util.inspect(config, { colors: true, depth: 20 }));
console.log('page-1:', util.inspect(page1, { colors: true, depth: 20 }));
console.log('page-2:', util.inspect(page2, { colors: true, depth: 20 }));
console.log('merged:', util.inspect(merged, { colors: true, depth: 20 }));
