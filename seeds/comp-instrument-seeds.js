const CompInstruments = require('../models/CompInstruments');
const {numberCompositions} = require('./composition-seeds');
const {numberInstruments} = require('./instrument-seeds');

let compInstrumentData = [];

// For each composition
for (let compIndex = 0; compIndex < numberCompositions; compIndex++) {
    // generate a random number of instruments links between 1 and 5
    const numberLinks = Math.round(Math.random() * 5 + 1);
    let instruments = [];
    while (instruments.length < numberLinks) {
        let instrument_id = Math.round(Math.random() * numberInstruments) + 1;
        // Make sure we're adding a new instrument
        if (!instruments.includes(instrument_id)) {
            console.log(instrument_id);
            instruments.push(instrument_id);
            console.log(instruments);
        }
    }
    console.log(instruments);
    for (let i = 0; i < instruments.length; i++) {
        compInstrumentData.push({
            composition_id: compIndex,
            instrument_id: instruments[i]
        })
    }
}

console.log(compInstrumentData);

// const compInstrumentData = [{
//         composition_id: 1,
//         instrument_id: 6,
//     },
//     {
//         composition_id: 1,
//         instrument_id: 7,
//     },
//     {
//         composition_id: 1,
//         instrument_id: 8,
//     },
//     {
//         composition_id: 2,
//         instrument_id: 6,
//     },
//     {
//         composition_id: 3,
//         instrument_id: 1,
//     },
//     {
//         composition_id: 3,
//         instrument_id: 3,
//     },
//     {
//         composition_id: 3,
//         instrument_id: 4,
//     },
//     {
//         composition_id: 3,
//         instrument_id: 5,
//     },
//     {
//         composition_id: 4,
//         instrument_id: 1,
//     },
//     {
//         composition_id: 4,
//         instrument_id: 2,
//     },
//     {
//         composition_id: 4,
//         instrument_id: 8,
//     },
//     {
//         composition_id: 5,
//         instrument_id: 3,
//     },
// ];

const seedCompInstruments = () => CompInstruments.bulkCreate(compInstrumentData);

module.exports = seedCompInstruments;