const CompInstruments = require('../models/CompInstruments');

const compInstrumentData = [{
        composition_id: 1,
        instrument_id: 6,
    },
    {
        composition_id: 1,
        instrument_id: 7,
    },
    {
        composition_id: 1,
        instrument_id: 8,
    },
    {
        composition_id: 2,
        instrument_id: 6,
    },
    {
        composition_id: 3,
        instrument_id: 1,
    },
    {
        composition_id: 3,
        instrument_id: 3,
    },
    {
        composition_id: 3,
        instrument_id: 4,
    },
    {
        composition_id: 3,
        instrument_id: 5,
    },
    {
        composition_id: 4,
        instrument_id: 1,
    },
    {
        composition_id: 4,
        instrument_id: 2,
    },
    {
        composition_id: 4,
        instrument_id: 8,
    },
    {
        composition_id: 5,
        instrument_id: 3,
    },
];

const seedCompInstruments = () => CompInstruments.bulkCreate(compInstrumentData);

module.exports = seedCompInstruments;