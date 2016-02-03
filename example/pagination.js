var slice = require('../').slice;
var merge = require('../').merge;
var util = require('util');

function clone(elem) {
  return JSON.parse(JSON.stringify(elem));
}

const config = {
  meta: {
    title: 'Blabla'
  },
  root: {
    component: 'awesome-app',
    props: {
      children: [{
        component: 'awesome-module',
        props: {
          a: 5
        }
      }, {
        component: 'awesome-module',
        props: {
          b: 10
        }
      }, {
        component: 'awesome-hom',
        props: {
          children: [{
            component: 'awesome-module',
            props: {
              c: 15
            }
          }, {
            component: 'awesome-module',
            props: {
              d: 20
            }
          }, {
            component: 'awesome-hom',
            props: {
              children: [{
                component: 'awesome-module',
                props: {
                  e: 25
                }
              }, {
                component: 'awesome-module',
                props: {
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
