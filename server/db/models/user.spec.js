/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const User = db.model('user')

describe('User model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('instanceMethods', () => {
    let cody

    beforeEach(async () => {
      cody = await User.create({
        email: 'testuser@email.com',
        password: 'abc123'
      })
    })
    describe('correctPassword', () => {
      // let cody

      // beforeEach(async () => {
      //   cody = await User.create({
      //     email: 'testuser@email.com',
      //     password: 'abc123'
      //   })
      // })

      it('returns true if the password is correct', () => {
        expect(cody.correctPassword('abc123')).to.be.equal(true)
      })

      it('returns false if the password is incorrect', () => {
        expect(cody.correctPassword('bonez')).to.be.equal(false)
      })
    }) // end describe('correctPassword')

    describe('correctMoney', () => {
      expect(cody.correctMoney(5000)).to.be.equal(true)
    })
  }) // end describe('instanceMethods')
}) // end describe('User model')
