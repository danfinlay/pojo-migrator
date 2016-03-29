function Migrator(opts) {

  this.loadData = opts.loadData
  this.setData = opts.setData
  this.migrations = opts.migrations

  this.data = this.loadData() || {}
  this.getData = function() { return this.data.data }

  this.migrateData()
}

Migrator.prototype.migrateData = function() {
  var self = this
  var updatedData = self.data
  this.migrations.sort(function(a, b) {
    return a.version - b.version
  })
  .forEach(function(migration) {
    if (migration.version > updatedData.meta.version) {
      updatedData.data = migration.migrate(updatedData.data)
      updatedData.meta.version = migration.version
    }
  })

  this.data = updatedData
  this.setData(this.data)
}

module.exports = Migrator
