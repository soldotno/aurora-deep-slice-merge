/**
 * Test framework
 */
var test = require('tape');

/**
 * The functions we are testing
 */
var slice = require('./index').slice;
var merge = require('./index').merge;
var append = require('./index').append;

/**
 * Dummy config to paginate (slice and merge)
 */
var fullConfig = {
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

/**
 * Dummy config to append modules to
 */
const partialConfig = {
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

/**
 * Dummy modules to append
 */
const modulesToAppend = [{
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
}, {
  type: 'awesome-hom',
  options: {
    modules: [{
      type: 'awesome-module',
      options: {
        g: 35
      }
    }, {
      type: 'awesome-module',
      options: {
        h: 40
      }
    }]
  }
}];

/**
 * -----
 * Tests
 * -----
 */

test('slice works correctly (case 1)', function(t) {
  t.plan(1);

  var page1 = slice(fullConfig, 0, 3);

  t.deepEqual(page1, {
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
            }]
          }
        }]
      }
    }
  });
});

test('slice works correctly (case 2)', function(t) {
  t.plan(1);

  var page1 = slice(fullConfig, 3, 6);

  t.deepEqual(page1, {
    meta: {
      title: 'Blabla'
    },
    app: {
      type: 'awesome-app',
      options: {
        modules: [
          ,
          , {
          type: 'awesome-hom',
          options: {
            modules: [
              , {
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
  });
});

test('merge works correctly', function(t) {
  t.plan(1);

  var page1 = slice(fullConfig, 0, 3);
  var page2 = slice(fullConfig, 3, 6);
  var merged = merge(page1, page2);

  t.deepEqual(merged, {
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
  });
});

test('append works correctly', function(t) {
  t.plan(1);

  var merged = append(partialConfig, modulesToAppend);

  t.deepEqual(merged, {
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
        }, {
          type: 'awesome-hom',
          options: {
            modules: [{
              type: 'awesome-module',
              options: {
                g: 35
              }
            }, {
              type: 'awesome-module',
              options: {
                h: 40
              }
            }]
          }
        }]
      }
    }
  });
});
