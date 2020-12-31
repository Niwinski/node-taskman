const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require("../../src/models/user");
const Task = require("../../src/models/task");

const fredId = new mongoose.Types.ObjectId();
const tomId = new mongoose.Types.ObjectId();

const fred = {
    _id: fredId,
    name: "Fred Nabo",
    email: "fred@example.com",
    password: "fooo12345",
    tokens: [
        {
            token: jwt.sign({ _id: fredId }, process.env.JWT_SECRET, {
                expiresIn: "7 days",
            }),
        },
    ],
};

const tom = {
    _id: tomId,
    name: "Tom Nabo",
    email: "tom@example.com",
    password: "fooo12346",
    tokens: [
        {
            token: jwt.sign({ _id: tomId }, process.env.JWT_SECRET, {
                expiresIn: "7 days",
            }),
        },
    ],
};

const task1 = {
    _id: new mongoose.Types.ObjectId(),
    desc: "task 1",
    completed: false,
    owner: fred._id,
};
const task2 = {
    _id: new mongoose.Types.ObjectId(),
    desc: "task 2",
    completed: true,
    owner: fred._id,
};
const task3 = {
    _id: new mongoose.Types.ObjectId(),
    desc: "task 3",
    completed: false,
    owner: tom._id,
};

const setupDB = async () => {
    await User.deleteMany();
    await Task.deleteMany();
    await User.deleteMany();
    await new User(fred).save();
    await new User(tom).save();
    await new Task(task1).save();
    await new Task(task2).save();
    await new Task(task3).save();

    // const user = await User.findOne({ email: fred.email });
    // await console.log("uesr: ", user);
};

module.exports = { fredId, fred, tomId, tom, task3, setupDB };
