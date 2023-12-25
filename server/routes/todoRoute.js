const express = require('express');

const {
    createTodo,
    getTodos,
    getTodo,
    deleteTodo,
    updateTodo
} = require('../controllers/todoController.js');


const router = express.Router();


router.post('/create', createTodo);

router.get('/', getTodos);

router.get('/details/:id', getTodo);

// router.delete('/delete/:id', deleteTodo);
router.delete('/', deleteTodo);

router.put('/edit/:id', updateTodo);


module.exports = router;


// router.(路径，callback function)
// router.(路径，middleware，callback function)