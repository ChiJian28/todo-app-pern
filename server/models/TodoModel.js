const { DataTypes } = require('sequelize');
const { sequelize } = require('../db/db'); // 假设你已经配置好 Sequelize 连接


//使用 Sequelize 时，数据库中的每个table都由一个model表示
//该 model 实际上是它自己的 JavaScript 类，所以我们也可以用class来定义model
const Todo = sequelize.define('todo', {   // 如果你没有指定 table name的话，sequalize 会转化为复数作为table name 
  todo_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  // tableName: 'todo', // 添加 tableName 属性
  timestamps: false, // 禁用时间戳
}
);

// class Todo extends Model {}
// Todo.init({

// })

module.exports = Todo;
