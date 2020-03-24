'use strict'

const db = require('../server/db')
const {User, Stocks} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({
      id: 1,
      email: 'cody@email.com',
      firstName: 'cody',
      lastName: 'pug',
      password: 'Abc123!@'
    }),

    User.create({
      id: 2,
      email: 'richestman@email.com',
      firstName: 'richie',
      lastName: 'rich',
      password: 'abcsD123!@#'
    }),

    User.create({
      id: 3,
      email: 'poorestman@email.com',
      firstName: 'notrichie',
      lastName: 'notrich',
      password: 'ABc123!@#'
    }),

    User.create({
      id: 4,
      email: 'middleman@email.com',
      firstName: 'middle',
      lastName: 'class',
      password: 'Abc123!@#'
    }),

    User.create({
      id: 5,
      email: 'testuser@email.com',
      firstName: 'testuser',
      lastName: 'testuser',
      password: 'Abc123!@'
    })
  ])

  const stocks = await Promise.all([
    Stocks.create({
      symbol: 'tsla',
      companyName: 'Tesla',
      totalShares: 500,
      userId: 2
    }),

    Stocks.create({
      symbol: 'amz',
      companyName: 'Amazon',
      totalShares: 1000,
      userId: 2
    }),

    Stocks.create({
      symbol: 'msft',
      companyName: 'Microsoft',
      totalShares: 250,
      userId: 1
    }),

    Stocks.create({
      symbol: 'awk',
      companyName: 'Awkward',
      totalShares: 10,
      userId: 1
    }),

    Stocks.create({
      symbol: 'goog',
      companyName: 'Alphabet',
      totalShares: 100,
      userId: 2
    }),

    Stocks.create({
      symbol: 'WTM',
      companyName: 'White Mountains Insurance Group',
      totalShares: 5,
      userId: 2
    }),

    Stocks.create({
      symbol: 'BRK.A',
      companyName: 'Berkshire Hathaway',
      totalShares: 1,
      userId: 2
    }),

    Stocks.create({
      symbol: 'ANGI',
      companyName: 'Angi Homeservices',
      totalShares: 5,
      userId: 4
    })
  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${stocks.length} stocks`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
