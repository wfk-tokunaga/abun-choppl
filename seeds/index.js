const seedUsers = require('./user-seeds');
const seedInstruments = require('./instrument-seeds');
const seedCompositions = require('./composition-seeds');
const seedUserInstruments = require('./user-instrument-seeds');
const seedCompInstruments = require('./comp-instrument-seeds');

const sequelize = require('../config/connection');

const seedAll = async() => {
    await sequelize.sync({ force: true });

    await seedUsers();
    console.log('\n----- USERS SEEDED -----\n');
    await seedInstruments();
    console.log('\n----- INSTRUMENTS SEEDED -----\n');
    await seedCompositions();
    console.log('\n----- COMPOSITIONS SEEDED -----\n');
    await seedUserInstruments();
    console.log('\n----- USER-INSTRUMENTS SEEDED -----\n');
    await seedCompInstruments();
    console.log('\n----- COMPOSITION-INSTRUMENTS SEEDED -----\n');

    process.exit(0);
};

seedAll();