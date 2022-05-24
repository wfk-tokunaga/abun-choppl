const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const User = require('./User');
const Instrument = require('./Instrument');

class Composition extends Model {}

Composition.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    length: {
        // This is gonna be tricky, maybe the length can be in seconds? Like I'll convert what the user puts in
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    date: {
        // Maybe change this later?
        type: DataTypes.DATE,
        allowNull: true,
        validate: {
            isDate: true,
        }
    },
    score_url: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            isUrl: true
        }
    },
    recording_url: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            isUrl: true
        }
    },
    // foreign key that references User
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'user',
            key: 'id',
        }
    },
}, {
    hooks: {},
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'composition'
})

module.exports = Composition;