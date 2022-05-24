const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const User = require('./User');
const Composition = require('./Composition');
const Instrument = require('./Instrument');

class UserInstruments extends Model {}

UserInstruments.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    instrument_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'instrument',
            key: 'id'
        }
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'user',
            key: 'id'
        }
    },
}, {
    hooks: {},
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'user_instruments'
})

module.exports = UserInstruments;