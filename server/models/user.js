const { DataTypes } = require('sequelize');
const { sequelize } = require('../db/db');

const User = sequelize.define('User', {
    user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'user3', 
    timestamps: false,
});


module.exports = User;