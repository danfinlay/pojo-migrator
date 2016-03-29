var test = require('tape')
var Migrator = require('..')

test('migrates as expected', function(t) {
  t.plan(3)

  var persistedData = { foo: 'bar' }

  var migrator = new Migrator({
    loadData: function() {
      return persistedData
    },
    setData: function(data) {
      persistedData = data
    },
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

  var result = migrator.getData()
  t.ok(result.foo === undefined, 'foo is now undefined')
  t.equal(result.foos[0], 'bar', 'The value was exchanged')
  t.equal(result.foos[0], persistedData.foos[0], 'The migrations were persisted')

})

