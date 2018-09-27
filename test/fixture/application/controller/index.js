const { Controller } = require('salak')

class Index extends Controller {
  async actionView () {
    await this.view('home', {
      title: 'View'
    })
  }

  async actionRender () {
    const html = await this.render('home', {
      title: 'Render'
    })
    return html
  }

  async actionCtxView () {
    await this.ctx.view('ctx', {
      title: 'View'
    })
  }

  async actionCtxRender () {
    const html = await this.ctx.render('ctx', {
      title: 'Render'
    })

    return html
  }

  async actionHtml () {
    await this.view('hello.html')
  }

  async actionSubFile () {
    await this.view('blog', {
      title: 'Post'
    })
  }
}

module.exports = Index
