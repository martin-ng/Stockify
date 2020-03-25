const {expect} = require('chai')
const db = require('../../server/db/index')
const User = db.model('user')
const Transactions = db.model('transactions')

const app = require('../../server/index')

const supertest = require('supertest')
// to make authenticated tests persist
const agent = supertest.agent(app)

describe('Transaction Routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/transaction route', () => {
    let userOneObj = {
      id: 1,
      email: 'cody@email.com',
      firstName: 'cody',
      lastName: 'pug',
      password: 'Abc123!@'
    }

    let userTwoObj = {
      id: 2,
      email: 'richestman@email.com',
      firstName: 'Richie',
      lastName: 'Rich',
      password: 'abcsD123!@#',
      cashBalance: 30000
    }

    let transOneObj = {
      action: 'BUY',
      symbol: 'TSLA',
      priceAtPurchase: 400,
      totalShares: 10,
      userId: 2
    }

    let transTwoObj = {
      action: 'SELL',
      symbol: 'TSLA',
      priceAtPurchase: 200,
      totalShares: 10,
      userId: 2
    }

    let user1, user2
    let transactionOne, transactionTwo
    beforeEach(async () => {
      user1 = await User.create(userOneObj)
      user2 = await User.create(userTwoObj)
      transactionOne = await Transactions.create(transOneObj)
      transactionTwo = await Transactions.create(transTwoObj)
    })

    describe('GET `/api/transactions/` route', () => {
      it('responds with a login success and a transaction history', async () => {
        await agent.post('/auth/login').send(userTwoObj)
        const response = await agent.get('/api/transactions')
        expect(response.body.length).to.be.equal(2)
        expect(response.body[0].userId).to.be.equal(2)
      })
    }) // end of get transaction tests
  })
})
