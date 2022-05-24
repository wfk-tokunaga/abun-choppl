const UserInstruments = require('../models/UserInstruments');

const userInstrumentData = [{
        user_id: 1,
        instrument_id: 6,
    },
    {
        user_id: 1,
        instrument_id: 7,
    },
    {
        user_id: 1,
        instrument_id: 8,
    },
    {
        user_id: 2,
        instrument_id: 6,
    },
    {
        user_id: 3,
        instrument_id: 1,
    },
    {
        user_id: 3,
        instrument_id: 3,
    },
    {
        user_id: 3,
        instrument_id: 4,
    },
    {
        user_id: 3,
        instrument_id: 5,
    },
    {
        user_id: 4,
        instrument_id: 1,
    },
    {
        user_id: 4,
        instrument_id: 2,
    },
    {
        user_id: 4,
        instrument_id: 8,
    },
    {
        user_id: 5,
        instrument_id: 3,
    },
];

const seedUserInstruments = () => UserInstruments.bulkCreate(userInstrumentData);

module.exports = seedUserInstruments;