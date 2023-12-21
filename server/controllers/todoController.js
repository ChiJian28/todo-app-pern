const pool = require('../db');


const createTodo = async (req, res) => {
    try {
        const { description, age } = req.body;
        const newTodo = await pool.query(
            "INSERT INTO todo (description, age) VALUES($1, $2)",       //RETURNING * 代表返回这个新add的value
            [description, age]
        );
        return res.status(201).send(newTodo);
    } catch (err) {
        console.error(err.message);
    }
};


const getTodos = async (req, res) => {
    try {
        const allTodos = await pool.query("SELECT * FROM todo");
        return res.status(200).json({ allTodos });
    } catch (err) {
        console.error(err.message);
    }
};

const getTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const allTodos = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [id]);
        return res.status(200).json({ allTodos });
    } catch (err) {
        console.error(err.message);
    }
};

// // delete via url params
// const deleteTodo = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [id]);
//         if (!deleteTodo) {
//             return res.status(404).json({ message: 'Todo not found' });
//         }
//         return res.status(200).send({ message: 'Todo was deleted!' });
//     } catch (err) {
//         console.log(err.message);
//     }
// };

// delete via request body
const deleteTodo = async (req, res) => {
    try {
        const { id } = req.body;
        const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [id]);
        if (!deleteTodo) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        return res.status(200).send({ message: 'Todo was deleted!' });
    } catch (err) {
        console.log(err.message);
    }
};

const updateTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const { description, age } = req.body;
        const updateTodo = await pool.query(
            "UPDATE todo SET description = $1, age = $2 WHERE todo_id = $3",
            [description, age, id]
        );

        if (!updateTodo) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        return res.status(200).send({ message: 'Todo updated successfully' });
    } catch (err) {
        console.error(err.message);
    }
};

module.exports = {
    createTodo,
    getTodos,
    getTodo,
    deleteTodo,
    updateTodo
};