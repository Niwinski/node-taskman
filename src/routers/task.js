const express = require("express");
const Task = require("../models/task");
const router = new express.Router();
const auth = require("../middleware/auth");

router.post("/tasks", auth, async (req, res) => {
    const task = new Task({ ...req.body, owner: req.user._id });
    try {
        await task.save();
        res.status(201).send(task);
    } catch (error) {
        res.status(400).send(error);
    }
});

// GET /tasks?completed=true
// GET /tasks?limit=n&skip=m
// GET /tasks?sortBy=field_[asc|desc]
router.get("/tasks", auth, async (req, res) => {
    try {
        const match = {};
        const sort = {};
        if (req.query.completed) {
            match.completed = req.query.completed === "true";
        }
        if (req.query.sortBy) {
            const b = req.query.sortBy.split("_");
            sort[b[0]] = b[1] === "asc" ? 1 : -1;
        }
        if (false) {
            // TODO - how to do limit and skip with just find?
            const task = await Task.find({
                owner: req.user._id,
            });
        } else {
            await req.user
                .populate({
                    path: "tasks",
                    match,
                    options: {
                        limit: parseInt(req.query.limit),
                        skip: parseInt(req.query.skip),
                        sort,
                    },
                })
                .execPopulate();
            res.send(req.user.tasks);
        }
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get("/tasks/:id", auth, async (req, res) => {
    try {
        const _id = req.params.id;
        const task = await Task.findOne({ _id, owner: req.user._id });
        if (!task) {
            return res.status(400).send("not found");
        }
        res.send(task);
    } catch (error) {
        res.status(500).send();
    }
});

router.patch("/tasks/:id", auth, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedList = ["desc", "completed"];
    const isValid = updates.every((i) => allowedList.includes(i));

    try {
        if (!isValid) {
            return res.status(400).send("invalid updates");
        }

        const _id = req.params.id;
        const ret = await Task.findOne({ _id, owner: req.user._id });
        if (!ret) {
            return res.status(404).send();
        }
        updates.forEach((e) => (ret[e] = req.body[e]));
        await ret.save();

        res.send(ret);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.delete("/tasks/:id", auth, async (req, res) => {
    try {
        const _id = req.params.id;
        const ret = await Task.findOne({ _id, owner: req.user._id });
        if (!ret) {
            return res.status(404).send();
        }
        ret.remove();
        res.send(ret);
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;
