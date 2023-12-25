const User = require('./user');
const Todo = require('./todo');
const UserTodo = require('./userTodo');

// setting up tables relationship
User.belongsToMany(Todo, { through: UserTodo, foreignKey: 'user_id', });    //通过foreignKey: user_id 来join UserTodo 和 User

Todo.belongsToMany(User, { through: UserTodo, foreignKey: 'todo_id', });    

module.exports = {
  User,
  Todo,
  UserTodo,
};