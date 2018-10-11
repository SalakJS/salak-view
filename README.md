# salak-view

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]
[![David deps][david-image]][david-url]
[![NPM download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/salak-view.svg?style=flat-square
[npm-url]: https://npmjs.org/package/salak-view
[travis-image]: https://img.shields.io/travis/SalakJS/salak-view.svg?style=flat-square
[travis-url]: https://travis-ci.org/SalakJS/salak-view
[coveralls-image]: https://img.shields.io/codecov/c/github/salakjs/salak-view.svg?style=flat-square
[coveralls-url]: https://codecov.io/github/salakjs/salak-view?branch=master
[david-image]: https://img.shields.io/david/SalakJS/salak-view.svg?style=flat-square
[david-url]: https://david-dm.org/SalakJS/salak-view
[download-image]: https://img.shields.io/npm/dm/salak-view.svg?style=flat-square
[download-url]: https://npmjs.org/package/salak-view

View for SalakJS 2.0, support for multiple view engine, using [consolidate](https://github.com/tj/consolidate.js) under the hood.

## Install

```sh
$ npm install --save salak-view
```

[Supported Template Engines](https://github.com/tj/consolidate.js#supported-template-engines)

If you want to use ejs engine, You need install ejs.

```sh
$ npm install --save ejs
```

## Usage

### Config

In plugin:

```javascript
module.exports = {
  plugin: [
    {
      name: 'view',
      package: 'salak-view'
    }
  ],
  view: {
    dirname: 'view',
    extension: 'html',
    engine: '',
    cache: true,
    map: null,
    config: {}
  }
}
```

### Use in Context or Controller

user/controller/login.js

```javascript
const { Controller } = require('salak')

class Login extends Controller {
  async actionIndex () {
    await this.render('login')
  }
}

module.exports = Login
```

## API

### Options

- dirname {String} directory for storing views, default `view`
- extension {String} template file extension, default `html`
- engine {String} Engine for parse file, default ``
- cache {Boolean} Cache things for reading the file content, default `app.env === 'production'`
- map {Object} map a file extension to an engine, like `{ html: 'ejs' }`, default `null`
- config {Object} pass to view engine, default `{}`

### Controller.prototype.render(viewName, locals, module)

The function which register on or

- name {String} view filename
- locals {Object} variables for view
- module {String} the view located in, default: the current module

@return will set view html to response.body

`context.render()`, but `module` default `app.root`

### Controller.prototype.renderView(viewName, locals, module)

params is the same as Controller.prototype.renderView

@return complied html string，if file `ext` is `html` and `!options.engine && !map`, will return fs.createReadStrem(file)

`context.renderView()`, but `module` default `app.root`

## License

[MIT](LICENSE)
