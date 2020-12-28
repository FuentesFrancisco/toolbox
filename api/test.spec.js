const app = require('./index')
const { expect, assert } = require('chai')
const request = require('supertest')

describe('Test endpoint get a /iecho', () => {
  it('Si es llamado sin querys debe retornar error 400 y devolver un objeto con dicho formato {"error": "no text"}', done => {
    request(app)
      .get('/iecho')
      .then(res => {
        expect(res.statusCode).to.equal(400)
        assert.typeOf(res.body, 'object')
        expect(res.body).to.have.property('error')
        expect(res.body).to.deep.equal({ error: 'no text' })
        done()
      })
  })
  it('Si es llamado con el valor text de la query undefined debe retornar error 400 y devolver un objeto con dicho formato {"error": "no text"}', done => {
    request(app)
      .get('/iecho?text=')
      .then(res => {
        expect(res.statusCode).to.equal(400)
        assert.typeOf(res.body, 'object')
        expect(res.body).to.have.property('error')
        expect(res.body).to.deep.equal({ error: 'no text' })
        done()
      })
  })
  it('Si es llamado con el valor text con longitud menor a 2 caracteres  debe retornar error 400 y devolver un objeto con dicho formato {"error": "no text"}', done => {
    request(app)
      .get('/iecho?text=a')
      .then(res => {
        expect(res.statusCode).to.equal(400)
        assert.typeOf(res.body, 'object')
        expect(res.body).to.have.property('error')
        expect(res.body).to.deep.equal({ error: 'no text' })
        done()
      })
  })
  it('Si es llamado con el valor text de la query correctamente debe retornar status 200 y devolver un objeto con la propiedad text y un value del text enviado invertido', done => {
    request(app)
      .get('/iecho?text=test')
      .then(res => {
        expect(res.statusCode).to.equal(200)
        assert.typeOf(res.body, 'object')
        expect(res.body).to.have.property('text')
        expect(res.body).to.deep.equal({ text: 'tset' })
        done()
      })
  })
  it('Si es llamado con el valor text de la query correctamente y es palindrome debe retornar status 200 y devolver un objeto con la propiedad text con un value del text enviado invertido y la propiedad palindrome con un value true', done => {
    request(app)
      .get('/iecho?text=reconocer')
      .then(res => {
        expect(res.statusCode).to.equal(200)
        assert.typeOf(res.body, 'object')
        expect(res.body).to.have.property('text')
        expect(res.body).to.have.property('palindrome')
        expect(res.body).to.deep.equal({ text: 'reconocer', palindrome: true })
        done()
      })
  })
})
