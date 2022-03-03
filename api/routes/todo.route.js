const express = require('express');

const {
  getAllTodo,
  createTodo,
  updateTodoPatch,
  deleteTodo
} = require('../controllers/todo.controller');

const router = express.Router();

router.get('/', getAllTodo);
router.post('/', createTodo);
router.patch('/:id', updateTodoPatch);
router.delete('/:id', deleteTodo);

module.exports = { todosRouter: router };
