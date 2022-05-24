const User = require('./User');
const Composition = require('./Composition');
const Instrument = require('./Instrument');
const CompInstruments = require('./CompInstruments');
const UserInstruments = require('./UserInstruments');

User.hasMany(Composition, {
    foreignKey: 'user_id',
    // onDelete: 'SET NULL'
})

Composition.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'cascade',
    hooks: true
})

Composition.belongsToMany(Instrument, {
    through: CompInstruments,
    // as: 'composition_instruments',
    foreignKey: 'composition_id',
    // onDelete: 'SET NULL'
    onDelete: 'cascade',
    hooks: true
})

Instrument.belongsToMany(Composition, {
    through: CompInstruments,
    // as: 'composition_instruments',
    foreignKey: 'instrument_id',
    // onDelete: 'SET NULL'
    onDelete: 'cascade',
    hooks: true
})

User.belongsToMany(Instrument, {
    through: UserInstruments,
    // as: 'user_instruments',
    foreignKey: 'user_id',
    // onDelete: 'SET NULL'
})

Instrument.belongsToMany(User, {
    through: UserInstruments,
    // as: 'user_instruments',
    foreignKey: 'instrument_id',
    onDelete: 'SET NULL'
})

module.exports = {
    User,
    Composition,
    Instrument,
    CompInstruments,
    UserInstruments
};