# Pojo Migrator

A simple utility for migrating data stored in a a simple pojo (Plan Ol' Javascript Object).

Originally built for storing configuration values in the [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) API, but could work with any object serialization protocol.

This module is entirely synchronous right now, because `localStorage` is, but could be easily modified to suit different needs.

```javascript
var Migrator = require('..')

// In this example, our existing data looks like this.
var persistedData = {

  // Note the mandatory and reserved `meta` key,
  // with a mandatory `version` number.
  meta: {
    version: 1
  },

  // All your data is held in your own structure
  // Under the root `data` key.
  data: {
    foo: 'bar'
  }
}

var migrator = new Migrator({

  // Must provide a method to load existing data.
  // Defaults to empty object ({})
  loadData: function() {
    return persistedData
  },

  // Must provide a method to persist updated data
  setData: function(data) {
    persistedData = data
  },

  migrations: [

    // Each `migrate` function will be run in order.
    // It will be passed the contents of the `data` key.
    // The `meta` object and version will be updated automatically.
    {
      version: 1,
      migrate: function(data) {
        return data.config // Will error if run
      }
    },
    {
      version: 2,
      migrate: function(data) {
        var result = {}
        if (data.foo) {
          result.foos = [data.foo]
        }
        return result
      }
    },

    // Migrations do not need to be in order
    // As long as their version keys are ordered.
    {
      version: 0,
      migrate: function(data) {
        var result = {}
        if (data.foo) {
          result.foo = data
        }
        return result
      }
    }
  ]
})

// The result of `getData` is just your `data` key.
// You can pretty much ignore the versioning once you're set up!
var result = migrator.getData()

// After making changes, be sure to tell your migrator to `saveData`.
// This will automatically persist with the method you've defined in your
// `setData` method, but keeping the `meta` key up to date with the version.
result.foos.push('baz')
migrator.saveData(result)
```
