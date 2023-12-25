const Todo = require('../models/TodoModel');

const createTodo = async (req, res) => {
    try {
        const { description, age } = req.body;
        const newTodo = await Todo.create({
            description,
            age,
        });

        return res.status(201).send(newTodo);
    } catch (err) {
        console.error(err.message);
        return res.status(500).send({ error: 'Internal Server Error' });
    }
};

const getTodos = async (req, res) => {
    try {
        const allTodos = await Todo.findAll();
        return res.status(200).json({ allTodos });      //pass to client as an object
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

module.exports = {
    createTodo,
    getTodos,
    getTodo,
    deleteTodo,
    updateTodo
};



