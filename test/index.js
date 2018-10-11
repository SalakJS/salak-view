const request = require('supertest')
const app = require('./fixture')

describe('test salak-view', () => {
  let callback
  beforeAll(async () => {
    callback = await app.callback()
  })

  afterAll(async () => {
    await app.close()
  })

  describe('test controller.render()', () => {
    it('should return html', async () => {
      const res = await request(callback).get('/render').expect(200)
      expect(res.text).toMatch('<title>View</title>')
    })
  })

  describe('test controller.renderView()', () => {
    it('should return html string', async () => {
      const res = await request(callback).get('/renderView').expect(200)
      expect(res.text).toMatch('<title>Render</title>')
    })
  })

  describe('test context.render()', () => {
    it('should return html', async () => {
      const res = await request(callback).get('/ctxRender').expect(200)

      expect(res.text).toMatch('<title>Ctx-View</title>')
    })
  })

  describe('test context.renderView()', () => {
    it('should return html string', async () => {
      const res = await request(callback).get('/ctxRenderView').expect(200)

      expect(res.text).toMatch('<title>Ctx-Render</title>')
    })
  })

  describe('test html file', () => {
    it('should return html file content', async () => {
      const res = await request(callback).get('/html').expect(200)

      expect(res.text).toMatch('hello')
    })
  })

  describe('test sub directory', () => {
    it('should load blog/index.ejs', async () => {
      const res = await request(callback).get('/subFile').expect(200)

      expect(res.text).toMatch('<title>Blog-Post</title>')
    })
  })
})
