const {expect} = require('chai')
const db = require('../server/db/index')
const User = db.model('user')

const app = require('../server/api')
const supertest = require('supertest')
const agent = supertest.agent(app)

describe('User Routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  beforeEach(async () => {})
})
