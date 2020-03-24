const {expect} = require('chai')
const db = require('../../server/db/index')
const Stocks = db.model('stocks')
const User = db.model('user')

const app = require('../../server/index')
const supertest = require('supertest')
const agent = require('supertest')(app)

const seed = require('../../script/seed')

xdescribe('Transactions Routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  // run seed file
  describe('seed script in user routes', () => {
    it('seeds successfully', seed)
  })

  describe('Logged in user', () => {
    let user
    beforeEach(() => {
      user = {
        email: 'testuser@email.com'
      }
      req.login(user, err => (err ? next(err) : res.json(user)))
    })
  })

  describe('GET `/api/portfolio` route', () => {
    it('gets all the stocks the user owns', async () => {
      console.log('testing this test')
      //   console.log("req.user", req.user)
      // const response = await agent.get('/users/2/portfolio').expect(200)
      // console.log("response: ", response)
      // expect(response).to.equal('promise resolved')
    })
  })
})
