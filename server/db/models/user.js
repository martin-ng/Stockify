const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')

const User = db.define('user', {
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
      msg: 'Must be a valid email!'
    },
    unique: {
      args: true,
      msg: 'Email address is already in use!'
    }
  },

  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        args: true,
        msg: 'Please enter a first name!'
      }
    }
  },

  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        args: true,
        msg: 'Please enter a last name!'
      }
    }
  },

  password: {
    type: Sequelize.STRING,
    get() {
      return () => this.getDataValue('password')
    },
    allowNull: false,
    validate: {
      notEmpty: {
        args: true,
        msg: 'Please enter a password!'
      }
    }
  },

  cashBalance: {
    type: Sequelize.DECIMAL(12, 2),
    defaultValue: 5000,
    min: 0
  },

  salt: {
    type: Sequelize.STRING,
    // Making `.salt` act like a function hides it when serializing to JSON.
    // This is a hack to get around Sequelize's lack of a "private" option.
    get() {
      return () => this.getDataValue('salt')
    }
  }
})

module.exports = User

User.prototype.correctPassword = function(candidatePwd) {
  return User.encryptPassword(candidatePwd, this.salt()) === this.password()
}

User.generateSalt = function() {
  return crypto.randomBytes(16).toString('base64')
}

User.encryptPassword = function(plainText, salt) {
  return crypto
    .createHash('RSA-SHA256')
    .update(plainText)
    .update(salt)
    .digest('hex')
}

User.beforeCreate(user => {
  user.firstName = user.firstName[0].toUpperCase() + user.firstName.slice(1)
  user.lastName = user.lastName[0].toUpperCase() + user.lastName.slice(1)
})

/* Salting password will generate a unique password for each user and
* store it into the database.
*/
const setSaltAndPassword = user => {
  if (user.changed('password')) {
    user.salt = User.generateSalt()
    user.password = User.encryptPassword(user.password(), user.salt())
  }
}

User.beforeCreate(setSaltAndPassword)
User.beforeUpdate(setSaltAndPassword)
User.beforeBulkCreate(users => {
  users.forEach(setSaltAndPassword)
})
