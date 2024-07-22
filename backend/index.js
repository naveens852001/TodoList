const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const TodoModel = require('./models/Todo');

const app = express();
app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://127.0.0.1:27017/task')
    .then((res) => {
        console.log("mongodb connected");
    })
    .catch((err) => { console.log(err) })
app.get("/hello", (req, res) => {
    res.send("hello");
});
const port = 3000;

app.listen(port, () => {
    console.log(`server started on ${port}`);
});

//api for adding a task
app.post("/add", (req, res) => {
    const task = req.body.task;
    TodoModel.create({
        task: task
    }).then(result => res.json(result))
        .catch(err => res.json(err))

});

//api for fetching the task from db
app.get("/get", (req, res) => {
    TodoModel.find()
        .then(result => res.json(result))
        .catch(err => res.json(result))
})

//api for updating task
app.put("/update/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { done } = req.body;
        const updatedTask = await TodoModel.findByIdAndUpdate(id, { done: done }, { new: true });
        res.json(updatedTask);

    }
    catch (err) {
        res.status(500).send(err);
    }
});

app.delete("/delete/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deletedTask = await TodoModel.findByIdAndDelete(id);
        if (!deletedTask) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.json({ message: "Task deleted successfully", deletedTask });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err });
    }
});


