module.exports = {
  plugin: [
    {
      name: 'view',
      package: require('../../../..')
    }
  ],
  view: {
    dirname: 'view',
    extension: 'ejs'
  }
}
