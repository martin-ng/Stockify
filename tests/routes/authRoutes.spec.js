const {expect} = require('chai')
const db = require('../../server/db/index')
const User = db.model('user')

const app = require('../../server/index')
const agent = require('supertest')(app)

describe('Auth Routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/auth route', () => {
    let userOneObj = {
      email: 'cody@email.com',
      firstName: 'cody',
      lastName: 'pug',
      password: 'Abc123!@',
      cashBalance: 10000
    }

    let userTwoObj = {
      email: 'richestman@email.com',
      firstName: 'Richie',
      lastName: 'Rich',
      password: 'abcsD123!@#',
      cashBalance: 30000
    }

    let user1, user2

    beforeEach(async () => {
      user1 = await User.create(userOneObj)
    })

    describe('POST `/auth/login/` route', () => {
      it('responds with a login success and a response body', async () => {
        const response = await agent.post('/auth/login').send(userOneObj)
        expect(response.body.email).to.be.equal(user1.dataValues.email)
        expect(response.body.firstName).to.be.equal(user1.dataValues.firstName)
        expect(response.body.lastName).to.be.equal(user1.dataValues.lastName)
      })
    }) // end of post login tests

    describe('POST `/auth/signup/` route', () => {
      it('responds with a sign up success', async () => {
        const response = await agent.post('/auth/signup/').send(userTwoObj)
        expect(response.body.email).to.be.equal(userTwoObj.email)
        expect(response.body.firstName).to.be.equal(userTwoObj.firstName)
        expect(response.body.lastName).to.be.equal(userTwoObj.lastName)
        expect(response.body.cashBalance).to.be.equal(
          userTwoObj.cashBalance.toFixed(2)
        )
      })
    }) // end of post sign up tests

    describe('POST `/auth/logout/` route', () => {
      it('responds with a logged out user', async () => {
        await agent.post('/auth/login').send(userOneObj)
        const response = await agent.post('/auth/logout')
        expect(response.body.email).to.be.equal(undefined)
        expect(response.firstName).to.be.equal(undefined)
        expect(response.lastName).to.be.equal(undefined)
      })
    }) // end of post log out tests
  })
})
