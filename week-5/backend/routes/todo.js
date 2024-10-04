const { Router } = require("express");
const userMiddleware = require("../middleware/user");
const { Todo } = require('../database');

const router = Router();

router.post('/', userMiddleware, async (req, res) => {
    const { todo, done } = req.body;
    const newTodo = new Todo({ userId: req.userId, todo, done: done || false });
    await newTodo.save();
    
    res.status(201).send("Todo created");
});

router.put('/:id', userMiddleware, async (req, res) => {
    const { id } = req.params;
    const updatedTodo = await Todo.findOneAndUpdate({ _id: id, userId: req.userId }, req.body, { new: true });
    
    if (!updatedTodo) return res.status(404).send("Todo not found");
    
    res.json(updatedTodo);
});

router.delete('/:id', userMiddleware, async (req, res) => {
    const { id } = req.params;
    const deletedTodo = await Todo.findOneAndDelete({ _id: id, userId: req.userId });
    
    if (!deletedTodo) return res.status(404).send("Todo not found");
    
    res.send("Todo deleted");
});

router.get('/', userMiddleware, async (req, res) => {
    const todos = await Todo.find({ userId: req.userId });
    res.json(todos);
});

router.get('/:id', userMiddleware, async (req, res) => {
    const { id } = req.params;
    const todo = await Todo.findOne({ _id: id, userId: req.userId });
    
    if (!todo) return res.status(404).send("Todo not found");
    
    res.json(todo);
});

module.exports = router;
