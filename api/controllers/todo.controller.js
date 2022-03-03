const { Todo } = require('../model/todo.model');

// Utils
const { filterObj } = require('../util/filterObj');

exports.getAllTodo = async (req, res) => {
  try {
    // SELECT * FROM posts WHERE status = 'active'; -> activities[]
    const todo = await Todo.findAll({ where: { status: 'active' } });

    res.status(200).json({
      status: 'success',
      data: {
        todo
      }
    });
  } catch (error) {
    console.log(error);
  }
};

exports.createTodo = async (req, res) => {
  try {
    const { content } = req.body;

    const newTodo = await Todo.create({
      content: content
    });

    res.status(201).json({
      status: 'success',
      data: { newTodo }
    });
  } catch (error) {
    console.log(error);
  }
};

exports.updateTodoPatch = async (req, res) => {
  try {
    const { id } = req.params;

    const data = filterObj(req.body, 'content');

    const todo = await Todo.findOne({
      where: { id: id, status: 'active' }
    });

    if (!todo) {
      res.status(404).json({
        status: 'error',
        message: 'Cant update post, invalid ID'
      });
      return;
    }

    await todo.update({ ...data });
    res.status(204).json({ status: 'success' });
  } catch (error) {
    console.log(error);
  }
};

// Delete post
exports.deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;

    const todo = await Todo.findOne({
      where: { id: id, status: 'active' }
    });

    if (!this.getAllTodo) {
      res.status(404).json({
        status: 'error',
        message: 'Cant delete post, invalid ID'
      });
      return;
    }
    // Soft delete
    await todo.update({ status: 'deleted' });

    res.status(204).json({ status: 'success' });
  } catch (error) {
    console.log(error);
  }
};
