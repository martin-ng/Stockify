const {expect} = require('chai')
const db = require('../../server/db/index')
const Stocks = db.model('stocks')
const User = db.model('user')

const app = require('../../server/index')
const supertest = require('supertest')
// const agent = supertest.agent(app)
const agent = require('supertest')(app)

const seed = require('../../script/seed')
