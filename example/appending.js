var append = require('../').append;
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
      }]
    }
  }
};

const appendage = [{
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


var merged = append(config, appendage);

console.log('initial:', util.inspect(config, { colors: true, depth: 20 }));
console.log('appendage:', util.inspect(appendage, { colors: true, depth: 20 }));
console.log('merged:', util.inspect(merged, { colors: true, depth: 20 }));
