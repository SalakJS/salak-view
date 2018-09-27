const consolidate = require('consolidate')
const path = require('path')
const fs = require('fs')
const getPath = require('./get_path')

const templatePathCache = new Map()

module.exports = (options = {}, app) => {
  options = Object.assign({
    dirname: 'view',
    extension: 'html',
    engine: '',
    cache: app.env === 'production',
    map: null,
    config: {}
  }, options)

  const { dirname, extension, engine, cache, map } = options

  const config = Object.assign({
    cache
  }, options.config)

  return {
    controller: {
      async render (relPath, locals, module) {
        if (!module) {
          module = this.module
        }

        const html = await this.ctx.render(relPath, locals, module)
        return html
      },
      async view (relPath, locals, module) {
        if (!module) {
          module = this.module
        }

        await this.ctx.view(relPath, locals, module)
      }
    },
    context: {
      async render (relPath, locals = {}, module = app.root) {
        const key = `${module}/${relPath}`
        let paths = templatePathCache.get(key)
        const moduleDir = app.modules[module]

        if (!moduleDir) {
          throw new Error(`View: ${module} not found.`)
        }

        const dir = path.join(moduleDir, dirname)

        if (!paths) {
          paths = await getPath(dir, relPath, extension)
          templatePathCache.set(key, paths)
        }

        const { ext, rel } = paths

        // find engine
        if (ext === 'html' && !engine && !map) { // send html
          return fs.createReadStream(rel)
        }

        const state = Object.assign({}, config || {}, this.state || {}, locals)

        const engineName = (map && map[ext] ? map[ext] : engine) || ext
        const render = consolidate[engineName]

        if (!render) {
          throw new Error(`Engine not found for the ${ext} file extension.`)
        }

        const html = await render(rel, state)

        return html
      },
      async view (relPath, locals, module = app.root) {
        this.type = 'text/html'
        this.body = await this.render(relPath, locals, module)
      }
    }
  }
}
