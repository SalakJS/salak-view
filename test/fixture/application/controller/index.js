const { Controller } = require('salak')

class Index extends Controller {
  async actionRender () {
    await this.render('home', {
      title: 'View'
    })
  }

  async actionRenderView () {
    const html = await this.renderView('home', {
      title: 'Render'
    })
    return html
  }

  async actionCtxRender () {
    await this.ctx.render('ctx', {
      title: 'View'
    })
  }

  async actionCtxRenderView () {
    const html = await this.ctx.renderView('ctx', {
      title: 'Render'
    })

    return html
  }

  async actionHtml () {
    await this.render('hello.html')
  }

  async actionSubFile () {
    await this.render('blog', {
      title: 'Post'
    })
  }
}

module.exports = Index
