# Pojo Migrator

A simple utility for migrating data stored in a a simple pojo (Plan Ol' Javascript Object).

Originally built for storing configuration values in the [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) API, but could work with any object serialization protocol.

This module is entirely synchronous right now, because `localStorage` is, but could be easily modified to suit different needs.

```javascript
var Migrator = require('..')

var migrator = new Migrator({

  // Provide a function to retrieve your data
  loadData: function() {
    return persistedData
  },

  // Provide a function to persist your data
  setData: function(data) {
    persistedData = data
  },

  // Provide an array of functions that take
  // the data, and turn it into the next format in order.
  migrations: [
    function(data) {
      var result = {}
      if (data.foo) {
        result.foos = [data.foo]
      }
      return result
    },
  ]
})

var updatedData = migrator.getData()
```
