Aurora Deep Slice and Merge
===========================

Merge and slice the enumerable attributes of two Aurora configs deeply.

Example
=======

```js
const util = require('util')
const { slice, merge } = require('aurora-deep-slice-merge');

let configPage1 = { meta: { title: 'Blabla' },
  app:
   { type: 'awesome-app',
     options:
      { modules:
         [ { type: 'awesome-module', options: { a: 5 } },
           { type: 'awesome-module', options: { b: 10 } },
           { type: 'awesome-hom', options: {
             modules:
              [ { type: 'awesome-module', options: { c: 15 } } ] } } ] } } }

let configPage2 = { meta: { title: 'Blabla' },
  app:
   { type: 'awesome-app',
     options:
      { modules:
         [ null,
           null,
           { type: 'awesome-hom', options: {
             modules:
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
   { type: 'awesome-app',
     options:
      { modules:
         [ { type: 'awesome-module', options: { a: 5 } },
           { type: 'awesome-module', options: { b: 10 } },
           { type: 'awesome-hom',
             options:
              { modules:
                 [ { type: 'awesome-module', options: { c: 15 } },
                   { type: 'awesome-module', options: { d: 20 } },
                   { type: 'awesome-hom',
                     options:
                      { modules:
                         [ { type: 'awesome-module', options: { e: 25 } },
                           { type: 'awesome-module', options: { f: 30 } } ] } } ] } } ] } } }
```

Methods
=======

```js
const { slice, merge } = require('aurora-deep-slice-merge')

slice(x, startIndex, amount)
merge(x, y)
```
-----------

Install
=======

With [npm/github](http://npmjs.org) do:

```
npm install soldotno/aurora-deep-slice-merge
```
