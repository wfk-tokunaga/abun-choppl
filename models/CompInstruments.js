const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const Instrument = require('./Instrument');
const Composition = require('./Composition');

class CompInstruments extends Model {}

CompInstruments.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    composition_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'composition',
            key: 'id'
        },
        // onDelete: 'CASCADE'
    },
    instrument_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'instrument',
            key: 'id'
        },
        // onDelete: 'CASCADE'
    },
}, {
    hooks: {},
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'comp_instruments'
})

module.exports = CompInstruments;