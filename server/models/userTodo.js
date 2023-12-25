const { DataTypes } = require('sequelize');
const { sequelize } = require('../db/db');

// composite unique key 会默认被创建
const UserTodo = sequelize.define('UserTodo', { }, {
    tableName: 'usertodo3',     // 无论如何 sequelize都会把 table name 默认为复数形式的小写
    timestamps: false
    // freezeTableName: true,   // 防止 Sequelize 转换表名
});


module.exports = UserTodo;