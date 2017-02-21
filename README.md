Aurora Deep Slice, Merge and Append
===================================

[![Greenkeeper badge](https://badges.greenkeeper.io/soldotno/aurora-deep-slice-merge.svg)](https://greenkeeper.io/)

Tool for slicing, merging and appending to Aurora configuration objects.

Example
=======

```js
const util = require('util')
const { slice, merge } = require('aurora-deep-slice-merge');

let configPage1 = { meta: { title: 'Blabla' },
  app:
   { type: 'awesome-app', options:
      { modules:
         [ { type: 'awesome-module', options: { a: 5 } },
           { type: 'awesome-module', options: { b: 10 } },
           { type: 'awesome-hom', options: {
             modules:
              [ { type: 'awesome-module', options: { c: 15 } } ] } } ] } } }

let configPage2 = { meta: { title: 'Blabla' },
  app:
   { type: 'awesome-app', options:
      { modules:
         [ null,
           null,
           { type: 'awesome-hom', options:
             { modules:
              [ null,
                { type: 'awesome-module', options: { d: 20 } },
                { type: 'awesome-hom', options: {
                  modules:
                   [ { type: 'awesome-module', options: { e: 25 } },
                     { type: 'awesome-module', options: { f: 30 } } ] } } ] } } ] } } }

console.log(util.inspect(merge(configPage1, configPage2)));
```

output:

```js
{ meta: { title: 'Blabla' },
  app:
   { type: 'awesome-app', options:
      { modules:
         [ { type: 'awesome-module', options: { a: 5 } },
           { type: 'awesome-module', options: { b: 10 } },
           { type: 'awesome-hom', options:
              { modules:
                 [ { type: 'awesome-module', options: { c: 15 } },
                   { type: 'awesome-module', options: { d: 20 } },
                   { type: 'awesome-hom', options:
                      { modules:
                         [ { type: 'awesome-module', options: { e: 25 } },
                           { type: 'awesome-module', options: { f: 30 } } ] } } ] } } ] } } }
```

Append a list of modules to an Aurora configs (shallow).

Example
=======

```js
const util = require('util')
const { append } = require('aurora-deep-slice-merge');

let config = { meta: { title: 'Blabla' },
  app:
   { type: 'awesome-app', options:
      { modules:
         [ { type: 'awesome-module', options: { a: 5 } },
           { type: 'awesome-module', options: { b: 10 } } ] } } }

let modulesToAppend = [
  { type: 'awesome-hom', options:
    { modules:
      [ { type: 'awesome-module', options: { c: 15 } },
        { type: 'awesome-module', options: { d: 20 } },
        { type: 'awesome-hom', options:
          { modules:
            [ { type: 'awesome-module', options: { e: 25 } },
              { type: 'awesome-module', options: { f: 30 } } ] } } ] } } ]

console.log(util.inspect(append(config, modulesToAppend)));
```

```js
{ meta: { title: 'Blabla' },
  app:
   { type: 'awesome-app', options:
      { modules:
         [ { type: 'awesome-module', options: { a: 5 } },
           { type: 'awesome-module', options: { b: 10 } },
           { type: 'awesome-hom', options:
              { modules:
                 [ { type: 'awesome-module', options: { c: 15 } },
                   { type: 'awesome-module', options: { d: 20 } },
                   { type: 'awesome-hom', options:
                      { modules:
                         [ { type: 'awesome-module', options: { e: 25 } },
                           { type: 'awesome-module', options: { f: 30 } } ] } } ] } } ] } } }
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
 * Append list of modules to config x
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
