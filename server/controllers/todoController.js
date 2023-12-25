const { User, Todo } = require('../models');
const { QueryTypes } = require('sequelize');
const { sequelize } = require('../db/db');

const createTodoForUser = async (req, res) => {
    try {
        const { description, age } = req.body;

        const user = await User.findByPk(1);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const newTodo = await Todo.create({ description, age });        //add to Todo table
        await user.addTodo(newTodo);    // 加了addTodo，我的junction table就会自动记录相关的信息（用于在建立 Many-to-Many 关系时，将两个table关联起来）

        return res.status(201).send(newTodo);
    } catch (err) {
        console.error(err.message);
        return res.status(500).send({ error: 'Internal Server Error' });
    }
};

const getTodosForUser = async (req, res) => {
    try {
        const allTodos = await Todo.findAll();
    
        const sqlQuery = 
        `
        SELECT user3.username, todo3.description, todo3.age
        FROM user3
        JOIN usertodo3 ON usertodo3.user_id = user3.user_id
        JOIN todo3 ON usertodo3.todo_id = todo3.todo_id
        `;

        const result = await sequelize.query(sqlQuery, {
            type: QueryTypes.SELECT,
        });
        // console.log(result);

        return res.status(200).json({ allTodos });
    } catch (err) {
        console.error(err.message);
        return res.status(500).send({ error: 'Internal Server Error' });
    }
};

const deleteTodo = async (req, res) => {
    try {
        const { id } = req.body;
        const deleteCount = await Todo.destroy(      //destroy 方法返回有多少个被成功dlt了
            { where: { todo_id: id } }    
        );

        if (deleteCount === 0) {
            return res.status(404).json({ message: 'Todo not found' });
        }

        return res.status(200).send({ message: 'Todo was deleted!' });
    } catch (err) {
        console.log(err.message);
        return res.status(500).send({ error: 'Internal Server Error' });
    }
};


const updateTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const { description, age } = req.body;
        const [updateCount] = await Todo.update(        //update方法返回一个数组，其一是更新过的数量(updateCount)，其二是被更新的对象(updatedRecord)，在这里我们直接结构第一个参数出来
            { description, age },
            { where: { todo_id: id } }
        );

        if (updateCount === 0) {
            return res.status(404).json({ message: 'Todo not found' });
        }

        return res.status(200).send({ message: 'Todo updated successfully' });
    } catch (err) {
        console.error(err.message);
        return res.status(500).send({ error: 'Internal Server Error' });
    }
};

const getTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const todo = await Todo.findByPk(id);   //similar to findById

        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }

        return res.status(200).json({ todo });
    } catch (err) {
        console.error(err.message);
        return res.status(500).send({ error: 'Internal Server Error' });
    }
};

module.exports = {
    createTodoForUser,
    getTodosForUser,
    deleteTodo,
    getTodo,
    updateTodo,
};
