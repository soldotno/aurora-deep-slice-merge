Aurora Deep Slice, Merge and Append
===================================

Merge and slice the enumerable attributes of two Aurora configs deeply.

Example
=======

```js
const util = require('util')
const { slice, merge } = require('aurora-deep-slice-merge');

let configPage1 = { meta: { title: 'Blabla' },
  root:
   { component: 'awesome-app', props:
      { children:
         [ { component: 'awesome-module', props: { a: 5 } },
           { component: 'awesome-module', props: { b: 10 } },
           { component: 'awesome-hom', props: {
             children:
              [ { component: 'awesome-module', props: { c: 15 } } ] } } ] } } }

let configPage2 = { meta: { title: 'Blabla' },
  root:
   { component: 'awesome-app', props:
      { children:
         [ null,
           null,
           { component: 'awesome-hom', props:
             { children:
              [ null,
                { component: 'awesome-module', props: { d: 20 } },
                { component: 'awesome-hom', props: {
                  children:
                   [ { component: 'awesome-module', props: { e: 25 } },
                     { component: 'awesome-module', props: { f: 30 } } ] } } ] } } ] } } }

console.log(util.inspect(merge(configPage1, configPage2)));
```

output:

```js
{ meta: { title: 'Blabla' },
  root:
   { component: 'awesome-app', props:
      { children:
         [ { component: 'awesome-module', props: { a: 5 } },
           { component: 'awesome-module', props: { b: 10 } },
           { component: 'awesome-hom', props:
              { children:
                 [ { component: 'awesome-module', props: { c: 15 } },
                   { component: 'awesome-module', props: { d: 20 } },
                   { component: 'awesome-hom', props:
                      { children:
                         [ { component: 'awesome-module', props: { e: 25 } },
                           { component: 'awesome-module', props: { f: 30 } } ] } } ] } } ] } } }
```

Append a list of children to an Aurora configs (shallow).

Example
=======

```js
const util = require('util')
const { append } = require('aurora-deep-slice-merge');

let config = { meta: { title: 'Blabla' },
  root:
   { component: 'awesome-app', props:
      { children:
         [ { component: 'awesome-module', props: { a: 5 } },
           { component: 'awesome-module', props: { b: 10 } } ] } } }

let childrenToAppend = [
  { component: 'awesome-hom', props:
    { children:
      [ { component: 'awesome-module', props: { c: 15 } },
        { component: 'awesome-module', props: { d: 20 } },
        { component: 'awesome-hom', props:
          { children:
            [ { component: 'awesome-module', props: { e: 25 } },
              { component: 'awesome-module', props: { f: 30 } } ] } } ] } } ]

console.log(util.inspect(append(config, childrenToAppend)));
```

```js
{ meta: { title: 'Blabla' },
  root:
   { component: 'awesome-app', props:
      { children:
         [ { component: 'awesome-module', props: { a: 5 } },
           { component: 'awesome-module', props: { b: 10 } },
           { component: 'awesome-hom', props:
              { children:
                 [ { component: 'awesome-module', props: { c: 15 } },
                   { component: 'awesome-module', props: { d: 20 } },
                   { component: 'awesome-hom', props:
                      { children:
                         [ { component: 'awesome-module', props: { e: 25 } },
                           { component: 'awesome-module', props: { f: 30 } } ] } } ] } } ] } } }
```

Methods
=======

```js
const { slice, merge, append } = require('aurora-deep-slice-merge');

/**
 * Slice a config x from startIndex with a specified amount of elements
 */
slice(x, startIndex, amount)

/**
 * Merge config x and y
 */
merge(x, y)

/**
 * Append list of children to config x
 */
append(x, list)
```
-----------

Install
=======

With [npm/github](http://npmjs.org) do:

```
npm install soldotno/aurora-deep-slice-merge
```
