function Migrator(opts) {

  this.loadData = opts.loadData
  this.setData = opts.setData
  this.migrations = opts.migrations

  this.data = this.loadData() || {}
  this.getData = function() { return this.data }

  this.migrateData()
}

Migrator.prototype.migrateData = function() {
  var self = this
  this.migrations.forEach(function(migration) {
    self.data = migration(self.data)
  })
  this.setData(this.data)
}

module.exports = Migrator
