/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const User = db.model('user')

describe('User model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('column definitions and validations', () => {
    it('has a "email", "name", and "money" amount', async () => {
      const cody = await User.create({
        email: 'testuser@email.com',
        name: 'Cody',
        money: 5000
      })
      expect(cody.email).to.equal('testuser@email.com')
      expect(cody.name).to.equal('Cody')
      expect(cody.money).to.equal(5000)
    })
  })

  describe('instanceMethods', () => {
    describe('correctPassword', () => {
      let cody

      beforeEach(async () => {
        cody = await User.create({
          email: 'testuser@email.com',
          name: 'Cody',
          password: 'abc123',
          money: 5000
        })
      })

      it('returns true if the password is correct', () => {
        expect(cody.correctPassword('abc123')).to.be.equal(true)
      })

      it('returns false if the password is incorrect', () => {
        expect(cody.correctPassword('bonez')).to.be.equal(false)
      })
    })
  }) // end describe('instanceMethods')
}) // end describe('User model')
