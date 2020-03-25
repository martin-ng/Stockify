const {expect} = require('chai')
const db = require('../../server/db/index')
const User = db.model('user')
const Transactions = db.model('transactions')

const app = require('../../server/index')
const agent = require('supertest')(app)

describe('Transaction Routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/transaction route', () => {
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

    describe('GET `/api/transactions/` route', () => {
      it('responds with a login success and a transaction history', async () => {
        const response = await agent.post('/auth/login').send(userOneObj)
        console.log('response: ', response)
        await agent.get('/api/transactions').expect(200)
      })
    }) // end of get transaction tests
  })
})
