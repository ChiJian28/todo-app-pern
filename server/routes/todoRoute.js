const express = require('express');

const { 
    createTodoForUser, 
    getTodosForUser,
    getTodo,
    deleteTodo,
    updateTodo
 } = require('../controllers/todoController.js');

const router = express.Router();

router.get('/details/:id', getTodo);

router.put('/edit/:id', updateTodo);

router.post('/create', createTodoForUser);

router.get('/', getTodosForUser);

router.delete('/', deleteTodo);

module.exports = router;


// router.(路径，callback function)
// router.(路径，middleware，callback function)