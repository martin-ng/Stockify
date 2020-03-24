const {expect} = require('chai')
const db = require('../../server/db/index')
const User = db.model('user')

const app = require('../../server/api')
// const supertest = require('supertest')
const agent = require('supertest')(app)
const seed = require('../../script/seed')

describe('User Routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  // run seed file
  beforeEach('Run seed file', async () => {
    // seed()
  })
})
