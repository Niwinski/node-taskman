const express = require("express");
require("./db/mongoose");
const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");

const app = express();
const port = process.env.PORT;

// app.use((req, res, next) => {
//     if (req.method == "GET") {
//         res.send("get req disabled");
//     } else {
//         //console.log(req.method, req.path);
//         next();
//     }
// });

// app.use((req, res, next) => {
//     res.status(503).send("Maintenance Mode");
// });

// app.use((req, res, next) => {
//     if (req.method == "GET") {
//         next();
//     }
//     res.status(404).send("Boom");
// });

const multer = require("multer");
const upload = multer({
    dest: "images",
    limits: { fileSize: 1000000 },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.docx?$/)) {
            return cb(new Error(" must be a pdf"));
        }
        return cb(undefined, true);
    },
});

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, (params) => {
    console.log("listening on " + port);
});

const Task = require("./models/task");
const User = require("./models/user");

// email sending

// how populate works

// const main = async () => {
//     // const task = await Task.findById("5feac0c66acb2203ac073e66");
//     // await task.populate("owner").execPopulate();

//     // console.log(task.owner);
//     const user = await User.findById("5feac96c474e376b28df3fa1");
//     await user.populate("tasks").execPopulate();
//     console.log(user.email);
//     console.log(user.tasks);
// };

// main();

// jwt stuff.

// const jwt = require("jsonwebtoken");
// const myFunc = async () => {
//     const token = jwt.sign({ _id: "abcdef" }, "foobar", {
//         expiresIn: "7 days",
//     });
//     console.log(token);

//     const ok = jwt.verify(token, "foobar");
//     console.log(ok);
// };

// myFunc();
