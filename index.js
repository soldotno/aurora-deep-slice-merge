(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.merge = factory();
  }
}(this, function() {
  function isObject(a) {
    return (typeof a === 'object') && !Array.isArray(a);
  }

  function isArray(a) {
    return Array.isArray(a);
  }

  function clone(o) {
    var result;

    try {
      result = JSON.parse(JSON.stringify(o));
    } catch (e) {}

    return result || {};
  }

  function merge(_target, _src) {
    var target = clone(_target);
    var src = clone(_src);
    var array = Array.isArray(src);
    var dst = array && [] || {};

    if (array) {
      target = target || [];
      dst = dst.concat(target);
      src.forEach(function(e, i) {
        if (typeof dst[i] === 'undefined') {
          dst[i] = e;
        } else if (typeof e === 'object' && e) {
          dst[i] = merge(target[i], e);
        } else {
          if (target.indexOf(e) === -1) {
            dst.push(e);
          }
        }
      });
      dst = dst.filter(function(elem) { return !!elem; });
    } else {
      if (target && typeof target === 'object') {
        Object.keys(target).forEach(function (key) {
          dst[key] = target[key];
        })
      }
      Object.keys(src).forEach(function (key) {
        if (typeof src[key] !== 'object' || !src[key]) {
          dst[key] = src[key];
        }
        else {
          if (!target) target = {};

          if (!target[key]) {
            dst[key] = src[key];
          } else {
            dst[key] = merge(target[key], src[key]);
          }
        }
      });
    }

    return dst;
  }

  function slice(_obj, startIndex, amount) {
    var obj = copy(obj);
    var totalIndex = 0;
    var sliced = 0;
    var result = {};

    /**
     * Handle the .modules arrays specifically
     */
    function deepSliceRecursivelyArray(subObjectArray, subResultArray) {
      subObjectArray.forEach(function(arrayItem, i) {
        /**
         * Only do counting on
         * non-higher-level modules
         */
        if (!isArray((subObjectArray[i].options || {}).modules)) {
          /**
           * Only start adding if
           * we've reached the start index
           */
          if (totalIndex++ >= startIndex) {
            if (sliced++ < amount) {
              subResultArray[i] = {};
              deepSliceRecursivelyObject(arrayItem, subResultArray[i]);
            }
          }
        } else if (sliced < amount) {
          subResultArray[i] = {};
          deepSliceRecursivelyObject(arrayItem, subResultArray[i]);
        }
      });
    }

    /**
     * Recursively slice an object
     */
    function deepSliceRecursivelyObject(subObject, subResult) {
      for (var property in subObject) {
        if (!subObject[property]) {
          continue;
        }

        if (isObject(subObject[property]) && !isArray(subObject[property])) {
          subResult[property] = {};
          deepSliceRecursivelyObject(subObject[property], subResult[property])
        } else if (isArray(subObject[property]) && property === 'modules') {
          subResult[property] = [];
          deepSliceRecursivelyArray(subObject[property], subResult[property])
        } else if (isArray(subObject[property])) {
          subResult[property] = subObject[property];
        } else {
          subResult[property] = subObject[property];
        }
      }
    }

    deepSliceRecursivelyObject(obj, result);

    return result;
  }

  function append(obj, list) {
    var result = clone(obj);

    if (
      !result ||
      !result.app ||
      !result.app.options ||
      !result.app.options.modules
    ) {
      return result;
    }

    if (!list || !list.length) {
      return result;
    }

    result.app.options.modules = result.app.options.modules.concat(clone(list));

    return result;
  }

  return {
    slice: slice,
    merge: merge,
    append: append
  };
}));
