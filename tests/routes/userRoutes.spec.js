const {expect} = require('chai')
const db = require('../../server/db/index')
const Stocks = db.model('stocks')
const User = db.model('user')

const app = require('../../server/index')
const supertest = require('supertest')
const agent = require('supertest')(app)

const seed = require('../../script/seed')

describe('User Routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  // run seed file
  describe('seed script in user routes', () => {
    it('seeds successfully', seed)
  })

  describe('GET `/api/users/` route', () => {
    it('gets all the stocks the user owns', async () => {
      console.log('testing this test')

      const response = await agent.get('/users/2/').expect(200)
      console.log('response: ', response.body)
      // expect(response).to.equal('promise resolved')
    })
  })
})
