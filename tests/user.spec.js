/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../server/db/index')
const User = db.model('user')

xdescribe('User model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('column definitions and validations', () => {
    it('has a "email", "first name", "last name", and "money" amount', async () => {
      const cody = await User.create({
        email: 'cody@email.com',
        firstName: 'Cody',
        lastName: 'pug',
        password: 'Abc123!@'
      })

      expect(cody.email).to.equal('cody@email.com')
      expect(cody.firstName).to.equal('Cody')
      expect(cody.lastName).to.equal('Pug')
      expect(cody.cashBalance).to.equal((5000).toFixed(2))
    })
  }) // end of column definitions and validations test

  describe('instanceMethods', () => {
    describe('correctPassword', () => {
      let cody

      beforeEach(async () => {
        cody = await User.create({
          email: 'testuser@email.com',
          firstName: 'Cody',
          lastName: 'Pug',
          password: 'Abc123!@'
        })
      })

      it('returns true if the password is correct', () => {
        expect(cody.correctPassword('Abc123!@')).to.be.equal(true)
      })

      it('returns false if the password is incorrect', () => {
        expect(cody.correctPassword('bonez')).to.be.equal(false)
      })
    }) // end of correct passwords tests
  }) // end of instance methods tests

  describe('Sign up', () => {
    const newUser = {
      email: 'richestman@email.com',
      firstName: 'richie',
      lastName: 'rich',
      password: 'AbcSD123!@#'
    }

    const testPassword = newUser.password

    let user
    beforeEach(async () => {
      user = await User.create(newUser)
    })

    describe('Sign up success', () => {
      it('returns true if id is a number', () => {
        expect(typeof user.dataValues.id).to.be.equal('number')
      })
    })

    describe('Email tests', () => {
      it('returns true if the email is a valid email', () => {
        let regex = RegExp('@')
        expect(regex.test(user.dataValues.email)).to.be.equal(true)
      })
    }) // end of email tests

    describe('First name tests', () => {
      it('returns true if first name contains at least 4 characters', () => {
        expect(user.dataValues.firstName.length >= 4).to.be.equal(true)
      })

      it('returns true if first name contains characters', () => {
        expect(/[a-zA-Z]/.test(user.dataValues.firstName)).to.be.equal(true)
      })

      it('returns false if there are no numbers', () => {
        expect(/[0-9]/.test(user.dataValues.firstName)).to.be.equal(false)
      })
    }) // end of first name tests

    describe('Last name tests', () => {
      it('returns true if last name contains at least 2 characters', () => {
        expect(user.dataValues.lastName.length >= 2).to.be.equal(true)
      })

      it('returns true if last name contains characters', () => {
        expect(/[a-zA-Z]/.test(user.dataValues.lastName)).to.be.equal(true)
      })

      it('returns false if there are no numbers', () => {
        expect(/[0-9]/.test(user.dataValues.lastName)).to.be.equal(false)
      })
    }) // end of last name tests

    describe('Password tests', () => {
      it('returns true if password contains at least 8 characters', () => {
        expect(testPassword.length >= 8).to.be.equal(true)
      })

      it('returns true if password contains less than 21 characters', () => {
        expect(testPassword.length < 21).to.be.equal(true)
      })

      it('returns true if password contains at least one uppercase letter', () => {
        expect(/[A-Z]/.test(testPassword)).to.be.equal(true)
      })

      it('returns true if password contains at least one lowercase letter', () => {
        expect(/[a-z]/.test(testPassword)).to.be.equal(true)
      })

      it('returns true if password contains at least one special character', () => {
        expect(/[^a-zA-Z0-9\s]/.test(testPassword)).to.be.equal(true)
      })

      it('returns true if password contains at least one number', () => {
        expect(/[0-9]/.test(testPassword)).to.be.equal(true)
      })
    }) // end of password tests

    describe('Cash balance test', () => {
      it('returns true if default cash balace is 5000', () => {
        expect(user.dataValues.cashBalance).to.be.equal((5000).toFixed(2))
      })
    }) // end of cash balance test
  }) // end of new sign up tests
}) // end of user model tests
