const { MongoServerSelectionError } = require("mongodb");
const { Mongoose } = require("mongoose");
const mongoose = require("mongoose");

mongoose.connect(process.env.MONOG_CONNECT, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
});

// me.save()
//     .then((result) => {
//         console.log(me);
//     })
//     .catch((err) => {
//         console.log("Error!", err);
//     });

// const task = new Task({ desc: "    second one", completed: false });

// task.save()
//     .then((result) => {
//         console.log(task);
//     })
//     .catch((err) => {
//         console.log(err);
//     });
// return;
